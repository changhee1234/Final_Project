package com.bitc.camp_spring.service;

import com.bitc.camp_spring.dto.BoardRequestDto;
import com.bitc.camp_spring.entity.Board;
import com.bitc.camp_spring.repository.BoardRepository;
import com.bitc.camp_spring.repository.BoardWriteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
  private final BoardRepository boardRepository;
  private final BoardWriteRepository boardWriteRepository;

//  게시글 목록 조회
  @Override
  public List<Board> findAllBoard() throws Exception {
    return boardRepository.findAllByOrderByTradeBoardIdxDesc();
  }


  // 게시글 등록
  @Override
  public Board save(BoardRequestDto boardRequestDto) throws Exception {
    // BoardRequestDto를 사용하여 Board 객체를 생성하거나 변환합니다.
    Board board = convertToBoard(boardRequestDto);

    // 생성된 Board 객체를 저장합니다.
    return boardRepository.save(board);
  }

  // BoardRequestDto를 Board 엔티티로 변환하는 메서드
  private Board convertToBoard(BoardRequestDto boardRequestDto) {
    Board board = new Board();
    board.setTitle(boardRequestDto.getTitle());
    board.setContent(boardRequestDto.getContent());
    // 나머지 필드 설정
    return board;
  }
  
  // 상세 게시글 조회
  @Override
  public Board findById(Long tradeBoardIdx) throws Exception {
    Optional<Board> optionalBoard = boardRepository.findById(tradeBoardIdx);
    return optionalBoard.orElse(null); // 존재하지 않으면 null 반환
  }

  @Override
  public Board update(Long tradeBoardIdx, Board updatedBoard) throws Exception {
    // 특정 ID를 가진 게시글 조회
    Board existingBoard = boardRepository.findById(tradeBoardIdx)
        .orElseThrow(() -> new IllegalArgumentException("Invalid board id: " + tradeBoardIdx));

    // 수정된 정보 업데이트
    existingBoard.setTitle(updatedBoard.getTitle());
    existingBoard.setContent(updatedBoard.getContent());
    existingBoard.setUserName(updatedBoard.getUserName());

    // 수정된 게시글 저장 및 반환
    return boardRepository.save(existingBoard);
  }

  @Override
  public void delete(Long tradeBoardIdx) throws Exception {
    // 특정 ID를 가진 게시글 조회
    Board boardToDelete = boardRepository.findById(tradeBoardIdx)
        .orElseThrow(() -> new IllegalArgumentException("Invalid board id: " + tradeBoardIdx));

    // 게시글 삭제 (soft delete 등 처리 가능)
    boardRepository.delete(boardToDelete);
  }
}