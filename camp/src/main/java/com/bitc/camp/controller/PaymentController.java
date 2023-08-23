package com.bitc.camp.controller;

import com.bitc.camp.data.dto.PaymentReqDto;
import com.bitc.camp.data.dto.PaymentRespDto;
import com.bitc.camp.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class PaymentController {

  private final PaymentService paymentService;

  @PostMapping("/payments/success")
  public void savePayment(@RequestBody final PaymentReqDto payReqData) throws Exception {
    paymentService.save(payReqData);
  }

  @GetMapping("/payments/{idx}")
  public PaymentRespDto getPaymentInfo(@PathVariable("idx")String idx)throws Exception{
    return paymentService.getPaymentInfo(idx);
  }
}
