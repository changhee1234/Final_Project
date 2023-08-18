package com.bitc.camp_spring.service;

import com.bitc.camp_spring.dto.AddMemberReq;

public interface MemberService {
  void join(AddMemberReq dto);
}
