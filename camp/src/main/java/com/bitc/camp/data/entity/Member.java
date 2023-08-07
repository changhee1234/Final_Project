package com.bitc.camp.data.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "member")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Member {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int memberIdx;

  @Column(nullable = false)
  private String password;

  @Column(nullable = false)
  private String userName;

  @Column(nullable = false)
  private String nickName;

  @Column(nullable = false)
  private String phone;

  @Column(nullable = false)
  private String email;

  private String grade;

  private String googleCheck;

  private String googleCode;

  @OneToMany(mappedBy = "member")
  @ToString.Exclude
  List<Partner> partnerList = new ArrayList<>();

}
