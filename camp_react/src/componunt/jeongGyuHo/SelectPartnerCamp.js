import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

function SelectPartnerCamp(props) {
    const [campList, setCampList] = useState([]);
    const [filteredCampList, setFilteredCampList] = useState([]);
    const [selectedPartnerIdx, setSelectedPartnerIdx] = useState(null);
    const [partner, setPartner] = useState([]);



    useEffect(() => {
        axios.get(`http://localhost:8080/camp/searchPartner/${props.user.memberIdx}`)
            .then((res) => {
                console.log(res.data);
                setPartner({ idx: res.data.idx });
            })
            .catch((err) => {
                console.error(err);
            });

        axios.get('http://localhost:8080/camp/list')
            .then(res => {
                console.log(res.data);
                setCampList(res.data);
            })
            .catch(err => {
                console.log(`error ${err}`);
            });
    }, [props.user.memberIdx]);

    useEffect(() => {
        let filteredList = [];

        if (partner.idx === null) {
            filteredList = [...campList];
        } else {
            filteredList = campList.filter(camp => camp.partnerIdx === partner.idx && camp.campDeletedYn === 'N');
        }
        console.log('필터링된 페이지');
        console.log(filteredList);
        setFilteredCampList(filteredList);
    }, [partner.idx, campList]);

    // useEffect(() => {
    //     if (partner.idx === null) {
    //         setFilteredCampList([...campList]);
    //     } else {
    //         const filteredList = campList.filter(camp => camp.partnerIdx === partner.idx && camp.campDeletedYn === 'N');
    //         setFilteredCampList(filteredList);
    //     }
    // }, [partner.idx, campList]);

    // useEffect(() => {
    //     if (partner.idx === null) {
    //         setFilteredCampList([...campList]);
    //     } else {
    //         const filteredList = campList.filter(camp => camp.partnerIdx === partner.idx && camp.campDeletedYn === 'N');
    //         setFilteredCampList(filteredList.length > 0 ? filteredList : campList);
    //     }
    // }, [partner.idx, campList]);



    // Function to truncate text
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + "...";
    };


    const stripHtmlTags = (html) => {
        const tmp = document.createElement("div");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };

    return (
        <div className={'container'}>
            <ul className={'col-sm text-center my-4'}>
                <span className={'text3 me-5'}>☑ 운영중인 캠핑장</span>
            </ul>

            {filteredCampList.length === 0 ? (
                <p className={'text-center'}>해당 조건에 맞는 캠핑장이 없습니다.</p>
            ) : (
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
                            <td>{stripHtmlTags(truncateText(camp.campIntro, 30))}</td>
                            <td>{camp.partnerName}</td>
                            <td>{camp.campDt[0]}-{camp.campDt[1]}-{camp.campDt[2]}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default SelectPartnerCamp;
