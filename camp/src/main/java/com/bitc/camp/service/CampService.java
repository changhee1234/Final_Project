package com.bitc.camp.service;

import com.bitc.camp.data.dto.CampMainInfoDto;
import com.bitc.camp.data.dto.CampSiteInfoDto;
import com.bitc.camp.data.dto.ReviewBoardDto;
import com.bitc.camp.data.entity.CampMainInfo;
import com.bitc.camp.data.entity.CampSiteInfo;

import java.util.List;

public interface CampService {
    List<CampMainInfoDto> selectCampList() throws Exception;

    List<ReviewBoardDto> selectReviewList(CampMainInfo campMainInfo) throws Exception;

    CampMainInfo createCamp(CampMainInfoDto campMainInfoDto) throws Exception;

    List<CampSiteInfo> createCamp2(List<CampSiteInfoDto> campSiteInfoDtoList) throws Exception;

    CampMainInfoDto partnerSelectCampList(int campIdx) throws Exception;

    CampMainInfo updatePartnerCamp(int campIdx, CampMainInfoDto campMainInfoDto) throws Exception;
}
