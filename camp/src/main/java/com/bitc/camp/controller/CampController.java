package com.bitc.camp.controller;

import com.bitc.camp.data.dto.CampMainInfoDto;
import com.bitc.camp.service.CampService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
@RestController
public class CampController {

    private final CampService campService;

    @GetMapping(value = "/camp")
//    public ResponseEntity<List<CampMainInfo>> selectBoardList() throws Exception {
//        List<CampMainInfo> campList = campService.selectCampList();
//
//        return ResponseEntity.ok(campList);
//    }
    public Object selectBoardList() throws Exception {
        List<CampMainInfoDto> campMainInfoDtoList = campService.selectCampList();

        return campMainInfoDtoList;
    }


}
