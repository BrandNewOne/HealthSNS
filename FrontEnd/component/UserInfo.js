import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { DELETE_ATK } from '../store/Atk';
import { DELETE_USER, SET_USER } from '../store/User';
import { removeCookieToken } from '../storage/Cookie';

import { API } from '../api/Config';
import { CustomAxios } from '../api/CustomAxios';

export default function UserInfo(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        console.log(password, checkPassword);
    }, [password, checkPassword]);


    const SignOut = async () => {
        try {
            await CustomAxios.delete(`${API.USERDELETE}`,{params:{id:id}});
            dispatch(DELETE_ATK());
            dispatch(DELETE_USER());
            removeCookieToken();
            alert('회원탈퇴 되었습니다.');
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
                alert('수정 되었습니다.');
            }catch(error){
                console.log(error);
            }
        }
    };

    return(
        <div>
            <h1>회원정보</h1>
            <div className="col-md-12">
                <div className="col-md-4">
                    <div>
                        <button type="button" className="btn btn-danger float-right"  onClick={SignOut}>회원탈퇴</button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">아이디</label>
                        <input type="text" className="form-control"
                                id="email" placeholder="이메일을 입력하세요" value={email}
                                readOnly />
                    </div>
  
                    <div className="form-group">
                        <label htmlFor="name">닉네임</label>
                        <input type="text" className="form-control"
                                id="name" placeholder="닉네임을 입력하세요" value={name}
                                onChange={(e)=>{
                                    SetName(e.target.value);
                        }} />
                    </div>
  
                    <div className="form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input type="password" className="form-control"
                                id="password" placeholder="비밀번호를 입력하세요"
                                onChange={(e)=>{
                                    SetPassword(e.target.value);
                        }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">비밀번호 확인</label>
                        <input type="password" className="form-control"
                            placeholder="비밀번호를 다시 입력하세요" 
                            onChange={(e)=>{
                                SetCheckPassword(e.target.value);
                        }}/>
                    </div>

  
                <Link to="/main" role="button" className="btn btn-secondary" id="btn-secondary">취소</Link>
                <button type="button" className="btn btn-primary" onClick={UpdateUser}>수정</button>
                <p className='text-danger'>{errorMessage}</p>
                </div>
            </div>
        </div>
    );

};