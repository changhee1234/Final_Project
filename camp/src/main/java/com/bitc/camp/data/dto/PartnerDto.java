package com.bitc.camp.data.dto;

import com.bitc.camp.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
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

