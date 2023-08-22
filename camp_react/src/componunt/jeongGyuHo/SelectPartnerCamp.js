import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function SelectPartnerCamp(props) {
    const [campList, setCampList] = useState([]);
    const [filteredCampList, setFilteredCampList] = useState([]);
    const [selectedPartnerIdx, setSelectedPartnerIdx] = useState(null);



    useEffect(() => {
        axios.get('http://localhost:8080/camp')
            .then(res => {
                console.log(res.data);
                setCampList(res.data);
                setFilteredCampList(res.data);
            })
            .catch(err => {
                console.log(`error ${err}`);
            });
    }, []);

    useEffect(() => {
        if (selectedPartnerIdx === null) {
            setFilteredCampList(campList);
            const filteredList = campList.filter(camp => camp.campDeletedYn === 'N');
            setFilteredCampList(filteredList);
        } else {
            const filteredList = campList.filter(camp => camp.partnerIdx === selectedPartnerIdx && camp.campDeletedYn === 'N');
            setFilteredCampList(filteredList);
        }
    }, [selectedPartnerIdx, campList]);


    const handlePartnerSelectChange = (e) => {
        setSelectedPartnerIdx(e.target.value === "all" ? null : parseInt(e.target.value));
    };

    // Function to truncate text
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + "...";
    };

    const dtTruncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength);
    };

    return (
        <div className={'container'}>
            <select onChange={handlePartnerSelectChange} className={'form-select'}>
                <option value="all">전체</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
            </select>

            <table className={'table table-hover table-striped my-3'}>
                <thead>
                <tr>
                    <th>번호</th>
                    <th>캠핑장 이름</th>
                    <th>설명</th>
                    <th>등록자 이름</th>
                    <th>등록일자</th>
                </tr>
                </thead>
                <tbody>
                {filteredCampList.map(camp => (
                    <tr key={camp.idx}>
                        <td>{camp.idx}</td>
                        <td><Link to={`/detailPartnerCamp/${camp.idx}`}>{camp.campName}</Link></td>
                        <td>{truncateText(camp.campIntro, 50)}</td>
                        <td>{camp.partnerName}</td>
                        <td>{dtTruncateText(camp.campDt, 10)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default SelectPartnerCamp;
