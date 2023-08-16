//package com.bitc.camp_spring.controller;
//
//
//import com.bitc.camp_spring.dto.BoardRequestDto;
//import com.bitc.camp_spring.dto.BoardResponseDto;
//import com.bitc.camp_spring.service.BoardService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@CrossOrigin("http://localhost:3000")
//@RestController
//@RequestMapping("/api")
//@RequiredArgsConstructor
//public class BoardApiController {
//
//    private final BoardService boardService;
//
//    /**
//     * 게시글 생성
//     */
//    @PostMapping("/write")
//    public Long save(@RequestBody final BoardRequestDto params) {
//        return boardService.save(params);
//    }
//
//    /**
//     * 게시글 리스트 조회
//     */
//    @GetMapping("/list")
//    public List<BoardResponseDto> findAll() {
//        return boardService.findAll();
//    }
//
//    /**
//     * 게시글 수정
//     */
//    @PatchMapping("/trade/{id}")
//    public Long save(@PathVariable final Long id, @RequestBody final BoardRequestDto params) {
//        return boardService.update(id, params);
//    }
//
//}
