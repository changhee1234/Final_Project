package com.bitc.camp.service;

import com.bitc.camp.data.dto.CampMainInfoDto;
import com.bitc.camp.data.dto.CampSiteInfoDto;
import com.bitc.camp.data.dto.CampSiteListDto;
import com.bitc.camp.data.dto.ReviewBoardDto;
import com.bitc.camp.data.entity.*;
import com.bitc.camp.data.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CampServiceImpl implements CampService {

    private final CampMainInfoRepository campMainInfoRepository;
    private final CampImgRepository campImgRepository;
    private final CampSiteInfoRepository campSiteInfoRepository;
    private final CampSiteListRepository campSiteListRepository;
    private final ReviewRepository reviewRepository;
    private final MemberRepository memberRepository;
    private final PartnerRepository partnerRepository;

    private String getNickName(int memberIdx) {
        Member member = memberRepository.findNickNameByMemberIdx(memberIdx).orElse(null);
        if (member != null) {
            return member.getNickName();
        }

        return null;
    }

    @Override
    public List<CampMainInfoDto> selectCampList() throws Exception {
        List<CampMainInfo> campList = campMainInfoRepository.findAllByOrderByIdxDesc();

        List<CampMainInfoDto> campMainInfoDtoList = new ArrayList<>();

        for (CampMainInfo camp : campList) {
            Partner partner = camp.getPartner();
            CampMainInfoDto dto = CampMainInfoDto.builder()
                    .idx(camp.getIdx())
                    .campName(camp.getCampName())
                    .campIntro(camp.getCampIntro())
                    .campDt(camp.getCampDt())
                    .kidszoneYn(camp.getKidszoneYn())
                    .campHpLink(camp.getCampHpLink())
                    .campPh(camp.getCampPh())
                    .campAddress(camp.getCampAddress())
                    .campDeletedYn(camp.getCampDeletedYn())
                    .partnerIdx(partner != null ? partner.getIdx() : null)
                    .partnerName(partner != null ? partner.getPartnerName() : null)
                    .memberIdx(partner != null && partner.getMember() != null ? partner.getMember().getMemberIdx() : null)
                    .build();
            campMainInfoDtoList.add(dto);
        }

        return campMainInfoDtoList;
    }

    @Override
    public List<ReviewBoardDto> selectReviewList(CampMainInfo campMainInfo) throws Exception {
        List<ReviewBoard> reviewList = reviewRepository.findAllByCampMainInfoOrderByIdxDesc(campMainInfo);

        List<ReviewBoardDto> reviewBoardDtoList = new ArrayList<>();

        for (ReviewBoard review : reviewList) {
            ReviewBoardDto dto = ReviewBoardDto.builder()
                    .idx(review.getIdx())
                    .reContent(review.getReContent())
                    .build();

            Member member = review.getMember(); // Assuming member is a field in ReviewBoard entity

            if (member != null) {
                String nickName = getNickName(member.getMemberIdx());
                dto.setNickName(nickName);
            }

            reviewBoardDtoList.add(dto);
        }
        return reviewBoardDtoList;
    }

    @Override
    public CampMainInfo createCamp(CampMainInfoDto campMainInfoDto) throws Exception {
        CampMainInfo campMainInfo = new CampMainInfo();

        campMainInfo.setCampName(campMainInfoDto.getCampName());
        campMainInfo.setCampIntro(campMainInfoDto.getCampIntro());
        campMainInfo.setCampDt(campMainInfoDto.getCampDt());
        campMainInfo.setKidszoneYn(campMainInfoDto.getKidszoneYn());
        campMainInfo.setCampHpLink(campMainInfoDto.getCampHpLink());
        campMainInfo.setCampPh(campMainInfoDto.getCampPh());
        campMainInfo.setCampAddress(campMainInfoDto.getCampAddress());
        campMainInfo.setPartner(campMainInfoDto.getPartner());

        return campMainInfoRepository.save(campMainInfo);
    }


    //    캠프사이트인포 입력
    @Override
    public List<CampSiteInfo> createCamp2(List<CampSiteInfoDto> campSiteInfoDtoList) throws Exception {
        List<CampSiteInfo> campSiteInfos = new ArrayList<>();

        for (CampSiteInfoDto dto : campSiteInfoDtoList) {
            CampSiteInfo campSiteInfo = new CampSiteInfo();

            campSiteInfo.setCampMainInfo(dto.getCampMainInfo());
            campSiteInfo.setAreaName(dto.getAreaName());
            campSiteInfo.setSitePrice(dto.getSitePrice());
            campSiteInfo.setNotice(dto.getNotice());
            campSiteInfo.setCampStyle(dto.getCampStyle());
            campSiteInfo.setPeopleMin(dto.getPeopleMin());
            campSiteInfo.setPeopleMax(dto.getPeopleMax());
            campSiteInfo.setAddPrice(dto.getAddPrice());
            campSiteInfo.setCampReservePeriod(dto.getCampReservePeriod());
            campSiteInfo.setParkPrice(dto.getParkPrice());
            campSiteInfo.setElePrice(dto.getElePrice());
            campSiteInfo.setAreaSiteCnt(dto.getAreaSiteCnt());

            campSiteInfos.add(campSiteInfo);
        }

        List<CampSiteInfo> savedCampSiteInfos = campSiteInfoRepository.saveAll(campSiteInfos);

//        camp_site_list 자동저장
        for (CampSiteInfo savedCampSiteInfo : savedCampSiteInfos) {
            for (int i = 1; i <= savedCampSiteInfo.getAreaSiteCnt(); i++) {
                CampSiteList campSiteList = new CampSiteList();
                campSiteList.setCampSiteInfo(savedCampSiteInfo);
                campSiteList.setCampSiteName(savedCampSiteInfo.getAreaName() + "_" + i);
                campSiteListRepository.save(campSiteList);
            }
        }

        return savedCampSiteInfos;
    }

    @Override
    public CampMainInfoDto partnerSelectCampList(int campIdx) throws Exception {
        CampMainInfo camp = campMainInfoRepository.findById(campIdx).orElse(null);
        Partner partner = camp.getPartner();

        CampMainInfoDto campMainInfoDto = CampMainInfoDto.builder()
                .idx(camp.getIdx())
                .campName(camp.getCampName())
                .campIntro(camp.getCampIntro())
                .campDt(camp.getCampDt())
                .kidszoneYn(camp.getKidszoneYn())
                .campHpLink(camp.getCampHpLink())
                .campPh(camp.getCampPh())
                .campDeletedYn(camp.getCampDeletedYn())
                .campAddress(camp.getCampAddress())
                .partnerIdx(partner != null ? partner.getIdx() : null)
                .partnerName(partner != null ? partner.getPartnerName() : null)
                .memberIdx(partner != null && partner.getMember() != null ? partner.getMember().getMemberIdx() : null)
                .build();
        return campMainInfoDto;
    }

    @Override
    public CampMainInfo updatePartnerCamp(int campIdx, CampMainInfoDto campMainInfoDto) throws Exception {
        Optional<CampMainInfo> existingCampOptional = campMainInfoRepository.findById(campIdx);

        if (existingCampOptional.isEmpty()) {
            throw new ChangeSetPersister.NotFoundException();
        }

        CampMainInfo existingCamp = existingCampOptional.get();

        // 업데이트할 필드들을 campMainInfoDto로부터 가져와서 엔티티에 설정합니다.
        existingCamp.setCampName(campMainInfoDto.getCampName());
        existingCamp.setCampIntro(campMainInfoDto.getCampIntro());
        existingCamp.setCampDt(campMainInfoDto.getCampDt());
        existingCamp.setKidszoneYn(campMainInfoDto.getKidszoneYn());
        existingCamp.setCampHpLink(campMainInfoDto.getCampHpLink());
        existingCamp.setCampPh(campMainInfoDto.getCampPh());
        existingCamp.setCampAddress(campMainInfoDto.getCampAddress());
        existingCamp.setPartner(campMainInfoDto.getPartner());

        // 엔티티 업데이트 후 저장
        return campMainInfoRepository.save(existingCamp);
    }

    @Override
    public List<CampSiteInfoDto> partnerSelectCampSiteList(int intCampIdx) throws Exception {
        Optional<CampMainInfo> campMainInfo = campMainInfoRepository.findById(intCampIdx);

        List<CampSiteInfo> campSiteInfoList = campSiteInfoRepository.findAllByCampMainInfoOrderByIdxDesc(campMainInfo);

        List<CampSiteInfoDto> campSiteInfoDtoList = new ArrayList<>();

        for (CampSiteInfo campSiteInfo : campSiteInfoList) {
            CampSiteInfoDto dto = CampSiteInfoDto.builder()
                    .idx(campSiteInfo.getIdx())
                    .areaName(campSiteInfo.getAreaName())
                    .sitePrice(campSiteInfo.getSitePrice())
                    .notice(campSiteInfo.getNotice())
                    .campStyle(campSiteInfo.getCampStyle())
                    .peopleMin(campSiteInfo.getPeopleMin())
                    .siteDeletedYn(campSiteInfo.getSiteDeletedYn())
                    .peopleMax(campSiteInfo.getPeopleMax())
                    .addPrice(campSiteInfo.getAddPrice())
                    .campReservePeriod(campSiteInfo.getCampReservePeriod())
                    .parkPrice(campSiteInfo.getParkPrice())
                    .elePrice(campSiteInfo.getElePrice())
                    .areaSiteCnt(campSiteInfo.getAreaSiteCnt())
                    .build();
            campSiteInfoDtoList.add(dto);
        }

        return campSiteInfoDtoList;
    }

    @Override
    public CampSiteInfo updatePartnerSiteInfo(int campInfoIdx, CampSiteInfoDto campSiteInfoDto) throws Exception {
        Optional<CampSiteInfo> existingCampSiteOptional = campSiteInfoRepository.findById(campInfoIdx);

        if (existingCampSiteOptional.isEmpty()) {
            throw new ChangeSetPersister.NotFoundException();
        }

        CampSiteInfo existingCampSite = existingCampSiteOptional.get();
//    existingCampSite.setCampMainInfo(campSiteInfoDto.getCampMainInfo());
        existingCampSite.setAreaName(campSiteInfoDto.getAreaName());
        existingCampSite.setSitePrice(campSiteInfoDto.getSitePrice());
        existingCampSite.setNotice(campSiteInfoDto.getNotice());
        existingCampSite.setCampStyle(campSiteInfoDto.getCampStyle());
        existingCampSite.setPeopleMin(campSiteInfoDto.getPeopleMin());
        existingCampSite.setPeopleMax(campSiteInfoDto.getPeopleMax());
        existingCampSite.setAddPrice(campSiteInfoDto.getAddPrice());
        existingCampSite.setCampReservePeriod(campSiteInfoDto.getCampReservePeriod());
        existingCampSite.setParkPrice(campSiteInfoDto.getParkPrice());
        existingCampSite.setElePrice(campSiteInfoDto.getElePrice());
        existingCampSite.setAreaSiteCnt(campSiteInfoDto.getAreaSiteCnt());

        CampSiteInfo savedCampSiteInfo = campSiteInfoRepository.save(existingCampSite);

        // 기존에 존재하는 CampSiteList 찾기
        List<CampSiteList> existingCampSiteLists = campSiteListRepository.findByCampSiteInfo(existingCampSite);

        for (int i = 0; i < savedCampSiteInfo.getAreaSiteCnt(); i++) {
            // 캠프 사이트 이름 생성
            String campSiteName = savedCampSiteInfo.getAreaName() + "_" + (i + 1);

            // 기존 로우 수정
            if (i < existingCampSiteLists.size()) {
                CampSiteList existingCampSiteList = existingCampSiteLists.get(i);
                existingCampSiteList.setCampSiteName(campSiteName);
                campSiteListRepository.save(existingCampSiteList);
            } else {
                // 새로운 로우 생성
                CampSiteList campSiteList = new CampSiteList();
                campSiteList.setCampSiteInfo(savedCampSiteInfo);
                campSiteList.setCampSiteName(campSiteName);
                campSiteListRepository.save(campSiteList);
            }
        }

        return savedCampSiteInfo;
    }

    @Override
    public CampMainInfo deletePartnerCamp(int campIdx) throws Exception {
        Optional<CampMainInfo> campMainInfoOptional = campMainInfoRepository.findById(campIdx);

        CampMainInfo campMainInfo = campMainInfoOptional.get();
        campMainInfo.setCampDeletedYn("Y");
        return campMainInfoRepository.save(campMainInfo);
    }

    @Override
    public CampSiteInfo deletePartnerSite(int campInfoIdx) throws Exception {
        Optional<CampSiteInfo> campSiteInfoOptional = campSiteInfoRepository.findById(campInfoIdx);

        CampSiteInfo campSiteInfo = campSiteInfoOptional.get();
        campSiteInfo.setSiteDeletedYn("Y");

        return campSiteInfoRepository.save(campSiteInfo);
    }


}
