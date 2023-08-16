package com.bitc.camp_spring.controller;

import com.bitc.camp_spring.dto.BoardRequestDto;
import com.bitc.camp_spring.dto.BoardResponseDto;
import com.bitc.camp_spring.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/board")
@RestController
public class  BoardController {

  private final BoardService boardService;

////  글 등록
//@PostMapping("/write")
//  public ResponseEntity<?> createBoard(@RequestBody BoardRequestDto requestDto) {
//    boardService.createBoard(requestDto);
//    return ResponseEntity.ok().build();
//  }
//
////  글 상세
//  @GetMapping("/{boardId}")
//  public ResponseEntity<?> getBoard(@PathVariable Long boardId) {
//    BoardResponseDto responseDto = boardService.getBoard(boardId);
//    return ResponseEntity.ok(responseDto);
//  }
//
//// 글 목록
//  @GetMapping
//  public ResponseEntity<?> getAllBoards() {
//    List<BoardResponseDto> responseDtos = boardService.getAllBoards();
//    return ResponseEntity.ok(responseDtos);
//  }
//
////  글 수정
//  @PutMapping("/{boardId}")
//  public ResponseEntity<?> updateBoard(@PathVariable Long boardId, @RequestBody BoardRequestDto requestDto) {
//    boardService.updateBoard(boardId, requestDto);
//    return ResponseEntity.ok().build();
//  }
//
//// 글 삭제
//  @DeleteMapping("/{boardId}")
//  public ResponseEntity<?> deleteBoard(@PathVariable Long boardId) {
//    boardService.deleteBoard(boardId);
//    return ResponseEntity.ok().build();
//  }

// 글 등록
//  @PostMapping("/write")
//  public Long save(@RequestBody final BoardRequestDto params) {
//    return boardService.save(params);
//  }

// 글 목록
  @GetMapping("/board")
  public List<BoardResponseDto> findAll() {
    List<BoardResponseDto> dtos = boardService.findAll();
    return dtos;
  }

//  글 수정
//  @PatchMapping("/trade/{id}")
//  public Long save(@PathVariable final Long id, @RequestBody final BoardRequestDto params) {
//    return boardService.update(id, params);
//  }

}
