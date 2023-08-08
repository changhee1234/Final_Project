package com.bitc.camp.data.repository;

import com.bitc.camp.data.entity.CampMainInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CampMainRepository extends JpaRepository<CampMainInfo, Integer> {

    List<CampMainInfo> findAllByOrderByIdxDesc();
}
