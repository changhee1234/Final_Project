import React, {useState} from 'react';

function SiteLists(props) {

  return (
    <div className="row row-cols-3 text-center">
      {
        props.siteLists.map(m => {
          return (
            <div className="card g-1 gx-1">
              <h5 className="card-title py-4">{m.campSiteName}</h5>
            </div>
          )
        })
      }
    </div>
  )
}

export default SiteLists;