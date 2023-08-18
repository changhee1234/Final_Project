package com.bitc.camp.data.repository;

import com.bitc.camp.data.entity.CampMainInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CampMainRepository extends JpaRepository<CampMainInfo, Integer> {
  CampMainInfo findByIdx(int idx);

}
