import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { DELETE_ATK } from '../store/Atk';
import { DELETE_USER, SET_USER } from '../store/User';
import { removeCookieToken } from '../storage/Cookie';

import { API } from '../api/Config';
import { CustomAxios } from '../api/CustomAxios';

import NavBar from '../component/NavBar';
import styles from '../style/UserInfo.module.css'

import { ToastContext } from "../context/ToastContext";

export default function UserInfo(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useContext(ToastContext);

    const { id } = useSelector(state => {return state.authUser}); 

    const baseAxios = async () =>{
        try{
            const response = await CustomAxios.get(`${API.USERINFO}`,{params:{id:id}});  
            SetEmail(response.data.message.email);
            SetName(response.data.message.name);

        }
        catch(error){
            console.log(error);
        }
    } 

    const [email, SetEmail] = useState("");
    const [name, SetName] = useState("");
    const [password, SetPassword] = useState("");
    const [checkPassword, SetCheckPassword] = useState("");
    const [errorMessage, SetErrorMessage] = useState("");

    useEffect(() => {
        baseAxios();
    }, []);

    useEffect(() => {
        if(checkPassword != password){
          SetErrorMessage("비밀번호와 비밀번호 확인이 다릅니다.");
        }
        else{
          SetErrorMessage("");
        }
    }, [password, checkPassword]);


    const SignOut = async () => {
        try {
            await CustomAxios.delete(`${API.USERDELETE}`,{params:{id:id}});
            dispatch(DELETE_ATK());
            dispatch(DELETE_USER());
            removeCookieToken();

            toast.setIsShow(true);
            toast.setMessage('회원탈퇴 되었습니다.');

            navigate('/signIn');

        } catch (e) {
            console.log(e);
        }
    };

    const UpdateUser = async () => {
        if(checkPassword == password){
            try{
                await CustomAxios.put(`${API.USERUPDATE}`, 
                                        {name:name,password:password}, 
                                        {params:{id:id}});


                toast.setIsShow(true);
                toast.setMessage('수정 되었습니다.');

                SetPassword('');
                SetCheckPassword('');

            }catch(error){
                console.log(error);
                SetErrorMessage(error.response.data.message);
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
                        {/* <th scope="col" colSpan="2" ><h3>나의 정보</h3></th> */}
                        <th scope="col"><h3>나의 정보</h3></th>
                        <th>
                            <button type="button" className={`btn btn-danger float-right ${styles.width20}`}  onClick={SignOut}>탈퇴</button>
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">아이디</th>
                            <td>
                                <input type="text" className="form-control"
                                    id="email" placeholder="이메일을 입력하세요" value={email}
                                    readOnly />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">닉네임</th>
                            <td> 
                                <input type="text" className="form-control"
                                        id="name" placeholder="닉네임을 입력하세요" value={name}
                                        onChange={(e)=>{
                                            SetName(e.target.value);
                                        }} 
                                        />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">비밀번호</th>
                            <td>
                                <input type="password" className="form-control"
                                        id="password" placeholder="비밀번호를 입력하세요"
                                        value={password}
                                        onChange={(e)=>{
                                            SetPassword(e.target.value);
                                        }} />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">비밀번호 확인</th>
                            <td>
                                <input type="password" className="form-control"
                                    placeholder="비밀번호를 다시 입력하세요" 
                                    value={checkPassword}
                                    onChange={(e)=>{
                                        SetCheckPassword(e.target.value);
                                    }}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p className='text-danger'>{errorMessage}</p>

                <div className={`${styles.width100}`}>
                    <Link to="/main" role="button" className={`btn btn-secondary ${styles.width15}`} id="btn-secondary">취소</Link>
                    <button type="button" className={`btn btn-primary ${styles.width15}`} onClick={UpdateUser}>수정</button>
                </div>
            </div>
        </div>
    );

};