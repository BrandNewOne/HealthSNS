import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import styles from "../style/SignUp.module.css"

import { ToastContext } from "../context/ToastContext";

export default function SginUp(){

  const navigate = useNavigate();
  const toast = useContext(ToastContext);
  
  const SaveSignup = async () => {
    if(checkPassword == password){
      try {
        await axios.post(
          '/users/save',
          {
            email: email,
            name: name,
            password: password
          }
        );
        
        toast.setIsShow(true);
        toast.setMessage('회원가입 되었습니다.');

        // navigate('/signIn');
        navigate('/');

      } catch (error) {
        console.log(error);
        SetErrorMessage(error.response.data.message);
      }
    }
  };

  const CheckEmail = async () => {
    try {
      await axios.post(
        '/mail/sendMail',
        null,
        {
            params:
            {
                email:email
            }
        }
      ).then(response => {
        console.log(response);
        SetAuthState(true);
        SetErrorMessage(response.data.message);
      }).catch(error => {
        console.log('error',error);
        SetErrorMessage(error.response.data.message);
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  const AuthMail = async () => {
    try {
      await axios.post(
        '/mail/authMail',
        null,
        {
            params:
            {
                email: email,
                auth: auth
            }
        }
      ).then(response => {
        console.log(response);
        SetAuthState(false);
        SetErrorMessage('인증되었습니다.');
      }).catch(error => {
        console.log(error);
        SetErrorMessage(error.response.data.message);
      });
      
    } catch (error) {
      console.log(error);
    }

  }

  const [email, SetEmail] = useState("");
  const [name, SetName] = useState("");
  const [password, SetPassword] = useState("");
  const [auth, SetAuth] = useState("");
  const [errorMessage, SetErrorMessage] = useState("");

  const [authState, SetAuthState] = useState(false);
  const [checkPassword, SetCheckPassword] = useState("");

  useEffect(() => {
    if(checkPassword != password){
      SetErrorMessage("비밀번호와 비밀번호 확인이 다릅니다.");
    }
    else{
      SetErrorMessage("");
    }
}, [password, checkPassword]);
  

  return (
    <>
    <div className="col-md-12">
      <div className="row">
        <div className={styles.MainCenter}>
          <div className="col-md-6">
            <div className={styles.SignUp} >
              <h1 className={styles.h1}>Health SNS 가입하기</h1>
          
              <div className={styles.Center}>
                <input type="text"
                  id="email" placeholder="이메일을 입력하세요" 
                  className={styles.input2}
                  onChange={(e)=>{
                    SetEmail(e.target.value);
                  }}/>
                <button className={`${styles.Button2}`} onClick={CheckEmail}>중복확인</button>
              </div>

              { authState &&
              <div className={styles.Center}>
                <input type="text"
                  id="mailAuthKey" placeholder="인증번호를 입력하세요" 
                  className={styles.input2}
                  onChange={(e)=>{
                    SetAuth(e.target.value);
                  }}
                  />
                <button className={`${styles.Button2}`}  onClick={AuthMail}>확인</button>
              </div>
              }

              <div className={styles.Center}>
                <input type="text"
                      id="name" placeholder="닉네임을 입력하세요"
                      className={styles.input}
                      onChange={(e)=>{
                        SetName(e.target.value);
                      }}
                      />
              </div>

              <div className={styles.Center}>
                <input type="password" 
                        id="password" placeholder="비밀번호를 입력하세요( 4자 이상, 16자 이하 )"
                        className={`${styles.input}`}
                        onChange={(e)=>{
                          SetPassword(e.target.value);
                  }} 
                  />
              </div>

              <div className={styles.Center}>
                <input type="password"
                      placeholder="비밀번호를 다시 입력하세요" 
                      className={`${styles.input}`}
                      onChange={(e)=>{
                        SetCheckPassword(e.target.value);
                }}/>
              </div>
              <p className='text-danger'>{errorMessage}</p>
              <div className={`${styles.Right}`}>
                <Link to="/signIn" role="button" className={`btn btn-danger`}>취소</Link>
                <button className={`btn btn-primary ${styles.Button}`} onClick={SaveSignup}>가입하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};