package com.bitc.camp_spring.repository;

import com.bitc.camp_spring.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
  List<Board> findAllByOrderByTradeBoardIdxDesc();
}