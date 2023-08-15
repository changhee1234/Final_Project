package com.bitc.camp_spring.controller;

import com.bitc.camp_spring.dto.BoardRequestDto;
import com.bitc.camp_spring.dto.BoardResponseDto;
import com.bitc.camp_spring.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/boards")
public class  BoardController {

  private final BoardService boardService;

  @Autowired
  public BoardController(BoardService boardService) {
    this.boardService = boardService;
  }

  @PostMapping
  public ResponseEntity<?> createBoard(@RequestBody BoardRequestDto requestDto) {
    boardService.createBoard(requestDto);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/{boardId}")
  public ResponseEntity<?> getBoard(@PathVariable Long boardId) {
    BoardResponseDto responseDto = boardService.getBoard(boardId);
    return ResponseEntity.ok(responseDto);
  }

  @GetMapping
  public ResponseEntity<?> getAllBoards() {
    List<BoardResponseDto> responseDtos = boardService.getAllBoards();
    return ResponseEntity.ok(responseDtos);
  }

  @PutMapping("/{boardId}")
  public ResponseEntity<?> updateBoard(@PathVariable Long boardId, @RequestBody BoardRequestDto requestDto) {
    boardService.updateBoard(boardId, requestDto);
    return ResponseEntity.ok().build();
  }


  @DeleteMapping("/{boardId}")
  public ResponseEntity<?> deleteBoard(@PathVariable Long boardId) {
    boardService.deleteBoard(boardId);
    return ResponseEntity.ok().build();
  }

}
