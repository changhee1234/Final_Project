package com.bitc.camp.repository;

import com.bitc.camp.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DetailRepository extends JpaRepository<Board, Integer> {
}
