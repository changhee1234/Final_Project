package com.bitc.camp.service;

import com.bitc.camp.data.entity.Partner;
import com.bitc.camp.dto.AddPartnerReq;
import org.springframework.stereotype.Service;

@Service
public interface PartnerService {
    void createPartner(AddPartnerReq partner);
    void approvePartner(int memberIdx);
}
