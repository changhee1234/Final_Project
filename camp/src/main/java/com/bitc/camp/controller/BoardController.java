package com.bitc.camp.controller;

import com.bitc.camp.dto.BoardRequestDto;
import com.bitc.camp.entity.Board;
import com.bitc.camp.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/board")
@RestController
public class  BoardController {

  private final BoardService boardService;

// 글 목록
  @GetMapping("/list")
  public Object allBoardList() throws Exception {
    Map<String, Object> result = new HashMap<>();

    List<Board> boardList = boardService.findAllBoard();
    result.put("result", boardList);
    return result;
  }

  // 글 등록
  @RequestMapping(value ="/write", method = RequestMethod.POST)
  public Object boardWrite(BoardRequestDto boardRequestDto) throws Exception {
    Board createBoard = boardService.createBoard(boardRequestDto);

    return createBoard;
  }

//  글 수정
//  @RequestMapping(value = "/update", method = RequestMethod.)


//  public Object boardWrite(@RequestBody BoardRequestDto requestDto) throws Exception {
//    // 결과를 담을 맵 생성
//    Map<String, Object> result = new HashMap<>();
//
//    // BoardRequestDto에서 Board 엔티티로 변환하여 저장
//    Board boardToSave = requestDto.toEntity(); // Board 엔티티로 변환
//    Board savedBoard = boardService.save(boardToSave); // Board 저장
//
//    // 결과 맵에 등록된 게시글 정보를 넣고 반환
//    result.put("result", savedBoard);
//    return result;
//  }

//  글 상세
//  @GetMapping("/{tradeBoardIdx}")
//  public Object boardDetail(@PathVariable("tradeBoardIdx") Long tradeBoardIdx) throws Exception {
//    Map<String, Object> result = new HashMap<>();
//
//    Board boardDetail = (Board) boardService.findById(tradeBoardIdx);
//    result.put("result", boardDetail);
//    return result;
//  }

// 글 수정
//@PatchMapping("/{tradeBoardIdx}")
//public Object updateBoard(@PathVariable("tradeBoardIdx") Long tradeBoardIdx, @RequestBody BoardRequestDto boardRequestDto) throws Exception {
//  Map<String, Object> result = new HashMap<>();
//
//  Board updatedBoard = (Board) boardService.update(tradeBoardIdx, boardRequestDto.toEntity());
//  result.put("result", updatedBoard);
//  return result;
//  }

// 글 삭제
//@DeleteMapping("/{tradeBoardIdx}")
//public Object deleteBoard(@PathVariable("tradeBoardIdx") Long tradeBoardIdx) throws Exception {
//  Map<String, Object> result = new HashMap<>();
//
//  boardService.delete(tradeBoardIdx);
//  result.put("result", "Success");
//  return result;
//  }

}