package com.bitc.camp_spring.entity;

import com.bitc.camp_spring.dto.BoardRequestDto;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@Table(name = "trade_board")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Board {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long tradeBoardIdx; // PK
  private String title; // 제목
  private String content; // 내용
  private String userName; // 작성자
  private int cnt; // 조회 수
  private char deleteYn; // 삭제 여부
  private int tradePrice; // 가격
  private String tradeLocation; // 지역
  private LocalDateTime createDt = LocalDateTime.now(); // 생성일
  private LocalDateTime updateDt; // 수정일
  private String tradeCate; // 판매/구매 구분
  private int memberIdx; // 회원번호

  @Builder
  public Board(String title, String content, String userName, int cnt, char deleteYn,
                int tradePrice, String tradeLocation, String tradeCate, int memberIdx) {
    this.title = title;
    this.content = content;
    this.userName = userName;
    this.cnt = cnt;
    this.deleteYn = deleteYn;
    this.tradePrice = tradePrice;
    this.tradeLocation = tradeLocation;
    this.tradeCate = tradeCate;
    this.memberIdx = memberIdx;
  }

  public void update(String title, String content, String tradeLocation, String tradeCate) {
    this.title = title;
    this.content = content;
    this.updateDt = updateDt.now();
    this.tradeLocation = tradeLocation;
    this.tradeCate = tradeCate;
  }
}