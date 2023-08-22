package com.bitc.camp.controller;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;


@RestController
public class SMSController {

    final DefaultMessageService messageService;

    public SMSController() {
        // 반드시 계정 내 등록된 유효한 API 키, API Secret Key를 입력해주셔야 합니다!
        this.messageService = NurigoApp.INSTANCE.initialize("NCSEVJAO46WNYMXV", "9BVTDGQKOSUXCELMQHIOZK76VVLMHCNL", "https://api.coolsms.co.kr");
    }

    private String generateRandomCode(int length) {
        Random random = new Random();
        StringBuilder code = new StringBuilder();

        for (int i = 0; i < length; i++) {
            code.append(random.nextInt(10)); // 0부터 9까지 랜덤 숫자 생성
        }

        return code.toString();
    }
    /**
     * 단일 메시지 발송 예제
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/sms")
    public ResponseEntity<String> sendOne(@RequestParam String phone) {
        Message message = new Message();
        // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
        message.setFrom("01025455373");
        message.setTo(phone);

        // 랜덤한 6자리 숫자 생성
        String verificationCode = generateRandomCode(6);
        message.setText("[캠핑유람] 인증번호는 : " + verificationCode + " 입니다.");

        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
        System.out.println(response);

        return ResponseEntity.ok(verificationCode);
    }



}
