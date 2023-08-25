package com.bitc.camp.data.repository;

import com.bitc.camp.data.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
//  @Query(value = "SELECT c.idx, c.imp_uid, c.merchant_uid, c.pay_amount, c.card_name, c.card_number, c.pay_date, c.pay_status, c.cancel_amount, c.cancel_date, c.receipt_url, c.pay_method, c.reservation_idx, c.name FROM payment AS c WHERE c.reservation_idx = :idx", nativeQuery = true)
//  Payment findByIdx(@Param("idx") String idx);


  Payment findByReservationIdx(int idx);

  Payment findByImpUid(String impUid);
}
