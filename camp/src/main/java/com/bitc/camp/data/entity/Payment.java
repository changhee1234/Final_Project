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
  private int payAmount;

  @Column(nullable = false)
  private String payState;

  @Column(nullable = false)
  private Date payDate;

  @Column(nullable = false)
  private String impUid;

  @Column(nullable = false)
  private String merchantUid;
}
