package com.bitc.camp.data.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Table(name = "camp_main_info")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CampMainInfo {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int idx;

  @Column(nullable = false)
  private int partnerIdx;

  @Column(nullable = false)
  private String campName;

  @Column(length = 1000, nullable = false)
  private String campIntro;

  @CreatedDate
  @Column(nullable = false)
  private LocalDateTime campDt;

  @Column(nullable = false)
  private String kidszoneYn;

  @Column(nullable = true)
  private String campHpLink;

  @Column(nullable = false)
  private String campPh;

  @Column(nullable = false)
  private String address;
}
