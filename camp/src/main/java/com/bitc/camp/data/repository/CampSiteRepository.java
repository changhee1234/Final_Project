package com.bitc.camp.data.repository;

import com.bitc.camp.data.entity.CampSiteInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CampSiteRepository extends JpaRepository<CampSiteInfo, Integer> {

  CampSiteInfo findByIdx(int campSiteInfoIdx);
}
