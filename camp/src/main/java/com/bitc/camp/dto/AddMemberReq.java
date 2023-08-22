package com.bitc.camp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddMemberReq {
  private int memberIdx;
  private String password;
  private String realName;
  private String nickName;
  private String phone;
  private String email;
  private String grade;
}
