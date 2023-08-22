package com.bitc.camp.data.dto;

import com.bitc.camp.data.entity.Partner;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CampMainInfoDto {
    private int idx;
    private String campName;
    private String campIntro;
    private LocalDateTime campDt;
    private String kidszoneYn;
    private String campHpLink;
    private String campPh;
    private String campAddress;
    private Partner partner;
    private int partnerIdx;
    private int memberIdx;
    private String partnerName;
    private String campDeletedYn;
}
