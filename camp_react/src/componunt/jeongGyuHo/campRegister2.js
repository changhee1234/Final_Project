import React, {useState} from "react";
import axios from "axios";

function CampRegister2(props) {
    const [campSiteInfos, setCampSiteInfos] = useState([
        {
            campMainInfo:{idx: 0},
            areaName: '',
            sitePrice: 0,
            notice: '',
            campStyle: '',
            peopleMin: 0,
            peopleMax: 0,
            addPrice: 0,
            campReservePeriod: 0,
            parkPrice: 0,
            elePrice:0,
            areaSiteCnt:0,
        }
    ]);

    const handleAddCampSiteInfo = () => {
        const newCampSiteInfo = {
            campMainInfo:{idx: 0},
            areaName: '',
            sitePrice: 0,
            notice: '',
            campStyle: '',
            peopleMin: 0,
            peopleMax: 0,
            addPrice: 0,
            campReservePeriod: 0,
            parkPrice: 0,
            elePrice:0,
            areaSiteCnt:0,
        };

        setCampSiteInfos([...campSiteInfos, newCampSiteInfo])
    };

    const handleRegister = () => {

        axios.post('http://localhost:8080/campRegister2', campSiteInfos)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div>
            {campSiteInfos.map((campSiteInfo, index) => (
                <div key={index} className={'col-sm-8'}>
                    <div className={'my-3'}>
                        <label htmlFor={'campMainInfo'} className={'form-label'}>캠핑장번호</label>
                        <input
                            type={'number'}
                            className={'form-control'}
                            id={'campMainInfo'}
                            value={campSiteInfo.campMainInfo.idx}
                            onChange={(e) =>
                                setCampSiteInfos((prevInfos) => {
                                    const newInfos = [...prevInfos];
                                    newInfos[index].campMainInfo.idx = e.target.value; // 값 설정
                                    return newInfos;
                                })}
                        />
                    </div>

                    <div className={'my-3'}>
                        <label htmlFor={'areaName'} className={'form-label'}>구역 이름</label>
                        <input
                            type={'text'}
                            className={'form-control'}
                            id={'areaName'}
                            value={campSiteInfo.areaName}
                            onChange={(e) =>
                                setCampSiteInfos((prevInfos) => {
                                    const newInfos = [...prevInfos];
                                    newInfos[index].areaName = e.target.value; // 값 설정
                                    return newInfos;
                                })}
                        />
                    </div>

                    <div className={'my-3'}>
                        <label htmlFor={'sitePrice'} className={'form-label'}>구역가격</label>
                        <input
                            type={"number"}
                            className={'form-control'}
                            id={'sitePrice'}
                            value={campSiteInfo.sitePrice}
                            onChange={(e) =>
                                setCampSiteInfos((prevInfos) => {
                                    const newInfos = [...prevInfos];
                                    newInfos[index].sitePrice = e.target.value; // 값 설정
                                    return newInfos;
                                })}
                        />
                    </div>

                    <div className={'my-3'}>
                        <label htmlFor={'notice'} className={'form-label'}>주의사항</label>
                        <input
                            type={"text"}
                            className={'form-control'}
                            id={'notice'}
                            value={campSiteInfo.notice}
                            onChange={(e) =>
                                setCampSiteInfos((prevInfos) => {
                                    const newInfos = [...prevInfos];
                                    newInfos[index].notice = e.target.value; // 값 설정
                                    return newInfos;
                                })}
                        />
                    </div>

                    <div className={'my-3'}>
                        <label htmlFor={'campStyle'} className={'form-label'}>캠프스타일</label>
                        <input
                            type={"text"}
                            className={'form-control'}
                            id={'campStyle'}
                            value={campSiteInfo.campStyle}
                            onChange={(e) =>
                                setCampSiteInfos((prevInfos) => {
                                    const newInfos = [...prevInfos];
                                    newInfos[index].campStyle = e.target.value; // 값 설정
                                    return newInfos;
                                })}
                        />
                    </div>

                    <div className={'my-3'}>
                        <label htmlFor={'peopleMin'} className={'form-label'}>최소인원</label>
                        <input
                            type={"number"}
                            className={'form-control'}
                            id={'peopleMin'}
                            value={campSiteInfo.peopleMin}
                            onChange={(e) =>
                                setCampSiteInfos((prevInfos) => {
                                    const newInfos = [...prevInfos];
                                    newInfos[index].peopleMin = e.target.value; // 값 설정
                                    return newInfos;
                                })}
                        />
                    </div>

                    <div className={'my-3'}>
                        <label htmlFor={'peopleMax'} className={'form-label'}>최대인원</label>
                        <input
                            type={"number"}
                            className={'form-control'}
                            id={'peopleMax'}
                            value={campSiteInfo.peopleMax}
                            onChange={(e) =>
                                setCampSiteInfos((prevInfos) => {
                                    const newInfos = [...prevInfos];
                                    newInfos[index].peopleMax = e.target.value; // 값 설정
                                    return newInfos;
                                })}
                        />
                    </div>

                    <div className={'my-3'}>
                        <label htmlFor={'addPrice'} className={'form-label'}>인원당 추가금액</label>
                        <input
                            type={"number"}
                            className={'form-control'}
                            id={'addPrice'}
                            value={campSiteInfo.addPrice}
                            onChange={(e) =>
                                setCampSiteInfos((prevInfos) => {
                                    const newInfos = [...prevInfos];
                                    newInfos[index].addPrice = e.target.value; // 값 설정
                                    return newInfos;
                                })}
                        />
                    </div>

                    <div className={'my-3'}>
                        <label htmlFor={'campReservePeriod'} className={'form-label'}>최대예약기간</label>
                        <input
                            type={"number"}
                            className={'form-control'}
                            id={'campReservePeriod'}
                            value={campSiteInfo.campReservePeriod}
                            onChange={(e) =>
                                setCampSiteInfos((prevInfos) => {
                                    const newInfos = [...prevInfos];
                                    newInfos[index].campReservePeriod = e.target.value; // 값 설정
                                    return newInfos;
                                })}
                        />
                    </div>

                    <div className={'my-3'}>
                        <label htmlFor={'parkPrice'} className={'form-label'}>주차비</label>
                        <input
                            type={"number"}
                            className={'form-control'}
                            id={'parkPrice'}
                            value={campSiteInfo.parkPrice}
                            onChange={(e) =>
                                setCampSiteInfos((prevInfos) => {
                                    const newInfos = [...prevInfos];
                                    newInfos[index].parkPrice = e.target.value; // 값 설정
                                    return newInfos;
                                })}
                        />
                    </div>

                    <div className={'my-3'}>
                        <label htmlFor={'elePrice'} className={'form-label'}>캠핑카 전기사용 비용</label>
                        <input
                            type={"number"}
                            className={'form-control'}
                            id={'elePrice'}
                            value={campSiteInfo.elePrice}
                            onChange={(e) =>
                                setCampSiteInfos((prevInfos) => {
                                    const newInfos = [...prevInfos];
                                    newInfos[index].elePrice = e.target.value; // 값 설정
                                    return newInfos;
                                })}
                        />
                    </div>

                    <div className={'my-3'}>
                        <label htmlFor={'areaSiteCnt'} className={'form-label'}>총 자리수</label>
                        <input
                            type={"number"}
                            className={'form-control'}
                            id={'areaSiteCnt'}
                            value={campSiteInfo.areaSiteCnt}
                            onChange={(e) =>
                                setCampSiteInfos((prevInfos) => {
                                    const newInfos = [...prevInfos];
                                    newInfos[index].areaSiteCnt = e.target.value; // 값 설정
                                    return newInfos;
                                })}
                        />
                    </div>
                </div>
            ))}
            <button className={'btn btn-primary'} onClick={handleAddCampSiteInfo}>추가하기</button>
            <button className={'btn btn-success'} onClick={handleRegister}>등록하기</button>
        </div>
    );

}

export default CampRegister2;