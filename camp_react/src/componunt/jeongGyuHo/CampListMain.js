import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function CampListMain(props) {
    const [campList, setCampList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const chunkArray = (arr, size) => {
        const chunkedArr = [];
        for (let i = 0; i < arr.length; i += size) {
            chunkedArr.push(arr.slice(i, i + size));
        }
        return chunkedArr;
    }

    const campsPerPage = 8;
    const campListChunks = chunkArray(campList, campsPerPage);
    const currentCampList = campListChunks[currentPage - 1] || [];

    useEffect(() => {
        axios.get('http://localhost:8080/camp/list')
            .then((res) => {
                console.log(res.data);
                setCampList(res.data);
            })
            .catch((err) => {
                console.error(err);
            })
    }, []);

    return (
        <div className={'container'}>
            <div className={'row'}>
                {currentCampList.slice(0, 8).map((camp, index) => (
                    <div className="col-3 cardUi card my-2 mx-2" key={index}>
                        <img className="card-img" src={camp.campMainTitleNewImg} alt="img"></img>
                        <div className="card-body">
                            <h5 className="card-title fw-bold">{camp.campName}</h5>
                            <p className="card-text">{camp.campAddress}</p>
                        </div>
                        <div className="card-body text-end">
                            <Link to={`/reservation1/${camp.idx}`}>
                            <p className="card-link text-decoration-none fw-bold text-dark">예약 바로가기</p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row">
                <div className={'col-sm mx-auto'}>
                {campListChunks.map((_, index) => (
                    <button
                        key={index}
                        className={'btn btn-outline-secondary mx-3 my-3'}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                </div>
            </div>
        </div>
    );

}

export default CampListMain;