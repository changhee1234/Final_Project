import React, {useState} from "react";
import CampIntro from "../components/CampIntro";
import AreaList from "../components/AreaList";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import { addDays } from 'date-fns';
function CampReservationPage1(props) {
  const [state, setState] = useState([
    {
        startDate: new Date(),
        endDate: addDays(new Date(), 1),
        key: 'selection'
    }
  ]);

  return (
    <main className={"container"}>
      <div className="row my-4">
        <div className="col-sm-4">
          <CampIntro/>
        </div>
        <div className="col-sm">
          <DateRange
            editableDateInputs={true}
            onChange={item => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            minDate={addDays(new Date(), 0)}
            maxDate={addDays(new Date(), 60)}
            ranges={state}
            dateDisplayFormat={'yyyy년 MMM d일'}
            locale={locales['ko']}
          />
        </div>
      </div>
      <div>배치도</div>
      <AreaList/>
    </main>
  );
}

export default CampReservationPage1;