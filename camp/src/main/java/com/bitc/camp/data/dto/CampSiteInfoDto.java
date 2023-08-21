package com.bitc.camp.data.dto;

import com.bitc.camp.data.entity.CampMainInfo;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CampSiteInfoDto {
    private int idx;
    private String areaName;
    private int sitePrice;
    private String notice;
    private String campStyle;
    private int peopleMin;
    private int peopleMax;
    private int addPrice;
    private int campReservePeriod;
    private int parkPrice;
    private int elePrice;
    private int areaSiteCnt;
    private CampMainInfo campMainInfo;
    private int campMainInfoIdx;
}
