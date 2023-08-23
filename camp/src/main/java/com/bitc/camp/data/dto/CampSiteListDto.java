package com.bitc.camp.data.dto;

import com.bitc.camp.data.entity.CampSiteInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CampSiteListDto {
    private int idx;
    private String campSiteName;
    private CampSiteInfo campSiteInfo;
    private int campSiteInfoIdx;
}
