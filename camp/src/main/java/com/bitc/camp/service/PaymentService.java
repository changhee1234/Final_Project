package com.bitc.camp.service;

import com.bitc.camp.data.dto.PaymentReqDto;
import com.bitc.camp.data.dto.PaymentRespDto;

public interface PaymentService {

  void save(PaymentReqDto payReqData) throws Exception;

  PaymentRespDto getPaymentInfo(int idx) throws Exception;

  void cancelPayment(String impUid, PaymentReqDto params) throws Exception;
}
