package com.bitc.camp.service;

import com.bitc.camp.data.entity.CampMainInfo;
import com.bitc.camp.data.entity.CampSiteInfo;
import com.bitc.camp.data.entity.CampSiteList;
import com.bitc.camp.data.repository.CampMainRepository;
import com.bitc.camp.data.repository.CampSiteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

  private final CampMainRepository campMainRepository;
  private final CampSiteRepository campSiteRepository;

  @Override
  public CampMainInfo getCampMainInfo(int campMainIdx) throws Exception {
    CampMainInfo campMainInfo = campMainRepository.findByIdx(campMainIdx);
    return campMainInfo;
  }

  @Override
  public CampSiteInfo getCampSiteInfo(int campSiteInfoIdx) throws Exception {
    CampSiteInfo campSiteInfo = campSiteRepository.findByIdx(campSiteInfoIdx);
    return campSiteInfo;
  }
}
