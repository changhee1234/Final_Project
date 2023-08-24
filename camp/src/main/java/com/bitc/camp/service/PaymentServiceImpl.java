package com.bitc.camp.service;

import com.bitc.camp.data.dto.PaymentReqDto;
import com.bitc.camp.data.dto.PaymentRespDto;
import com.bitc.camp.data.entity.Payment;
import com.bitc.camp.data.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService{

  private final PaymentRepository paymentRepository;

  @Override
  public void save(PaymentReqDto payReqData) throws Exception {
    paymentRepository.save(payReqData.toEntity());
  }

  @Override
  public PaymentRespDto getPaymentInfo(int idx) throws Exception {
    Payment payment = paymentRepository.findByReservationIdx(idx);
    return new PaymentRespDto(payment);
  }

  //예약취소-결제취소 시 결제 db 수정
  @Transactional
  @Override
  public void cancelPayment(String impUid, PaymentReqDto params) throws Exception {
    Payment entity = paymentRepository.findByImpUid(impUid);
    entity.cancelUpdate(params.getPayStatus(), params.getCancelAmount(), params.getCancelDate());
  }
}