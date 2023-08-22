package com.bitc.camp.data.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "camp_main_info")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
public class CampMainInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idx;

    @Column(length = 45, nullable = false)
    private String campName;

    @Column(length = 1, nullable = false)
    private String campDeletedYn;

    @Column(length = 1000, nullable = false)
    private String campIntro;

    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime campDt;

    @Column(length = 1, nullable = false)
    private String kidszoneYn;

    @Column(length = 100, nullable = true)
    private String campHpLink;

    @Column(length = 45, nullable = false)
    private String campPh;

    @Column(length = 100, nullable = false)
    private String campAddress;

    // 파트너 테이블 참조
    @ManyToOne(optional = false)
    @JoinColumn(name = "partner_idx")
    @ToString.Exclude
    private Partner partner;

    @OneToMany(mappedBy = "campMainInfo")
    @ToString.Exclude
    private List<CampSiteInfo> campSiteInfoList = new ArrayList<>();

}
