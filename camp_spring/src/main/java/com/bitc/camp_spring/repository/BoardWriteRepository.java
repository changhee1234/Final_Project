package com.bitc.camp_spring.repository;

import com.bitc.camp_spring.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardWriteRepository extends JpaRepository<Board, Long> {
}