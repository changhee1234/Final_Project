package com.bitc.camp.data.entity;


import com.bitc.camp.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Entity
@Table(name = "reservation")
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
public class Reservation {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int idx;

  @Column(nullable = false)
  private String userReservationName;

  @DateTimeFormat(pattern = "yyyy-MM-dd")
  @Column(nullable = false)
  private LocalDate userReservationStart;

  @DateTimeFormat(pattern = "yyyy-MM-dd")
  @Column(nullable = false)
  private LocalDate userReservationEnd;

  @Column(nullable = false)
  private int userReservationCnt;

  private Integer userParkCnt;

  private String userCarNum;

  private Integer userEleCnt;

  @Column(nullable = false)
  private String userPhoneNumber;

  private String userMemo;

  @Column(nullable = false)
  private int userReservationTotalPrice;

  private String payStatus;

  private String impUid;

  private String merchantUid;

  private String name;

  @ManyToOne(optional = false)
  @JoinColumn(name = "user_camp_main_idx")
  @ToString.Exclude
  private CampMainInfo campMainInfo;

  @ManyToOne(optional = false)
  @JoinColumn(name = "user_site_list_idx")
  @ToString.Exclude
  private CampSiteList campSiteList;

  @ManyToOne(optional = false)
  @JoinColumn(name = "user_member_idx")
  @ToString.Exclude
  private Member member;

  @Builder
  public Reservation(
      String userReservationName,
      LocalDate userReservationStart,
      LocalDate userReservationEnd,
      int userReservationCnt,
      int userParkCnt,
      String userCarNum,
      int userEleCnt,
      String userPhoneNumber,
      String userMemo,
      int userReservationTotalPrice,
      String payStatus,
      String impUid,
      String merchantUid,
      String name,

      CampMainInfo campMainInfo,
      CampSiteList campSiteList,
      Member member
  ) {
    this.userReservationName = userReservationName;
    this.userReservationStart = LocalDate.from(userReservationStart);
    this.userReservationEnd = LocalDate.from(userReservationEnd);
    this.userReservationCnt = userReservationCnt;
    this.userParkCnt = userParkCnt;
    this.userCarNum = userCarNum;
    this.userEleCnt = userEleCnt;
    this.userPhoneNumber = userPhoneNumber;
    this.userMemo = userMemo;
    this.userReservationTotalPrice = userReservationTotalPrice;
    this.payStatus = payStatus;
    this.impUid = impUid;
    this.merchantUid = merchantUid;
    this.name = name;

    this.campMainInfo = campMainInfo;
    this.campSiteList = campSiteList;
    this.member = member;
  }

  public void update(String payStatus, String impUid, String merchantUid, String name) {
    this.payStatus = payStatus;
    this.impUid = impUid;
    this.merchantUid = merchantUid;
    this.name = name;
  }
}