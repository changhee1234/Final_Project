package com.bitc.camp.service;

import com.bitc.camp.data.entity.Partner;
import com.bitc.camp.dto.AddPartnerReq;
import com.bitc.camp.repository.PartnerRepository;
import com.bitc.camp.service.PartnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PartnerServiceImpl implements PartnerService {

    private final PartnerRepository partnerRepository;

    @Autowired
    public PartnerServiceImpl(PartnerRepository partnerRepository) {
        this.partnerRepository = partnerRepository;
    }

    @Override
    public void createPartner(AddPartnerReq partnerReq) {
        Partner partner = new Partner();
        partner.setPartnerName(partnerReq.getPartnerName());
        partner.setPartnerPhone(partnerReq.getPartnerPhone());
        partner.setPartnerNum(partnerReq.getPartnerNum());
        partner.setPartnerAccess("N");
        partner.setAddressNum(partnerReq.getAddressNum());
        partner.setAddress(partnerReq.getAddress());
        partner.setAddressDetail(partnerReq.getAddressDetail());
        partner.setMember(partnerReq.getMemberIdx());
        // Save the partner entity
        partnerRepository.save(partner);
    }

    @Override
    public void approvePartner(int memberIdx) {
        Partner partner = partnerRepository.findById(memberIdx)
                .orElseThrow(() -> new IllegalArgumentException("Partner not found with id: " + memberIdx));

        // Update partnerAccess to 'Y'
        partner.setPartnerAccess("Y");
        partnerRepository.save(partner);
    }
}
