package com.bitc.camp.data.repository;

import com.bitc.camp.data.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

  @Query(value = "SELECT c.idx FROM camp_main_info AS c WHERE c.partner_idx = :partnerIdx", nativeQuery = true)
  int findByPartnerIdx(@Param("partnerIdx") int partnerIdx);

  @Query(value = "SELECT c.idx, c.user_camp_main_idx, c.user_site_list_idx, c.user_member_idx, c.user_reservation_name, c.user_reservation_start, c.user_reservation_end, c.user_reservation_cnt, c.user_park_cnt, c.user_car_num, c.user_ele_cnt, c.user_phone_number, c.user_memo, c.name, c.user_reservation_total_price, c.pay_status, c.imp_uid, c.merchant_uid FROM reservation AS c WHERE c.user_camp_main_idx = :campMainIdx AND (pay_status = \"결제완료\" OR pay_status = \"결제실패\" OR pay_status = \"결제취소\") ORDER BY idx DESC", nativeQuery = true)
  List<Reservation> findByCampMainIdx(@Param("campMainIdx") int campMainIdx);


  @Query(value = "")
  void findByImpUid(String impUid);

  @Query(value = "SELECT c.idx, c.user_camp_main_idx, c.user_site_list_idx, c.user_member_idx, c.user_reservation_name, c.user_reservation_start, c.user_reservation_end, c.user_reservation_cnt, c.user_park_cnt, c.user_car_num, c.user_ele_cnt, c.user_phone_number, c.user_memo, c.name, c.user_reservation_total_price, c.pay_status, c.imp_uid, c.merchant_uid FROM reservation AS c WHERE c.user_member_idx = :memberIdx AND (pay_status = \"결제완료\" OR pay_status = \"결제취소\") ORDER BY idx DESC", nativeQuery = true)
  List<Reservation> findByUserMemberIdx(int memberIdx);

}
