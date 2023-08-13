package com.bitc.camp_spring.dto;

import com.bitc.camp_spring.entity.Board;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class BoardResponseDto {

    private Long tradeBoardIdx; // PK
    private String title; // 제목
    private String content; // 내용
    private String userName; // 작성자
    private int cnt; // 조회 수
    private char deleteYn; // 삭제 여부
    private LocalDateTime createDt; // 생성일
    private LocalDateTime updateDt; // 수정일

    public BoardResponseDto(Board entity) {
        this.tradeBoardIdx = entity.getTradeBoardIdx();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.userName = entity.getUserName();
        this.cnt = entity.getCnt();
        this.deleteYn = entity.getDeleteYn();
        this.createDt = entity.getCreateDt();
        this.updateDt = entity.getUpdateDt();
    }

}
