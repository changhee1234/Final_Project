package com.bitc.camp.data.dto;

import com.bitc.camp.data.entity.CampSiteInfo;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CampSiteListDto {
    private int idx;
    private String campSiteName;
    private CampSiteInfo campSiteInfo;
}
