package com.bitc.camp_spring.service;

import com.bitc.camp_spring.dto.BoardRequestDto;
import com.bitc.camp_spring.dto.BoardResponseDto;
import com.bitc.camp_spring.entity.Board;
import com.bitc.camp_spring.entity.BoardRepository;
import com.bitc.camp_spring.exception.CustomException;
import com.bitc.camp_spring.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

public interface BoardService {
  Long save(BoardRequestDto requestDto);
  List<BoardResponseDto> findAll();
  Long update(Long id, BoardRequestDto requestDto);
}

//    private final BoardRepository boardRepository;

//    @Autowired
//    public BoardService(BoardRepository boardRepository) {
//        this.boardRepository = boardRepository;
//    }
//
//    public void createBoard(BoardRequestDto requestDto) {
//        Board board = requestDto.toEntity();
//        boardRepository.save(board);
//    }
//
//    public BoardResponseDto getBoard(Long boardId) {
//        Board board = boardRepository.findById(boardId)
//            .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
//        return new BoardResponseDto(board);
//    }
//
//    public List<BoardResponseDto> getAllBoards() {
//        List<Board> boards = boardRepository.findAll();
//        return boards.stream()
//            .map(BoardResponseDto::new)
//            .collect(Collectors.toList());
//    }
//
//    public void updateBoard(Long boardId, BoardRequestDto requestDto) {
//        Board board = boardRepository.findById(boardId)
//            .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
//        board.update(requestDto);
//        boardRepository.save(board);
//    }
//
//    public void deleteBoard(Long boardId) {
//        Board board = boardRepository.findById(boardId)
//            .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
//        boardRepository.delete(board);
//    }

//    /**
//     * 게시글 생성
//     */
//    @Transactional
//    public Long save(final BoardRequestDto params) {
//
//        Board entity = boardRepository.save(params.toEntity());
//        return entity.getTradeBoardIdx();
//    }
//
//    /**
//     * 게시글 리스트 조회
//     */
//    public List<BoardResponseDto> findAll() {
//
//        Sort sort = Sort.by(Sort.Direction.DESC, "tradeBoardIdx", "createDt");
//        List<Board> list = boardRepository.findAll(sort);
//        return list.stream().map(BoardResponseDto::new).collect(Collectors.toList());
//    }
//
//    /**
//     * 게시글 수정
//     */
//    @Transactional
//    public Long update(final Long tradeBoardIdx, final BoardRequestDto params) {
//
//        Board entity = boardRepository.findById(tradeBoardIdx).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
//        entity.update(params.getTitle(), params.getContent(), params.getUserName());
//        return tradeBoardIdx;
//    }
