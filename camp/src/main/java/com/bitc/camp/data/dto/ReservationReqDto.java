package com.bitc.camp.data.dto;

import com.bitc.camp.data.entity.CampSiteInfo;
import com.bitc.camp.data.entity.CampSiteList;
import com.bitc.camp.data.entity.Reservation;
import com.bitc.camp.entity.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReservationReqDto {
  private String userReservationName;
  private LocalDateTime userReservationStart;
  private LocalDateTime userReservationEnd;
  private int userReservationCnt;
  private int userParkCnt;
  private String userCarNum;
  private int userEleCnt;
  private String userPhoneNumber;
  private String userMemo;
  private String userReservationTotalPrice;

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
        .campSiteInfo(new CampSiteInfo(userSiteInfoIdx))
        .campSiteList(new CampSiteList(userSiteListIdx))
        .member(new Member(userMemberIdx))
        .build();
  }
}
