import React, {useEffect, useState} from 'react';
import {ToggleButton, ToggleButtonGroup} from "react-bootstrap";

function SiteLists(props) {
  const [selectedSite, setSelectedSite] = useState(null);
  const [availSiteList, setAvailSiteList] = useState(props.availSiteList);

  useEffect(() => {
    setAvailSiteList(props.availSiteList);
  }, [props.availSiteList]);

  useEffect(() => {
    if (availSiteList.length === 0) {
      props.selectedSite("-");
    }
  }, [availSiteList]);

  const mapObjectsByKey = (array, key) =>
    array.reduce((acc, obj) => {
      acc[obj[key]] = obj;
      return acc;
    }, {});


  // 선택 가능한 UI를 렌더링하는 함수
  const renderSelectableUI = () => {
    const siteListMap = mapObjectsByKey(props.siteLists, 'idx');
    const availSiteMap = mapObjectsByKey(props.availSiteList, 'idx');

    return (
      <div className="card">
        <div className="card-body">
        <ToggleButtonGroup type="radio" name="options" className="row row-cols-4 text-center px-2">
          {Object.values(siteListMap).map((site) => (
            <ToggleButton key={site.idx} id={site.idx} value={site.campSiteName}
                          disabled={!availSiteMap[site.idx]}
                          style={{borderRadius: 3 + "px", margin: 0.2 + "rem"}}
                          variant={selectedSite === site.campSiteName ? 'outline-primary' : 'outline-primary'}
                          onChange={() => {
                            props.selectedSite(site.campSiteName);
                            props.selectedSiteIdx(site.idx);
                          }}>
              <p className="py-3 mb-0" style={{fontSize: `0.9rem`}}>{site.campSiteName}</p>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderSelectableUI()}
    </div>
  );
}

export default SiteLists;