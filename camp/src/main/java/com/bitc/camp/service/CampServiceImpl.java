package com.bitc.camp.service;

import com.bitc.camp.data.entity.CampMainInfo;
import com.bitc.camp.data.dto.CampMainInfoDto;
import com.bitc.camp.data.repository.CampMainRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CampServiceImpl implements CampService{

    private final CampMainRepository campMainRepository;

    @Override
    public List<CampMainInfoDto> selectCampList() throws Exception{
        List<CampMainInfo> campList = campMainRepository.findAllByOrderByIdxDesc();

        List<CampMainInfoDto> campMainInfoDtoList = new ArrayList<>();

        for (CampMainInfo camp : campList) {
            CampMainInfoDto dto = CampMainInfoDto.builder()
                    .idx(camp.getIdx())
                    .campName(camp.getCampName())
                    .campIntro(camp.getCampIntro())
                    .campPh(camp.getCampPh())
                    .campAddress(camp.getCampAddress())
                    .build();
            campMainInfoDtoList.add(dto);
        }

        return campMainInfoDtoList;
    }
}
