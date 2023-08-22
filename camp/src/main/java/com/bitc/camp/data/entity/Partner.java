package com.bitc.camp.data.entity;


import com.bitc.camp.entity.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import org.hibernate.annotations.DynamicInsert;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "partner")
@Getter
@Setter
@ToString
@DynamicInsert
@NoArgsConstructor
public class Partner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idx;

    @Column(nullable = false)
    private String partnerName;

    @Column(nullable = false)
    private String partnerPhone;

    @Column(nullable = false)
    private String partnerNum;

    @Column(length = 1, nullable = false)
    private String partnerAccess;

    @Column(nullable = false)
    private int addressNum;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String addressDetail;

    @OneToMany(mappedBy = "partner")
    @ToString.Exclude
    private List<CampMainInfo> campMainInfoList = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "member_idx")
    @ToString.Exclude
    private Member member;
}

