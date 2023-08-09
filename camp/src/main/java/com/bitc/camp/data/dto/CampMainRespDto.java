package com.bitc.camp.data.dto;

import com.bitc.camp.data.entity.CampMainInfo;
import com.bitc.camp.data.entity.CampSiteInfo;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class CampMainRespDto {
  private int idx;
  private String campName;
  private String campIntro;
  private LocalDateTime campDt;
  private String kidszoneYn;
  private String campHpLink;
  private String campPh;
  private String campAddress;
  private int partnerIdx;
  private List<CampSiteInfoRespDto> siteInfoLists;

  public CampMainRespDto(CampMainInfo entity) {
    this.idx = entity.getIdx();
    this.campName = entity.getCampName();
    this.campIntro = entity.getCampIntro();
    this.campDt = entity.getCampDt();
    this.kidszoneYn = entity.getKidszoneYn();
    this.campHpLink = entity.getCampHpLink();
    this.campPh = entity.getCampPh();
    this.campAddress = entity.getCampAddress();
    this.partnerIdx = entity.getPartner().getIdx();
    this.siteInfoLists = entity.getCampSiteInfoList().stream()
        .map(CampSiteInfoRespDto::new)
        .collect(Collectors.toList());
  }
}
