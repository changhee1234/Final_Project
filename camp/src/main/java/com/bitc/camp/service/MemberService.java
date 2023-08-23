package com.bitc.camp.service;

import com.bitc.camp.data.dto.PartnerRespDto;
import com.bitc.camp.dto.AddMemberReq;
import org.springframework.stereotype.Service;

@Service
public interface MemberService {

  void join(AddMemberReq dto);


  void updateProfileImage(String imageUrl);

  void deleteMemberByEmail(String email);

  PartnerRespDto getPartnerInfo(int memberIdx) throws Exception;
}
