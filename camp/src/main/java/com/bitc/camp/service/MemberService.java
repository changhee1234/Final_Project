package com.bitc.camp.service;

import com.bitc.camp.data.dto.PartnerRespDto;
import com.bitc.camp.dto.AddMemberReq;

public interface MemberService {
  void join(AddMemberReq dto);

  PartnerRespDto getPartnerInfo(int memberIdx) throws Exception;
}
