package com.bitc.camp.data.repository;

import com.bitc.camp.data.entity.Member;
import com.bitc.camp.data.entity.Partner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PartnerRepository extends JpaRepository<Partner, Integer> {

    Partner findIdxByMember(Member member);
}
