package com.bitc.camp_spring.repository;

import com.bitc.camp_spring.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
   Optional<Member> findByEmail(String email);

   boolean existsByEmail(String email);
}
