package com.bitc.camp.controller;

import com.bitc.camp.dto.AddPartnerReq;
import com.bitc.camp.service.PartnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PartnerController {

    private final PartnerService partnerService;

    @Autowired
    public PartnerController(PartnerService partnerService) {
        this.partnerService = partnerService;
    }

    @PostMapping("/addPartner")
    public ResponseEntity<String> createPartner(@RequestBody AddPartnerReq partnerReq) {
        try {
            partnerService.createPartner(partnerReq);
            return ResponseEntity.ok("파트너 신청이 완료되었습니다.");
        } catch (Exception e) {
            String errorMessage = "파트너 신청 오류가 발생했습니다. 오류 내용: " + e.getMessage();
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }

    @GetMapping("/partnerList")
    public ResponseEntity<List<AddPartnerReq>> getPartnerList() {
        List<AddPartnerReq> partnerList = partnerService.getPartnerList();
        return ResponseEntity.ok(partnerList);
    }

    @PostMapping("/updatePartnerAccess")
    public ResponseEntity<String> updatePartnerAccess(@RequestParam int memberIdx, @RequestParam String newValue) {
        try {
            partnerService.updatePartnerAccess(memberIdx, newValue);
            return ResponseEntity.ok("파트너 접근 권한이 업데이트되었습니다.");
        } catch (Exception e) {
            String errorMessage = "파트너 접근 권한 업데이트 중 오류가 발생했습니다. 오류 내용: " + e.getMessage();
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }
}
