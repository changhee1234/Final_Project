package com.bitc.camp.data.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "camp_site_list")
@Getter
@Setter
@ToString
@NoArgsConstructor
@DynamicInsert
public class CampSiteList {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int idx;

  @Column(nullable = false)
  private String campSiteName;

  @ManyToOne(optional = false)
  @JoinColumn(name = "camp_site_info_idx")
  @ToString.Exclude
  private CampSiteInfo campSiteInfo;

  @OneToMany(mappedBy = "campSiteList")
  @ToString.Exclude
  List<Reservation> reservationList = new ArrayList<>();

  public CampSiteList(int idx) {
    this.idx = idx;
  }
}
