package com.bitc.camp.data.dto;

import com.bitc.camp.data.entity.CampMainInfo;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CampImgDto {
    private int idx;
    private String originalFileName;
    private String storedFileName;
    private int fileSize;
    private CampMainInfo campMainInfo;
}
