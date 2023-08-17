package com.bitc.camp.controller;

import com.bitc.camp.data.dto.CampMainRespDto;
import com.bitc.camp.data.dto.CampSiteInfoRespDto;
import com.bitc.camp.data.dto.CampSiteListRespDto;
import com.bitc.camp.data.dto.ReservationReqDto;
import com.bitc.camp.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/reserve")
public class ReservationController {

  private final ReservationService reservationService;

  // 예약1 - 캠핑장 소개, 날짜, 구역 확인
  @GetMapping("/{campMainIdx}")
  public Map<String, Object> getCampMainInfo(@PathVariable("campMainIdx") int campMainIdx) throws Exception {
    Map<String, Object> result = new HashMap<>();
    CampMainRespDto mainInfo = reservationService.getCampMainInfo(campMainIdx);
    // List<CampSiteInfoRespDto> siteInfoList = mainInfo.getSiteInfoLists();
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

  @PostMapping("/insertReservation")
  public void insertReservation(@RequestBody final ReservationReqDto requestData) throws Exception{
    reservationService.save(requestData);
  }


}
