package com.bitc.camp.service;
import com.bitc.camp.dto.BoardRequestDto;
import com.bitc.camp.entity.Board;

import java.util.List;

public interface BoardService {
  List<Board> findAllBoard() throws Exception;
  Board createBoard(BoardRequestDto boardRequestDto) throws Exception;
  Board findById(Long tradeBoardIdx) throws Exception;
  Board update(Long tradeBoardIdx, Board updatedBoard) throws Exception;
  void delete(Long tradeBoardIdx) throws Exception;
}