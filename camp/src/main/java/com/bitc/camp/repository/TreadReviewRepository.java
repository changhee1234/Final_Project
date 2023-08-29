// 리뷰 댓글 리포지토리 파일(ReviewRepository)
package com.bitc.camp.repository;

import com.bitc.camp.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TreadReviewRepository extends JpaRepository<Review, Integer> {
  List<Review> findByBoardTradeBoardIdx(int tradeBoardIdx);
}
