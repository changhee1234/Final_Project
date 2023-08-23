package com.bitc.camp.data.dto;

import com.bitc.camp.data.entity.Partner;
import lombok.Getter;

@Getter
public class PartnerRespDto {
  private int idx;
  private String partnerName;
  private String partnerPhone;
  private String partnerNum;
  private int memberIdx;

  public PartnerRespDto(Partner entity) {
    this.idx = entity.getIdx();
    this.partnerName = entity.getPartnerName();
    this.partnerPhone = entity.getPartnerPhone();
    this.partnerNum = entity.getPartnerNum();
    this.memberIdx = entity.getMember().getMemberIdx();
  }
}
