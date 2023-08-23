package com.bitc.camp.service;

import com.bitc.camp.data.entity.Partner;
import com.bitc.camp.dto.AddPartnerReq;
import com.bitc.camp.entity.Member;
import com.bitc.camp.repository.PartnerRepository;
import com.bitc.camp.service.PartnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    @Override
    public List<AddPartnerReq> getPartnerList() {
        List<AddPartnerReq> partnerList = new ArrayList<>();

        // 데이터베이스 쿼리 실행하여 파트너 신청 정보 조회
        List<Partner> partnerEntities = partnerRepository.findAll(); // 예시일 뿐 실제로는 데이터베이스에서 데이터를 조회해야 합니다.

        // PartnerEntity를 AddPartnerReq로 변환하여 리스트에 추가
        for (Partner partnerEntity : partnerEntities) {
            AddPartnerReq partnerReq = new AddPartnerReq();
            partnerReq.setIdx(partnerEntity.getIdx());
            partnerReq.setMemberIdx(partnerEntity.getMemberIdx());
            partnerReq.setPartnerName(partnerEntity.getPartnerName());
            partnerReq.setPartnerPhone(partnerEntity.getPartnerPhone());
            partnerReq.setPartnerNum(partnerEntity.getPartnerNum());
            partnerReq.setPartnerAccess(partnerEntity.getPartnerAccess());
            partnerReq.setAddressNum(partnerEntity.getAddressNum());
            partnerReq.setAddress(partnerEntity.getAddress());
            partnerReq.setAddressDetail(partnerEntity.getAddressDetail());

            partnerList.add(partnerReq);
        }

        return partnerList;
    }

    @Override
    public void updatePartnerAccess(int memberIdx, String newValue) {
        Optional<Partner> optionalPartner = partnerRepository.findById(memberIdx);
        if (optionalPartner.isPresent()) {
            Partner partner = optionalPartner.get();
            partner.setPartnerAccess(newValue);
            partnerRepository.save(partner);
        }
    }
}
