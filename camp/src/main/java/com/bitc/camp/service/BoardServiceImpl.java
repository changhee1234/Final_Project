// 장터 ServiceImpl 파일(BoardServiceImpl)
// 최신순/조회순 정렬 미구현으로 주석처리
// 파일 이미지 등록 미구현으로 주석처리(CK에디터 병합예정)

package com.bitc.camp.service;

import com.bitc.camp.dto.BoardRequestDto;
import com.bitc.camp.dto.BoardResponseDto;
import com.bitc.camp.entity.Board;
import com.bitc.camp.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
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
  public Board update(int tradeBoardIdx, BoardRequestDto boardRequestDto) throws Exception {
    Board board = boardRepository.findById(tradeBoardIdx)
        .orElse(null);

    if (board == null) {
      throw new Exception("Board not found with ID: " + tradeBoardIdx);
    }

    board.setTitle(boardRequestDto.getTitle());
    board.setContent(boardRequestDto.getContent());
    board.setTradePrice(boardRequestDto.getTradePrice());
    board.setTradeLocation(boardRequestDto.getTradeLocation());
    board.setTradeCate(boardRequestDto.getTradeCate());

    return boardRepository.save(board);
  }

  // 게시글 삭제
  @Override
  public void delete(int tradeBoardIdx) throws Exception {
    Board board = boardRepository.findById(tradeBoardIdx)
        .orElse(null);

    if (board == null) {
      throw new Exception("Board not found with ID: " + tradeBoardIdx);
    }

    boardRepository.delete(board);
  }


  // 조회수
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