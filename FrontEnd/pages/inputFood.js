import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import { API } from '../api/Config';
import { CustomAxios } from '../api/CustomAxios';

import NavBar from '../component/NavBar';
import styles from '../style/InputFood.module.css'

export default function Manage(){

    const navigate = useNavigate();
    const {id} = useSelector(state => {return state.authUser}); 
    const [data, setData] = useState([])

    const baseAxios = async () =>{
        try{
            const response = await CustomAxios.get(`${API.MYFOOD}`,{params:{id:id}});
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

    const eatSavePostData = (id) =>{
        
        return{
            id: id,
            foodName: foodName,
            calories: Math.ceil(calories/food_gram),
            tan: Math.ceil(tan/food_gram),
            dan: Math.ceil(dan/food_gram),
            ge: Math.ceil(ge/food_gram),
            food_gram: 1,
            eat_gram: eat_gram,
            etc: Math.ceil((calories - tan - dan - ge)/food_gram),
        }
    }

    const SaveEat = async () => {
        try{
            const response = await CustomAxios.post(`${API.EATSAVE}`,eatSavePostData(id))
            setData(response.data.message);
            alert('저장되었습니다.');
            navigate('/chart');
        }
        catch(error){
            SetErrorMessage(error.response.data.message);
            console.log('manage Error ', error);
        }
            
    };

    const deleteFood = async () => {
        try{
            await CustomAxios.delete(`${API.FOODDELETE}`,{params:{foodName:foodName, uid:id}})
            alert('삭제되었습니다.');
        }
        catch(error){
            console.log('manage Error ', error);
        }
            
    };

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

    const clickTest = () => {
        console.log('test성공');
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
                        <th scope="col" className={`${styles.tdWidth25}`} ><h3>오늘먹은음식</h3></th>
                        <td className= {`${styles.tdWidth75}`}> {errorMessage}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>음식이름</th>
                        <td>
                            <div className="form-group">
                                <input type="text" className="form-control"
                                            list="datalistOptions"
                                            placeholder="음식이름을 입력하세요" 
                                            onChange={(e)=>{
                                                SetFoodName(e.target.value);
                                            }} 
                                            onKeyDown={handleKeyDown}
                                    />
                                                                    <datalist id="datalistOptions">
                                        {
                                            data.map((item,index) => {
                                                return(
                                                        <option key={index} onClick={clickTest}> {item.foodName} </option>
                                                );
                                            })
                                        }
                                    </datalist>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">먹은음식 그램</th>
                        <td> 
                            <input type="text" className="form-control"
                                        placeholder="음식이름을 입력하세요" 
                                        onChange={(e)=>{
                                            SetEatGram(e.target.value);
                                }}
                                value={eat_gram}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">칼로리</th>
                        <td>
                            <input type="text" className="form-control"
                                        placeholder="열량을 입력하세요" 
                                        onChange={(e)=>{
                                            SetCalories(e.target.value);
                                }}
                                value={calories}
                                />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">탄수화물</th>
                        <td>
                            <input type="text" className="form-control"
                                    placeholder="탄수화물을 입력하세요" 
                                    onChange={(e)=>{
                                        SetTan(e.target.value);
                                }}
                                value={tan}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">단백질</th>
                        <td>
                            <input type="text" className="form-control"
                                    placeholder="단백질을 입력하세요" 
                                    onChange={(e)=>{
                                        SetDan(e.target.value);
                                    }}
                                value={dan}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">지방</th>
                        <td>
                            <input type="text" className="form-control"
                                    placeholder="지방을 입력하세요" 
                                    onChange={(e)=>{
                                        SetGe(e.target.value);
                                }}
                                value={ge}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">그램</th>
                        <td>
                            <input type="text" className="form-control"
                                    placeholder="그램을 입력하세요" 
                                    onChange={(e)=>{
                                        SetFoodGram(e.target.value);
                                }}
                                value={food_gram}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
              
            <Link to="/chart" role="button" className="btn btn-secondary">취소</Link>
            <button onClick={deleteFood} className="btn btn-danger" >삭제</button>
            <button onClick={SaveEat} className="btn btn-primary" >저장</button>
            </div>
        </div>
    );

};