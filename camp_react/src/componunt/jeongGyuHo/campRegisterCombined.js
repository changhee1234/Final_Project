import React, {useState} from "react";
import axios from "axios";

function CampRegisterCombined(props) {
    const [step, setStep] = useState(1); // 현재 단계를 저장하는 상태 변수

    // campMainInfo 등록 인풋 state
    const [campName, setCampName] = useState('');
    const [campIntro, setCampIntro] = useState('');
    const [campDt, setCampDt] = useState(new Date());
    const [kidszoneYn, setKidszoneYn] = useState('N');
    const [campHpLink, setCampHpKink] = useState('');
    const [campPh, setCampPh] = useState('');
    const [campAddress, setCampAddress] = useState('');
    const [partner, setPartner] = useState({idx: 0,});

    // campSiteInfo리스트 state
    const [campSiteInfos, setCampSiteInfos] = useState([
        {
            campMainInfo: {idx: 0},
            areaName: '',
            sitePrice: 0,
            notice: '',
            campStyle: '',
            peopleMin: 0,
            peopleMax: 0,
            addPrice: 0,
            campReservePeriod: 0,
            parkPrice: 0,
            elePrice: 0,
            areaSiteCnt: 0,
        }
    ]);

    // 다음페이지로 이동
    const handleCampRegisterNext = (e) => {
        e.preventDefault();
        setStep(2); // 다음 단계로 변경
    }

    // 새로운 campSiteInfo 만들기
    const handleAddCampSiteInfo = () => {
        const newCampSiteInfo = {
            campMainInfo: {idx: 0},
            areaName: '',
            sitePrice: 0,
            notice: '',
            campStyle: '',
            peopleMin: 0,
            peopleMax: 0,
            addPrice: 0,
            campReservePeriod: 0,
            parkPrice: 0,
            elePrice: 0,
            areaSiteCnt: 0,
        };

        setCampSiteInfos([...campSiteInfos, newCampSiteInfo])
    };
    // 최종등록
    const handleCampRegister2Submit = (e) => {
        e.preventDefault();

        const campData = {
            campName,
            campIntro,
            campDt: campDt.toISOString().substr(0, 16),
            kidszoneYn,
            campHpLink,
            campPh,
            campAddress,
            partner
        };
        axios.post('http://localhost:8080/campRegister', campData)
            .then((res) => {
                console.log(res.data.idx);
                const campRegisterIdx = res.data.idx; // 첫 번째 API 호출의 응답에서 idx 값 받아오기
                // campSiteInfos 배열 내의 campMainInfo.idx 값을 설정하기
                const updatedCampSiteInfos = campSiteInfos.map(info => {
                    return {
                        ...info,
                        campMainInfo: {idx: campRegisterIdx}
                    };
                });
                // 이후에 두 번째 단계 처리
                axios.post('http://localhost:8080/campRegister2', updatedCampSiteInfos)
                    .then((res) => {
                        console.log(res.data);
                        alert('등록되었습니다.');
                    })
                    .catch((err) => {
                        console.log(err);
                        alert('등록에 실패하였습니다.');
                    });
            })
            .catch((err) => {
                console.log(err);
                alert('등록에 실패하였습니다.');
            });
    }



    return (
        <div className={'col-sm-8 mx-auto text-start'}>
            {step === 1 && (
                <form onSubmit={handleCampRegisterNext}>
                    {/*매니저 번호(나중에 세션값으로 받아와 로그인과 연동(사라질 것)*/}
                    <div className={'my-3'}>
                        <label className={'form-label'} htmlFor={'partner'}>회원번호(없애고 로그인과 연동) : </label>
                        <input className={'form-control'} id={'partner'} value={partner.idx}
                               onChange={(e) => setPartner({...partner, idx: e.target.value})}/>
                    </div>

                    {/*날짜 입력*/}
                    <input
                        className={'form-control'}
                        id={'campDt'}
                        type="hidden"
                        value={campDt.toISOString().substr(0, 16)}
                        onChange={(e) => setCampDt(new Date(e.target.value))}/>

                    {/*캠핑장 이름*/}
                    <div className={'my-3 input-group'}>
                        <span className={'input-group-text'}>캠핑장명</span>
                        <input className={'form-control'} id={'campName'} value={campName}
                               onChange={(e) => setCampName(e.target.value)}/>
                    </div>

                    {/*주소*/}
                    <div className={'my-3 input-group'}>
                        <label className={'input-group-text'}>주소</label>
                        <input className={'form-control'} id={'campAddress'} value={campAddress}
                               onChange={(e) => setCampAddress(e.target.value)}/>
                    </div>

                    <div className={'row'}>
                        {/*    전화번호*/}
                        <div className={'col-sm-9'}>
                            <div className={'input-group'}>
                                <span className={'input-group-text'} htmlFor={'campPh'}>전화번호</span>
                                <input className={'form-control'} id={'campPh'} value={campPh}
                                       onChange={(e) => setCampPh(e.target.value)}/>
                            </div>
                        </div>

                        {/*키즈존여부 체크박스*/}
                        <div className={'col-sm-3'}>
                            <div className={'input-group'}>
                                <div className={'input-group-text'}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="kidsZoneYn"
                                        id="kidsZoneYnY"
                                        value="Y"
                                        checked={kidszoneYn === 'Y'}
                                        onChange={(e) => setKidszoneYn(kidszoneYn === 'Y' ? 'N' : 'Y')}
                                    />
                                </div>
                                <input className={'form-control text-secondary'} type={'text'} readOnly={true}
                                       value={'키즈존 여부'}/>
                            </div>
                        </div>
                    </div>

                    {/*홈페이지*/}
                    <div className={'my-3 input-group'}>
                        <label className={'input-group-text'}>홈페이지</label>
                        <input className={'form-control'} id={'campHpLink'} value={campHpLink}
                               onChange={(e) => setCampHpKink(e.target.value)}/>
                    </div>

                    {/*캠프설명*/}
                    <div className={'my-3'}>
                    <textarea className={'form-control'} id={'campIntro'} rows={'8'} value={campIntro}
                              onChange={(e) => setCampIntro(e.target.value)}/>
                    </div>
                    <div className={'d-flex justify-content-end'}>
                        <div className={'col-sm-3'}>
                            <div className={'d-grid'}>
                                {/*다음페이지(campSiteInfo 입력) 넘어가기*/}
                                <button className={'btn btn-primary'} type="submit">다음</button>
                            </div>
                        </div>

                    </div>
                </form>
            )}


            {step === 2 && (
                <form onSubmit={handleCampRegister2Submit}>
                    {campSiteInfos.map((campSiteInfo, index) => (
                        <div key={index} className={'border-bottom'}>
                            <div className={'my-3 row'}>

                                {/*구역 이름*/}
                                <div className={'col-sm-7'}>
                                    <div className={'input-group'}>
                                        <span className={'input-group-text'}>구역 이름</span>
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
                                </div>

                                {/*캠프 스타일*/}
                                <div className={'col-sm-5'}>
                                    <div className={'input-group'}>
                                        <span className={'input-group-text'}>캠프스타일</span>
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
                                </div>

                            </div>

                            <div className={'my-3 row'}>
                                {/*가격*/}
                                <div className={'col-sm-6'}>
                                    <div className={'input-group'}>
                                        <span className={'input-group-text'}>구역 가격</span>
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
                                        <span className={'input-group-text'}>원</span>
                                    </div>
                                </div>

                                {/*인원 당 추가금액*/}
                                <div className={'col-sm-6'}>
                                    <div className={'input-group'}>
                                        <span className={'input-group-text'}>인원당 추가금액</span>
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
                                        <span className={'input-group-text'}>원</span>
                                    </div>
                                </div>
                            </div>

                            <div className={'row my-3'}>

                                {/*최소 인원*/}
                                <div className={'col-sm-4'}>
                                    <div className={'input-group'}>
                                        <span className={'input-group-text'}>최소 인원</span>
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
                                        <span className={'input-group-text'}>명</span>
                                    </div>
                                </div>

                                {/*최대인원*/}
                                <div className={'col-sm-4'}>
                                    <div className={'input-group'}>
                                        <span className={'input-group-text'}>최대인원</span>
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
                                        <span className={'input-group-text'}>명</span>
                                    </div>
                                </div>

                                {/*최대예약기간*/}
                                <div className={'col-sm-4'}>
                                    <div className={'input-group'}>
                                        <span className={'input-group-text'}>최대예약기간</span>
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
                                        <span className={'input-group-text'}>일</span>
                                    </div>
                                </div>
                            </div>

                            {/*주차비*/}
                            <div className={'row my-3'}>
                                <div className={'col-sm-6'}>
                                    <div className={'input-group'}>
                                        <span className={'input-group-text'}>주차비</span>
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
                                        <span className={'input-group-text'}>원</span>
                                    </div>
                                </div>

                                {/*캠핑차 이용 비용*/}
                                <div className={'col-sm-6'}>
                                    <div className={'input-group'}>
                                        <span className={'input-group-text'}>캠핑카 전기사용 비용</span>
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
                                        <span className={'input-group-text'}>원</span>
                                    </div>
                                </div>
                            </div>

                            {/*총 자리수*/}
                            <div className={'my-3 row'}>
                                <div className={'d-flex justify-content-end'}>
                                    <div className={'col-sm-4'}>
                                        <div className={'input-group'}>
                                            <span className={'input-group-text'}>총 자리수</span>
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
                                            <span className={'input-group-text'}>석</span>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/*주의 사항*/}
                            <div className={'my-3'}>
                                <label htmlFor={'notice'} className={'form-label'}>주의사항</label>
                                <textarea
                                    rows={8}
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


                        </div>
                    ))}
                    <div className={'row my-3'}>
                        <div className={'col-sm-12'}>
                            <div className={'d-grid'}>
                                <button className={'btn btn-secondary'} onClick={handleAddCampSiteInfo} type={'button'}>+</button>
                            </div>
                        </div>
                    </div>
                    <div className={'row my-3'}>
                        <div className={'d-flex justify-content-end'}>
                            <div className={'col-sm-3'}>
                                <div className={'d-grid'}>
                                    <button className={'btn btn-primary'} type="submit">등록하기</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            )
            }
        </div>
    )
        ;
}

export default CampRegisterCombined;
