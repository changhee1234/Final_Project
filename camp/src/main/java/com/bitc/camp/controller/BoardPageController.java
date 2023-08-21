package com.bitc.camp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BoardPageController {

  @Autowired
  private TradeService tradeService;

  @GetMapping("/board/list")
  public List<TradeItem> getTradeList(
      @RequestParam String sortOption,
      @RequestParam(required = false) String sortBy
  ) {
    List<TradeItem> tradeList = tradeService.getTradeList(sortOption, sortBy);
    return tradeList;
  }
}