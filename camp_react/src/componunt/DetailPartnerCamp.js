import React, {useEffect, useState} from "react";
import axios from "axios";
import {Navigate, redirect, useNavigate, useParams} from "react-router-dom";

function PartnerCampDetail() {

    const [campSiteInfoList, setCampSiteInfoList] = useState([]);

    const navigate = useNavigate();
    // camp_main_info 입력관련 state 관리
    const [partnerIdx, setPartnerIdx] = useState(0);
    const {campIdx} = useParams(); // Get campIdx from URL parameter
    const [campDetails, setCampDetails] = useState(null);
    const [updatedCampInfo, setUpdatedCampInfo] = useState({
        campIdx: campIdx,
        campName: '',
        campIntro: '',
        campDt: '',
        kidszoneYn: 'N',
        campHpLink: '',
        campPh: '',
        campAddress: '',
        partner: {
            idx: 0
        }
    }); // Store updated data

    const intCampIdx = parseInt(campIdx);

    useEffect(() => {
        axios.get(`http://localhost:8080/partnerCampDetail/${campIdx}`)
            .then(res => {
                console.log(res.data); // 응답 데이터를 콘솔에 기록
                setCampDetails(res.data);
                setUpdatedCampInfo({...res.data});
                setUpdatedCampInfo({
                    campIdx: res.data.campIdx,
                    campName: res.data.campName,
                    campIntro: res.data.campIntro,
                    campDt: res.data.campDt,
                    kidszoneYn: res.data.kidszoneYn,
                    campHpLink: res.data.campHpLink,
                    campPh: res.data.campPh,
                    campAddress: res.data.campAddress,
                    partner: {
                        idx: res.data.partnerIdx
                    }
                });
            })
            .catch(err => {
                console.log(`에러: ${err}`);
            });

    }, [campIdx]);

    const handleCampSite = (e) => {
        e.preventDefault();

        axios.get(`http://localhost:8080/partnerCampSiteDetail/${intCampIdx}`)
            .then((res) => {
                setCampSiteInfoList(res.datas);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    if (!campDetails) {
        return <div>로딩 중...</div>;
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUpdatedCampInfo(prevData => ({...prevData, [name]: value}));
    };

    const handleCheckboxChange = (e) => {
        const {name, checked} = e.target;
        setUpdatedCampInfo(prevData => ({...prevData, [name]: checked ? "Y" : "N"}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Include partnerIdx in the updatedCampInfo
        const updatedDataWithPartnerIdx = {
            ...updatedCampInfo,
            partnerIdx: partnerIdx // Include partnerIdx here
        };

        axios.put(`http://localhost:8080/partnerCampDetail/${campIdx}`, updatedDataWithPartnerIdx)
            .then(res => {
                console.log("Camp details updated successfully:", res.data);
                alert('수정되었습니다');
                navigate("/");
            })
            .catch(err => {
                console.log("Error updating camp details:", err);
            });
    };


    const handleCancel = () => {
        // Reset updatedCampInfo to the original campDetails data
        setUpdatedCampInfo(campDetails);
    };

    const dtTruncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength);
    };
    return (
        <div className={'col-sm-8 mx-auto text-start'}>
            {campDetails ? (
                <form onSubmit={handleSubmit}>
                    <input type="hidden" value={updatedCampInfo.partner.partnerIdx || ''}
                           name="partnerIdx"
                           onChange={handleInputChange}/>
                    <div className={'row my-3'}>
                        <div className={'col-sm-3'}>
                            <div className={'input-group'}>
                                <span className={'input-group-text'}>등록일자</span>
                                <input className={'form-control'} value={dtTruncateText(campDetails.campDt, 10)}
                                       readonly={true}/>
                            </div>
                        </div>
                    </div>

                    <div className={'row'}>
                        <div className={'col-sm-9'}>
                            <div className={'input-group'}>
                                <span className={'input-group-text'}>캠핑장명</span>
                                <input className={'form-control'} value={updatedCampInfo.campName || ''}
                                       name="campName"
                                       onChange={handleInputChange}/>
                            </div>
                        </div>
                        <div className={'col-sm-3'}>
                            <div className={'input-group'}>
                                <span className={'input-group-text'}>등록자명</span>
                                <input className={'form-control'} value={campDetails.partnerName}
                                       readOnly={true}/>
                            </div>
                        </div>
                    </div>

                    <div className={'my-3 input-group'}>
                        <span className={'input-group-text'}>주소</span>
                        <input className={'form-control'} value={updatedCampInfo.campAddress || ''}
                               name="campAddress"
                               onChange={handleInputChange}/>
                    </div>

                    <div className={'row'}>
                        <div className={'col-sm-9'}>
                            <div className={'input-group'}>
                                <span className={'input-group-text'}>전화번호</span>
                                <input className={'form-control'} value={updatedCampInfo.campPh || ''}
                                       name="campPh"
                                       onChange={handleInputChange}/>
                            </div>
                        </div>

                        <div className={'col-sm-3'}>
                            <div className={'input-group'}>
                                <div className={'input-group-text'}>
                                    <input className={'form-check-input'} type={'checkbox'}
                                           value={campDetails.kidszoneYn} checked={updatedCampInfo.kidszoneYn === "Y"}
                                           name="kidszoneYn"
                                           onChange={handleCheckboxChange}/>
                                </div>
                                <input className={'form-control text-secondary'} value={'키즈존 여부'} readOnly={true}/>
                            </div>
                        </div>

                        <div className={'my-3 input-group'}>
                            <span className={'input-group-text'}>홈페이지</span>
                            <input className={'form-control'} value={updatedCampInfo.campHpLink || ''}
                                   name="campHpLink"
                                   onChange={handleInputChange}/>
                        </div>

                        <div>
                    <textarea className={'form-control'} rows={8}
                              value={updatedCampInfo.campIntro || ''}
                              name="campIntro"
                              onChange={handleInputChange}></textarea>
                        </div>
                    </div>
                    <button type={'submit'} className={'btn btn-primary'}>수정하기</button>
                    <button type={'reset'} className={'btn btn-danger'} onClick={handleCancel}>취소하기</button>
                </form>
            ) : (
                <div className={'container text-center'}>
                    로딩 중...
                </div>
            )}
            <button type={'button'} className={'btn btn-success'} onClick={handleCampSite}>제발</button>
            <table className={'table table-hover table-striped'}>
                <tr>
                    <td>
                        {campSiteInfoList}
                    </td>
                </tr>
            </table>
        </div>
    );
}

export default PartnerCampDetail;
