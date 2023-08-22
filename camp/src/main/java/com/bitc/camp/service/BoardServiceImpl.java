package com.bitc.camp.service;

import com.bitc.camp.dto.BoardRequestDto;
import com.bitc.camp.dto.BoardResponseDto;
import com.bitc.camp.dto.FileDto;
import com.bitc.camp.entity.Board;
import com.bitc.camp.repository.BoardRepository;
import com.bitc.camp.repository.DetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
  private final BoardRepository boardRepository;
  private final DetailRepository detailRepository;

//  게시글 목록 조회
  @Override
  public List<Board> findAllBoard() throws Exception {
    return boardRepository.findAllByOrderByTradeBoardIdxDesc();
  }

  //  최신순/조회순 정렬
//@Override
//@Transactional
//public Board getBoardWithIncrementedViews(int tradeBoardIdx) {
//  Board board = boardRepository.findById(tradeBoardIdx).orElse(null);
//
//  if (board != null) {
//    board.incrementViews();
//    boardRepository.save(board);
//  }
//
//  return board;
//}

  @Override
  public Page<BoardResponseDto> selectListNewest(int pageNum) throws Exception {
    return null;
  }

  @Override
  public Page<BoardResponseDto> selectListViewed(int pageNum) throws Exception {
    return null;
  }

  // 게시글 등록
  @Override
  public Board createBoard(BoardRequestDto boardRequestDto, MultipartFile file) throws Exception {
    // BoardRequestDto를 사용하여 Board 객체를 생성하거나 변환
    Board board = new Board();

    if (!file.isEmpty()) {
      String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
      String uploadDir = "path_to_your_upload_directory"; // 실제 업로드 디렉토리로 수정

      Path filePath = Paths.get(uploadDir, fileName);
      Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
    }

    board.setTitle(boardRequestDto.getTitle());
    board.setContent(boardRequestDto.getContent());
    board.setUserName(boardRequestDto.getUserName());
    board.setTradePrice(boardRequestDto.getTradePrice());
    board.setTradeCate(boardRequestDto.getTradeCate());
    board.setMemberIdx(boardRequestDto.getMemberIdx());
    board.setCreateDt(boardRequestDto.getCreateDt());

    // 생성된 Board 객체를 저장
    return boardRepository.save(board);
  }


  //  상세 글 조회
  @Override
  public BoardResponseDto detailBoard(int tradeBoardIdx) throws Exception {
    Board camp = boardRepository.findById(tradeBoardIdx).orElse(null);

    BoardResponseDto boardResponseDto = BoardResponseDto.builder()
        .tradeBoardIdx(camp.getTradeBoardIdx())
        .title(camp.getTitle())
        .content(camp.getContent())
        .createDt(camp.getCreateDt())
        .userName(camp.getUserName())
        .tradePrice(camp.getTradePrice())
        .tradeLocation(camp.getTradeLocation())
        .tradeCate(camp.getTradeCate())
        .imgUrl(camp.getImgUrl())
        .memberIdx(camp.getMemberIdx())
        .build();
    return boardResponseDto;
  }

  @Override
  public List<FileDto> selectFile(int idx) throws Exception {
    return null;

  }

  @Override
  public BoardResponseDto updateView(int idx) throws Exception {
    return null;
  }

//  수정
  @Override
  public Board update(int tradeBoardIdx, Board updatedBoard) throws Exception {
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

//  삭제
  @Override
  public void delete(int tradeBoardIdx) throws Exception {
    // 특정 ID를 가진 게시글 조회
    Board boardToDelete = boardRepository.findById(tradeBoardIdx)
        .orElseThrow(() -> new IllegalArgumentException("Invalid board id: " + tradeBoardIdx));

    // 게시글 삭제 (soft delete 등 처리 가능)
    boardRepository.delete(boardToDelete);
  }

//
  @Override
  public Board getBoardWithIncrementedViews(int tradeBoardIdx) throws Exception {
    // 게시물 조회
    Optional<Board> optionalBoard = boardRepository.findById(tradeBoardIdx);

    if (optionalBoard.isPresent()) {
      Board board = optionalBoard.get();

      // 조회수 증가
      board.setViews(board.getViews() + 1);
      boardRepository.save(board);

      return board;
    } else {
      throw new Exception("Board not found with ID: " + tradeBoardIdx);
    }
  }
}