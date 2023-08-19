package com.bitc.camp.dto;

import com.bitc.camp.entity.Board;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class BoardRequestDto {

  private String title; // 제목
  private String content; // 내용
  private String userName; // 작성자
  private char deleteYn; // 삭제 여부
  private Long tradeBoardIdx; // PK
  private int tradePrice; // 가격
  private String tradeLocation; // 지역
  private LocalDateTime createDt; // 생성일
  private LocalDateTime updateDt; // 수정일
  private String tradeCate; // 판매/구매 구분
  private int memberIdx; // 회원번호

  public Board toEntity() {
    return Board.builder()
        .title(title)
        .content(content)
        .userName(userName)
        .tradePrice(tradePrice)
        .tradeLocation(tradeLocation)
        .tradeCate(tradeCate)
        .memberIdx(memberIdx)
        .build();

  }

}
