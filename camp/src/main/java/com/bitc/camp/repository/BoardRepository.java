package com.bitc.camp.repository;

import com.bitc.camp.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {
  //  리스트 조회
  List<Board> findAllByOrderByTradeBoardIdxDesc();


  //  최근순/조회순 정렬
  @Modifying
  @Query("update Board p set p.cnt = p.cnt + 1 where p.cnt = :id")
  int updateView(Long id);

}