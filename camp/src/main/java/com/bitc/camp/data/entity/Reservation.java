package com.bitc.camp.data.entity;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

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
  private LocalDateTime userReservationStart;

  @DateTimeFormat(pattern = "yyyy-MM-dd")
  @Column(nullable = false)
  private LocalDateTime userReservationEnd;

  @Column(nullable = false)
  private int userReservationCnt;

  private int userParkCnt;

  private String userCarNum;

  private int userEleCnt;

  @Column(nullable = false)
  private String userPhoneNumber;

  private String userMemo;

  @Column(nullable = false)
  private String userReservationTotalPrice;

  @ManyToOne(optional = false)
  @JoinColumn(name = "user_site_info_idx")
  @ToString.Exclude
  private CampSiteInfo campSiteInfo;

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
      LocalDateTime userReservationStart,
      LocalDateTime userReservationEnd,
      int userReservationCnt,
      int userParkCnt,
      String userCarNum,
      int userEleCnt,
      String userPhoneNumber,
      String userMemo,
      String userReservationTotalPrice,
      CampSiteInfo campSiteInfo,
      CampSiteList campSiteList,
      Member member
  ) {
    this.userReservationName = userReservationName;
    this.userReservationStart = userReservationStart;
    this.userReservationEnd = userReservationEnd;
    this.userReservationCnt = userReservationCnt;
    this.userParkCnt = userParkCnt;
    this.userCarNum = userCarNum;
    this.userEleCnt = userEleCnt;
    this.userPhoneNumber = userPhoneNumber;
    this.userMemo = userMemo;
    this.userReservationTotalPrice = userReservationTotalPrice;
    this.campSiteInfo = campSiteInfo;
    this.campSiteList = campSiteList;
    this.member = member;
  }
}
