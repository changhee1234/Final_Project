// 장터 fileDTO 파일
package com.bitc.camp.dto;

import lombok.Data;

@Data
public class FileDto {
  private int idx;
  private int campMainIdx;
  private String originalFileName;
  private String storedFileName;
  private int fileSize;
}
