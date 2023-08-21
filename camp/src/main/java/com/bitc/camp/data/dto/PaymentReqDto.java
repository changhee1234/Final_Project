package com.bitc.camp.data.dto;

import jakarta.persistence.Column;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PaymentReqDto {
  private int payAmount;
  private String payState;
  private int payDate;
  private String impUid;
  private String merchantUid;
}
