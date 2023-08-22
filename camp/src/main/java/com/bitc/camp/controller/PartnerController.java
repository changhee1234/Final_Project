package com.bitc.camp.controller;

import com.bitc.camp.dto.AddPartnerReq;
import com.bitc.camp.service.PartnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/{memberIdx}/approve")
    public ResponseEntity<String> approvePartner(@PathVariable int memberIdx) {
        try {
            partnerService.approvePartner(memberIdx);
            return ResponseEntity.ok("파트너 승인이 완료되었습니다.");
        } catch (Exception e) {
            String errorMessage = "파트너 승인 오류가 발생했습니다. 오류 내용: " + e.getMessage();
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }
}
