package com.bitc.camp_spring.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
  Optional<BoardRepository> findByEmpNo(int empNo);
  List<BoardRepository> findAllByFirstName(String firstName);
}