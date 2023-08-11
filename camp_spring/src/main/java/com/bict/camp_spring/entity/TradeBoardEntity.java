package com.bict.camp_spring.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "t_board")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class TradeBoardEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int boardIdx;

  @Column(name = "title", length = 100, nullable = false)
  private String title;

  @Column(length = 500, nullable = false)
  private String Contents;

  @Column(nullable = false)
  private String createId;

  @Column(nullable = false)
  private LocalDateTime createDt = LocalDateTime.now();

  private String updateId;
  private LocalDateTime updateDt;

  @Column(nullable = false)
  private int hitCnt;
}
