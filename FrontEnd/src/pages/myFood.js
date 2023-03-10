import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';

import { API } from '../api/Config';
import { CustomAxios } from '../api/CustomAxios';

import NavBar from '../component/NavBar';
import styles from '../style/MyFood.module.css'

import { ToastContext } from "../context/ToastContext";

export default function MyFood(){

    const toast = useContext(ToastContext);
    const {id} = useSelector(state => {return state.authUser}); 

    const baseAxios = async () =>{
        try{
            const response = await CustomAxios.get(`${API.MYFOOD}`,{params:{uid:id}});
            setData(response.data.message);
        }
        catch(error){
            // console.log(error);
        }
    } 
    
    useEffect(() => {
        baseAxios();
    }, []);

    const [data, setData] = useState([]);
    const [foodName, SetFoodName] = useState("");
    const [calories, SetCalories] = useState("");
    const [tan, SetTan] = useState("");
    const [dan, SetDan] = useState("");
    const [ge, SetGe] = useState("");
    const [food_gram, SetFoodGram] = useState("");
    const [errorMessage, SetErrorMessage] = useState("");

    const [foodDataMessage, setFoodDataMessage] = useState("");

    const clear = () => {
        SetTan('');
        SetDan('');
        SetGe('');
        SetCalories('');
        SetFoodName('');
        SetFoodGram('');
    }

    const handleKeyDown = e => {
        if(e.code === 'Enter'){
            let sw = true;
            const l = data.length;


            for(let i = 0; i<l; i++){
                if(data[i].foodName == foodName){
                    SetTan(data[i].tan);
                    SetDan(data[i].dan);
                    SetGe(data[i].ge);
                    SetCalories(data[i].calories);
                    SetFoodName(data[i].foodName);
                    SetFoodGram(data[i].foodGram);
                    SetErrorMessage('');
                    sw = false;
                    break;
                }
            }

            if(sw){
                SetErrorMessage('?????? ????????? ????????????.');
                clear();
            }
        }
    } 

    const foodSavePostData = (id) =>{
        
        return{
            uid: id,
            foodName: foodName,
            calories: (calories/food_gram),
            tan: (tan/food_gram),
            dan: (dan/food_gram),
            ge: (ge/food_gram),
            food_gram: 1,
            etc: ((calories - tan - dan - ge)/food_gram),
        }
    }

    const saveFood = async () => {
        try{
            console.log(calories);
            await CustomAxios.put(`${API.FOODSAVE}`,foodSavePostData(id));

            toast.setIsShow(true);
            toast.setMessage("?????????????????????.");
            baseAxios();
            clear();
            
        }
        catch(error){
            console.log('manage Error ', error);
        }
            
    };

    const deleteFood = async () => {
        try{
            await CustomAxios.delete(`${API.FOODDELETE}`,{params:{foodName:foodName, uid:id}});
            toast.setIsShow(true);
            toast.setMessage('?????????????????????.');
            baseAxios();
            clear();
        }
        catch(error){
            console.log('manage Error ', error);
            SetErrorMessage(error.response.data.message);
        }
            
    };

    const searchFood = async () => {
        try{
            const response =  await CustomAxios.get(`${API.FOODSEARCH}`,{timeout: 3000, params:{foodName:foodName}});
            setFoodDataMessage(response.data);

        }catch(error){
            console.log(error);
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
                            <th scope="col" className={`${styles.tdWidth25}`} ><h3>?????? ??????</h3></th>
                            <td className= {`${styles.tdWidth75}`}> <button onClick={searchFood}> ??????</button>  <p style={{color:"blue"}}>{foodDataMessage}</p></td>
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
                                                value={foodName}
                                                onKeyDown={handleKeyDown}
                                        />
                                        <datalist id="datalistOptions">
                                            {
                                                data.map((item,index) => {
                                                    return(
                                                            <option key={index} > {item.foodName} </option>
                                                    );
                                                })
                                            }
                                        </datalist>
                                </div>
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

                <ul style={{listStyle:"none"}}>
                    <li className={styles.liStyle}><button className='btn btn-primary' onClick={saveFood} >??????</button></li>
                    <li className={styles.liStyle}><button className='btn btn-danger' onClick={deleteFood} >??????</button></li>
                </ul>

            </div>
            
        </div>
    );
};