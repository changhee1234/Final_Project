package com.bitc.camp.data.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

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
    private String CampStyle;

    @Column(nullable = false)
    private int peopleMin;

    @Column(nullable = false)
    private int peopleMax;

    @Column(nullable = false)
    private int addPrice;

    @Column(nullable = false)
    private int camp_reserve_period;

    @Column(nullable = false)
    private int parkPrice;

    @Column(nullable = false)
    private int elePrice;

    @Column(nullable = false)
    private int areaSiteCnt;

    // 관계
    @ManyToOne(optional = false)
    @JoinColumn(name = "camp_main_idx")
    @ToString.Exclude
    private CampMainInfo campMainInfo;

    @OneToMany(mappedBy = "campSiteInfo")
    @ToString.Exclude
    private List<CampSiteList> campSiteLists = new ArrayList<>();

    @OneToMany(mappedBy = "campSiteInfo")
    @ToString.Exclude
    List<Reservation> reservationList = new ArrayList<>();

}