package com.bict.camp_spring.service;

import com.bict.camp_spring.dto.FileDto;
import com.bict.camp_spring.dto.TradeBoardDto;
import com.bict.camp_spring.entity.TradeBoardEntity;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;

public interface TradeBoardService {

  //  게시물 전체 목록 출력
  List<TradeBoardEntity> selectBoardList() throws Exception;

  //  게시물 상세 내용 출력
  TradeBoardDto selectDetail(int idx) throws Exception;

  //  게시물 등록
  void writeTrade(TradeBoardDto trade, MultipartHttpServletRequest uploadFiles) throws Exception;

  //  게시물 내용 수정페이지로 이동
  TradeBoardDto updateTradeView(int idx) throws Exception;

  //  게시물 수정
  void updateTrade(TradeBoardDto free, MultipartHttpServletRequest uploadFiles) throws Exception;

  //  게시물 삭제
  void deleteTrade(int idx) throws Exception;

  //  게시물 조회수 카운트
  void updateFreeHitCount(int idx) throws Exception;

  // 파일 업로드 수정
  void insertFreeFileList(List<FileDto> fileList) throws Exception;

  void deleteFreeFileList(int freeIdx) throws Exception;

  List<FileDto> selectFreeFile(int idx) throws Exception;

}


