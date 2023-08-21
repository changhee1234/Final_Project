package com.bitc.camp.dto;

import com.bitc.camp.entity.Board;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class BoardResponseDto {

    private Long tradeBoardIdx; // PK
    private String title; // 제목
    private String content; // 내용
    private String userName; // 작성자
    private int cnt; // 조회 수
    private char deleteYn; // 삭제 여부
    private int tradePrice; // 가격
    private String tradeLocation; // 지역
    private LocalDateTime createDt; // 생성일
    private LocalDateTime updateDt; // 수정일
    private String tradeCate; // 판매/구매 구분
    private int memberIdx; // 회원번호

    public BoardResponseDto(Board entity) {
        this.tradeBoardIdx = entity.getTradeBoardIdx();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.userName = entity.getUserName();
        this.cnt = entity.getCnt();
//        this.deleteYn = entity.getDeleteYn();
        this.tradePrice = entity.getTradePrice();
        this.tradeLocation = entity.getTradeLocation();
        this.createDt = entity.getCreateDt();
//        this.updateDt = entity.getUpdateDt();
        this.tradeCate = entity.getTradeCate();
        this.memberIdx = entity.getMemberIdx();
    }

}
