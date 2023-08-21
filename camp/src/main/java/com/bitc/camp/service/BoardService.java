package com.bitc.camp.service;

import com.bitc.camp.dto.BoardRequestDto;
import com.bitc.camp.dto.BoardResponseDto;
import com.bitc.camp.dto.FileDto;
import com.bitc.camp.entity.Board;
import org.springframework.data.domain.Page;

import java.util.List;

public interface BoardService {

  //  게시물 목록 조회
  List<Board> findAllBoard() throws Exception;

// 최신순/조회순으로 조회
  Page<BoardResponseDto> selectListNewest(Long pageNum) throws Exception;
  Page<BoardResponseDto> selectListViewed(int pageNum) throws Exception;

  //  게시물 등록
  Board createBoard(BoardRequestDto boardRequestDto) throws Exception;

  //  게시물 상세 내용 출력
  BoardResponseDto detailBoard(Long tradeBoardIdx) throws Exception;

  //  상세 내용에 사진 출력
  List<FileDto> selectFile(int idx) throws Exception;

  //  게시물 내용 수정페이지로 이동
  BoardResponseDto updateView(int idx) throws Exception;

  //  게시물  수정
  Board update(Long tradeBoardIdx, Board updatedBoard) throws Exception;

  //  게시물  삭제
  void delete(Long tradeBoardIdx) throws Exception;

  //  게시물 조회수 카운트
  Board getBoardWithIncrementedViews(Long tradeBoardIdx) throws Exception;
}