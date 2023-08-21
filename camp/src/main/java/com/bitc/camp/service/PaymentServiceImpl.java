package com.bitc.camp.service;

import com.bitc.camp.data.dto.PaymentReqDto;
import com.bitc.camp.data.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService{

  private final PaymentRepository paymentRepository;

  @Override
  public void save(PaymentReqDto payReqData) throws Exception {
    paymentRepository.save(payReqData.toEntity());
  }
}
