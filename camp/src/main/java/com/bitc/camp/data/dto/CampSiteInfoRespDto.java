package com.bitc.camp.data.dto;

import com.bitc.camp.data.entity.CampSiteInfo;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class CampSiteInfoRespDto {
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

  private int campMainIdx;
  private List<CampSiteListRespDto> campSiteLists;

  private String campSiteNewImg;
  private String campSiteOriginImg;

  public CampSiteInfoRespDto(CampSiteInfo entity) {
    this.idx = entity.getIdx();
    this.areaName = entity.getAreaName();
    this.sitePrice = entity.getSitePrice();
    this.notice = entity.getNotice();
    this.campStyle = entity.getCampStyle();
    this.peopleMin = entity.getPeopleMin();
    this.peopleMax = entity.getPeopleMax();
    this.addPrice = entity.getAddPrice();
    this.campReservePeriod = entity.getCampReservePeriod();
    this.parkPrice = entity.getParkPrice();;
    this.elePrice = entity.getElePrice();
    this.areaSiteCnt = entity.getAreaSiteCnt();
    this.campMainIdx = entity.getCampMainInfo().getIdx();
    this.campSiteNewImg = entity.getCampSiteNewImg();
    this.campSiteLists = entity.getCampSiteLists().stream()
        .map(CampSiteListRespDto::new)
        .collect(Collectors.toList());
  }
}
