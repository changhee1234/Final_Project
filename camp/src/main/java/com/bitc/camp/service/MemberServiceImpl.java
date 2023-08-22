package com.bitc.camp.service;

import com.bitc.camp.data.dto.PartnerRespDto;
import com.bitc.camp.data.entity.Partner;
import com.bitc.camp.data.repository.PartnerRepository;
import com.bitc.camp.dto.AddMemberReq;
import com.bitc.camp.entity.Member;
import com.bitc.camp.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final PartnerRepository partnerRepository;

    @Override
    public void join(AddMemberReq dto) {
        memberRepository.save(Member.builder()
                .memberIdx(dto.getMemberIdx())
                .email(dto.getEmail())
                .password(bCryptPasswordEncoder.encode(dto.getPassword()))
                .phone(dto.getPhone())
                .realName(dto.getRealName())
                .nickName(dto.getNickName())
                .grade("user")
                .build());
    }

    @Override
    public PartnerRespDto getPartnerInfo(int memberIdx) throws Exception {
        Partner entity = partnerRepository.getReferenceById(memberIdx);
        return new PartnerRespDto(entity);
    }
}
