import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { API } from '../api/Config';
import { CustomAxios } from '../api/CustomAxios';

export function CustomComments(){

    const params = new URLSearchParams(window.location.search);
    const postsId = params.get('id');
    const uid = useSelector(state => {return state.authUser.id}); 

    const [data, setData] = useState([{}])
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0)

    const [comment, SetComment] = useState("");

    const baseAxios = async () =>{
        try{
            const response = await CustomAxios.get(`${API.COMMENTSMAIN}`,{params:{postsId:postsId, page:page}});
            setData(response.data.message)
            setTotalPage(response.data.count)
            console.log('댓글 response', response);

        }
        catch(error){
            console.log(error);
            // return navigate('/signin');
        }
    } 


    useEffect(() => {
        baseAxios();
    }, []);

    useEffect(() => {
        baseAxios();
    }, [page]);


    const saveComment = async () => {

        try{
            SetComment('');
            const response = await CustomAxios.post(`${API.COMMENTSSAVE}`,{postsId:postsId, uid:uid, comment:comment});
            console.log(response);
            baseAxios();
        }
        catch(error){
            console.log(error);
        } 
    };

    const deleteComment = async (e) => {
        console.log(e.target.id);
        await CustomAxios.delete(`${API.COMMENTSDELETE}`,{params:{id:e.target.id}});
        baseAxios();
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

    return(
    <div className="border border-success p-2 mb-2">
        <div className="mb-3">
            <label htmlFor="textArea" className="form-label">댓글 작성</label>
            <textarea className="form-control" id="textArea" placeholder="여기에 입력해 주세요" value={comment}
            onChange={(e)=>{
                SetComment(e.target.value);
            }} />
            <button onClick={saveComment}>저장</button>
        </div>
        <div className="mb-3">
            <label className="form-label">댓글</label>
            {
                data.map((item) => {
                    return (
                        <div key = {item.id || 0}>
                            <label>{item.nickName} : {item.comment} </label>
                            {uid == item.uid && <button id = {item.id} onClick={deleteComment} >삭제</button>}
                        </div>
                    );
                })
            }

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
    )
};