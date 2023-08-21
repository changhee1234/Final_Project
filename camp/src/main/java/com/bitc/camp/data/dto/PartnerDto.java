package com.bitc.camp.data.dto;

import com.bitc.camp.data.entity.Member;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class PartnerDto {

    private int idx;
    private String partnerName;
    private String partnerPhone;
    private String partnerNum;
    private String partnerAccess;
    private int addressNum;
    private String address;
    private String addressDetail;
    private Member member;
}

