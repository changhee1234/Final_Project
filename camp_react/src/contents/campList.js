import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useLocation} from "react-router-dom"


const {kakao} = window;
const places = new kakao.maps.services.Places();
// 카카오맵 사이즈
const mapSize = {
    width: '100%', height: '800px'
};
// 임시 캠핑장 이미지
const campImg = {
    backgroundColor: '#c4c4c4', width: '100%', height: '100%'
}

function CampList(props) {

    // 서버와의 통신으로 캠핑장 정보 리스트 가져오기
    const [campList, setCampList] = useState([]);

    useEffect(() => {
        // GET방식으로 스프링 서버와 통신
        axios.get('http://localhost:8080/camp')
            .then(res => {
                console.log('통신 성공');

                console.log(res.data);
                // 통신을 통해 가져온 data campList에 넣기
                setCampList(res.data);
            })
            .catch(err => {
                console.log('통신 실패');
                console.log({err});
            })
    }, [])

    // 카카오맵
    const [searchKeyword, setSearchKeyword] = useState(""); //검색하는 키워드
    const [searchResults, setSearchResults] = useState([]); //검색 결과
    const [map, setMap] = useState(null); // 지도
    const [markers, setMarkers] = useState([]); //마커
    const [infowindow, setInfowindow] = useState(null); //인포윈도우

    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            // 기본 좌표값
            center: new kakao.maps.LatLng(33.45701, 126.570667), // 디폴트 좌표
            level: 3 //확대정도
        };
        const map = new kakao.maps.Map(container, options);
        setMap(map);
    }, []);

    useEffect(() => {
        if (searchKeyword) {
            const callback = function (result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    setSearchResults(result);
                    showSearchResultsOnMap(result);
                }
            };
            places.keywordSearch(searchKeyword, callback);
        }
    }, [searchKeyword]);


    // 리스트에서 이름 클릭시 카카오맵에 마커, 인포윈도우 표시
    const showSearchResultsOnMap = (results) => {
        clearMarkers(); //검색전 마커 초기화

        // 마커 띄우기
        const newMarkers = results.map(result => {
            const marker = new kakao.maps.Marker({
                map: map, position: new kakao.maps.LatLng(result.y, result.x)
            });

            showInfowindow(result, marker); // 인포윈도우 표시

            return marker;
        });

        setMarkers(newMarkers);
        fitMapToMarkers(newMarkers);


    };

    // 검색 시 이미 그려져있는 마커 지우기
    const clearMarkers = () => {
        markers.forEach(marker => marker.setMap(null));
        setMarkers([]);
    };


    const fitMapToMarkers = (markers) => {
        if (map && markers.length > 0) {
            const bounds = new kakao.maps.LatLngBounds();
            markers.forEach(marker => {
                bounds.extend(marker.getPosition());
            });
            map.setBounds(bounds);
        }
    };

    // 인포윈도우 띄우기
    const showInfowindow = (result, marker) => {
        if (infowindow) {
            infowindow.close();
        }

        // 화면에 띄워지는 인포윈도우의 모양
        const content = `
        <div>
            <div class="card">
                <div class="card-body" style="width: 400px">
                    <h3 class="card-title d-flex justify-content-start">${result.place_name}</h3>
                    <p class="card-text d-flex justify-content-start"><strong>주소 : </strong> ${result.address_name}</p>
                    <p class="card-text d-flex justify-content-start"><strong>전화번호 : </strong> ${result.phone}</p>
                </div>
            </div>
        </div>
    `;

        // 새로 검색 시 인포윈도우 다시 띄우기
        const newInfowindow = new kakao.maps.InfoWindow({
            content: content, removable: true
        });

        // 키워드로 검색 시 새로운 맵과 마커, 인포윈도우 띄우기
        newInfowindow.open(map, marker);
        setInfowindow(newInfowindow);
    };

    // 카드 타이틀 입력 시 지도에 인포윈도우, 마커 표시
    const handleCardClick = (campName) => {
        // setSearchKeyword(campName); // 검색 키워드 설정
        //
        // // 선택한 카드의 정보 찾기
        // const selectedCamp = searchedCampList.find((camp) => camp.campName === campName);
        // setSelectedCampInfo(selectedCamp);

        setSearchKeyword(campName); // 검색 키워드 설정
        setQuery(campName); // 검색어로 설정

        // 선택한 카드의 정보 찾기
        const selectedCamp = searchedCampList.find((camp) => camp.campName === campName);
        setSelectedCampInfo(selectedCamp);
    };

    const itemsPerPage = 5; // 한 페이지에 표시할 아이템 수

    const [currentPage, setCurrentPage] = useState(1); //현재 페이지
    const totalItems = campList.length; //화면에 띄워지는 아이템갯수
    const totalPages = Math.ceil(totalItems / itemsPerPage); //총 페이지 수

// 현재 페이지에서 표시할 아이템의 인덱스 범위 계산
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    // 페이지 이동 프로세스
    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 다음 페이지 버튼
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    };

    // 전 페이지 버튼
    const goToPrevPage = () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    };

    // 캠핑장 검색 관련 상태
    const [searchCampName, setSearchCampName] = useState(""); // 검색할 캠핑장 이름
    const [searchedCampList, setSearchedCampList] = useState([]); // 검색 결과 리스트

// 캠핑장 리스트를 필터링하여 검색 결과 업데이트
    useEffect(() => {
        const filteredCamps = campList.filter((camp) =>
            camp.campName.includes(searchCampName)
        );
        setSearchedCampList(filteredCamps);
    }, [campList, searchCampName]);

// 캠핑장 이름 검색 입력 변경 처리
    const handleSearchInputChange = (event) => {
        setSearchCampName(event.target.value);
    };

    // 캠핑장 검색 버튼 클릭 처리
    const handleSearchButtonClick = () => {
        // 사용자가 검색 버튼을 클릭하면 검색어를 통해 캠핑장 리스트를 필터링하여 검색 결과 업데이트
        const filteredCamps = campList.filter((camp) =>
            camp.campName.includes(searchCampName)
        );
        setSearchedCampList(filteredCamps);
    };

    // 상세보기
    const [selectedCampInfo, setSelectedCampInfo] = useState(null);


    // 네이버 블로그 검색
    const [query, setQuery] = useState("");
    const [blogSearchResults, setBlogSearchResults] = useState([]);
    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/naver/blog?query=${query}`);
            setBlogSearchResults(response.data.items);
        } catch (error) {
            console.error("Error:", error);
        }
    };


    return (
        <div className={'row'}>
            {/* 캠핑장 리스트 컬럼 */}
            <div className={'col-sm-4 border-end'} style={{ maxHeight: '800px', overflowY: 'auto' }}>
                {!selectedCampInfo && (
                    <div className={'row'}>
                        <div className={'col-sm-7'}>
                            <div className={'d-flex justify-content-start'}>
                                <input
                                    className={'form-control me-2'}
                                    type={'text'}
                                    value={searchCampName}
                                    onChange={handleSearchInputChange}
                                    placeholder={'캠핑장 이름 검색'}
                                />
                                <button
                                    type={'button'}
                                    className={'btn btn-primary'}
                                    onClick={handleSearchButtonClick}
                                >
                                    검색
                                </button>
                            </div>
                        </div>
                        <div className={'col-sm-5'}>
                            {/* 페이지네이션 */}
                            <div className="pagination d-flex justify-content-end mt-4">
                                <button
                                    onClick={goToPrevPage}
                                    disabled={currentPage === 1}
                                    className={'btn btn-light me-2'}
                                >
                                    이전
                                </button>
                                <span className={'align-self-center me-2'}>
                                {currentPage} / {totalPages}
                            </span>
                                <button
                                    onClick={goToNextPage}
                                    disabled={currentPage === totalPages}
                                    className={'btn btn-light'}
                                >
                                    다음
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 캠핑장 리스트 또는 선택한 카드 정보 표시 */}
                {!selectedCampInfo ? (
                    searchedCampList.length === 0 ? (
                        // 검색 결과가 없는 경우 메시지 표시
                        <h4 className={'text-center my-3'}>검색 결과가 없습니다.</h4>
                    ) : (
                        // 검색 결과가 있는 경우 리스트 표시
                        searchedCampList.slice(startIndex, endIndex).map((camp) => (
                            <div
                                className={'card my-3'}
                                key={camp.idx}
                                onClick={() =>
                                    handleCardClick(camp.campName)
                                }
                            >
                                <div className={'card-body'}>
                                    <div className={'row'}>
                                        <div className={'col-sm-4 my-auto'}>
                                        <span style={campImg}>
                                            <img
                                                src={'/campImg/img.png'}
                                                className={'img-fluid'}
                                            />
                                        </span>
                                        </div>
                                        <div className={'col-sm-8 my-auto'}>
                                            <a
                                                className={'d-flex justify-content-start card-title text-decoration-none fs-3'}
                                            >
                                                {camp.campName}
                                            </a>
                                            <p className={'d-flex justify-content-start card-text'}>
                                                <strong>전화번호 : </strong>
                                                {camp.campPh}
                                            </p>
                                            <p className={'d-flex justify-content-start card-text'}>
                                                <strong>주소 : </strong>
                                                {camp.campAddress}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                ) : (
                    <div className={''} style={{ maxHeight: '800px', overflowY: 'auto' }}>

                        {/*상세정보 이름*/}
                        <div className={'border-bottom'}>
                            <div className={'my-3 justify-content-start d-flex'}>
                                <h2 className={'fw-bold ms-3'}>{selectedCampInfo.campName}</h2>
                                <i className="ms-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                         className="bi bi-heart" viewBox="0 0 16 16">
                                        <path
                                            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                    </svg>
                                </i>
                            </div>
                        </div>

                        {/*기본 정보*/}
                        <div className={'border-bottom'}>
                            <div className={'ms-5 my-4'}>
                                <p className={'fs-5 justify-content-start d-flex'}>{selectedCampInfo.campAddress}</p>
                                <p className={'fs-5 justify-content-start d-flex'}>{selectedCampInfo.campPh}</p>
                            </div>
                        </div>

                        <div className={'border-bottom'}>
                            <div className={'d-flex justify-content-around my-3 mx-5'}>
                                {/*예약아이콘*/}
                                <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="58" fill="currentColor"
                                         className="bi bi-journal-check" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                              d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                        <path
                                            d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                                        <path
                                            d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                                    </svg>
                                </i>

                                {/*홈페이지아이콘*/}
                                <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor"
                                         className="bi bi-house" viewBox="0 0 16 16">
                                        <path
                                            d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
                                    </svg>
                                </i>

                                {/*공유아이콘*/}
                                <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor"
                                         className="bi bi-share-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                                    </svg>
                                </i>
                            </div>
                        </div>

                        <div>
                            <h4>상세보기</h4>
                            <p>{selectedCampInfo.campIntro}</p>
                        </div>

                        <div>
                            <input
                                className={'form-control'}
                                type="text"
                                placeholder="검색어 입력"
                                value={query}
                                onChange={(event) => {
                                    setQuery(event.target.value);
                                }}

                            />
                            <button className={'btn btn-primary'} onClick={handleSearch}>검색</button>
                            <div>
                                <h2>검색 결과:</h2>
                                <ul>
                                    {blogSearchResults.map((item, index) => (
                                        <li key={index}>
                                            <h3 dangerouslySetInnerHTML={{ __html: item.title }}></h3>
                                            <p>
                                                블로그 주소: <a href={item.bloggerlink}>{item.bloggername}</a>
                                            </p>
                                            <p>
                                                작성일: {item.postdate}
                                            </p>
                                            <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
                                            <hr />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 카카오맵 컬럼 */}
            <div className={'col-sm-8'}>
                <div id="map" style={mapSize}></div>
            </div>
        </div>
    );

}

export default CampList;