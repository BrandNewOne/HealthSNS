import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { API } from '../api/Config';
import { CustomAxios } from '../api/CustomAxios';
import  store  from '../store/index';
import FileUpdate from './FileUpdate';

import { SET_ImageFileList } from '../store/ImageFile';


export default function UpdatePosts(){
    const navigate = useNavigate();

    const params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    const uid = useSelector(state => {return state.authUser.id}); 

    const baseAxios = async () =>{
        try{
            const response = await CustomAxios.get(`${API.POSTSUPDATE}`,{params:{postsId:id, id:uid}});
            console.log('response', response);

            setData(response.data.message); 
            SetNickName(response.data.message.nickName);
            SetContent(response.data.message.content);
            SetTitle(response.data.message.title);
            setLikeState(response.data.message.likeState);
            setImageMapList(response.data.message.imageMapName);

            if(response.data.message.uid == store.getState().authUser.id){
                SetShow(true);
            }

            console.log(imageMapList);
            console.log(data.uid);
        }
        catch(error){
            console.log(error);
            // return navigate('/signin');
        }
    } 

    useEffect(() => {
        baseAxios();
    }, []);

    const [data, setData] = useState([{
        id: '',
        title: '',
        nickName: '',
        content: ''
    }])

    const [title, SetTitle] = useState("");
    const [content, SetContent] = useState("");
    const [nickName, SetNickName] = useState("");
    const [show, SetShow] = useState(false);
    const [likeState, setLikeState] = useState(false);
    const [imageMapList, setImageMapList] = useState([]);

    useEffect(() => {
    }, [likeState]);

    useEffect(() => {
    }, [imageMapList]);

    const savePosts = async () => {
        try{
            await CustomAxios.put(`${API.POSTSUPDATE}`,
                                   {title:title, content:content, uid:id},
                                   {params:{postsId:id}});

            alert('글이 수정되었습니다.');
            navigate('/main');

        }
        catch(error){
            console.log(error);
        }

    };

    const deletePosts = async () => {

        try{
            await CustomAxios.delete(`${API.POSTSDELETE}`,
                                      {data : {uid:uid},
                                       params : {id:id}});

            alert('글이 삭제되었습니다.');
            navigate('/main');
        }
        catch(error){
            console.log(error);
        }
    };

    const saveLikeIt = async () => {

        try{
            const response = await CustomAxios.post(`${API.POSTSLIKEIT}`,{postsId:id, uid:uid});
            setLikeState(response.data.message);
            console.log(response);
        }
        catch(error){
            console.log(error);
        } 
    };

    const handleDelete = (e) => {
        const index = imageMapList.findIndex((imageMap) => imageMap.saveName === e.target.id);
        const newFiles = [...imageMapList.slice(0, index), ...imageMapList.slice(index + 1)];
        
        if(store.getState().imageFile.fileList === null){
            const tempImageFileList = [e.target.id];
            store.dispatch(SET_ImageFileList(tempImageFileList ));
        }
        else{
            const tempImageFileList = [...store.getState().imageFile.fileList, e.target.id];
            store.dispatch(SET_ImageFileList(tempImageFileList));
        }

        console.log('띠용? : ',store.getState().imageFile.fileList);
        setImageMapList(newFiles);
    };


    return(
        <div>
            <h1>게시글 수정</h1>
            <div className="col-md-12">
                <div className="col-md-4">
                {show &&<FileUpdate /> }
                    {imageMapList && <div className="form-group">
                        <ul>
                        {
                            imageMapList.map((item) => {
                                return (
                                    <React.Fragment key={item.saveName}>
                                        {show && 
                                        <li> {item.originName}
                                            <button id={item.saveName} type="button" className="btn btn-danger"  onClick={handleDelete} >삭제 </button>
                                        </li>}
                                    </React.Fragment>
                                );
                            })
                        }
                        </ul>
                    </div>}
                    <div className="form-group">
                        <label htmlFor="title">제목</label>
                        <input type="text" className="form-control"
                                id="title" placeholder="제목을 입력하세요" 
                                value={title}
                                onChange={(e)=>{
                                    SetTitle(e.target.value);
                        }} 
                        />
                    </div>

                    {imageMapList && <div className="form-group">
                        {
                            imageMapList.map((item) => {
                                return (
                                    <React.Fragment key={item.saveName}>
                                        <img src={`http://localhost:3000/img/${data.uid}/${item.saveName}`}  />
                                    </React.Fragment>
                                );
                            })
                        }
                    </div>}
  
                    <div className="form-group">
                        <label htmlFor="name">작성자</label>
                        <input type="text" className="form-control"
                                id="name" placeholder="작성자를 입력하세요" 
                                value={nickName}
                                readOnly
                                />
                    </div>
  
                    <div className="form-group">
                        <label htmlFor="content">내용</label>
                        <input type="text" className="form-control"
                                id="content" placeholder="내용을 입력하세요" 
                                value={content} 
                                onChange={(e)=>{
                                    SetContent(e.target.value);
                        }} 
                        />
            </div>
            <button className="btn btn-secondary" onClick={() => {navigate(-1);}}>취소</button>
            {show && <button type="button" className="btn btn-primary" onClick={savePosts} >수정</button> }
            {show && <button type="button" className="btn btn-danger" onClick={deletePosts} >삭제</button >}
            {!show && !likeState && <button type="button" className="btn btn-primary" onClick={saveLikeIt} >좋아요</button> }
            {!show && likeState && <button type="button" className="btn btn-danger" onClick={saveLikeIt} >좋아요 취소</button> }
        </div>
      </div>
      </div>
    );

};