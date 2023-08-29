package com.bitc.camp.service;

import com.bitc.camp.dto.ReviewDto;
import com.bitc.camp.entity.Review;

import java.util.List;

public interface ReviewService {

  ReviewDto createReview(ReviewDto reviewDto) throws Exception;

  ReviewDto updateReview(int reviewId, ReviewDto reviewDto) throws Exception;

  void deleteReview(int reviewId) throws Exception;

  List<Review> getReviewsByBoardId(int tradeBoardIdx) throws Exception;
}