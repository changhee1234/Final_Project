// 리뷰 서비스 구현체(ReviewServiceImpl)
package com.bitc.camp.service;

import com.bitc.camp.dto.ReviewDto;
import com.bitc.camp.entity.Board;
import com.bitc.camp.entity.Review;
import com.bitc.camp.repository.BoardRepository;
import com.bitc.camp.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReviewServiceImpl implements ReviewService {

  private final ReviewRepository reviewRepository;
  private final BoardRepository boardRepository;

  @Autowired
  public ReviewServiceImpl(ReviewRepository reviewRepository, BoardRepository boardRepository) {
    this.reviewRepository = reviewRepository;
    this.boardRepository = boardRepository;
  }

  @Override
  @Transactional
  public ReviewDto createReview(ReviewDto reviewDto) {
    Board board = boardRepository.findById(reviewDto.getBoardId())
        .orElseThrow(() -> new IllegalArgumentException("Invalid board ID"));

    Review comment = Review.builder()
        .reContent(reviewDto.getReContent())
        .reMemberIdx(reviewDto.getReMemberIdx())
        .board(board)
        .build();

    reviewRepository.save(comment);

    return reviewDto;
  }

  @Override
  @Transactional
  public ReviewDto updateReview(int commentId, ReviewDto reviewDto) {
    Review comment = reviewRepository.findById(commentId)
        .orElseThrow(() -> new IllegalArgumentException("Invalid comment ID"));

    comment.setReContent(reviewDto.getReContent());

    return reviewDto;
  }

  @Override
  @Transactional
  public void deleteReview(int commentId) {
    Review comment = reviewRepository.findById(commentId)
        .orElseThrow(() -> new IllegalArgumentException("Invalid comment ID"));

    reviewRepository.delete(comment);
  }
}
