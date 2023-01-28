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
    const params = new URLSearchParams(window.location.search);


    const [data, setData] = useState([{
        id: '',
        title: '',
        nickName: ''
    }]);

    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [stateLikeIt, setStateLikeIt] = useState(params.get("like"));
    const [stateSearch, setStateSearch] = useState(params.get("search"));
    const [search, setSearch] = useState(params.get("search"));

    const baseAxios = async () =>{
        try{
            let response;
            if(params.get('like')){
                if(params.get('search')){
                    console.log('좋아요 + 검색');
                    response = await CustomAxios.get(`${API.POSTSMAIN}`,{params:{uid:id, search:search, page:page}});
                }
                else{
                    console.log('좋아요');
                    response = await CustomAxios.get(`${API.POSTSMAIN}`,{params:{uid:id, page:page}});
                }
            }
            else{
                if(params.get('search')){
                    console.log('검색');
                    response = await CustomAxios.get(`${API.POSTSMAIN}`,{params:{search:search, page:page}});
                }
                else{
                    console.log('기본');
                    response = await CustomAxios.get(`${API.POSTSMAIN}`,{params:{page:page}});
                }
            }

            setData(response.data.message);
            setTotalPage(response.data.count);
        }
        catch(error){
            console.log('메인실패',error);
                // navigate('/signin');
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

    const showLikeIt = async () => {
        if(params.get('like')){
            setStateLikeIt(null);
            if(params.get('search')){
                navigate(`/main?search=${search}`);
            }
            else{
                navigate(`/main`);
            }
        }
        else{
            setStateLikeIt(true);
            if(params.get('search')){
                navigate(`/main?like=true&&search=${search}`);
            }
            else{
                navigate(`/main?like=true`);
            }
        }
        setPage(0);
    };

    const showSearch = async () => {
        if(search === null || search === ''){
            if(params.get('like')){
                setStateSearch(search);
                navigate(`/main?like=true`);
            }
            else{
                setStateSearch(null);
                navigate(`/main`);
            }
        }
        else{
            if(params.get('like')){
                setStateSearch(search);
                navigate(`/main?like=true&&search=${search}`);
            }
            else{
                setStateSearch(search);
                navigate(`/main?search=${search}`);
            }
        }
        setPage(0);
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
    }, [page,stateLikeIt,stateSearch]);

    return(
        <div>
            <h1>목록</h1>
            <div className="col-md-12">
                <div className='row'>
                    <div className="col-md-12">
                        <button onClick={showLikeIt} className='btn btn-primary'>{ stateLikeIt ?'좋아요보기 취소' : '좋아요보기' }</button>
                        {/* <Link to='/likeItMain' className='btn btn-primary' role='button' >좋아요보기</Link> */}
                        <Link to='/iposts' className='btn btn-primary' role='button' >글등록</Link>
                        <Link to='/chart' className='btn btn-primary' role='button' >관리</Link>
                        <button onClick={logout} className='btn btn-danger float-right text-white' >로그아웃</button>
                        <Link to='/userInfo' className='btn btn-secondary' role='button' >회원정보</Link>
                    </div>
                </div>
                <br />
                <p>
                    <input type="text" className="form-control"
                          placeholder="검색어를 입력하세요" 
                          value={search || ''}
                          onChange={(e)=>{
                              setSearch(e.target.value);
                          }}/>
                    <button onClick={showSearch} className='btn btn-primary'>검색</button>
                </p>
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