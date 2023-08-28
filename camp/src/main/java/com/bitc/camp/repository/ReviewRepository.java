// 리뷰 댓글 리포지토리 파일(ReviewRepository)
package com.bitc.camp.repository;

import com.bitc.camp.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
}
