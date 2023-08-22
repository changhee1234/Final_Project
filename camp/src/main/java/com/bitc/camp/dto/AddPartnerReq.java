package com.bitc.camp.dto;

import lombok.Data;

@Data
public class AddPartnerReq {
    private String partnerName;
    private String partnerPhone;
    private String partnerNum;
    private String partnerAccess;
    private String addressNum;
    private String address;
    private String addressDetail;
    private String memberIdx;
}
