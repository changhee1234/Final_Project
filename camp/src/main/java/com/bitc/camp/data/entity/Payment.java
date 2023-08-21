package com.bitc.camp.data.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
  private int payAmount;
  @Column(nullable = false)
  private String cardName;
  @Column(nullable = false)
  private String cardNumber;
  @Column(nullable = false)
  private long payDate;
  @Column(nullable = false)
  private String payStatus;
  @Column(nullable = true)
  private int cancelAmount;
  @Column(nullable = true)
  private long cancelDate;
  @Column(nullable = true)
  private String receiptUrl;

  @Column(nullable = false)
  private String payMethod;
}
