import React, {useState} from 'react';

function SiteLists(props) {
  const [selectedSite, setSelectedSite] = useState();

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
      <div className="row row-cols-3 text-center">
        {Object.values(siteListMap).map((site) => (
          <button className="btn btn-light g-1 gx-1" key={site.idx} disabled={!availSiteMap[site.idx]} onClick={() => {setSelectedSite(site.campSiteName)}}>
            <h5 className="card-title py-4">{site.campSiteName}</h5>
          </button>
        ))}
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