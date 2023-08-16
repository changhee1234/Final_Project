package com.bitc.camp_spring.service;

import com.bitc.camp_spring.dto.BoardRequestDto;
import com.bitc.camp_spring.dto.BoardResponseDto;
import com.bitc.camp_spring.entity.Board;
import com.bitc.camp_spring.entity.BoardRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
  private final BoardRepository boardRepository;

  @Override
  public List<Board> findAll() throws Exception {
    return boardRepository.findAllByOrderByBoardIdxDesc();
  }


//  @Override
//  public Long save(BoardRequestDto requestDto) {
//    Board board = boardRepository.save(requestDto.toEntity());
//    return board.getTradeBoardIdx();
//  }

//  @Override
//  public List<BoardResponseDto> findAll() {
//    List<Board> boards = boardRepository.findAll();
//    return boards.stream()
//        .map(BoardResponseDto::new)
//        .collect(Collectors.toList());
//  }
//
//  @Transactional
//  @Override
//  public Long update(Long id, BoardRequestDto requestDto) {
//    Board board = boardRepository.findById(id)
//        .orElseThrow(() -> new IllegalArgumentException("해당 게시물이 없습니다. id=" + id));
//
//    board.update(requestDto.getTitle(), requestDto.getContent());
//
//    return id;
//  }
}