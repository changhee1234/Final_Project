package com.bitc.camp.entity;

import com.bitc.camp.data.entity.Partner;
import com.bitc.camp.data.entity.Reservation;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "member")
@Getter
@NoArgsConstructor
public class Member implements UserDetails {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int memberIdx;
  private String password;
  private String userName;
  private String nickName;
  private String phone;
  private String email;
//  private String grade;

//  private String googleCheck;
//  private String googleCode;



//  @Column(name = "auth")
//  private String auth;

  // 추가
//  @OneToMany(mappedBy = "member")
//  @ToString.Exclude
//  List<Partner> partnerList = new ArrayList<>();
//
//  @OneToMany(mappedBy = "member")
//  @ToString.Exclude
//  List<Reservation> reservationList = new ArrayList<>();

  public Member(int memberIdx) {
    this.memberIdx = memberIdx;
  }
  // 추가

  @Builder
  public Member(int memberIdx, String email, String password, String userName, String nickName, String phone, String auth) {
    this.memberIdx = memberIdx;
    this.email = email;
    this.password = password;
    this.userName = userName;
    this.nickName = nickName;
    this.phone = phone;
  }


  // UserDetails 메소드 구현
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority("user"));
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
