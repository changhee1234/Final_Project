package com.bict.camp_spring.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class TradeBoardDto {
  private int tradeBoardIdx;
  private String title;
  private String content;
  private String userName;
  private LocalDateTime createDt;
  private LocalDateTime updateDt;
  private int cnt;
  private String imageUrl;
  private String imageOriginal;
  private String deleted_yn;
}


