package com.bitc.camp.service;

import com.bitc.camp.data.entity.CampMainInfo;
import com.bitc.camp.data.entity.CampSiteInfo;
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

  // 캠핑장 사이트 정보 리스트
  @Override
  public List<CampSiteInfo> getCampSiteInfo(int campMainIdx) throws Exception {
    List<CampSiteInfo> campSiteInfoList = campSiteRepository.findAllByCampMainInfo_Idx(campMainIdx);
    return campSiteInfoList;
  }
}
