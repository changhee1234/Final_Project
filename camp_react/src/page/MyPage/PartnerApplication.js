import React, {useEffect, useState} from 'react';
import DaumPostcode from 'react-daum-postcode';
import './PartnerApplication.css'
import axios from "axios";

function PartnerApplication({ user }) {
    const [openPostcode, setOpenPostcode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [partner, setPartner] = useState({
        partnerName: '',
        partnerPhone: '',
        partnerNum: '',
        addressNum: '',
        address: '',
        addressDetail: '',
        memberIdx: user ? user.memberIdx : null
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setPartner((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleSelectAddress = (data) => {
        const { address, zonecode } = data;
        setPartner((prevPartnerInfo) => ({
            ...prevPartnerInfo,
            addressNum: zonecode,
            address: address,
        }));
        setShowModal(false); // 모달 닫기
    };

    const handleTogglePostcode = () => {
        setOpenPostcode((current) => !current);
    };

    const handleBusinessNumberChange = (event) => {
        const formattedNumber = event.target.value;
        setPartner((prevPartnerInfo) => ({
            ...prevPartnerInfo,
            partnerNum: formattedNumber,
        }));
    };

    const [registrationComplete, setRegistrationComplete] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/addPartner', partner); // API 엔드포인트와 요청 데이터 전달
            console.log('서버 응답:', response.data); // 서버의 응답을 확인

            alert('파트너 신청이 완료되었습니다.'); // 경고창을 띄웁니다.
        } catch (error) {
            console.error('서버 요청 실패:', error);
            // 에러 처리를 원하는 방식으로 구현하세요.
        }
    };

    const handleOpenModal = () => {
        setOpenPostcode(true);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setOpenPostcode(false);
        setShowModal(false);
    };

    const formatPhoneNumber = (phone) => {
        const numbers = phone.replace(/\D/g, ''); // 숫자 이외의 문자 제거
        if (numbers.length === 10) {
            return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`;
        } else if (numbers.length === 11) {
            return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
        }
        return phone;
    };

    return (
        <div className="my-5">
            <div className="my-5">
                <h3 className="mt-5 pt-5">파트너 등록</h3>
                <form onSubmit={handleSubmit} className="formContainer">
                    <div className="formGroup">
                        <label className="label">업체 이름</label>
                        <input
                            type="text"
                            name="partnerName"
                            value={partner.partnerName}
                            onChange={handleInputChange}
                            required
                            className="input"
                        />
                    </div>
                    <div className="formGroup">
                        <label className="label">업체 전화번호</label>
                        <input
                            type="tel"
                            name="partnerPhone"
                            value={formatPhoneNumber(partner.partnerPhone)}
                            onChange={handleInputChange}
                            required
                            className="input"
                            pattern="\d{3}-?\d{3}-?\d{4}" // xxx-xxx-xxxx 혹은 xxxxxxxxxx 형식 허용
                            title="전화번호 형식에 맞게 입력해주세요 (xxx-xxx-xxxx 혹은 xxxxxxxxxx)"
                        />
                    </div>
                    <div className="formGroup">
                        <label className="label">사업자 등록번호</label>
                        <input
                            type="text"
                            name="partnerNum"
                            value={partner.partnerNum}
                            onChange={handleBusinessNumberChange}
                            required
                            className="input"
                            pattern="\d{3}-?\d{2}-?\d{5}" // xxx-xx-xxxxx 혹은 xxxxxxxxx 형식 허용
                            title="사업자 등록번호 형식에 맞게 입력해주세요 (xxx-xx-xxxxx 혹은 xxxxxxxxx)"
                        />
                    </div>
                    <div className="formGroup">
                        <label className="label">우편번호</label>
                        <div className="postcodeInputGroup">
                            <input
                                type="text"
                                name="addressNum"
                                value={partner.addressNum}
                                onChange={handleInputChange}
                                readOnly
                                className="postcodeInput"
                            />
                            <button
                                type="button"
                                onClick={handleOpenModal}
                                className="postcodeButton"
                            >
                                우편번호 찾기
                            </button>
                        </div>
                    </div>
                    <div className="formGroup">
                        <label className="label">주소</label>
                        <input
                            type="text"
                            name="address"
                            value={partner.address}
                            onChange={handleInputChange}
                            readOnly
                            className="input"
                        />
                    </div>
                    <div className="formGroup">
                        <label className="label">상세주소</label>
                        <input
                            type="text"
                            name="addressDetail"
                            value={partner.addressDetail}
                            onChange={handleInputChange}
                            className="input"
                        />
                    </div>
                    <button type="submit" className="submitButton">
                        등록
                    </button>
                </form>

                {/* 모달 */}
                {showModal && (
                    <div className="modalContainer" onClick={handleCloseModal}>
                        <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                            <button onClick={handleCloseModal} className="modalCloseButton">
                                닫기
                            </button>
                            <DaumPostcode
                                onComplete={handleSelectAddress}
                                autoClose={false}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PartnerApplication;

