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
  private int peopleMin;
  private int peopleMax;
  private int addPrice;
  private String campReservePeriod;
  private int parkPrice;
  private int elePrice;
  private int areaSiteCnt;

  private int campMainIdx;
  private List<CampSiteListRespDto> campSiteLists;
  private List<ReservationRespDto> reservationList;

  public CampSiteInfoRespDto(CampSiteInfo entity) {
    this.idx = entity.getIdx();
    this.areaName = entity.getAreaName();
    this.sitePrice = entity.getSitePrice();
    this.peopleMin = entity.getPeopleMin();
    this.peopleMax = entity.getPeopleMax();
    this.addPrice = entity.getAddPrice();
    this.campReservePeriod = entity.getCampReservePeriod();
    this.parkPrice = entity.getParkPrice();;
    this.elePrice = entity.getElePrice();
    this.areaSiteCnt = entity.getAreaSiteCnt();
    this.campMainIdx = entity.getCampMainInfo().getIdx();
    this.campSiteLists = entity.getCampSiteLists().stream()
        .map(CampSiteListRespDto::new)
        .collect(Collectors.toList());
  }
}
