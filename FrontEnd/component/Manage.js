import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import { API } from '../api/Config';
import { CustomAxios } from '../api/CustomAxios';

export default function Manage(){

    const navigate = useNavigate();
    const {id} = useSelector(state => {return state.authUser}); 
    const [data, setData] = useState([{}])

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

    const handleKeyDown = e => {
        if(e.onKeyDown === 'Enter'){
            console.log('asdf');
        }
    } 

    const clickTest = () => {
        console.log('test성공');
    } 

    return(
        <div>
            <h1>관리</h1>
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="foodName">음식이름</label>
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
                        <div className="form-group">
                            <label htmlFor="foodName">먹은 음식 그램</label>
                                <input type="text" className="form-control"
                                        placeholder="음식이름을 입력하세요" 
                                        onChange={(e)=>{
                                            SetEatGram(e.target.value);
                                }}
                                value={eat_gram}
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="calories">칼로리</label>
                                <input type="text" className="form-control"
                                        placeholder="열량을 입력하세요" 
                                        onChange={(e)=>{
                                            SetCalories(e.target.value);
                                }}
                                value={calories}
                                />
                        </div>
  
                        <div className="form-group">
                            <label htmlFor="tan">탄수화물</label>
                            <input type="text" className="form-control"
                                    placeholder="탄수화물을 입력하세요" 
                                    onChange={(e)=>{
                                        SetTan(e.target.value);
                            }}
                            value={tan}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="dan">단백질</label>
                            <input type="text" className="form-control"
                                    placeholder="단백질을 입력하세요" 
                                    onChange={(e)=>{
                                        SetDan(e.target.value);
                            }}
                            value={dan}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="ge">지방</label>
                            <input type="text" className="form-control"
                                    placeholder="지방을 입력하세요" 
                                    onChange={(e)=>{
                                        SetGe(e.target.value);
                            }}
                            value={ge}
                            />

                        <div className="form-group">
                            <label htmlFor="gram">그램</label>
                            <input type="text" className="form-control"
                                    placeholder="그램을 입력하세요" 
                                    onChange={(e)=>{
                                        SetFoodGram(e.target.value);
                            }}
                            value={food_gram}
                            />
                        </div>
                        <p className='text-danger'>{errorMessage}</p>
                        <Link to="/chart" role="button" className="btn btn-secondary">취소</Link>
                        <button onClick={deleteFood} className="btn btn-danger" >삭제</button>
                        <button onClick={SaveEat} className="btn btn-primary" >저장</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );

};