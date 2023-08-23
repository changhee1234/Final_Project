package com.bitc.camp.data.dto;

import com.bitc.camp.data.entity.CampSiteInfo;
import com.bitc.camp.data.entity.CampSiteList;
import com.bitc.camp.data.entity.Reservation;
import com.bitc.camp.entity.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReservationReqDto {
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

  private int userSiteInfoIdx;
  private int userSiteListIdx;
  private int userMemberIdx;

  public Reservation toEntity(){
    return Reservation.builder()
        .userReservationName(userReservationName)
        .userReservationStart(userReservationStart)
        .userReservationEnd(userReservationEnd)
        .userReservationCnt(userReservationCnt)
        .userParkCnt(userParkCnt)
        .userCarNum(userCarNum)
        .userEleCnt(userEleCnt)
        .userPhoneNumber(userPhoneNumber)
        .userMemo(userMemo)
        .userReservationTotalPrice(userReservationTotalPrice)
        .payStatus(payStatus)
        .impUid(impUid)
        .merchantUid(merchantUid)
        .name(name)
        .member(new Member(userMemberIdx))
        .build();
  }
}
