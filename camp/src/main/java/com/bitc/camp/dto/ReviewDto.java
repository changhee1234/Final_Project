package com.bitc.camp.dto;

import com.bitc.camp.data.entity.CampMainInfo;
import com.bitc.camp.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDto {
  private int idx;
  private String reContent;
  private Member member;
  private String nickName;
  private LocalDateTime createDt;
  private LocalDateTime updateDt;
}