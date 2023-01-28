import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { DELETE_ATK } from '../store/Atk';
import { DELETE_USER } from '../store/User';
import { removeCookieToken } from '../storage/Cookie';

import { API } from '../api/Config';
import { CustomAxios } from '../api/CustomAxios';

export default function Main(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useSelector(state => {return state.authUser}); 


    const [data, setData] = useState([{
        id: '',
        title: '',
        nickName: ''
    }]);

    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    const baseAxios = async () =>{
        try{
            const response = await CustomAxios.get(`${API.LIKEIT}`,{params:{uid:id, page:page}});
            setData(response.data.message);
            setTotalPage(response.data.count);
        }
        catch(error){
            console.log(error);
        }
    }

    //여기
    const updatePosts = async (postId) => {navigate('/uposts?id='+postId)};

    const logout = async () => {
        try{
            await CustomAxios.delete(`${API.LOGOUT}`,{params:{id:id}});

            dispatch(DELETE_ATK());
            dispatch(DELETE_USER());
            removeCookieToken();
            navigate('/signin');
        }
        catch(error){
            console.log(error);
        }
    };

    const makePagination = () =>{
        let arr = [];
        for (let i=1; i<=totalPage; i++){
            if(i == page+1){
                arr.push(
                    <li key={i} className='page-item active'><a className='page-link' onClick={paginationClick}>{i}</a></li>
            )}
            else{
                arr.push(
                    <li key={i} className='page-item'><a className='page-link' onClick={paginationClick}>{i}</a></li>
            )}
        }
        return arr;
    }

    const paginationClick = (e) => {
        const clickPage = e.target.innerHTML-1
        setPage(clickPage);
    }
    const paginationFirstClick = (e) => {
        setPage(0);
    }
    const paginationListClick = (e) => {
        setPage(totalPage-1);
    }

    useEffect(() => {
        baseAxios();
    }, [page]);
    
    return(
        <div>
            <h1>목록</h1>
            <div className="col-md-12">
                <div className='row'>
                    <div className="col-md-12">
                        <Link to='/main' className='btn btn-primary' role='button' >좋아요보기 취소</Link>
                        <Link to='/iposts' className='btn btn-primary' role='button' >글등록</Link>
                        <Link to='/chart' className='btn btn-primary' role='button' >관리</Link>
                        <button onClick={logout} className='btn btn-danger float-right text-white' >로그아웃</button>
                        <Link to='/userInfo' className='btn btn-secondary' role='button' >회원정보</Link>
                    </div>
                </div>

                <br />
                <div>
                    <table className='table table-horizontal table-boardered' >
                        <thead className='thead-strong'>
                            <tr>
                                <th> 게시글번호 </th>
                                <th> 제목 </th>
                                <th> 작성자 </th>
                            </tr>
                        </thead>
                        <tbody id = 'tbody'>
                            {
                                data.map((item) => {
                                    return (
                                        <tr key = {item.id}>
                                            <td>{item.id}</td>
                                            <td type="button" onClick={() => updatePosts(item.id)}>{item.title}</td>
                                            <td>{item.nickName}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>

                    <nav aria-label="Page navigation">
                        <ul className='pagination'>
                            <li className="page-item">
                            <a className="page-link" onClick={paginationFirstClick} aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                            </li>
                                {makePagination()}
                            <li className="page-item">
                            <a className="page-link" onClick={paginationListClick} aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                    
            </div>
        </div>
    );

};