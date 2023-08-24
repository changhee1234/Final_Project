// 장터 엔티티 파일(Board)
// updateDt 및 deleteYn 에러로 주석처리
package com.bitc.camp.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalDateTime;

@Setter
@Getter
@Table(name = "trade_board")
@NoArgsConstructor
@Entity
@ToString
@AllArgsConstructor
@DynamicInsert
public class Board {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int tradeBoardIdx; // 글번호(PK)

  @Column(length = 45, nullable = false)
  private String title; // 제목

  @Column(length = 1000, nullable = false)
  private String content; // 내용

  @Column(length = 15, nullable = false)
  private String userName; // 작성자

  @Column(nullable = false)
  private LocalDateTime createDt = LocalDateTime.now(); // 생성일

//  @Column(nullable = true)
//  private LocalDateTime updateDt; // 수정일

  @Column(nullable = false)
  private int cnt; // 조회수

  @Column(length = 1000, nullable = true)
  private String imageUrl; // 이미지 주소

  @Column(length = 1000, nullable = true)
  private String imageOriginal; // 이미지 원본

//  @Column(nullable = true)
//  private char deleteYn; // 삭제 여부

  @Column(nullable = false)
  private int memberIdx; // 회원번호

  @Column(length = 100, nullable = false)
  private String tradeCate; // 판매/구매 구분

  @Column(nullable = false)
  private int tradePrice; // 가격

  @Column(length = 100, nullable = true)
  private String tradeLocation; // 지역
  private int views; // 조회수 필드

  @Builder
//  생성자 정의
  public Board(String title, String content, String userName, int cnt,
                int tradePrice, String tradeLocation, String tradeCate, int memberIdx, int tradeBoardIdx) {
    this.tradeBoardIdx = tradeBoardIdx;
    this.title = title;
    this.content = content;
    this.userName = userName;
    this.cnt = cnt;
    this.tradePrice = tradePrice;
    this.tradeLocation = tradeLocation;
    this.tradeCate = tradeCate;
    this.memberIdx = memberIdx;
    this.createDt = LocalDateTime.now();
    this.imageUrl = imageUrl;
  }

  //  객체의 속성을 업데이트
  public void update(String title, String content, String tradeLocation, String tradeCate, int tradePrice, int cnt, int tradeBoardIdx) {
    this.tradeBoardIdx = tradeBoardIdx;
    this.title = title;
    this.content = content;
//    this.updateDt = updateDt.now();
    this.tradeLocation = tradeLocation;
    this.tradeCate = tradeCate;
    this.tradePrice = tradePrice;
    this.imageUrl = imageUrl;
    this.cnt = cnt;
  }

  //  조회수 증가
  public void increaseHits() {
    this.cnt++;
  }
}