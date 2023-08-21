package com.bitc.camp.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
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
  private String realName;
  private String nickName;
  private String phone;
  private String email;
<<<<<<< HEAD:camp/src/main/java/com/bitc/camp/entity/Member.java
  private String grade;
  private String profileImg;
=======
<<<<<<< Updated upstream:camp/src/main/java/com/bitc/camp_spring/entity/Member.java
//  private String grade;
=======
  private String grade;
  private String profileImg;
>>>>>>> Stashed changes:camp/src/main/java/com/bitc/camp/entity/Member.java
>>>>>>> 김창희:camp/src/main/java/com/bitc/camp_spring/entity/Member.java

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
<<<<<<< HEAD:camp/src/main/java/com/bitc/camp/entity/Member.java
  public Member(int memberIdx, String email, String password, String realName, String nickName, String phone, String grade, String auth) {
=======
<<<<<<< Updated upstream:camp/src/main/java/com/bitc/camp_spring/entity/Member.java
  public Member(int memberIdx, String email, String password, String userName, String nickName, String phone, String auth) {
=======
  public Member(int memberIdx, String email, String password, String realName, String nickName, String phone, String grade,String profileImg, String auth) {
>>>>>>> Stashed changes:camp/src/main/java/com/bitc/camp/entity/Member.java
>>>>>>> 김창희:camp/src/main/java/com/bitc/camp_spring/entity/Member.java
    this.memberIdx = memberIdx;
    this.email = email;
    this.password = password;
    this.realName = realName;
    this.nickName = nickName;
    this.phone = phone;
<<<<<<< HEAD:camp/src/main/java/com/bitc/camp/entity/Member.java
    this.grade = "user";
=======
<<<<<<< Updated upstream:camp/src/main/java/com/bitc/camp_spring/entity/Member.java
=======
    this.grade = "user";
    this.profileImg = profileImg;
>>>>>>> Stashed changes:camp/src/main/java/com/bitc/camp/entity/Member.java
>>>>>>> 김창희:camp/src/main/java/com/bitc/camp_spring/entity/Member.java
  }




  // UserDetails 메소드 구현
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    List<GrantedAuthority> authorities = new ArrayList<>();

    if ("partner".equals(grade)) {
      authorities.add(new SimpleGrantedAuthority("ROLE_PARTNER"));
    } else if ("admin".equals(grade)) {
      authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
    } else {
      authorities.add(new SimpleGrantedAuthority("ROLE_USER")); // 기본 권한
    }

    return authorities;
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
<<<<<<< HEAD:camp/src/main/java/com/bitc/camp/entity/Member.java


=======
<<<<<<< Updated upstream:camp/src/main/java/com/bitc/camp_spring/entity/Member.java
=======
  // Setter 메소드 추가
  public void setNickName(String nickName) {
    this.nickName = nickName;
  }

  public void setRealName(String realName) {
    this.realName = realName;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

>>>>>>> Stashed changes:camp/src/main/java/com/bitc/camp/entity/Member.java
>>>>>>> 김창희:camp/src/main/java/com/bitc/camp_spring/entity/Member.java
}
