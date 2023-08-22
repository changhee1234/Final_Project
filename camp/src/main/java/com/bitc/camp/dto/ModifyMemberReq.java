package com.bitc.camp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ModifyMemberReq {
    private String nickName;
    private String password;
    private String phone;
    private String realName;
    private String email;
}
