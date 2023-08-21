package com.bitc.camp.controller;

import com.bitc.camp.data.dto.CampMainInfoDto;
import com.bitc.camp.data.dto.CampSiteInfoDto;
import com.bitc.camp.data.dto.ReviewBoardDto;
import com.bitc.camp.data.entity.CampMainInfo;
import com.bitc.camp.data.entity.CampSiteInfo;
import com.bitc.camp.service.CampService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
@RestController
public class CampController {

    private final CampService campService;

    @RequestMapping(value = "/camp", method = RequestMethod.GET)
    public Object selectBoardList() throws Exception {
        List<CampMainInfoDto> campMainInfoDtoList = campService.selectCampList();

        return campMainInfoDtoList;
    }


    @RequestMapping(value = "/review/{campMainInfo}", method = RequestMethod.GET)
    public Object selectReview(@PathVariable CampMainInfo campMainInfo) throws Exception {
        List<ReviewBoardDto> reviewBoardDtoList = campService.selectReviewList(campMainInfo);

        return reviewBoardDtoList;
    }

    @RequestMapping(value = "/campRegister", method = RequestMethod.POST)
    public Object campRegister(@RequestBody CampMainInfoDto campMainInfoDto) throws Exception {
        CampMainInfo createdCamp = campService.createCamp(campMainInfoDto);

        return createdCamp;
    }

    @RequestMapping(value = "/campRegister2", method = RequestMethod.POST)
    public Object campRegister2(@RequestBody List<CampSiteInfoDto> campSiteInfoDtoList) throws Exception{
        List<CampSiteInfo> campSiteInfo = campService.createCamp2(campSiteInfoDtoList);

        return campSiteInfo;
    }

    @RequestMapping(value = "/partnerCampDetail/{campIdx}", method = RequestMethod.GET)
    public Object partnerCampDetails(@PathVariable int campIdx) throws Exception {
        CampMainInfoDto camp = campService.partnerSelectCampList(campIdx);

        return camp;
    }

    @RequestMapping(value = "/partnerCampDetail/{campIdx}", method = RequestMethod.PUT)
    public Object updatePartnerCamp(@PathVariable int campIdx, @RequestBody CampMainInfoDto campMainInfoDto) throws Exception {
        CampMainInfo updatedCamp = campService.updatePartnerCamp(campIdx, campMainInfoDto);

        return updatedCamp;
    }
}
