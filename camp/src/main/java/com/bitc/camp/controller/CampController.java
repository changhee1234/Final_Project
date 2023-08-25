package com.bitc.camp.controller;

import com.bitc.camp.data.dto.CampMainInfoDto;
import com.bitc.camp.data.dto.CampSiteInfoDto;
import com.bitc.camp.data.dto.PartnerDto;
import com.bitc.camp.data.dto.ReviewBoardDto;
import com.bitc.camp.data.entity.CampMainInfo;
import com.bitc.camp.data.entity.CampSiteInfo;
import com.bitc.camp.data.entity.Partner;
import com.bitc.camp.service.CampService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin("http://localhost:3000")
//@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/camp")
public class CampController {

    private final CampService campService;
    public CampController(CampService campService) {
        this.campService = campService;
    }


    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public Object selectBoardList() throws Exception {
        List<CampMainInfoDto> campMainInfoDtoList = campService.selectCampList();

        return campMainInfoDtoList;
    }


    @RequestMapping(value = "/review/{campMainInfo}", method = RequestMethod.GET)
    public Object selectReview(@PathVariable CampMainInfo campMainInfo) throws Exception {
        List<ReviewBoardDto> reviewBoardDtoList = campService.selectReviewList(campMainInfo);

        return reviewBoardDtoList;
    }

//    @RequestMapping(value = "/Register", method = RequestMethod.POST)
//    public Object campRegister(@RequestBody CampMainInfoDto campMainInfoDto) throws Exception {
//        CampMainInfo createdCamp = campService.createCamp(campMainInfoDto);
//
//        return createdCamp;
//    }
//
//    @RequestMapping(value = "/Register2", method = RequestMethod.POST)
//    public Object campRegister2(@RequestBody List<CampSiteInfoDto> campSiteInfoDtoList) throws Exception{
//        List<CampSiteInfo> campSiteInfo = campService.createCamp2(campSiteInfoDtoList);
//
//        return campSiteInfo;
//    }
@PostMapping("/register")
public ResponseEntity<CampMainInfo> registerCamp(@RequestBody CampMainInfoDto campMainInfoDto) {
    try {
        CampMainInfo createdCamp = campService.createCamp(campMainInfoDto);
        return ResponseEntity.ok(createdCamp);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}

    @PostMapping("/register2")
    public ResponseEntity<List<CampSiteInfo>> registerCampSiteInfo(@RequestBody List<CampSiteInfoDto> campSiteInfoDtoList) {
        try {
            List<CampSiteInfo> createdCampSiteInfo = campService.createCamp2(campSiteInfoDtoList);
            return ResponseEntity.ok(createdCampSiteInfo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @RequestMapping(value = "/partnerCampDetail/{campIdx}", method = RequestMethod.GET)
    public Object partnerCampDetails(@PathVariable int campIdx) throws Exception {
        CampMainInfoDto camp = campService.partnerSelectCampList(campIdx);

        return camp;
    }

    @RequestMapping(value = "/partnerCampDetail/{campIdx}", method = RequestMethod.PUT)

    public Object updatePartnerCamp(@PathVariable int campIdx, @RequestBody(required = false) CampMainInfoDto campMainInfoDto) throws Exception {
        campService.updatePartnerCamp(campIdx, campMainInfoDto);
        return "성공";
    }

    @RequestMapping(value = "/partnerCampSiteDetail/{intCampIdx}", method = RequestMethod.GET)
    public Object partnerCampSiteDetail(@PathVariable int intCampIdx) throws Exception {
        List<CampSiteInfoDto> campSiteInfoDtoList = campService.partnerSelectCampSiteList(intCampIdx);

        return campSiteInfoDtoList;
    }

    @RequestMapping(value = "/partnerCampSiteDetail/{campInfoIdx}", method = RequestMethod.PUT)
    public Object updateCampSiteDetail(@PathVariable int campInfoIdx, @RequestBody CampSiteInfoDto campSiteInfoDto) throws Exception {
        campService.updatePartnerSiteInfo(campInfoIdx, campSiteInfoDto);

        return "성공";
    }

    @RequestMapping(value = "/partnerCampDetail/{campIdx}", method = RequestMethod.DELETE)
    public Object deletePartnerCamp(@PathVariable int campIdx) throws Exception {
        campService.deletePartnerCamp(campIdx);

        return "성공";
    }

    @RequestMapping(value = "/partnerCampSiteDetail/{campInfoIdx}", method = RequestMethod.DELETE)
    public Object deletePartnerCampList(@PathVariable int campInfoIdx) throws Exception {
        campService.deletePartnerSite(campInfoIdx);

        return "성공";
    }

    @RequestMapping(value = "/searchPartner/{memberIdx}", method = RequestMethod.GET)
    public Object searchPartner(@PathVariable int memberIdx) throws Exception {
        PartnerDto partnerDto = campService.searchPartner(memberIdx);

        return partnerDto;
    }
}
