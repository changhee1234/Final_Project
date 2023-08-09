package com.bitc.camp.data.dto;

import com.bitc.camp.data.entity.CampSiteList;
import lombok.Getter;

import java.util.List;

@Getter
public class CampSiteListRespDto {
  private int idx;
  private String campStyle;
  private String campSiteName;
  private int campSiteInfoIdx;
  List<ReservationRespDto> reservationList;

  public CampSiteListRespDto(CampSiteList entity) {
    this.idx = entity.getIdx();
    this.campStyle = entity.getCampStyle();
    this.campSiteName = entity.getCampSiteName();
    this.campSiteInfoIdx = entity.getCampSiteInfo().getIdx();
  }
}
