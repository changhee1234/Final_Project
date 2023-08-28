// 장터 컨트롤러 파일(BoardController)
// 최신순/조회순 정렬 미구현
// 파일 이미지 등록 미구현(CK에디터 병합예정)
package com.bitc.camp.controller;

import com.bitc.camp.dto.BoardRequestDto;
import com.bitc.camp.dto.BoardResponseDto;
import com.bitc.camp.dto.ReviewDto;
import com.bitc.camp.entity.Board;
import com.bitc.camp.entity.Member;
import com.bitc.camp.entity.Review;
import com.bitc.camp.service.BoardService;
import com.bitc.camp.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/board")
@RestController
public class  BoardController {
  private final String imageUploadDirectory = "src/main/resources/static/uploaded-images/";

  private final BoardService boardService;
  private final ReviewService reviewService;


  // 글 목록
  @GetMapping("/list")
  public Object allBoardList() throws Exception {
    Map<String, Object> result = new HashMap<>();
    List<Board> boardList = boardService.findAllBoard();
    result.put("result", boardList);
    return result;
  }

  // 글 등록(파일 업로드 제외)
//  @RequestMapping(value = "/write", method = RequestMethod.POST)
//  public Object boardWrite(@RequestBody BoardRequestDto boardRequestDto) throws Exception {
//    Board createBoard = boardService.createBoard(boardRequestDto);
//    return createBoard;
//  }
//  private String imageUrl = ""; // 이미지 URL을 저장할 변수
//
//  // 이미지 URL 업로드 API
//  @PostMapping("/upload-image")
//  public ResponseEntity<Map<String, String>> uploadImage(@RequestBody Map<String, String> request) {
//    try {
//      String imageUrl = request.get("imageUrl");
//
//      // 이미지 URL을 파일로 저장하여 줄여서 DB에 저장하는 로직 추가
//      String shortenedImageUrl = saveImageDataToFile(imageUrl);
//
//      Map<String, String> response = new HashMap<>();
//      response.put("imageUrl", shortenedImageUrl);
//
//      return ResponseEntity.ok(response);
//    } catch (Exception e) {
//      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//    }
//  }
//
//  // 이미지 URL을 파일로 저장하여 줄여서 DB에 저장하는 메서드
//  private String saveImageDataToFile(String imageUrl) throws IOException {
//    // 저장할 디렉토리 경로 설정
//    String uploadDirectory = "src/main/resources/static/uploaded-images"; // resources/static/uploaded-images 경로
//
//    // 저장할 파일명 생성 (예: 현재 시간 + 확장자)
//    String newFileName = System.currentTimeMillis() + ".jpg"; // 확장자는 실제 이미지 확장자에 맞게 설정
//
//    // 파일을 저장할 경로 설정
//    String filePath = Paths.get(uploadDirectory, newFileName).toString();
//
//    // 이미지 파일 다운로드 후 저장
//    URL imageUrlObject = new URL(imageUrl);
//    FileUtils.copyURLToFile(imageUrlObject, new File(filePath));
//
//    // 줄여진 이미지 URL 생성 (백엔드 서버에서 이미지에 접근할 수 있는 URL)
//    String shortenedImageUrl = "/uploaded-images/" + newFileName; // 프론트에서 접근 가능한 URL
//
//    return shortenedImageUrl;
//  }
//
//  // 글 등록 API
//  @RequestMapping(value = "/write", method = RequestMethod.POST)
//  public Object boardWrite(@RequestBody BoardRequestDto boardRequestDto) throws Exception {
//    try {
//      // 이미지 URL을 boardRequestDto에 추가
//      boardRequestDto.setImageUrl(imageUrl);
//
//      Board createBoard = boardService.createBoard(boardRequestDto);
//      return createBoard;
//    } catch (Exception e) {
//      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//    }
//  }

  @PostMapping("/write")
  public ResponseEntity<Object> boardWrite(@RequestBody BoardRequestDto boardRequestDto) {
    try {
      // 나머지 필드를 이용하여 글을 생성
      Board createBoard = boardService.createBoard(boardRequestDto);

      // 생성된 글 정보를 응답
      return new ResponseEntity<>(createBoard, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
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

  // 장터 마이페이지 - 로그인한 사용자의 게시물 가져오기
  @GetMapping("/myPosts/{memberIdx}")
  public Object getMyPosts(@PathVariable("memberIdx") int memberIdx) throws Exception {
    Map<String, Object> result = new HashMap<>();
    List<BoardResponseDto> myPostList = boardService.getMyPost(memberIdx);
    result.put("result", myPostList);
    return result;
  }


  // 댓글 목록 조회
  @GetMapping("review/{tradeBoardIdx}")
  public Object getReviewListByBoardId(@PathVariable int tradeBoardIdx) throws Exception {
    Map<String, Object> result = new HashMap<>();
    List<Review> reviewList = reviewService.getReviewsByBoardId(tradeBoardIdx);
    result.put("result", reviewList);
    return result;
  }

  @PostMapping("review/create")
  public ResponseEntity<Object> createReview(@RequestBody ReviewDto reviewDto) {
    try {
      ReviewDto createReview = reviewService.createReview(reviewDto);
      return new ResponseEntity<>(createReview, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @PostMapping("review/update/{reviewId}")
  public ResponseEntity<Object> updateReview(@PathVariable int reviewId, @RequestBody ReviewDto reviewDto) {
    try {
      ReviewDto updateReview = reviewService.updateReview(reviewId, reviewDto);
      return new ResponseEntity<>(updateReview, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("review/delete/{reviewId}")
  public ResponseEntity<Object> deleteReview(@PathVariable int reviewId) {
    try {
      reviewService.deleteReview(reviewId);
      return new ResponseEntity<>("Review deleted successfully", HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}