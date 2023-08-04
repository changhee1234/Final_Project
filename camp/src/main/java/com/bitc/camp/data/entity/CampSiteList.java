package com.bitc.camp.data.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Table(name = "camp_site_list")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
public class CampSiteList {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int idx;

  @Column(nullable = false)
  private String campStyle;

  @Column(nullable = false)
  private String campSiteName;

  @Column(nullable = false)
  private String reservationYn;

  @Column(nullable = true)
  private String reservationName;

  @Column(nullable = false)
  private int campSiteInfoIdx;

}
