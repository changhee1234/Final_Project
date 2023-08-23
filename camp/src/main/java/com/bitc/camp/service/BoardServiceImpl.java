// 장터 ServiceImpl 파일(BoardServiceImpl)
// 최신순/조회순 정렬 미구현으로 주석처리
// 파일 이미지 등록 미구현으로 주석처리(CK에디터 병합예정)

package com.bitc.camp.service;

import com.bitc.camp.dto.BoardRequestDto;
import com.bitc.camp.dto.BoardResponseDto;
import com.bitc.camp.entity.Board;
import com.bitc.camp.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
  private final BoardRepository boardRepository;

  //  게시글 목록 조회
  @Override
  public List<Board> findAllBoard() throws Exception {
    return boardRepository.findAllByOrderByTradeBoardIdxDesc();
  }

  // 게시글 등록
  @Override
  public Board createBoard(BoardRequestDto boardRequestDto) throws Exception {
    Board board = new Board();

    board.setTitle(boardRequestDto.getTitle());
    board.setContent(boardRequestDto.getContent());
    board.setUserName(boardRequestDto.getUserName());
    board.setTradePrice(boardRequestDto.getTradePrice());
    board.setTradeCate(boardRequestDto.getTradeCate());
    board.setMemberIdx(boardRequestDto.getMemberIdx());
    board.setCreateDt(boardRequestDto.getCreateDt());

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

  //  수정 페이지
  @Override
  public BoardResponseDto updateView(int tradeBoardIdx) throws Exception {
    BoardResponseDto boardResponseDto = detailBoard(tradeBoardIdx);
    return boardResponseDto;
  }

  // 게시글 수정
  @Override
  public Board update(int tradeBoardIdx, BoardRequestDto boardRequestDto) throws NotFoundException {
    Board board = boardRepository.findById(tradeBoardIdx)
        .orElseThrow(() -> new NotFoundException("Board not found"));

    // 게시물이 존재할 때만 업데이트 로직 실행
    if (board != null) {
      board.setTitle(boardRequestDto.getTitle());
      board.setContent(boardRequestDto.getContent());
      board.setTradePrice(boardRequestDto.getTradePrice());
      board.setTradeLocation(boardRequestDto.getTradeLocation());
      board.setTradeCate(boardRequestDto.getTradeCate());

      return boardRepository.save(board);
    } else {
      // 게시물이 존재하지 않을 경우, 적절한 응답을 처리하거나 예외를 던질 수 있음
      throw new NotFoundException("Board not found");
    }
  }

  // 게시글 삭제
  @Override
  public void delete(int tradeBoardIdx) throws Exception {
    Board board = boardRepository.findById(tradeBoardIdx)
        .orElseThrow(() -> new NotFoundException("Board not found with id: " + tradeBoardIdx));

    boardRepository.delete(board);
  }

  // 조회수 증가
  @Override
  public Board getBoardWithIncrementedViews(int tradeBoardIdx) throws Exception {

    // 게시물 조회
    Optional<Board> optionalBoard = boardRepository.findById(tradeBoardIdx);

    if (optionalBoard.isPresent()) {
      Board board = optionalBoard.get();

      // 1씩 증가
      board.setViews(board.getViews() + 1);
      boardRepository.save(board);

      return board;
    } else {
      throw new Exception("Board not found with ID: " + tradeBoardIdx);
    }
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

//  @Override
//  public List<FileDto> selectFile(int tradeBoardIndex) throws Exception {
//    return null;
//  }

//    if (!file.isEmpty()) {
//      String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
//      String uploadDir = "path_to_your_upload_directory"; // 실제 업로드 디렉토리로 수정
//
//      Path filePath = Paths.get(uploadDir, fileName);
//      Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
//    }
}