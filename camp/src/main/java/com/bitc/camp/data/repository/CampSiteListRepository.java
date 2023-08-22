package com.bitc.camp.data.repository;

import com.bitc.camp.data.entity.CampSiteInfo;
import com.bitc.camp.data.entity.CampSiteList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CampSiteListRepository extends JpaRepository<CampSiteList, Integer> {


    List<CampSiteList> findByCampSiteInfo(CampSiteInfo existingCampSite);
}
