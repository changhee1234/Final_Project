package com.bitc.camp.service;

import com.bitc.camp.data.entity.CampMainInfo;
import com.bitc.camp.data.entity.CampSiteInfo;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

public interface ReservationService {
  CampMainInfo getCampMainInfo(int campMainIdx) throws Exception;

  CampSiteInfo getCampSiteInfo(int campSiteInfoIdx) throws Exception;

  int getSiteCnt() throws Exception;
}
