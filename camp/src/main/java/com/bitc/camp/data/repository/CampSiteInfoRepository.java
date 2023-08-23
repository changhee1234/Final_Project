package com.bitc.camp.data.repository;

import com.bitc.camp.data.entity.CampMainInfo;
import com.bitc.camp.data.entity.CampSiteInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CampSiteInfoRepository extends JpaRepository<CampSiteInfo, Integer> {

    List<CampSiteInfo> findAllByCampMainInfoOrderByIdxDesc(Optional<CampMainInfo> campMainInfo);
}
