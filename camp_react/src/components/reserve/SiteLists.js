import React from 'react';
import {ToggleButton, ToggleButtonGroup} from "react-bootstrap";

function SiteLists(props) {

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
      <ToggleButtonGroup type="radio" name="options" className="row row-cols-4 text-center">
        {Object.values(siteListMap).map((site) => (
            <ToggleButton key={site.idx} id={site.idx} value={site.campSiteName}
                          disabled={!availSiteMap[site.idx]}
                          style={{borderRadius: 3 + "px", margin: 0.2 + "rem"}}
                          onChange={() => {
                            props.selectedSite(site.campSiteName);
                            props.selectedSiteIdx(site.idx);
                          }}>
              <p className="py-3 mb-0" style={{fontSize: `0.9rem`}}>{site.campSiteName}</p>
            </ToggleButton>
        ))}
          </ToggleButtonGroup>
    );
  };

  return (
    <div>
      {renderSelectableUI()}
    </div>
  );
}

export default SiteLists;