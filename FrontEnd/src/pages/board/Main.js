import React, { useState, useEffect } from 'react';

import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { API } from '../../api/Config';
import { CustomAxios } from '../../api/CustomAxios';

import NavBar from '../../component/NavBar';
import Table from './Table';
import styles from '../../style/Main.module.css'

export default function Main(){

    const navigate = useNavigate();
    const { id } = useSelector(state => {return state.authUser}); 
    const [params] = useSearchParams();

    const [data, setData] = useState([]);

    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [search, setSearch] = useState(params.get("search"));

    const baseAxios = async () =>{
        try{
            let response;
            if(params.get('like')){
                if(params.get('search')){
                    response = await CustomAxios.get(`${API.POSTSMAIN}`,{params:{uid:id, search:search, page:page}});
                }
                else{
                    response = await CustomAxios.get(`${API.POSTSMAIN}`,{params:{uid:id, page:page}});
                }
            }
            else{
                if(params.get('search')){
                    response = await CustomAxios.get(`${API.POSTSMAIN}`,{params:{search:search, page:page}});
                }
                else{
                    response = await CustomAxios.get(`${API.POSTSMAIN}`,{params:{page:page}});
                }
            }

            setData(response.data.message);
            setTotalPage(response.data.count);
        }
        catch(error){
            console.log('메인실패',error);
        } 
    }

    const handleOnUpdatePosts = (postId) => {
        updatePosts(postId);
    }
    const updatePosts = async (postId) => {navigate('/uposts?id='+postId)};

    const showLikeIt = async () => {
        if(params.get('like')){
            if(params.get('search')){
                navigate(`/main?search=${search}`);
            }
            else{
                navigate(`/main`);
            }
        }
        else{
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
                navigate(`/main?like=true`);
            }
            else{
                navigate(`/main`);
            }
        }
        else{
            if(params.get('like')){
                navigate(`/main?like=true&&search=${search}`);
            }
            else{
                navigate(`/main?search=${search}`);
            }
        }
        setPage(0);
    };

    useEffect(() => {
        baseAxios();
    }, [page,params]);

    const handleKeyDown = e => {
        if(e.code === 'Enter'){
            showSearch()
        }
    } 

    return(
        <div>
            <header className={`${styles.header}`}>
                <NavBar uid = {id} />
            </header>
            {/* <BoardNavBar /> */}
            <div className={`col-md-12 ${styles.Main}`}>
                <div className='row'>
                    <ul>
                        <li className={`${styles.width60}`}>
                            <input type="text" className="form-control"
                            placeholder="검색어를 입력후 엔터 쳐주세요. (초기화 하려면 빈값을 입력해주세요)" 
                            value={search || ''}
                            onChange={(e)=>{
                                setSearch(e.target.value);
                            }}
                            onKeyDown={handleKeyDown} />
                        </li>
                        <li className={`${styles.width20}`}>
                            <button onClick={showLikeIt} className={`btn btn-secondary ${styles.width100}`}>{ params.get("like") ?'좋아요보기 취소' : '좋아요보기' }</button>
                        </li>
                    </ul>
                </div>
                <br />
                <Table setPage = {setPage} page ={page} totalPage = {totalPage} data = {data} onUpdate = {handleOnUpdatePosts} />
                    
            </div>
        </div>
    );

};