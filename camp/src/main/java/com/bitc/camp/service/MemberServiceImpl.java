package com.bitc.camp.service;

import com.bitc.camp.data.dto.PartnerRespDto;
import com.bitc.camp.data.entity.Partner;
import com.bitc.camp.data.repository.PartnerRepository;
import com.bitc.camp.dto.AddMemberReq;
import com.bitc.camp.entity.Member;
import com.bitc.camp.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
    public void updateProfileImage(String imageUrl) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // 현재 로그인한 사용자의 이메일 (username)

        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();
            member.setProfileImg(imageUrl);
            memberRepository.save(member);
        }
    }

    @Override
    public void deleteMemberByEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();
            memberRepository.delete(member);
        } else {
            throw new RuntimeException("삭제할 회원을 찾을 수 없습니다.");
        }
    }

    @Override
    public PartnerRespDto getPartnerInfo(int memberIdx) throws Exception {
        Partner entity = partnerRepository.getReferenceById(memberIdx);
        return new PartnerRespDto(entity);
    }
}
