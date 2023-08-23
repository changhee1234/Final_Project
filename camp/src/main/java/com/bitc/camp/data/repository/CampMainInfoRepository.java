package com.bitc.camp.data.repository;

import com.bitc.camp.data.entity.CampMainInfo;
import com.bitc.camp.data.entity.Partner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CampMainInfoRepository extends JpaRepository<CampMainInfo, Integer> {

    List<CampMainInfo> findAllByOrderByIdxDesc();

    List<CampMainInfo> findAllByPartnerOrderByIdxDesc(Partner partner);
}
