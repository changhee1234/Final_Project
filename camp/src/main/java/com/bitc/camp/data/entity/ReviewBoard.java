package com.bitc.camp.data.entity;

import com.bitc.camp.entity.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Table(name = "review_board")
@Getter
@Setter
@ToString
@DynamicInsert
@NoArgsConstructor
public class ReviewBoard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idx;

    @Column(length = 1000, nullable = false)
    private String reContent;

    @ManyToOne(optional = false)
    @JoinColumn(name = "re_camp_main_idx")
    @ToString.Exclude
    private CampMainInfo campMainInfo;

    @ManyToOne(optional = false)
    @JoinColumn(name = "re_member_idx")
    @ToString.Exclude
    private Member member;
}
