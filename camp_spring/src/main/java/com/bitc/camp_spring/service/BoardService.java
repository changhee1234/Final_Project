package com.bitc.camp_spring.service;
import com.bitc.camp_spring.dto.BoardRequestDto;
import com.bitc.camp_spring.entity.Board;

import java.util.List;

public interface BoardService {
  List<Board> findAllBoard() throws Exception;
  Board createBoard(BoardRequestDto boardRequestDto) throws Exception;
  Board findById(Long tradeBoardIdx) throws Exception;
  Board update(Long tradeBoardIdx, Board updatedBoard) throws Exception;
  void delete(Long tradeBoardIdx) throws Exception;
}