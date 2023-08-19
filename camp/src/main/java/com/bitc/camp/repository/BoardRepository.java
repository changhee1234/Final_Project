package com.bitc.camp.repository;

import com.bitc.camp.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {
  List<Board> findAllByOrderByTradeBoardIdxDesc();
}