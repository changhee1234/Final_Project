package com.bitc.camp.data.dto;

import com.bitc.camp.data.entity.Payment;
import jakarta.persistence.Column;
import lombok.Getter;

@Getter
public class PaymentRespDto {
  private int idx;
  private String impUid;
  private String merchantUid;
  private String name;
  private String payMethod;
  private String cardName;
  private String cardNumber;
  private int payAmount;
  private Long payDate;
  private String receiptUrl;
  private String payStatus;
  private int cancelAmount;
  private Long cancelDate;
  private int reservationIdx;

  public PaymentRespDto(Payment entity) {
    this.idx = entity.getIdx();
    this.impUid = entity.getImpUid();
    this.merchantUid = entity.getMerchantUid();
    this.name = entity.getName();
    this.payMethod = entity.getPayMethod();
    this.cardName = entity.getCardName();
    this.cardNumber = entity.getCardNumber();
    this.payAmount = entity.getPayAmount();
    this.payDate = entity.getPayDate();
    this.receiptUrl = entity.getReceiptUrl();
    this.payStatus = entity.getPayStatus();
    this.cancelAmount = entity.getCancelAmount();
    this.cancelDate = entity.getCancelDate();
    this.reservationIdx = entity.getReservationIdx();
  }
}
