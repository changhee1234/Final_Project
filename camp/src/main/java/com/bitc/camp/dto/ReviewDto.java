package com.bitc.camp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDto {
  private int reCampMainIdx; // 댓글 ID
  private String reContent; // 댓글 내용
  private int reMemberIdx; // 회원번호
  private int boardId; // 해당 댓글이 속한 게시글 ID
}