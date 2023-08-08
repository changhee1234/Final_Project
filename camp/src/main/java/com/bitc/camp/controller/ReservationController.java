package com.bitc.camp.controller;

import com.bitc.camp.data.entity.CampMainInfo;
import com.bitc.camp.data.entity.CampSiteInfo;
import com.bitc.camp.data.entity.CampSiteList;
import com.bitc.camp.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/reserve")
public class ReservationController {

  private final ReservationService reservationService;

  @GetMapping("/")
  public ModelAndView index() throws Exception {
    ModelAndView mv = new ModelAndView("index");
    CampMainInfo mainInfo = reservationService.getCampMainInfo(1);
    List<CampSiteInfo> siteInfoList = mainInfo.getCampSiteInfoList();

    mv.addObject("mainInfo", mainInfo);
    mv.addObject("siteInfoList", siteInfoList);
    return mv;
  }

  @GetMapping("/reserveStep/{campSiteInfoIdx}")
  public ModelAndView reserveStep(@PathVariable("campSiteInfoIdx") int idx) throws Exception {
    ModelAndView mv = new ModelAndView("reserveStep");
    CampSiteInfo campSiteInfo = reservationService.getCampSiteInfo(idx);
    List<CampSiteList> campSiteLists = campSiteInfo.getCampSiteLists();
    mv.addObject("campSiteInfo", campSiteInfo);
    mv.addObject("campSiteLists", campSiteLists);
    return mv;
  }

  // 예약 날짜 선택 후 예약 가능한 자리 조회
  @ResponseBody
  @GetMapping("/selectDate")
  public Object countSiteList() throws Exception{


    int siteCnt = reservationService.getSiteCnt();
    return siteCnt;
  }

}
