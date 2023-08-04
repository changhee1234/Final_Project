package com.bitc.camp.data.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "camp_site_info")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CampSiteInfo {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int idx;

  @Column(nullable = false)
  private String areaName;

  @Column(nullable = false)
  private int sitePrice;

  @Column(nullable = false)
  private int peopleMin;

  @Column(nullable = false)
  private int peopleMax;

  @Column(nullable = false)
  private int addPrice;

  @Column(nullable = false)
  private String camp_reserve_period;

  @Column(nullable = false)
  private int parkPrice;

  @Column(nullable = false)
  private int elePrice;

  @Column(nullable = false)
  private int areaSiteCnt;

  @Column(nullable = false)
  private int campMainIdx;

}
