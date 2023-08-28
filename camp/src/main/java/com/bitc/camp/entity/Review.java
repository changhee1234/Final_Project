package com.bitc.camp.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

@Setter
@Getter
@Table(name = "review_board")
@NoArgsConstructor
@Entity
@ToString
@AllArgsConstructor
@DynamicInsert
public class Review {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int reCampMainIdx; // 댓글 ID(PK)

  @Column(length = 1000, nullable = false)
  private String reContent; // 댓글 내용

//  @Column(nullable = false)
//  private LocalDateTime createDt = LocalDateTime.now(); // 생성일

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "tradeBoardIdx", nullable = false)
  private Board board; // 해당 댓글이 속한 게시글

  @Column(nullable = false)
  private int reMemberIdx; // 회원번호

  @Builder
  public Review(String reContent, int reMemberIdx, Board board) {
    this.reContent = reContent;
    this.reMemberIdx = reMemberIdx;
    this.board = board;
  }
}