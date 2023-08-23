package com.bitc.camp.data.dto;

import com.bitc.camp.data.entity.Partner;
import com.bitc.camp.data.entity.Reservation;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class MemberDto {
    private int memberIdx;
    private String password;
    private String userName;
    private String nickName;
    private String phone;
    private String email;
    private String grade;
    private String googleCheck;
    private String googleCode;
    List<Partner> partnerList = new ArrayList<>();
    List<Reservation> reservationList = new ArrayList<>();}
