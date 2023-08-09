package com.bitc.camp.service;

import com.bitc.camp.data.dto.CampMainRespDto;
import com.bitc.camp.data.entity.CampMainInfo;
import com.bitc.camp.data.entity.CampSiteInfo;
import com.bitc.camp.data.repository.CampMainRepository;
import com.bitc.camp.data.repository.CampSiteListRepository;
import com.bitc.camp.data.repository.CampSiteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

  private final CampMainRepository campMainRepository;
  private final CampSiteRepository campSiteRepository;
  private final CampSiteListRepository campSiteListRepository;

  @Override
  public CampMainRespDto getCampMainInfo(int campMainIdx) throws Exception {
    CampMainInfo campMainInfo = campMainRepository.findByIdx(campMainIdx);
    CampMainRespDto campMainRespDto = new CampMainRespDto(campMainInfo);
    return campMainRespDto;
  }

  @Override
  public CampSiteInfo getCampSiteInfo(int campSiteInfoIdx) throws Exception {
    CampSiteInfo campSiteInfo = campSiteRepository.findByIdx(campSiteInfoIdx);
    return campSiteInfo;
  }

  @Override
  public int getSiteCnt() throws Exception {
    String userReservationStart2 = "2023-08-10";
    String userReservationEnd2 = "2023-08-13";
    LocalDate userReservationStart = LocalDate.parse(userReservationStart2);
    LocalDate userReservationEnd = LocalDate.parse(userReservationEnd2);
    int siteCnt = campSiteListRepository.queryCountSiteList(userReservationStart, userReservationEnd);
    return siteCnt;
  }
}
