package com.bitc.camp.data.repository;

import com.bitc.camp.data.entity.CampMainInfo;
import com.bitc.camp.data.entity.ReviewBoard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<ReviewBoard, Integer> {
    List<ReviewBoard> findAllByCampMainInfoOrderByIdxDesc(CampMainInfo campMainInfo);
}
