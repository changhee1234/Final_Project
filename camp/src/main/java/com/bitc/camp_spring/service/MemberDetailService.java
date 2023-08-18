package com.bitc.camp_spring.service;

import com.bitc.camp_spring.entity.Member;
import com.bitc.camp_spring.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

// 사용자 인증에 필요한 부분
@RequiredArgsConstructor
@Service
public class MemberDetailService implements UserDetailsService {
  private final MemberRepository memberRepository;

  @Override
  public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
    Optional<Member> optionalMember = memberRepository.findByEmail(userName);
    Member member = optionalMember.orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + userName));
    return member;
  }

}
