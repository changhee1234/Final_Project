package com.bitc.camp.data.repository;

import com.bitc.camp.data.entity.CampSiteList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface CampSiteListRepository extends JpaRepository<CampSiteList, Integer> {

  @Query(value = "SELECT count(*) FROM camp_site_list AS c WHERE c.camp_site_info_idx = :siteInfoIdx AND c.idx NOT IN (SELECT r.user_site_list_idx from reservation as r WHERE user_reservation_start < :userReservationEnd AND r.user_reservation_end > :userReservationStart)", nativeQuery = true)
  int queryCountSiteCnt(@Param("siteInfoIdx") int siteInfoIdx, @Param("userReservationStart") LocalDate userReservationStart, @Param("userReservationEnd") LocalDate userReservationEnd);

  @Query(value = "SELECT c.idx, c.camp_site_info_idx, c.camp_site_name FROM camp_site_list AS c WHERE c.camp_site_info_idx = :siteInfoIdx AND c.idx NOT IN (SELECT r.user_site_list_idx from reservation as r WHERE user_reservation_start < :userReservationEnd AND r.user_reservation_end > :userReservationStart)", nativeQuery = true)
  List<CampSiteList> queryCountSiteList(@Param("siteInfoIdx") int siteInfoIdx, @Param("userReservationStart") LocalDate userReservationStart, @Param("userReservationEnd") LocalDate userReservationEnd);
}
