package com.bitc.camp.data.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "payment")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Payment {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int idx;

  @Column(nullable = false)
  private String impUid;

  @Column(nullable = false)
  private String merchantUid;

  @Column(nullable = false)
  private String payMethod;

  @Column(nullable = false)
  private String cardName;

  @Column(nullable = false)
  private String cardNumber;

  @Column(nullable = false)
  private int payAmount;

  @Column(nullable = false)
  private Long payDate;

  private String receiptUrl;

  @Column(nullable = false)
  private String payStatus;

  private int cancelAmount;

  private Long cancelDate;

  @Builder
  public Payment(
      String impUid,
      String merchantUid,
      String payMethod,
      String cardName,
      String cardNumber,
      int payAmount,
      Long payDate,
      String receiptUrl,
      String payStatus,
      int cancelAmount,
      Long cancelDate
  ) {
    this.impUid = impUid;
    this.merchantUid = merchantUid;
    this.payMethod = payMethod;
    this.cardName = cardName;
    this.cardNumber = cardNumber;
    this.payAmount = payAmount;
    this.payDate = payDate;
    this.receiptUrl = receiptUrl;
    this.payStatus = payStatus;
    this.cancelAmount = cancelAmount;
    this.cancelDate = cancelDate;
  }
}
