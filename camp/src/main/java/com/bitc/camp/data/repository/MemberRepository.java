package com.bitc.camp.data.repository;

import com.bitc.camp.data.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    Optional<Member> findNickNameByMemberIdx(int memberIdx);

    boolean existsByMemberIdxAndGradeIn(int memberIdx, List<String> targetGrades);
}
