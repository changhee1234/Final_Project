package com.bitc.camp.service;

import com.bitc.camp.data.dto.*;

import java.util.List;

public interface ReservationService {
  CampMainRespDto getCampMainInfo(int campMainIdx) throws Exception;

  CampSiteInfoRespDto getCampSiteInfo(int campSiteInfoIdx) throws Exception;

  int getSiteCnt(int siteInfoIdx, String startDate, String endDate) throws Exception;

  List<CampSiteListRespDto> getSiteList(int siteInfoIdx, String startDate, String endDate) throws Exception;

  int save(ReservationReqDto requestData) throws Exception;

  void updateReservation(int idx, ReservationReqDto params) throws Exception;

  List<ReservationRespDto> getReservationFromCampMainIdx(int partnerIdx);
}
