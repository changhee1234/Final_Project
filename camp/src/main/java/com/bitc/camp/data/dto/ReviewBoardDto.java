package com.bitc.camp.data.dto;

import com.bitc.camp.data.entity.CampMainInfo;
import com.bitc.camp.entity.Member;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewBoardDto {
    private int idx;
    private String reContent;
    private CampMainInfo campMainInfo;
    private Member member;
    private String nickName;
}
