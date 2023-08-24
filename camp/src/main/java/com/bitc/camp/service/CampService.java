package com.bitc.camp.service;

import com.bitc.camp.data.dto.*;
import com.bitc.camp.data.entity.CampMainInfo;
import com.bitc.camp.data.entity.CampSiteInfo;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CampService {
    List<CampMainInfoDto> selectCampList() throws Exception;

    List<ReviewBoardDto> selectReviewList(CampMainInfo campMainInfo) throws Exception;

    CampMainInfo createCamp(CampMainInfoDto campMainInfoDto) throws Exception;

    List<CampSiteInfo> createCamp2(List<CampSiteInfoDto> campSiteInfoDtoList) throws Exception;

    CampMainInfoDto partnerSelectCampList(int campIdx) throws Exception;

    CampMainInfo updatePartnerCamp(int campIdx, CampMainInfoDto campMainInfoDto) throws Exception;

    List<CampSiteInfoDto> partnerSelectCampSiteList(int intCampIdx) throws Exception;

    CampSiteInfo updatePartnerSiteInfo(int campInfoIdx, CampSiteInfoDto campSiteInfoDto) throws Exception;

    CampMainInfo deletePartnerCamp(int campIdx) throws Exception;

    CampSiteInfo deletePartnerSite(int campInfoIdx) throws Exception;

    PartnerDto searchPartner(int memberIdx) throws Exception;
}
