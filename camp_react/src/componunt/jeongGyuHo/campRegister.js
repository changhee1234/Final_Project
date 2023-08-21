import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function CampRegister(props) {
    // camp_main_info 입력관련 state 관리
    const [campName, setCampName] = useState('');
    const [campIntro, setCampIntro] = useState('');
    const [campDt, setCampDt] = useState(new Date());
    const [kidszoneYn, setKidszoneYn] = useState('N');
    const [campHpLink, setCampHpKink] = useState('');
    const [campPh, setCampPh] = useState('');
    const [campAddress, setCampAddress] = useState('');
    const [partner, setPartner] = useState({idx: 0,});

    // 스프링과의 통신을 통해 저장된 camp_main_info의 idx값
    const [campMainInfoIdx, setCampMainInfoIdx] = useState(0);

    const campRegisterHandler = (e) => {
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
                setCampMainInfoIdx(res.data.idx);
            })
            .catch((err) => {
                console.log(err);
            })
    }




    return (
        <div className={'col-sm-8 mx-auto text-start'}>
            <form onSubmit={campRegisterHandler}>
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
                            <input className={'form-control text-secondary'} type={'text'} readOnly={true} value={'키즈존 여부'}/>
                        </div>
                    </div>
                </div>

                {/*홈페이지*/}
                <div className={'my-3 input-group'}>
                    <label className={'input-group-text'}>홈페이지</label>
                    <input className={'form-control'} id={'campHpLink'} value={campHpLink}
                           onChange={(e) => setCampHpKink(e.target.value)}/>
                </div>

                <div className={'my-3'}>
                    <textarea className={'form-control'} id={'campIntro'} rows={'8'} value={campIntro}
                              onChange={(e) => setCampIntro(e.target.value)}/>
                </div>


                <div className={'row'}>
                    <div className={'d-flex justify-content-end'}>
                        <div className={'col-sm-2 me-3'}>
                            <div className={'d-grid'}>
                                <button className={'btn btn-primary'} type="submit">다음</button>
                            </div>

                        </div>
                        <div className={'col-sm-2'}>
                            <div className={'d-grid'}>
                                <Link to={'/'} className={'btn btn-secondary'}>취소</Link>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
}

export default CampRegister;