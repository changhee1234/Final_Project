package com.bitc.camp_spring.service;


import com.bitc.camp_spring.dto.BoardRequestDto;
import com.bitc.camp_spring.dto.BoardResponseDto;
import com.bitc.camp_spring.entity.Board;
import com.bitc.camp_spring.entity.BoardRepository;
import com.bitc.camp_spring.exception.CustomException;
import com.bitc.camp_spring.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    /**
     * 게시글 생성
     */
    @Transactional
    public Long save(final BoardRequestDto params) {

        Board entity = boardRepository.save(params.toEntity());
        return entity.getTradeBoardIdx();
    }

    /**
     * 게시글 리스트 조회
     */
    public List<BoardResponseDto> findAll() {

        Sort sort = Sort.by(Direction.DESC, "tradeBoardIdx", "createDt");
        List<Board> list = boardRepository.findAll(sort);
        return list.stream().map(BoardResponseDto::new).collect(Collectors.toList());
    }

    /**
     * 게시글 수정
     */
    @Transactional
    public Long update(final Long tradeBoardIdx, final BoardRequestDto params) {

        Board entity = boardRepository.findById(tradeBoardIdx).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        entity.update(params.getTitle(), params.getContent(), params.getUserName());
        return tradeBoardIdx;
    }

}
