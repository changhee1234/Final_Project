import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function PartnerCampDetail(props) {
    const navigate = useNavigate();
    // camp_main_info 입력관련 state 관리
    const [campSiteInfo, setCampSiteInfo] = useState([]);
    const [partnerIdx, setPartnerIdx] = useState(0);
    const {campIdx} = useParams(); // Get campIdx from URL parameter
    const [campDetails, setCampDetails] = useState(null);
    const [updatedCampInfo, setUpdatedCampInfo] = useState({
        campIdx: campIdx,
        campName: '',
        campIntro: '',
        kidszoneYn: 'N',
        campHpLink: '',
        campPh: '',
        campAddress: '',
        partner: {
            idx: 0
        }
    });

    const [desc, setDesc] = useState('');
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            [{ 'align': [] }, { 'color': [] }, { 'background': [] }],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
        'align', 'color', 'background',
    ];

    function onEditorChange(value) {
        setDesc(value)
    }

    const intCampIdx = parseInt(campIdx);

    const [selectedArea, setSelectedArea] = useState([
        {
            idx: 0,
            campMainInfo: {idx: campIdx,},
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
        },
    ]);
    const [editingArea, setEditingArea] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8080/camp/partnerCampDetail/${campIdx}`)
            .then(res => {
                console.log(res.data); // 응답 데이터를 콘솔에 기록
                setCampDetails(res.data);
                setPartnerIdx(res.data.partnerIdx);
                setUpdatedCampInfo({...res.data});
                setUpdatedCampInfo({
                    campIdx: res.data.campIdx,
                    campName: res.data.campName,
                    campIntro: res.data.campIntro,
                    kidszoneYn: res.data.kidszoneYn,
                    campHpLink: res.data.campHpLink,
                    campPh: res.data.campPh,
                    campAddress: res.data.campAddress,
                    partner: {
                        idx: partnerIdx // 응답 데이터에서 partnerIdx 설정
                    }
                });
                setDesc(res.data.campIntro);

                axios.get(`http://localhost:8080/camp/partnerCampSiteDetail/${intCampIdx}`)
                    .then((res) => {
                        console.log(res.data);
                        // setCampSiteInfo(res.data);

                        const filteredData = res.data.filter(item => item.siteDeletedYn === 'N');
                        setCampSiteInfo(filteredData);
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            })
            .catch(err => {
                console.log(`에러: ${err}`);
            });
    }, [campIdx]);

    if (!campDetails) {
        return <div>로딩 중...</div>;
    }


    const handleMainInfoDeleteButton = (e) => {
        e.preventDefault();

        axios.delete(`http://localhost:8080/camp/partnerCampDetail/${campIdx}`)
            .then((res) => {
                console.log(res.data);
                alert("삭제되었습니다");
                navigate(`/myPage/${props.user.nickName}`);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const handleSiteInfoDeleteButton = (e) => {
        e.preventDefault();

        const deletedArea = {
            ...selectedArea[0],
            idx: selectedArea[0].idx,
        };

        const campInfoIdx = parseInt(deletedArea.idx);
        axios.delete(`http://localhost:8080/camp/partnerCampSiteDetail/${campInfoIdx}`)
            .then((res) => {
                console.log(res.data);
                alert("삭제되었습니다.");
                navigate(`/myPage/${props.user.nickName}`);

            })
            .catch((err) => {
                console.error(err);
            })
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
        const updatedDataWithPartnerIdx = {
            ...updatedCampInfo,
            campIntro: desc,
            partner: {
                idx: partnerIdx
            }
        };

        axios.put(`http://localhost:8080/camp/partnerCampDetail/${campIdx}`, updatedDataWithPartnerIdx)
            .then(res => {
                console.log("캠프 상세 정보가 성공적으로 업데이트되었습니다:", res.data);
                setPartnerIdx(res.data.partnerIdx);
                setUpdatedCampInfo({
                    campIdx: res.data.campIdx,
                    campName: res.data.campName,
                    campIntro: res.data.campIntro,
                    // campDt: res.data.campDt,
                    kidszoneYn: res.data.kidszoneYn,
                    campHpLink: res.data.campHpLink,
                    campPh: res.data.campPh,
                    campAddress: res.data.campAddress,
                    partner: {
                        idx: partnerIdx // 응답 데이터에서 partnerIdx 설정
                    }
                });
                setCampDetails(updatedDataWithPartnerIdx); // 업데이트된 데이터로 campDetails 업데이트
            })
            .catch(err => {
                console.log("캠프 상세 정보 업데이트 중 오류 발생:", err);
            });
    };

    const handleAreaEditClick = () => {
        setEditingArea(true);
    };

    const handleAreaEditSubmit = (e) => {
        e.preventDefault();

        const newArea = {
            ...selectedArea[0], // 현재 선택된 구역 정보를 복제
            idx: selectedArea[0].idx,
            areaName: selectedArea[0].areaName, // 여기에 구역명과 관련된 속성을 업데이트
            campStyle: selectedArea[0].campStyle,
            addPrice: selectedArea[0].addPrice,
            areaSiteCnt: selectedArea[0].areaSiteCnt,
            campReservePeriod: selectedArea[0].campReservePeriod,
            elePrice: selectedArea[0].elePrice,
            notice: selectedArea[0].notice,
            parkPrice: selectedArea[0].parkPrice,
            peopleMax: selectedArea[0].peopleMax,
            peopleMin: selectedArea[0].peopleMin,
            sitePrice: selectedArea[0].sitePrice,
            partner: {
                idx: partnerIdx,
            },
        };
        const campSiteInfoIdx = parseInt(selectedArea[0].idx);

        axios.put(`http://localhost:8080/camp/partnerCampSiteDetail/${campSiteInfoIdx}`, newArea)
            .then((res) => {
                console.log(res.data);
                alert('수정되었습니다.');

                navigate(`/detailPartnerCamp/${campIdx}`);

            })
            .catch((err) => {
                console.error(err);
            })
        setSelectedArea([newArea]); // 수정된 구역 정보로 setSelectedArea 업데이트
        setEditingArea(false);
    }

    const handleCancel = () => {
        navigate(`/myPage/${props.user.nickName}`);
    };

    return (
        <div className={'col-sm-8 mx-auto text-start'}>
            <h3 className={'my-3'}>캠핑장 정보 수정하기</h3>
            {campDetails ? (
                <form onSubmit={handleSubmit}>
                    <div className={'row my-3'}>
                        <div className={'col-sm-3'}>
                            <div className={'input-group'}>
                                <span className={'input-group-text'}>등록일자</span>
                                <input className={'form-control'}
                                    value={`${campDetails.campDt[0]}-${campDetails.campDt[1]}-${campDetails.campDt[2]}`}
                                       readOnly={true}/>

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

                        <div className={'my-3 d-grid'}>
                            <ReactQuill
                                value={desc}
                                onChange={onEditorChange}
                                modules={modules}
                                formats={formats}
                                // style={{ width: "800px", height: "300px" }}
                                style={{ height: "300px" }}

                            />
                        </div>
                    </div>


                    <div className={'row my-5'}>
                        <div className={'d-flex justify-content-end'}>
                            <button type={'submit'} className={'btn btn-primary me-3'}>수정하기</button>
                            <button type={'reset'} className={'btn btn-danger'}
                                    onClick={handleMainInfoDeleteButton}>삭제하기
                            </button>
                        </div>
                    </div>
                </form>
            ) : (
                <div className={'container text-center'}>
                    로딩 중...
                </div>
            )}

            <div className={'row my-4'}>
                <h3 className={'my-3'}>구역 수정하기</h3>
                <div className={'d-flex justify-content-between'}>
                    <div className={'col-sm-9'}>
                        {editingArea ? (
                            <div>

                                <div className={'my-3 row'}>
                                    <div className={'col-sm-7'}>
                                        <div className={'input-group'}>
                                            <span className={'input-group-text'}>구역이름</span>
                                            <input
                                                type={'text'}
                                                className={'form-control'}
                                                value={selectedArea[0].areaName}
                                                onChange={(e) => {
                                                    const newValue = e.target.value;
                                                    setSelectedArea(prevAreas => [{
                                                        ...prevAreas[0],
                                                        areaName: newValue
                                                    }]);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className={'col-sm-5'}>
                                        <div className={'input-group'}>
                                            <span className={'input-group-text'}>캠프스타일</span>
                                            <input
                                                type={'text'}
                                                className={'form-control'}
                                                value={selectedArea[0].campStyle}
                                                onChange={(e) => {
                                                    const newValue = e.target.value;
                                                    setSelectedArea(prevAreas => [{
                                                        ...prevAreas[0],
                                                        campStyle: newValue
                                                    }]);
                                                }}/>
                                        </div>
                                    </div>
                                </div>

                                <div className={'my-3 row'}>
                                    <div className={'col-sm-6'}>
                                        <div className={'input-group'}>
                                            <span className={'input-group-text'}>구역 가격</span>
                                            <input
                                                type={'number'}
                                                className={'form-control'}
                                                value={selectedArea[0].sitePrice}
                                                onChange={(e) => {
                                                    const newValue = e.target.value;
                                                    setSelectedArea(prevAreas => [{
                                                        ...prevAreas[0],
                                                        sitePrice: newValue
                                                    }]);
                                                }}/>
                                            <span className={'input-group-text'}>원</span>
                                        </div>
                                    </div>

                                    <div className={'col-sm-6'}>
                                        <div className={'input-group'}>
                                            <span className={'input-group-text'}>인원당 추가금액</span>
                                            <input
                                                type={'number'}
                                                className={'form-control'}
                                                value={selectedArea[0].addPrice}
                                                onChange={(e) => {
                                                    const newValue = e.target.value;
                                                    setSelectedArea(prevAreas => [{
                                                        ...prevAreas[0],
                                                        addPrice: newValue
                                                    }]);
                                                }}/>
                                            <span className={'input-group-text'}>원</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={'my-3 row'}>
                                    <div className={'col-sm-4'}>
                                        <div className={'input-group'}>
                                            <span className={'input-group-text'}>최소 인원</span>
                                            <input
                                                type={'number'}
                                                className={'form-control'}
                                                value={selectedArea[0].peopleMin}
                                                onChange={(e) => {
                                                    const newValue = e.target.value;
                                                    setSelectedArea(prevAreas => [{
                                                        ...prevAreas[0],
                                                        peopleMin: newValue
                                                    }]);
                                                }}/>
                                            <span className={'input-group-text'}>명</span>
                                        </div>
                                    </div>

                                    <div className={'col-sm-4'}>
                                        <div className={'input-group'}>
                                            <span className={'input-group-text'}>최대 인원</span>
                                            <input
                                                type={'number'}
                                                className={'form-control'}
                                                value={selectedArea[0].peopleMax}
                                                onChange={(e) => {
                                                    const newValue = e.target.value;
                                                    setSelectedArea(prevAreas => [{
                                                        ...prevAreas[0],
                                                        peopleMax: newValue
                                                    }]);
                                                }}/>
                                            <span className={'input-group-text'}>명</span>
                                        </div>
                                    </div>

                                    <div className={'col-sm-4'}>
                                        <div className={'input-group'}>
                                            <span className={'input-group-text'}>최대예약기간</span>
                                            <input
                                                type={'number'}
                                                className={'form-control'}
                                                value={selectedArea[0].campReservePeriod}
                                                onChange={(e) => {
                                                    const newValue = e.target.value;
                                                    setSelectedArea(prevAreas => [{
                                                        ...prevAreas[0],
                                                        campReservePeriod: newValue
                                                    }]);
                                                }}/>
                                            <span className={'input-group-text'}>일</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={'row my-3'}>
                                    <div className={'col-sm-6'}>
                                        <div className={'input-group'}>
                                            <span className={'input-group-text'}>주차비</span>
                                            <input
                                                type={'number'}
                                                className={'form-control'}
                                                value={selectedArea[0].parkPrice}
                                                onChange={(e) => {
                                                    const newValue = e.target.value;
                                                    setSelectedArea(prevAreas => [{
                                                        ...prevAreas[0],
                                                        parkPrice: newValue
                                                    }]);
                                                }}/>
                                            <span className={'input-group-text'}>원</span>
                                        </div>
                                    </div>

                                    <div className={'col-sm-6'}>
                                        <div className={'input-group'}>
                                            <span className={'input-group-text'}>캠핑카 전기사용 비용</span>
                                            <input
                                                type={'number'}
                                                className={'form-control'}
                                                value={selectedArea[0].elePrice}
                                                onChange={(e) => {
                                                    const newValue = e.target.value;
                                                    setSelectedArea(prevAreas => [{
                                                        ...prevAreas[0],
                                                        elePrice: newValue
                                                    }]);
                                                }}/>
                                            <span className={'input-group-text'}>원</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={'my-3 row'}>
                                    <div className={'d-flex justify-content-end'}>
                                        <div className={'col-sm-6'}>
                                            <div className={'input-group'}>
                                                <span className={'input-group-text'}>총 자리수</span>
                                                <input
                                                    type={'number'}
                                                    className={'form-control'}
                                                    value={selectedArea[0].areaSiteCnt}
                                                    onChange={(e) => {
                                                        const newValue = e.target.value;
                                                        setSelectedArea(prevAreas => [{
                                                            ...prevAreas[0],
                                                            areaSiteCnt: newValue
                                                        }]);
                                                    }}/>
                                                <span className={'input-group-text'}>석</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={'my-3'}>
                                    <label htmlFor={'notice'} className={'form-label'}>주의사항</label>
                                    <textarea
                                        row={8}
                                        className={'form-control'}
                                        id={'notice'}
                                        value={selectedArea[0].notice}
                                        onChange={(e) => {
                                            const newValue = e.target.value;
                                            setSelectedArea(prevAreas => [{
                                                ...prevAreas[0],
                                                notice: newValue
                                            }]);
                                        }}/>
                                </div>
                            </div>
                        ) : (
                            <div className={'input-group'}>
                                <span className={'input-group-text'}>캠프 구역</span>
                                <select
                                    className={'form-select'}
                                    // value={selectedArea[0] ? selectedArea[0].idx : ""}
                                    value={selectedArea.length > 0 ? selectedArea[0].idx : ""}
                                    onChange={(e) => {
                                        const selectedIdx = parseInt(e.target.value);
                                        const selectedAreaInfo = campSiteInfo.find(area => area.idx === selectedIdx);

                                        setSelectedArea([selectedAreaInfo]);
                                        setUpdatedCampInfo({
                                            ...updatedCampInfo,
                                            campStyle: selectedAreaInfo.campStyle,
                                            addPrice: selectedAreaInfo.addPrice,
                                        });
                                    }}
                                >
                                    <option value="" readonly={true}>구역명</option>
                                    {campSiteInfo.map((area) => (
                                        <option key={area.idx} value={area.idx}>
                                            {area.areaName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    {editingArea ? (

                        <div className={'col-sm-2'}>
                            <div className={'row my-3'}>
                                <div className={'d-grid'}>
                                    <button
                                        type={'submit'}
                                        className={'btn btn-success'}
                                        onClick={handleAreaEditSubmit}
                                    >
                                        구역 수정 완료
                                    </button>
                                </div>
                            </div>

                            <div className={'row'}>
                                <div className={'d-grid'}>
                                    <button
                                        type={'submit'}
                                        className={'btn btn-danger'}
                                        onClick={handleSiteInfoDeleteButton}
                                    >
                                        구역 삭제
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={'col-sm-2'}>
                            <div className={'d-grid'}>
                                <button
                                    type={'button'}
                                    className={'btn btn-primary'}
                                    onClick={handleAreaEditClick}
                                >
                                    구역 수정하기
                                </button>
                            </div>
                        </div>

                    )}
                </div>
            </div>
            <div className={'d-grid'}><button type={'reset'} className={'btn btn-secondary my-3'} onClick={handleCancel}>취소하기</button></div>
        </div>
    );
}

export default PartnerCampDetail;