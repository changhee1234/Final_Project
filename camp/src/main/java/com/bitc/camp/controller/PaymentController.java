package com.bitc.camp.controller;

import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.request.PrepareData;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import com.siot.IamportRestClient.response.Prepare;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000"})
public class PaymentController {

  private final IamportClient iamportClient;

  private PaymentController() {
    this.iamportClient = new IamportClient("1245320317184060", "ffNXUIJwkTtkwPZm9LzqPVQyBqg86lDPp9bFuxGfKeY5ZZvjndYJzW2s9rDD6IGtJifXtznpPn2755GL");
  }

  @PostMapping("/payments/{imp_uid}")
  public IamportResponse<Payment> paymentByImpUid(@PathVariable("imp_uid") String imp_uid) throws IamportResponseException, IOException {
    return iamportClient.paymentByImpUid(imp_uid);
  }

}
