import React, { useState, useEffect } from 'react';
import axios from '../layout/axios';
import './PartnerApplicationComponent.css';

function PartnerApplicationComponent() {
    const [partnerList, setPartnerList] = useState([
        // {
        //     member: {idx : 0}
        // }
    ]);

    useEffect(() => {
        fetchPartnerList();
    }, []);

    const fetchPartnerList = async () => {
        try {
            const response = await axios.get('/partnerList');
            setPartnerList(response.data);
        } catch (error) {
            console.error('파트너 신청 목록을 가져오는 데 실패했습니다.', error);
        }
    };
    const handlePartnerAccessChange = async (memberIdx, newValue) => {
        try {
            const formData = new FormData();
            formData.append('memberIdx', memberIdx);
            formData.append('newValue', newValue);
            await axios.post('/updatePartnerAccess', formData);
            await fetchPartnerList();
        } catch (error) {
            console.error('변경사항을 저장하는 데 실패했습니다.', error);
        }
    };

    return (
        <div>
            <h3>파트너 신청 목록</h3>
            <table className="table">
                <thead>
                <tr>
                    <th>목록</th>
                    <th>업체 이름</th>
                    <th>업체번호</th>
                    <th>사업자 등록번호</th>
                    <th>우편번호</th>
                    <th>주소1</th>
                    <th>주소2</th>
                    <th>회원번호</th>
                    <th>파트너 유무</th>
                    <th>권한 설정</th>
                </tr>
                </thead>
                <tbody>
                {partnerList.map((partner) => (
                    <tr key={partner.idx}>
                        <td>{partner.idx}</td>
                        <td>{partner.partnerName}</td>
                        <td>{partner.partnerPhone}</td>
                        <td>{partner.partnerNum}</td>
                        <td>{partner.addressNum}</td>
                        <td>{partner.address}</td>
                        <td>{partner.addressDetail}</td>
                        <td>{partner.memberIdx.memberIdx}</td>
                        <td>{partner.partnerAccess}</td>
                        <td>
                            <select
                                value={partner.partnerAccess}
                                onChange={(e) => handlePartnerAccessChange(partner.memberIdx.memberIdx, e.target.value)}
                            >
                                <option value="Y">Y</option>
                                <option value="N">N</option>
                            </select>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default PartnerApplicationComponent;


