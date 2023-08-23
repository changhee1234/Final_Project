package com.bitc.camp.service;

import com.bitc.camp.data.entity.Partner;
import com.bitc.camp.dto.AddPartnerReq;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PartnerService {
    void createPartner(AddPartnerReq partner);
    void approvePartner(int memberIdx);

    List<AddPartnerReq> getPartnerList();

    void updatePartnerAccess(int memberIdx, String newValue);
}
