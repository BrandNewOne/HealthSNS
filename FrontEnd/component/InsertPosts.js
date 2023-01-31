import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { API } from '../api/Config';
import  store  from '../store/index';
import { CustomAxios } from '../api/CustomAxios';
import { PostRtkAxios } from  '../api/PostRtkAxios';

import FileUpload from './FileUpload';

export default function InsertPosts(){

    const navigate = useNavigate();
    const { id } = useSelector(state => {return state.authUser}); 
    const { name } = useSelector(state => {return state.authUser}); 
    const { dump } = useSelector(state => {return state.authUser}); 
    
    const [thisTitle, SetThisTitle] = useState("");
    const [thisContent, SetThisContent] = useState("");
    const [thisName, SetThisName] = useState(name);
    

    const baseAxios = async () =>{
        if(id === null){
            try{
                await PostRtkAxios(); 
                SetThisName(store.getState().authUser.name);
                
            }
            catch(error){
                console.log(error);
            }
        }
    } 

    useEffect(() => {
        baseAxios();
    }, []);

    useEffect(() => {
        console.log('dump',dump);
    }, [dump]);

    const postsSavePostData = (id ,name) => {
        console.log('name',name);
        return{
            uid:id,
            imageId:dump,
            title:thisTitle,
            content:thisContent,
            nickName:name
        }
    }

    const savePosts = async () => {
        try{
            await CustomAxios.post(`${API.POSTSSAVE}`,postsSavePostData(id,name));
            alert('글이 등록되었습니다.');
            navigate(-1);
        }
        catch(error)
        { 
            console.log(error);
        }
    };



    return(
        <div>
            <h1>게시글 등록</h1>
            <div className="col-md-12">
                <div className="col-md-4">
                <FileUpload />
                    <div className="form-group">
                        <label htmlFor="title">제목</label>
                        <input type="text" className="form-control"
                                id="title" placeholder="제목을 입력하세요" 
                                onChange={(e)=>{
                                    SetThisTitle(e.target.value);
                        }} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">작성자</label>
                        <input type="text" className="form-control"
                                id="name" placeholder="작성자를 입력하세요" 
                                value={thisName || ''}
                                readOnly
                        />
                    </div>
  
                    <div className="form-group">
                        <label htmlFor="content">내용</label>
                        <input type="text" className="form-control"
                                id="content" placeholder="내용을 입력하세요"
                                onChange={(e)=>{
                                    SetThisContent(e.target.value);
                        }} />
            </div>
            <button className="btn btn-secondary" onClick={() => {navigate(-1);}}>취소</button>
            {/* <Link to="/main" role="button" className="btn btn-secondary" id="btn-secondary">취소</Link> */}
            <button type="button" className="btn btn-primary" onClick={savePosts}>등록</button>
        </div>
      </div>
      </div>
    );

};