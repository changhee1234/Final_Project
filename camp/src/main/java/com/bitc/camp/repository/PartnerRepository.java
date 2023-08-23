package com.bitc.camp.repository;

import com.bitc.camp.data.entity.Partner;
import com.bitc.camp.dto.AddPartnerReq;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartnerRepository extends JpaRepository<Partner, Integer> {
    // 이미 save 메서드가 JpaRepository에 정의되어 있음
}
