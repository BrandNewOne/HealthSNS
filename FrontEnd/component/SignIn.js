import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { setRefreshToken } from '../storage/Cookie';
import { SET_ATK_EXP } from '../store/Atk';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import { SET_USER } from '../store/User';

import jwt_decode from "jwt-decode";

export default function SginIn(porps){

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SignIn = async () => {
    try {
      await axios.post(
        '/authenticate',
        {
          email: email,
          password: password
        }

      ).then(function(response){
        setRefreshToken(response.data.rtk);
        const user = jwt_decode(response.data.atk); // decode your token here
        const jsonUser = JSON.parse(user.sub);
        dispatch(SET_ATK_EXP({atk: response.data.atk, exp: user.exp}));
        dispatch(SET_USER({ id: jsonUser.id, name: jsonUser.name, role: jsonUser.role }));

        return navigate("/main");

      });
    
    } catch (e) {
      console.log(e);
      console.log(e.response.data.message);
      SetErrorMessage(e.response.data.message);
    }
  };
    
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [errorMessage, SetErrorMessage] = useState("");

  return (
    <div>
      <h1>로그인</h1>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-6">
              <div className="form-group">
                  <label htmlFor="email">아이디</label>
                  <input type="text" className="form-control"
                          placeholder="이메일을 입력하세요" 
                          onChange={(e)=>{
                              SetEmail(e.target.value);
                          }}/>
              </div>
  
              <div className="form-group">
                  <label htmlFor="password">비밀번호</label>
                  <input type="password" className="form-control"
                          placeholder="비밀번호를 입력하세요" 
                          onChange={(e)=>{
                              SetPassword(e.target.value);
                          }}/>
              </div>
  
              <button type="button" className="btn btn-primary" onClick={SignIn}>로그인</button>
              <Link to="/SignUp" role="button" className="btn btn-primary">회원가입</Link>
              <p className='text-danger'>{errorMessage}</p>
          </div>
        </div>
      </div>
    </div>
    );
  };