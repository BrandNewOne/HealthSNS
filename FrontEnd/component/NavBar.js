import React from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { API } from '../api/Config';
import { DELETE_ATK } from '../store/Atk';
import { DELETE_USER } from '../store/User';
import { removeCookieToken } from '../storage/Cookie';
import { CustomAxios } from '../api/CustomAxios';

const NavBar = ({uid}) =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = async () => {
        try{
            await CustomAxios.delete(`${API.LOGOUT}`,{params:{id:uid}});

            dispatch(DELETE_ATK());
            dispatch(DELETE_USER());
            removeCookieToken();
            navigate('/signin');
        }
        catch(error){
            console.log(error);
        }
    };

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/main">Health SNS</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/chart">차트</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/manage">오늘먹은음식</Link>
                        </li>
                    </ul>
                    <div className="btn-group" >
                        <button className="btn  dropdown-toggle" type="button" id="defaultDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                            Info
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="defaultDropdown">
                            <li><Link className="dropdown-item" to="/userInfo">나의 정보</Link></li>
                            <li><button className="dropdown-item" style={{color:"red"}} onClick={logout} >로그아웃</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        
    )
};

export default NavBar;