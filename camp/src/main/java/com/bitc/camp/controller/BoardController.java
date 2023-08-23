// 장터 컨트롤러 파일(BoardController)
// 최신순/조회순 정렬 미구현
// 파일 이미지 등록 미구현(CK에디터 병합예정)
package com.bitc.camp.controller;

import com.bitc.camp.dto.BoardRequestDto;
import com.bitc.camp.dto.BoardResponseDto;
import com.bitc.camp.entity.Board;
import com.bitc.camp.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.ui.Model;

@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/board")
@RestController
public class BoardController {

  private final BoardService boardService;

  // 글 목록
  @GetMapping("/list")
  public Object allBoardList() throws Exception {
    Map<String, Object> result = new HashMap<>();
    List<Board> boardList = boardService.findAllBoard();
    result.put("result", boardList);
    return result;
  }

  // 글 등록(파일 업로드 제외)
  @RequestMapping(value = "/write", method = RequestMethod.POST)
  public Object boardWrite(@RequestBody BoardRequestDto boardRequestDto) throws Exception {
    Board createBoard = boardService.createBoard(boardRequestDto);
    return createBoard;
  }

  //  글 상세
  @RequestMapping(value = "/trade/{tradeBoardIdx}", method = RequestMethod.GET)
  public Object boardDetail(@PathVariable int tradeBoardIdx) throws Exception {
    BoardResponseDto detail = boardService.detailBoard(tradeBoardIdx);
    return detail;
  }

  //  조회수 업데이트
  @GetMapping("/list/{tradeBoardIdx}")
  public Board getBoard(@PathVariable int tradeBoardIdx) throws Exception {
    return boardService.getBoardWithIncrementedViews(tradeBoardIdx);
  }

  //  수정페이지 이동
  @GetMapping("/edit/{tradeBoardIdx}")
  public String editBoard(@PathVariable int tradeBoardIdx, Model model) throws Exception {
    BoardResponseDto boardResponseDto = boardService.updateView(tradeBoardIdx);
    model.addAttribute("boardResponseDto", boardResponseDto);
    return "update"; // 수정 페이지의 이름에 맞게 설정
  }

  //  글 수정
  @PostMapping("/updateBoard")
  public String updateBoard(@RequestBody BoardRequestDto boardRequestDto) throws Exception {
    int tradeBoardIdx = boardRequestDto.getTradeBoardIdx(); // 게시물 인덱스를 가져옴
    boardService.update(tradeBoardIdx, boardRequestDto);
    return "redirect:/board/list"; // 수정한 글 목록 페이지로 리다이렉트
  }

  // 글 삭제
  @RequestMapping(value = "/delete/{tradeBoardIdx}", method = RequestMethod.DELETE)
  public String deleteBoard(@PathVariable int tradeBoardIdx) throws Exception {
    boardService.delete(tradeBoardIdx);
    return "redirect:/board/list"; // 삭제 후 글 목록 페이지로 리다이렉트
  }
}