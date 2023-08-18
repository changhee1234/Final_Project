package com.bitc.camp.service;

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

    @Override
    public void join(AddMemberReq dto) {
        memberRepository.save(Member.builder()
                .memberIdx(dto.getMemberIdx())
                .email(dto.getEmail())
                .password(bCryptPasswordEncoder.encode(dto.getPassword()))
                .phone(dto.getPhone())
                .userName(dto.getUserName())
                .nickName(dto.getNickName())
                .build());
    }
}
