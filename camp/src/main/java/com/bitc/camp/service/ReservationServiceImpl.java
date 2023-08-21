package com.bitc.camp.service;

import com.bitc.camp.data.dto.CampMainRespDto;
import com.bitc.camp.data.dto.CampSiteInfoRespDto;
import com.bitc.camp.data.dto.CampSiteListRespDto;
import com.bitc.camp.data.dto.ReservationReqDto;
import com.bitc.camp.data.entity.CampMainInfo;
import com.bitc.camp.data.entity.CampSiteInfo;
import com.bitc.camp.data.entity.CampSiteList;
import com.bitc.camp.data.entity.Reservation;
import com.bitc.camp.data.repository.CampMainRepository;
import com.bitc.camp.data.repository.CampSiteListRepository;
import com.bitc.camp.data.repository.CampSiteRepository;
import com.bitc.camp.data.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

  private final CampMainRepository campMainRepository;
  private final CampSiteRepository campSiteRepository;
  private final CampSiteListRepository campSiteListRepository;
  private final ReservationRepository reservationRepository;

  @Override
  public CampMainRespDto getCampMainInfo(int campMainIdx) throws Exception {
    CampMainInfo campMainInfo = campMainRepository.findByIdx(campMainIdx);
    return new CampMainRespDto(campMainInfo);
  }

  @Override
  public CampSiteInfoRespDto getCampSiteInfo(int campSiteInfoIdx) throws Exception {
    CampSiteInfo campSiteInfo = campSiteRepository.findByIdx(campSiteInfoIdx);
    return new CampSiteInfoRespDto(campSiteInfo);
  }

  @Override
  public int getSiteCnt(int siteInfoIdx, String startDate, String endDate) throws Exception {
    LocalDate userReservationStart = LocalDate.parse(startDate);
    LocalDate userReservationEnd = LocalDate.parse(endDate);
    return campSiteListRepository.queryCountSiteCnt(siteInfoIdx, userReservationStart, userReservationEnd);
  }

  @Override
  public List<CampSiteListRespDto> getSiteList(int siteInfoIdx, String startDate, String endDate) throws Exception {
    LocalDate userReservationStart = LocalDate.parse(startDate);
    LocalDate userReservationEnd = LocalDate.parse(endDate);

    List<CampSiteListRespDto> campSiteLists = new ArrayList<>();
    List<CampSiteList> campSiteList = campSiteListRepository.queryCountSiteList(siteInfoIdx, userReservationStart, userReservationEnd);
    for (CampSiteList item : campSiteList) {
      CampSiteListRespDto dto = new CampSiteListRespDto(item);
      campSiteLists.add(dto);
    }
    return campSiteLists;
  }

  @Transactional
  @Override
  public int save(ReservationReqDto requestData) throws Exception {
    Reservation entity = reservationRepository.save(requestData.toEntity());
    return entity.getIdx();
  }

  // 결제 성공시 예약 상태 결제 성공으로 수정
  @Transactional
  @Override
  public void updateReservation(int idx, ReservationReqDto params) throws Exception {
    Reservation entity = reservationRepository.findById(idx).orElseThrow();
    entity.update(params.getPayStatus(), params.getImpUid(), params.getMerchantUid());
  }
}
