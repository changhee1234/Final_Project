package com.bitc.camp.controller;

import com.bitc.camp.data.dto.*;
import com.bitc.camp.service.ReservationService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reserve")
public class ReservationController {

  private final ReservationService reservationService;

  // 예약1 - 캠핑장 소개, 날짜, 구역 확인
  @GetMapping("/{campMainIdx}")
  public Map<String, Object> getCampMainInfo(@PathVariable("campMainIdx") int campMainIdx) throws Exception {
    Map<String, Object> result = new HashMap<>();
    CampMainRespDto mainInfo = reservationService.getCampMainInfo(campMainIdx);
    result.put("mainInfo", mainInfo);
    return result;
  }

  // 예약 날짜 선택 후 예약 가능한 자리 조회
  @PostMapping("/selectDate")
  public List<Integer> countSiteList(
      @RequestParam("startDate") String startDate,
      @RequestParam("endDate") String endDate,
      @RequestParam("siteInfoIdxs") List<Integer> siteInfoIdxs) throws Exception {
    List<Integer> siteCntList = new ArrayList<>();

    for (int siteInfoIdx : siteInfoIdxs) {
      int siteCnt = reservationService.getSiteCnt(siteInfoIdx, startDate, endDate);
      siteCntList.add(siteCnt);
    }
    return siteCntList;
  }

  @PostMapping("/availableSiteList")
  public List<CampSiteListRespDto> siteList(
      @RequestParam("startDate") String startDate,
      @RequestParam("endDate") String endDate,
      @RequestParam("siteInfoIdx") int siteInfoIdx) throws Exception {
    List<CampSiteListRespDto> siteList = new ArrayList<>();

    siteList = reservationService.getSiteList(siteInfoIdx, startDate, endDate);
    return siteList;
  }

  @GetMapping("/reserveStep/{campSiteInfoIdx}")
  public Map<String, Object> reserveStep(@PathVariable("campSiteInfoIdx") int idx) throws Exception {
    Map<String, Object> result = new HashMap<>();
    CampSiteInfoRespDto campSiteInfo = reservationService.getCampSiteInfo(idx);
    result.put("campSiteInfo", campSiteInfo);
    return result;
  }

  // 결제 전 예약db에 결제 상태:결제전
  @PostMapping("/insertReservation")
  public int insertReservation(@RequestBody final ReservationReqDto requestData) throws Exception {
    int idx = reservationService.save(requestData);
    return idx;
  }

  // 결제 완료 후 예약db 결제 상태 변경
  @PutMapping("/updateReservation/{reservationIdx}")
  public void updateReservation(@PathVariable("reservationIdx") int idx, @RequestBody ReservationReqDto params) throws Exception {
    reservationService.updateReservation(idx, params);
  }

  // 파트너 예약 리스트 조회
  @GetMapping("/reservationList/{partnerIdx}")
  public Map<String, Object> getReservation(@PathVariable("partnerIdx") int partnerIdx) throws Exception {

    Map<String, Object> result = new HashMap<>();

    List<ReservationRespDto> reservationList = reservationService.getReservationFromCampMainIdx(partnerIdx);
    result.put("result", reservationList);

    return result;
  }
}
