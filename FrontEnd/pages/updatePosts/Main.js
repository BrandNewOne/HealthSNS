import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { API } from '../../api/Config';
import { CustomAxios } from '../../api/CustomAxios';
import  store  from '../../store/index';
import FileUpdate from './FileUpdate';

import { SET_ImageFileList } from '../../store/ImageFile';
import { DELETE_ImageFileList } from '../../store/ImageFile';

import { CustomComments } from './CustomComments';

import NavBar from '../../component/NavBar';
import styles from '../../style/UpdatePosts.module.css'

import { ToastContext } from "../../context/ToastContext";

export default function UpdatePosts(){
    const toast = useContext(ToastContext);
    const navigate = useNavigate();

    const params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    const uid = useSelector(state => {return state.authUser.id}); 
    const { dump } = useSelector(state => {return state.authUser}); 

    const baseAxios = async () =>{
        try{
            const response = await CustomAxios.get(`${API.POSTSUPDATE}`,{params:{postsId:id, id:uid}});
            // console.log('response', response);

            setData(response.data.message); 
            SetNickName(response.data.message.nickName);
            SetContent(response.data.message.content);
            SetTitle(response.data.message.title);
            setLikeState(response.data.message.likeState);
            setImageMapList(response.data.message.imageMapName);

            if(response.data.message.uid == store.getState().authUser.id){
                SetShow(true);
            }

        }
        catch(error){
            console.log(error);
        }
    } 

    const [data, setData] = useState([])

    const [title, SetTitle] = useState("");
    const [content, SetContent] = useState("");
    const [nickName, SetNickName] = useState("");
    const [show, SetShow] = useState(false);
    const [likeState, setLikeState] = useState(false);
    const [imageMapList, setImageMapList] = useState([]);

    const [titleErrorMessage, SetTitleErrorMessage] = useState("");
    const [contentErrorMessage, SetContentErrorMessage] = useState("");

    const [files, setFiles] = useState([]);

    useEffect(() => {
        baseAxios();
    }, []);

    const savePosts = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        Array.from(files).forEach((el) => {
            formData.append("files", el);
        });
        
        formData.append("postsId",id);
        formData.append("title",title);
        formData.append("content",content);
        formData.append("uid",uid);
        if(!(store.getState().imageFile.fileList === null)){
            console.log("updateFiles",store.getState().imageFile.fileList);
            formData.append("updateFiles",store.getState().imageFile.fileList);
        }


        try{
            await CustomAxios.put(`${API.POSTSUPDATE}`,formData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

            store.dispatch(DELETE_ImageFileList());

            toast.setIsShow(true);
            toast.setMessage('글이 수정되었습니다.');
            navigate('/main');

        }
        catch(error){
            const e = error.response.data;
            if('content' in e){
                SetContentErrorMessage(e.content);
            }
            if('title' in e){
                SetTitleErrorMessage(e.title);
            }
        }

    };

    const deletePosts = async () => {

        try{
            await CustomAxios.delete(`${API.POSTSDELETE}`,
                                      {data : {uid:uid},
                                       params : {id:id}});
                                       
            toast.setIsShow(true);
            toast.setMessage('글이 삭제되었습니다.');
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

    const imageDelete = (e) => {
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

        setImageMapList(newFiles);
    };

    const handleOnclick = (e) =>{
        console.log(e.target.src);
        window.open(e.target.src);
    }


    return(
        <div>
            <header className={`${styles.header}`}>
                <NavBar uid = {id} />
            </header>
            <div className={`col-md-12 ${styles.Main}`}>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" colSpan="4">
                                <ul style={{listStyle:"none"}}>
                                    {show && <li className={styles.liStyle} ><button type="button" className={`btn btn-danger ${styles.width100}`} onClick={deletePosts} >삭제</button ></li>}
                                    <li><h3>{show ? '게시글 수정': '게시글'}</h3></li>
                                </ul>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">제목</th>
                            <td> 
                            <input type="text" className="form-control"
                                id="title" placeholder="제목을 입력하세요" 
                                value={title}
                                onChange={(e)=>{
                                    SetTitle(e.target.value);
                                }} 
                                readOnly={!show} />
                                <p style={{color:"red"}}>{titleErrorMessage}</p>
                            </td>
                            <th scope="row" className={`${styles.tdWidth11}`}>작성자</th>
                            <td className={`${styles.tdWidth20}`}>
                                <input type="text" className="form-control"
                                        id="name"
                                        value={nickName || ''}
                                        readOnly
                                />
                            </td>
                        </tr>
                        {show && 
                        <tr>
                            <th scope="row">파일첨부</th>
                            <td colSpan={3}>
                                {show &&<FileUpdate data = {imageMapList || []} onDelete = {imageDelete} files = {files} setFiles={setFiles} /> }
                            </td>
                        </tr>}
                        {imageMapList && 
                            <tr>
                                <td></td>
                                <td colSpan={3}>
                                    { imageMapList.map((item) => {
                                        return (
                                            <React.Fragment key={item.saveName}>
                                                <img onClick={handleOnclick} src={`http://localhost:3000/img/${data.uid}/${item.saveName}`} className={`${styles.img}`} />
                                            </React.Fragment>
                                        ); })
                                    }
                            </td>
                        </tr> }
                        <tr>
                            <th scope="row">내용</th>
                            <td colSpan={3}>
                            <textarea type="text" className={`form-control ${styles.heigh50}`}
                                id="content" placeholder="내용을 입력하세요" 
                                value={content} 
                                onChange={(e)=>{
                                    SetContent(e.target.value);
                                }} readOnly={!show}
                            />
                            <p style={{color:"red"}}>{contentErrorMessage}</p>
                            </td>
                        </tr>
                        {show && 
                        <tr>
                            <td colSpan={4} style={{borderBottom:"none"}}>
                                <ul style={{listStyle:"none"}}>
                                    <li className={styles.liStyle} ><button className={`btn btn-primary ${styles.width100} `} onClick={savePosts}>수정</button></li>
                                    <li className={styles.liStyle} ><button className={`btn btn-secondary ${styles.width100} `} onClick={() => { navigate(-1);}}>취소</button></li>
                                </ul>
                            </td>
                        </tr>
                        }
                        {!show && 
                        <tr>
                            <td colSpan={4} style={{borderBottom:"none"}}>
                                <ul style={{listStyle:"none"}}>
                                    {!likeState && <li className={styles.liStyle} ><button type="button" className={`btn btn-primary ${styles.width100}`} onClick={saveLikeIt} >좋아요</button></li> }
                                    {likeState && <li className={styles.liStyle} ><button type="button" className={`btn btn-danger ${styles.width100}`} onClick={saveLikeIt} >좋아요 취소</button></li> }
                                    <li className={styles.liStyle} ><button className={`btn btn-secondary ${styles.width100} `} onClick={() => { navigate(-1);}}>취소</button></li>
                                </ul>
                            </td>
                        </tr>
                        }
                    </tbody>
                </table>
                
                <CustomComments />
            </div>
        </div>
    );

};