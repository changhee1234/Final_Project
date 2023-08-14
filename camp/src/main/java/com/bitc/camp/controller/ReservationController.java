package com.bitc.camp.controller;

import com.bitc.camp.data.dto.CampMainRespDto;
import com.bitc.camp.data.dto.CampSiteInfoRespDto;
import com.bitc.camp.data.dto.CampSiteListRespDto;
import com.bitc.camp.data.entity.CampSiteInfo;
import com.bitc.camp.data.entity.CampSiteList;
import com.bitc.camp.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/reserve")
public class ReservationController {

  private final ReservationService reservationService;

  // 예약1 - 캠핑장 소개, 날짜, 구역 확인
  @GetMapping("/{campMainIdx}")
  public Object getCampMainInfo(@PathVariable("campMainIdx") int campMainIdx) throws Exception {
    Map<String, Object> result = new HashMap<>();
    CampMainRespDto mainInfo = reservationService.getCampMainInfo(campMainIdx);
    // List<CampSiteInfoRespDto> siteInfoList = mainInfo.getSiteInfoLists();
    result.put("mainInfo", mainInfo);
    return result;
  }

  // 예약 날짜 선택 후 예약 가능한 자리 조회
  @PostMapping("/selectDate")
  public Object countSiteList(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate, @RequestParam("siteInfoIdxs") List<Integer> siteInfoIdxs) throws Exception {
    List<Integer> siteCntList = new ArrayList<>();

    for (int siteInfoIdx : siteInfoIdxs) {
      int siteCnt = reservationService.getSiteCnt(siteInfoIdx, startDate, endDate);
      siteCntList.add(siteCnt);
    }
    return siteCntList;
  }

  @GetMapping("/reserveStep/{campSiteInfoIdx}")
  public Object reserveStep(@PathVariable("campSiteInfoIdx") int idx) throws Exception {
    Map<String, Object> result = new HashMap<>();
    CampSiteInfoRespDto campSiteInfo = reservationService.getCampSiteInfo(idx);
    // List<CampSiteListRespDto> campSiteLists = campSiteInfo.getCampSiteLists();
    result.put("campSiteInfo", campSiteInfo);
    return result;
  }


}
