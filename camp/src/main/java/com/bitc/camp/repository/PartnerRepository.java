package com.bitc.camp.repository;

import com.bitc.camp.data.entity.Partner;
import com.bitc.camp.dto.AddPartnerReq;
import com.bitc.camp.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PartnerRepository extends JpaRepository<Partner, Integer> {
    Partner findByMember(Optional<Member> member);

    @Query(value = "SELECT * FROM partner AS c WHERE c.member_idx= :memberIdx", nativeQuery = true)
  Optional<Partner> findByMemberIdx(@Param("memberIdx") int memberIdx);
}
