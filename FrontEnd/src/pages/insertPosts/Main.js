import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { API } from '../../api/Config';
import  store  from '../../store/index';
import { CustomAxios } from '../../api/CustomAxios';
import { PostRtkAxios } from  '../../api/PostRtkAxios';

import FileUpload from './FileUpload';

import NavBar from '../../component/NavBar';
import styles from '../../style/InsertPosts.module.css';

import { ToastContext } from "../../context/ToastContext";


export default function InsertPosts(){

    const toast = useContext(ToastContext);
    const navigate = useNavigate();
    const { id } = useSelector(state => {return state.authUser}); 
    const { name } = useSelector(state => {return state.authUser}); 
    const { dump } = useSelector(state => {return state.authUser}); 
    
    const [thisTitle, SetThisTitle] = useState("");
    const [thisContent, SetThisContent] = useState("");
    const [thisName, SetThisName] = useState(name);
    const [titleErrorMessage, SetTitleErrorMessage] = useState("");
    const [contentErrorMessage, SetContentErrorMessage] = useState("");

    const [files, setFiles] = useState([]);
    

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

    const postsSavePostData = (id ,name) => {
        return{
            uid:id,
            imageId:dump,
            title:thisTitle,
            content:thisContent,
            nickName:name
        }
    }

    const onDivContentHandler = (e) => {
        SetThisContent(e.target.value);
    }

    const savePosts = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        // @ts-ignore
        Array.from(files).forEach((el) => {
        formData.append("files", el);
        });

        formData.append("uid",id);
        formData.append("title",thisTitle);
        formData.append("content",thisContent);
        formData.append("nickName",name);

        try{
            await CustomAxios.post(`${API.POSTSSAVE}`,formData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            
            toast.setIsShow(true);
            toast.setMessage('?????? ?????????????????????.');

            navigate(-1);
        }
        catch(error)
        { 
            const e = error.response.data;
            console.log(e);
            if('content' in e){
                SetContentErrorMessage(e.content);
            }
            if('title' in e){
                SetTitleErrorMessage(e.title);
            }
        }
    };



    return(
        <div>
            <header className={`${styles.header}`}>
                <NavBar uid = {id} />
            </header>
            <div className={`col-md-12 ${styles.Main}`}>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" colSpan={4}><h3>????????? ??????</h3></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">??????</th>
                        <td> 
                            <input type="text" className={`form-control`}
                                id="title" placeholder="????????? ???????????????" 
                                onChange={ (e)=>{
                                    SetThisTitle(e.target.value);
                                }}  />
                                <p style={{color:"red"}}>{titleErrorMessage}</p>
                        </td>
                        <th scope="row" className={`${styles.tdWidth11}`}>?????????</th>
                        <td className={`${styles.tdWidth20}`}>
                            <input type="text" className="form-control"
                                    id="name" 
                                    value={thisName || ''}
                                    readOnly
                            />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">????????????</th>
                        <td colSpan={3}>
                            <FileUpload files = {files} setFiles = {setFiles}/>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">??????</th>
                        <td colSpan={3}>
                            {/* <div contentEditable="true" 
                                className={`form-control ${styles.height400}`} 
                                placeholder="????????? ???????????????" 
                                onBlur={ onDivContentHandler } >
                                <img src={`http://localhost:8080/img/5/47870f6f-9c80-47c8-b0c1-0cf65f783a03.png`}  />
                            
                            </div> */}
                            <textarea type="text" className={`form-control ${styles.height400}`}
                                id="content" placeholder="????????? ???????????????"
                                onChange={ onDivContentHandler } />
                                <p style={{color:"red"}}>{contentErrorMessage}</p>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} style={{borderBottom:"none"}}>
                            <ul style={{listStyle:"none"}}>
                                <li className={styles.liStyle} ><button className={`btn btn-primary ${styles.width100} `} onClick={savePosts}>??????</button></li>
                                <li className={styles.liStyle} ><button className={`btn btn-secondary ${styles.width100} `} onClick={() => { navigate(-1);}}>??????</button></li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
    );

};