import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { setRefreshToken } from '../storage/Cookie';
import { SET_ATK_EXP } from '../store/Atk';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { SET_USER } from '../store/User';
import jwt_decode from "jwt-decode";
import styles from "../style/SignIn.module.css"

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


  const handleKeyDown = e => {
    if(e.code === 'Enter'){
      SignIn()
    }
} 

  return (
    <div>
      <div className="col-md-12">
        <div className="row">
          <div className={styles.MainCenter}>
            <div className="col-md-5" >
              <div className={styles.Login} >
                <h1 className={styles.h1}>Sign In</h1>
                <div className={styles.Center}>
                    <input type="text" 
                            placeholder="이메일을 입력하세요" 
                            className={styles.input}
                            onChange={(e)=>{
                                SetEmail(e.target.value);
                            }}/>
                </div>
    
                <div className={styles.Center}>
                    <input type="password"
                            placeholder="비밀번호를 입력하세요" 
                            className={styles.input}
                            onChange={(e)=>{
                                SetPassword(e.target.value);
                            }}
                            onKeyDown={handleKeyDown}
                            />
                </div>
                <div className={styles.Center}>
                  <button type="button" className={`btn btn-primary ${styles.button}`} onClick={SignIn}>로그인</button>
                </div>
                <div className={styles.LinkRight}>
                  <NavLink to="/SignUp" role="button" className={styles.Link} >회원가입</NavLink>
                </div>
                <p className='text-danger'>{errorMessage}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  };