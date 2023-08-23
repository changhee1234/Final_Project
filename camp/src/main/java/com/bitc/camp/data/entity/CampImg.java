package com.bitc.camp.data.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "camp_img")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CampImg {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idx;

    @Column(nullable = false)
    private String originalFileName;

    @Column(nullable = false)
    private String storedFileName;

    @Column
    private int fileSize;

    // 관계
    @ManyToOne(optional = false)
    @JoinColumn(name = "camp_main_idx")
    @ToString.Exclude
    private CampMainInfo campMainInfo;
}
