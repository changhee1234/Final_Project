package com.bitc.camp.data.dto;

import com.bitc.camp.data.entity.Payment;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PaymentReqDto {
  private String impUid;
  private String merchantUid;
  private String payMethod;
  private String cardName;
  private String cardNumber;
  private int payAmount;
  private Long payDate;
  private String payStatus;
  private int cancelAmount;
  private Long cancelDate;
  private String receiptUrl;

  public Payment toEntity(){
    return Payment.builder()
        .impUid(impUid)
        .merchantUid(merchantUid)
        .payMethod(payMethod)
        .cardName(cardName)
        .cardNumber(cardNumber)
        .payAmount(payAmount)
        .payDate(payDate)
        .payStatus(payStatus)
        .cancelAmount(cancelAmount)
        .cancelDate(cancelDate)
        .receiptUrl(receiptUrl)
        .build();
  }
}
