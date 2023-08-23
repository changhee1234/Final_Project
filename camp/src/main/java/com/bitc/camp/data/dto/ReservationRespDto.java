package com.bitc.camp.data.dto;

import com.bitc.camp.data.entity.Reservation;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class ReservationRespDto {
  private int idx;
  private String userReservationName;
  private LocalDate userReservationStart;
  private LocalDate userReservationEnd;
  private int userReservationCnt;
  private int userParkCnt;
  private String userCarNum;
  private int userEleCnt;
  private String userPhoneNumber;
  private String userMemo;
  private int userReservationTotalPrice;
  private String payStatus;
  private String impUid;
  private String merchantUid;
  private String name;
  private int userCampMainIdx;

  public ReservationRespDto(Reservation entity) {
    this.idx = entity.getIdx();
    this.userReservationName = entity.getUserReservationName();
    this.userReservationStart = entity.getUserReservationStart();
    this.userReservationEnd = entity.getUserReservationEnd();
    this.userReservationCnt = entity.getUserReservationCnt();
    this.userParkCnt = entity.getUserParkCnt();
    this.userCarNum = entity.getUserCarNum();
    this.userEleCnt = entity.getUserEleCnt();
    this.userPhoneNumber = entity.getUserPhoneNumber();
    this.userMemo = entity.getUserMemo();
    this.userReservationTotalPrice = entity.getUserReservationTotalPrice();
    this.payStatus = entity.getPayStatus();
    this.impUid = entity.getImpUid();
    this.merchantUid = entity.getMerchantUid();
    this.name = entity.getName();
    this.userCampMainIdx = entity.getCampMainInfo().getIdx();
  }
}
