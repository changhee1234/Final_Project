package com.bitc.camp_spring.dto;

import com.bitc.camp_spring.entity.Board;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BoardRequestDto {

    private String title; // 제목
    private String content; // 내용
    private String userName; // 작성자
    private char deleteYn; // 삭제 여부

    public Board toEntity() {
        return Board.builder()
                .title(title)
                .content(content)
                .userName(userName)
                .cnt(0)
                .deleteYn(deleteYn)
                .build();
    }

}
