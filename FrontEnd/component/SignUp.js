import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

export default function SginUp(){

  const navigate = useNavigate();
  
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

        alert('회원가입 되었습니다.');
        navigate('/signIn');

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
    <div>
      <h1>회원가입</h1>
    <div className="col-md-12">
      <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="email">아이디</label>
            <input type="text" className="form-control"
              id="email" placeholder="이메일을 입력하세요" 
              onChange={(e)=>{
                SetEmail(e.target.value);
              }}/>
            <button type="button" className="btn btn-primary" onClick={CheckEmail}>중복확인</button>
          </div>
          { authState &&
          <div className="form-group">
            <label htmlFor="name">인증번호 입력</label>
            <input type="text" className="form-control"
              id="mailAuthKey" placeholder="인증번호를 입력하세요" 
              onChange={(e)=>{
                SetAuth(e.target.value);
              }}
              />
            <button type="button" className="btn btn-primary" onClick={AuthMail}>확인</button>
          </div>
          }
          <div className="form-group">
            <label htmlFor="name">닉네임</label>
            <input type="text" className="form-control"
                  id="name" placeholder="닉네임을 입력하세요"
                  onChange={(e)=>{
                    SetName(e.target.value);
                  }}
                  />
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input type="password" className="form-control"
                    id="password" placeholder="비밀번호를 입력하세요"
                    onChange={(e)=>{
                      SetPassword(e.target.value);
              }} 
              />
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호 확인</label>
            <input type="password" className="form-control"
                  placeholder="비밀번호를 다시 입력하세요" 
                  onChange={(e)=>{
                    SetCheckPassword(e.target.value);
            }}/>
          </div>

        <Link to="/signIn" role="button" className="btn btn-secondary" id="btn-secondary">취소</Link>
        <button type="button" className="btn btn-primary" onClick={SaveSignup}>가입하기</button>
        <p className='text-danger'>{errorMessage}</p>
      </div>
    </div>
    </div>
  );
};