package com.bict.camp_spring.controller;

import com.bict.camp_spring.dto.TradeBoardDto;
import com.bict.camp_spring.entity.TradeBoardEntity;
import com.bict.camp_spring.service.TradeBoardService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import java.util.*;

@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
@Controller
@RequestMapping(value = "/trade")
public class TradeBoardController {

  private final TradeBoardService tradeBoardService;

//  장터게시판 목록 조회
  @RequestMapping(value = "/trade", method = RequestMethod.GET)
  public ModelAndView selectBoardList() throws Exception {
        ModelAndView mv = new ModelAndView("trade/selectBoardList");

    List<TradeBoardEntity> boardList = tradeBoardService.selectBoardList();

    mv.addObject("boardList", boardList);

    return mv;
  }

  // 장터 게시판 상세 페이지
  @RequestMapping(value = "/tradeDetail/{tradeBoardIdx}", method = RequestMethod.GET)
  public ModelAndView TradeDetailBoard (@PathVariable("tradeBoardIdx") int tradeBoardIdx, HttpServletRequest req) throws Exception {
    ModelAndView mv = new ModelAndView("trade/tradeDetailBoard");

    TradeBoardDto trade = tradeBoardService.selectDetail(tradeBoardIdx);
    mv.addObject("trade", trade);

    return mv;
  }

  // 자유게시판 수정 페이지로 이동(상세보기 페이지의 정보들을 수정페이지로 전송)
  @RequestMapping(value = "/tradeUpdate/{tradeBoardIdx}", method = RequestMethod.PUT)
  public ModelAndView tradeUpdateView(@PathVariable("tradeBoardIdx") int tradeBoardIdx) throws Exception {
    ModelAndView mv = new ModelAndView("board/trade/tradeUpdate");

    TradeBoardDto trade = tradeBoardService.updateTradeView(tradeBoardIdx);

    mv.addObject("trade", trade);

    return mv;
  }

  // 자유게시판 수정 구현(tradeList 이동)
  @RequestMapping(value = "/tradeUpdate", method = RequestMethod.POST)
  public String tradeUpdateProcess(TradeBoardDto trade, MultipartHttpServletRequest multipart) throws Exception {
    tradeBoardService.updateTrade(trade, multipart);
    return "redirect:/tradeList";
  }

  // 자유게시판 글 등록페이지로 이동
  @RequestMapping(value = "/tradeWrite", method = RequestMethod.GET)
  public String tradeWriteView() throws Exception {
    return "board/trade/tradeWrite";
  }

  // 자유게시판 글 쓰기(파일업로드 수정)
  @RequestMapping(value = "/tradeWrite", method = RequestMethod.POST)
  public String tradeWriteProcess(TradeBoardDto trade, MultipartHttpServletRequest multipart) throws Exception {
    tradeBoardService.writeTrade(trade, multipart);
    return "redirect:/tradeList";
  }

  // 게시물 삭제
  @RequestMapping(value = "/trade/{tradeBoardIdx}", method = RequestMethod.DELETE)
  public String tradeDelete(@PathVariable("tradeBoardIdx") int tradeBoardIdx) throws Exception {
    tradeBoardService.deleteTrade(tradeBoardIdx);
    return "redirect:/tradeList";
  }

}
