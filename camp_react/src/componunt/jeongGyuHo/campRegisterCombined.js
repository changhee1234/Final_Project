import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as updatedCampSiteInfos from "react-bootstrap/ElementChildren";


function CampRegisterCombined(props) {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 현재 단계를 저장하는 상태 변수

    // campMainInfo 등록 인풋 state
    const [campName, setCampName] = useState('');
    const [campIntro, setCampIntro] = useState('');
    const [campDt, setCampDt] = useState(new Date());
    const [kidszoneYn, setKidszoneYn] = useState('N');
    const [campHpLink, setCampHpKink] = useState('');
    const [campPh, setCampPh] = useState('');
    const [campAddress, setCampAddress] = useState('');
    const [partner, setPartner] = useState({idx: 0});
    const [selectedFile, setSelectedFile] = useState(null);
    const campDeletedYn = 'N';
    const fileInputRef = useRef(null);


    // 파일 업로드
    const [selectedFileName, setSelectedFileName] = useState('');

    const [campMainTitleOriginImg, setCampMainTitleOriginImg] = useState(null); // 대표 이미지
    const [campMainLayoutOriginImg, setCampMainLayoutOriginImg] = useState(null); // 배치도 이미지
    const [campSiteOriginImg, setCampSiteOriginImg] = useState([]); //구역 이미지

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFileName(file.name);
        // 이후에 파일 업로드 등의 로직을 추가하면 됩니다.
    };

    // 대표 이미지 선택
    const handleRepresentativeImageChange = (e) => {
        const file = e.target.files[0];
        setCampMainTitleOriginImg(file);
    };

    // 배치도 이미지 선택
    const handleLayoutImageChange = (e) => {
        const file = e.target.files[0];
        setCampMainLayoutOriginImg(file);
    };

    // 구역 이미지 선택
    const handleAreaImageChange = (e, index) => {
        const file = e.target.files[0];
        setCampSiteOriginImg((prevImages) => {
            const newInfos = [...prevImages];
            newInfos[index] = file;
            return newInfos;
        });
    };


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
            siteDeletedYn: "N",
            areaSiteCnt: 0
        }
    ]);


    // 다음페이지로 이동
    const handleCampRegisterNext = (e) => {
        e.preventDefault();
        setStep(2); // 다음 단계로 변경
    }

    useEffect(() => {
        console.log(props.user.memberIdx);
        axios.get(`http://localhost:8080/camp/searchPartner/${props.user.memberIdx}`)
            .then((res) => {
                console.log(res.data);
                setPartner(prevPartner => ({...prevPartner, idx: res.data.idx}));
            })
            .catch((err) => {
                console.error(err);
            });
    }, [props.user.memberIdx]);


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
            siteDeletedYn: 'N',
            campSiteOriginImg: ''
        };

        setCampSiteInfos([...campSiteInfos, newCampSiteInfo])
    };
    // 최종등록
    // const handleCampRegister2Submit = (e) => {
    //     e.preventDefault();
    //
    //     if (selectedFile) {
    //         const formData = new FormData();
    //         formData.append('file', selectedFile);
    //
    //         axios.post('http://localhost:8080/camp/upload', formData)
    //             .then((uploadRes) => {
    //                 const imageUrl = uploadRes.data.imageUrl;
    //
    //                 // 이미지 URL을 포함하여 나머지 캠프 정보 서버에 전송
    //                 const campData = {
    //                     campName,
    //                     campIntro,
    //                     campDt: campDt.toISOString().substr(0, 16),
    //                     kidszoneYn,
    //                     campHpLink,
    //                     campPh,
    //                     campAddress,
    //                     partner,
    //                     campDeletedYn,
    //                     imageUrl: imageUrl, // 이미지 URL을 서버로 전송
    //                     campSiteInfos: handleAddCampSiteInfo, // campSiteInfos를 추가해야 함
    //                 };
    //
    //                 axios.post('http://localhost:8080/camp/Register', campData)
    //                     .then((res) => {
    //                         console.log(res.data.idx);
    //                         // ... 나머지 로직
    //                     })
    //                     .catch((err) => {
    //                         console.log(err);
    //                         alert('등록에 실패하였습니다.');
    //                     });
    //             })
    //             .catch((uploadErr) => {
    //                 console.log(uploadErr);
    //                 alert('파일 업로드에 실패했습니다.');
    //             });
    //     } else {
    //         // 선택된 파일이 없을 경우의 처리
    //         alert('파일을 선택해주세요.');
    //     }
    // };

    // 이미지 업로드 처리
    const handleImageUpload = (file) => {
        const formData = new FormData();
        formData.append('file', file);

        return axios.post('http://localhost:8080/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((uploadRes) => {
                return uploadRes.data.imageUrl; // 업로드된 이미지의 URL 반환
            })
            .catch((uploadErr) => {
                throw new Error('Image upload failed');
            });
    };


    // 최종등록 함수에서 구역 이미지 업로드 및 URL 저장 처리
    const handleCampRegister2Submit = async (e) => {
        e.preventDefault();

        try {
            // 대표 이미지 업로드 및 URL 저장 처리
            const campMainTitleNewImgUrl = await handleImageUpload(campMainTitleOriginImg);

            // 배치도 이미지 업로드 및 URL 저장 처리
            const campMainLayoutNewImgUrl = await handleImageUpload(campMainLayoutOriginImg);

            // 캠프 등록 API 호출 및 응답 처리
            const registerResponse = await axios.post('http://localhost:8080/camp/register', {
                campName,
                campIntro,
                campDt: campDt.toISOString().substr(0, 16),
                kidszoneYn,
                campHpLink,
                campPh,
                campAddress,
                partner,
                campDeletedYn,
                campMainTitleNewImg: campMainTitleNewImgUrl,
                campMainLayoutNewImg: campMainLayoutNewImgUrl,
            });

            const campRegisterIdx = registerResponse.data.idx; // 첫 번째 API 호출의 응답에서 idx 값 받아오기

            // 구역 이미지 업로드 및 URL 저장 처리
            const updatedCampSiteInfosWithImages = await Promise.all(
                campSiteInfos.map(async (info, index) => {
                    const campSiteNewImgUrl = await handleImageUpload(campSiteOriginImg[index]);
                    console.log(info);
                    return {
                        ...info,
                        campMainInfo: { idx: campRegisterIdx },
                        campSiteNewImg: campSiteNewImgUrl, // 업로드된 구역 이미지의 URL
                    };
                })
            );

            // 캠프 사이트 등록 API 호출 및 응답 처리
            const registerSiteResponse = await axios.post('http://localhost:8080/camp/register2', updatedCampSiteInfosWithImages);

            console.log(registerSiteResponse.data);
            alert('등록되었습니다.');
            navigate(`/`);
        } catch (error) {
            console.error(error);
            alert('등록에 실패하였습니다.');
        }
    };


return (
    <div className={'col-sm-8 mx-auto text-start'}>
        {step === 1 && (
            <form onSubmit={handleCampRegisterNext}>
                <h3>캠핑장 정보 입력</h3>
                {/*/!*매니저 번호(나중에 세션값으로 받아와 로그인과 연동(사라질 것)*!/*/}
                {/*<div className={'my-3'}>*/}
                {/*    <label className={'form-label'} htmlFor={'partner'}>회원번호(없애고 로그인과 연동) : </label>*/}
                {/*    <input className={'form-control'} id={'partner'} value={partner.idx}*/}
                {/*           onChange={(e) => setPartner({...partner, idx: e.target.value})}/>*/}
                {/*</div>*/}

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
                <div className="my-3 input-group">
                    <div className="input-group">
                        <label htmlFor="customFileInput" className="input-group-text">대표 이미지 : </label>
                        <input
                            type="file"
                            className="form-control"
                            name="file"
                            ref={fileInputRef}
                            onChange={handleRepresentativeImageChange}
                            // style={{ display: 'none' }}
                        />
                    </div>
                </div>
                <div className="my-3 input-group">
                    <div className="input-group">
                        <label htmlFor="customFileInput" className="input-group-text">배치도 이미지 : </label>
                        <input
                            type="file"
                            className="form-control"
                            name="file"
                            ref={fileInputRef}
                            onChange={handleLayoutImageChange}
                            // style={{ display: 'none' }}
                        />
                    </div>
                </div>


                {/*캠프설명*/}
                {/* 캠프설명 */}
                <div className={'my-3'}>
                    <label htmlFor={'campIntro'} className={'form-label'}>캠프설명</label>
                    <ReactQuill
                        id={'campIntro'}
                        value={campIntro}
                        onChange={setCampIntro}
                        style={{height: "300px"}}
                        theme="snow" // 테마 선택 (snow, bubble 등)
                    />
                </div>
                <div className={'d-flex justify-content-end my-5'}>
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
                        <h3>캠핑장 구역 정보 입력</h3>
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
                            <div className="my-3 input-group">
                                <div className="input-group">
                                    <label htmlFor="customFileInput" className="input-group-text">구역 이미지 : </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="file"
                                        ref={fileInputRef}
                                        onChange={(e) => handleAreaImageChange(e, index)}
                                        // style={{ display: 'none' }}
                                    />
                                </div>
                            </div>
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
                            <ReactQuill
                                id={`notice-${index}`}
                                value={campSiteInfo.notice}
                                onChange={(value) => {
                                    setCampSiteInfos((prevInfos) => {
                                        const newInfos = [...prevInfos];
                                        newInfos[index].notice = value;
                                        return newInfos;
                                    });
                                }}
                                theme="snow"
                                style={{height: "300px"}}
                            />
                        </div>


                    </div>
                ))}
                <div className={'row my-5'}>
                    <div className={'col-sm-12'}>
                        <div className={'d-grid'}>
                            <button className={'btn btn-secondary'} onClick={handleAddCampSiteInfo}
                                    type={'button'}>+
                            </button>
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
