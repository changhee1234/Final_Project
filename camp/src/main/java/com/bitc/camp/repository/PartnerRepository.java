package com.bitc.camp.repository;

import com.bitc.camp.data.entity.Partner;
import com.bitc.camp.dto.AddPartnerReq;
import com.bitc.camp.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PartnerRepository extends JpaRepository<Partner, Integer> {
    Partner findByMember(Optional<Member> member);
    // 이미 save 메서드가 JpaRepository에 정의되어 있음
}
