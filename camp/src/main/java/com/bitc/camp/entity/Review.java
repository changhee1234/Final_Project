package com.bitc.camp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "trade_review_board")
@Getter
@Setter
@ToString
@DynamicInsert
@NoArgsConstructor
public class Review {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int idx;

  @Column(length = 1000, nullable = false)
  private String reContent;

  @ManyToOne(optional = false)
  @JoinColumn(name = "re_member_idx")
  @ToString.Exclude
  private Member member;

  @ManyToOne(optional = false) // ManyToOne 관계 설정
  @JoinColumn(name = "re_board_idx") // JoinColumn 설정
  private Board board; // Board 엔티티와의 관계 설정

  @CreationTimestamp
  @Column(name = "create_dt", updatable = false)
  private LocalDateTime createDt;

  @UpdateTimestamp
  @Column(name = "update_dt")
  private LocalDateTime updateDt;
}
