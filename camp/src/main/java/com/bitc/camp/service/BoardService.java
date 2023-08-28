// 장터 Service 파일(BoardService)
// 최신순/조회순 정렬 미구현으로 주석처리
// 파일 이미지 등록 미구현(CK에디터 병합예정)
package com.bitc.camp.service;

import com.bitc.camp.dto.BoardRequestDto;
import com.bitc.camp.dto.BoardResponseDto;
import com.bitc.camp.entity.Board;
import com.bitc.camp.entity.Member;

import java.util.List;

public interface BoardService {

  //  게시물 목록 조회
  List<Board> findAllBoard() throws Exception;

  //  게시물 등록
  Board createBoard(BoardRequestDto boardRequestDto) throws Exception;

  //  게시물 상세 내용 출력
  BoardResponseDto detailBoard(int tradeBoardIdx) throws Exception;

  //  게시물 수정페이지로 이동
  BoardResponseDto updateView(int tradeBoardIdx) throws Exception;

  //  게시물 수정
  Board update(int tradeBoardIdx, BoardRequestDto boardRequestDto) throws Exception;

  //  게시물 삭제
  void delete(int tradeBoardIdx) throws Exception;

  //  게시물 조회수 카운트
  Board getBoardWithIncrementedViews(int tradeBoardIdx) throws Exception;

  List<BoardResponseDto> getMyPost(int memberIdx) throws Exception;

  // 최신순/조회순으로 조회
//  Page<BoardResponseDto> selectListNewest(int pageNum) throws Exception;
//  Page<BoardResponseDto> selectListViewed(int pageNum) throws Exception;

  //  상세 내용에 사진 출력
//   List<FileDto> selectFile(int tradeBoardIndex) throws Exception;
}