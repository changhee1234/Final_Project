package com.bitc.camp.service;

import com.bitc.camp.data.dto.PaymentReqDto;

public interface PaymentService {

  void save(PaymentReqDto payReqData) throws Exception;
}
