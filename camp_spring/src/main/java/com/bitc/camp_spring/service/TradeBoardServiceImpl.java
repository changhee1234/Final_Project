//package com.bict.camp_spring.service;
//
//import com.bict.camp_spring.dto.FileDto;
//import com.bict.camp_spring.dto.TradeBoardDto;
//import com.bict.camp_spring.entity.TradeBoardEntity;
//import com.bict.camp_spring.repository.TradeBoardRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartHttpServletRequest;
//
//import java.util.List;
//
//@RequiredArgsConstructor
//@Service
//public class TradeBoardServiceImpl implements TradeBoardService {
//
//  private final TradeBoardRepository tradeBoardRepository;
//
//  @Override
//  public List<TradeBoardEntity> selectBoardList() throws Exception {
//    return tradeBoardRepository.findAllByOrderByBoardIdxDesc();
//  }
//
//  @Override
//  public TradeBoardDto selectDetail(int idx) throws Exception {
//    return null;
//  }
//
//  @Override
//  public void writeTrade(TradeBoardDto trade, MultipartHttpServletRequest uploadFiles) throws Exception {
//
//  }
//
//  @Override
//  public TradeBoardDto updateTradeView(int idx) throws Exception {
//    return null;
//  }
//
//  @Override
//  public void updateTrade(TradeBoardDto free, MultipartHttpServletRequest uploadFiles) throws Exception {
//
//  }
//
//  @Override
//  public void deleteTrade(int idx) throws Exception {
//
//  }
//
//  @Override
//  public void updateFreeHitCount(int idx) throws Exception {
//
//  }
//
//  @Override
//  public void insertFreeFileList(List<FileDto> fileList) throws Exception {
//
//  }
//
//  @Override
//  public void deleteFreeFileList(int freeIdx) throws Exception {
//
//  }
//
//  @Override
//  public List<FileDto> selectFreeFile(int idx) throws Exception {
//    return null;
//  }
//}
