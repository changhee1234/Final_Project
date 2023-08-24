// 장터 RequestDTO 파일
// deleteYn 에러로 주석처리
package com.bitc.camp.dto;

import com.bitc.camp.entity.Board;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class BoardRequestDto {

  private String title; // 제목
  private String content; // 내용
  private String userName; // 작성자
  //  private char deleteYn; // 삭제 여부
  private int tradeBoardIdx; // PK
  private int tradePrice; // 가격
  private String tradeLocation; // 지역
  private LocalDateTime createDt; // 생성일
  private LocalDateTime updateDt; // 수정일
  private String tradeCate; // 판매/구매 구분
  private int memberIdx; // 회원번호
  private String imageOriginal;
  private String imageUrl; // 추가된 imgUrl 필드

  public Board toEntity() {
    return Board.builder()
            .tradeBoardIdx(tradeBoardIdx)
            .title(title)
            .content(content)
            .userName(userName)
            .tradePrice(tradePrice)
            .tradeLocation(tradeLocation)
            .tradeCate(tradeCate)
            .memberIdx(memberIdx)
            .imageUrl(imageUrl)
            .imageOriginal(imageOriginal)
            .build();

  }

}