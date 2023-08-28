package com.bitc.camp.service;

import com.bitc.camp.dto.ReviewDto;

public interface ReviewService {

  ReviewDto createReview(ReviewDto commentDto);

  ReviewDto updateReview(int commentId, ReviewDto commentDto);

  void deleteReview(int commentId);
}
