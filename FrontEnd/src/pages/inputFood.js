import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';

import { API } from '../api/Config';
import { CustomAxios } from '../api/CustomAxios';

import NavBar from '../component/NavBar';
import styles from '../style/InputFood.module.css'

import { ToastContext } from "../context/ToastContext";


export default function Manage(){

    const toast = useContext(ToastContext);

    const {id} = useSelector(state => {return state.authUser}); 
    const [data, setData] = useState([])

    const baseAxios = async () =>{
        try{
            const response = await CustomAxios.get(`${API.MYFOOD}`,{params:{uid:id}});
            setData(response.data.message);
            console.log(response);
        }
        catch(error){
            console.log(error);
        }
    } 
    
    useEffect(() => {
        baseAxios();
    }, []);

    const [foodName, SetFoodName] = useState("");
    const [calories, SetCalories] = useState("");
    const [tan, SetTan] = useState("");
    const [dan, SetDan] = useState("");
    const [ge, SetGe] = useState("");
    const [eat_gram, SetEatGram] = useState("");
    const [food_gram, SetFoodGram] = useState("");
    const [errorMessage, SetErrorMessage] = useState("");
    const [eatDate, setEatDate] = useState(new Date());

    const eatSavePostData = (id) =>{
        
        return{
            uid: id,
            foodName: foodName,
            calories: (calories/food_gram),
            tan: (tan/food_gram),
            dan: (dan/food_gram),
            ge: (ge/food_gram),
            food_gram: 1,
            eat_gram: eat_gram,
            etc: ((calories - tan - dan - ge)/food_gram),
            eat_date: eatDate
        }
    }

    const SaveEat = async () => {
        try{
            console.log(eatDate);
            const response = await CustomAxios.post(`${API.EATSAVE}`,eatSavePostData(id))
            // console.log(response);
            // setData(response.data.message);
            
            toast.setIsShow(true);
            toast.setMessage('?????????????????????.');

        }
        catch(error){
            SetErrorMessage(error.response.data.message);
            console.log('manage Error ', error);
        }
            
    };

    // const deleteFood = async () => {
    //     try{
    //         await CustomAxios.delete(`${API.FOODDELETE}`,{params:{foodName:foodName, uid:id}});
    //         toast.setIsShow(true);
    //         toast.setMessage('?????????????????????.');
    //     }
    //     catch(error){
    //         console.log('manage Error ', error);
    //     }
            
    // };

    const handleKeyDown = e => {
        if(e.code === 'Enter'){
            data.forEach((item) => {
                if(item.foodName == foodName){
                    SetTan(item.tan);
                    SetDan(item.dan);
                    SetGe(item.ge);
                    SetCalories(item.calories);
                    SetFoodName(item.foodName);
                    SetFoodGram(item.foodGram);
                }
            })
        }
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
                        <th scope="col" className={`${styles.tdWidth25}`} ><h3>??????????????????</h3></th>
                        <td><DatePicker locale={ko} showTimeSelect dateFormat="Pp" selected={eatDate} onChange={(date) => setEatDate(date) } /></td>
                        {/* <td className= {`${styles.tdWidth75}`}> {errorMessage}</td> */}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>????????????</th>
                        <td>
                            <div className="form-group">
                                <input type="text" className="form-control"
                                            list="datalistOptions"
                                            placeholder="??????????????? ???????????????" 
                                            onChange={(e)=>{
                                                SetFoodName(e.target.value);
                                            }} 
                                            onKeyDown={handleKeyDown}
                                    />
                                    <datalist id="datalistOptions">
                                        {
                                            data.map((item,index) => {
                                                return(
                                                        <option key={index}> {item.foodName} </option>
                                                );
                                            })
                                        }
                                    </datalist>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">???????????? ??????</th>
                        <td> 
                            <input type="text" className="form-control"
                                        placeholder="??????????????? ???????????????" 
                                        onChange={(e)=>{
                                            SetEatGram(e.target.value);
                                }}
                                value={eat_gram}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">?????????</th>
                        <td>
                            <input type="text" className="form-control"
                                        placeholder="????????? ???????????????" 
                                        onChange={(e)=>{
                                            SetCalories(e.target.value);
                                }}
                                value={calories}
                                />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">????????????</th>
                        <td>
                            <input type="text" className="form-control"
                                    placeholder="??????????????? ???????????????" 
                                    onChange={(e)=>{
                                        SetTan(e.target.value);
                                }}
                                value={tan}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">?????????</th>
                        <td>
                            <input type="text" className="form-control"
                                    placeholder="???????????? ???????????????" 
                                    onChange={(e)=>{
                                        SetDan(e.target.value);
                                    }}
                                value={dan}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">??????</th>
                        <td>
                            <input type="text" className="form-control"
                                    placeholder="????????? ???????????????" 
                                    onChange={(e)=>{
                                        SetGe(e.target.value);
                                }}
                                value={ge}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">??????</th>
                        <td>
                            <input type="text" className="form-control"
                                    placeholder="????????? ???????????????" 
                                    onChange={(e)=>{
                                        SetFoodGram(e.target.value);
                                }}
                                value={food_gram}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
              
            {/* <Link to="/chart" role="button" className="btn btn-secondary">??????</Link> */}
            {/* <button onClick={deleteFood} className="btn btn-danger" >??????</button> */}
            <button onClick={SaveEat} className="btn btn-primary" >??????</button>
            </div>
        </div>
    );

};