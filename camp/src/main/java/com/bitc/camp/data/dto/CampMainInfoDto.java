package com.bitc.camp.data.dto;

import com.bitc.camp.data.entity.Partner;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CampMainInfoDto {
    private  Integer idx;
    private Integer partnerIdx;
    private String campName;
    private String campIntro;
    private LocalDateTime campDt;
    private String kidszoneYn;
    private String campHpLink;
    private String campPh;
    private String campAddress;
    private Partner partner;

    private Integer memberIdx;
    private String partnerName;
    private String campDeletedYn;
}
