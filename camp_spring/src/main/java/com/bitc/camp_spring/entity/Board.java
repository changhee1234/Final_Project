package com.bitc.camp_spring.entity;

import com.bitc.camp_spring.dto.BoardRequestDto;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
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

    @Builder
    public Board(String title, String content, String userName, int cnt, char deleteYn, int tradePrice, String tradeLocation) {
        this.title = title;
        this.content = content;
        this.userName = userName;
        this.cnt = cnt;
        this.deleteYn = deleteYn;
        this.tradePrice = tradePrice;
        this.tradeLocation = tradeLocation;
    }

    public void update(String title, String content) {
        this.title = title;
        this.content = content;
        this.userName = userName;
        this.updateDt = updateDt.now();
    }

    public void update(BoardRequestDto requestDto) {
    }
}