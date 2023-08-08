package com.bitc.camp.service;

import com.bitc.camp.data.dto.CampMainInfoDto;

import java.util.List;

public interface CampService {
    List<CampMainInfoDto> selectCampList() throws Exception;
}
