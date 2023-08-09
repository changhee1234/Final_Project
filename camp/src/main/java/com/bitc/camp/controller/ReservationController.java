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
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/reserve")
public class ReservationController {

  private final ReservationService reservationService;

//  @GetMapping("/")
//  public ModelAndView getCampMainInfo() throws Exception {
//    ModelAndView mv = new ModelAndView("index");
//
//    CampMainRespDto mainInfo = reservationService.getCampMainInfo(1);
//    List<CampSiteInfoRespDto> siteInfoList = mainInfo.getSiteInfoLists();
//
//    mv.addObject("mainInfo", mainInfo);
//    mv.addObject("siteInfoList", siteInfoList);
//    return mv;
//  }

  @GetMapping("/")
  public Object getCampMainInfo() throws Exception{
    Map<String, Object> result = new HashMap<>();
    CampMainRespDto mainInfo = reservationService.getCampMainInfo(1);
    List<CampSiteInfoRespDto> siteInfoList = mainInfo.getSiteInfoLists();
    result.put("mainInfo", mainInfo);
    return result;
  }

//  @GetMapping("/reserveStep/{campSiteInfoIdx}")
//  public ModelAndView reserveStep(@PathVariable("campSiteInfoIdx") int idx) throws Exception {
//    ModelAndView mv = new ModelAndView("reserveStep");
//
//    CampSiteInfoRespDto campSiteInfo = reservationService.getCampSiteInfo(idx);
//    List<CampSiteListRespDto> campSiteLists = campSiteInfo.getCampSiteLists();
//    mv.addObject("campSiteInfo", campSiteInfo);
//    mv.addObject("campSiteLists", campSiteLists);
//    return mv;
//  }
//
//  // 예약 날짜 선택 후 예약 가능한 자리 조회
//  @ResponseBody
//  @GetMapping("/selectDate")
//  public Object countSiteList() throws Exception{
//
//
//    int siteCnt = reservationService.getSiteCnt();
//    return siteCnt;
//  }

}
