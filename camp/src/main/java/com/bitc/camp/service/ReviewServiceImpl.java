// 리뷰 서비스 구현체(ReviewServiceImpl)
package com.bitc.camp.service;

import com.bitc.camp.data.repository.ReviewRepository;
import com.bitc.camp.dto.ReviewDto;
import com.bitc.camp.entity.Board;
import com.bitc.camp.entity.Review;
import com.bitc.camp.repository.BoardRepository;
import com.bitc.camp.repository.TreadReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

  private final TreadReviewRepository reviewRepository;
  private final BoardRepository boardRepository;

  @Autowired
  public ReviewServiceImpl(TreadReviewRepository reviewRepository, BoardRepository boardRepository) {
    this.reviewRepository = reviewRepository;
    this.boardRepository = boardRepository;
  }

  @Override
  @Transactional
  public ReviewDto createReview(ReviewDto reviewDto) throws Exception {
    // 리뷰 생성을 위해 해당 게시물(Board)을 불러옴
    Board board = boardRepository.findById(reviewDto.getIdx())
        .orElseThrow(() -> new IllegalArgumentException("Invalid board ID"));

    // 리뷰 엔티티 생성
    Review review = new Review();
    review.setReContent(reviewDto.getReContent());
    review.setMember(reviewDto.getMember());
    review.setBoard(board);

    // 리뷰 저장
    reviewRepository.save(review);

    return reviewDto;
  }


  @Override
  @Transactional
  public ReviewDto updateReview(int reviewId, ReviewDto reviewDto) throws Exception { // 예외 처리 추가
    Review review = reviewRepository.findById(reviewId)
        .orElseThrow(() -> new IllegalArgumentException("Invalid review ID"));

    review.setReContent(reviewDto.getReContent());

    return reviewDto;
  }

  @Override
  @Transactional
  public void deleteReview(int reviewId) throws Exception { // 예외 처리 추가
    Review review = reviewRepository.findById(reviewId)
        .orElseThrow(() -> new IllegalArgumentException("Invalid review ID"));

    reviewRepository.delete(review);
  }

  @Override
  public List<Review> getReviewsByBoardId(int tradeBoardIdx) throws Exception { // 예외 처리 추가
    return reviewRepository.findByBoardTradeBoardIdx(tradeBoardIdx);
  }
}