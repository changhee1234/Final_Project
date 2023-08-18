package com.bitc.camp.service;

import com.bitc.camp.data.dto.CampMainRespDto;
import com.bitc.camp.data.dto.CampSiteInfoRespDto;
import com.bitc.camp.data.dto.CampSiteListRespDto;
import com.bitc.camp.data.dto.ReservationReqDto;
import com.bitc.camp.data.entity.CampMainInfo;
import com.bitc.camp.data.entity.CampSiteInfo;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface ReservationService {
  CampMainRespDto getCampMainInfo(int campMainIdx) throws Exception;

  CampSiteInfoRespDto getCampSiteInfo(int campSiteInfoIdx) throws Exception;

  int getSiteCnt(int siteInfoIdx, String startDate, String endDate) throws Exception;

  List<CampSiteListRespDto> getSiteList(int siteInfoIdx, String startDate, String endDate) throws Exception;

  void save(ReservationReqDto requestData) throws Exception;
}
