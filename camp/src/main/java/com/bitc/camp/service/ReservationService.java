package com.bitc.camp.service;

import com.bitc.camp.data.entity.CampMainInfo;
import com.bitc.camp.data.entity.CampSiteInfo;

import java.util.List;

public interface ReservationService {
  CampMainInfo getCampMainInfo(int campMainIdx) throws Exception;

  CampSiteInfo getCampSiteInfo(int campSiteInfoIdx) throws Exception;
}
