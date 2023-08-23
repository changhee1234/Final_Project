package com.bitc.camp.dto;

import com.bitc.camp.entity.Member;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddPartnerReq {
    private int idx;
    private String partnerName;
    private String partnerPhone;
    private String partnerNum;
    private String partnerAccess;
    private int addressNum;
    private String address;
    private String addressDetail;
    private Member memberIdx;
}
