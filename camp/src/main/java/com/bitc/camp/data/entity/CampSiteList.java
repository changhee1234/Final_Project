package com.bitc.camp.data.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "camp_site_list")
@Getter
@ToString
@NoArgsConstructor
@DynamicInsert
public class CampSiteList {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int idx;

  @Column(nullable = false)
  private String campStyle;

  @Column(nullable = false)
  private String campSiteName;

  @ManyToOne(optional = false)
  @JoinColumn(name = "camp_site_info_idx")
  @ToString.Exclude
  private CampSiteInfo campSiteInfo;

  @OneToMany(mappedBy = "campSiteList")
  @ToString.Exclude
  List<Reservation> reservationList = new ArrayList<>();

}
