package com.bitc.camp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/reserve")
public class ReservationController {

  @GetMapping("/selectDateArea")
  public ModelAndView index() throws Exception {
    ModelAndView mv = new ModelAndView("index");

    return mv;
  }
}
