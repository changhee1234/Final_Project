package com.bitc.camp.data.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "reservation")
@Getter
@Setter
@ToString
@DynamicInsert
@NoArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idx;

    @Column(nullable = false)
    private String userReservationName;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private LocalDate userReservationStart;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private LocalDate userReservationEnd;

    @Column(nullable = false)
    private int userReservationCnt;

    private int userParkCnt;

    private String userCarNum;

    private int userEleCnt;

    @Column(nullable = false)
    private String userPhoneNumber;

    private String userMemo;

    @Column(nullable = false)
    private String userReservationTotalPrice;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_camp_main_idx")
    @ToString.Exclude
    private CampMainInfo campMainInfo;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_site_list_idx")
    @ToString.Exclude
    private CampSiteList campSiteList;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_member_idx")
    @ToString.Exclude
    private Member member;


}