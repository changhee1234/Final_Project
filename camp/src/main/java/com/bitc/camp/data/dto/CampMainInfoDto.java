package com.bitc.camp.data.dto;

import com.bitc.camp.data.entity.CampSiteInfo;
import com.bitc.camp.data.entity.Partner;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class CampMainInfoDto {
    private int idx;
    private String campName;
    private String campIntro;
    private LocalDateTime campDt;
    private String kidszoneYn;
    private String campHpLink;
    private String campPh;
    private String campAddress;
    private Partner partner;
    private List<CampSiteInfo> campSiteInfoList = new ArrayList<>();
}
