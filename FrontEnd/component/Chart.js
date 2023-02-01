import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';

import { API } from '../api/Config';
import { CustomAxios } from '../api/CustomAxios';

import { CustomPieChart } from '../hooks/UsePieChart';
import { CustomBarChart } from '../hooks/UseBarChart';
import { CustomEatTable } from '../hooks/CustomEatTable';


export default function Chart(){

    const {id} = useSelector(state => {return state.authUser}); 
    const [datasets, setData] = useState([{}]);
    

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const baseAxios = async () => {
        try{
            const response = await CustomAxios.get(`${API.EATMAIN}`,{params:{id:id, start_date:startDate, end_date:endDate}})        
            setData(response.data.message);
            console.log(response);
        }
        catch(error){
            console.log(`error`,error);
        }
    } 
    
    useEffect(() => {
        baseAxios();
    }, []);

    useEffect(() => {
        baseAxios();
    }, [startDate, endDate]);


    const handleOnDelete = () => {
        baseAxios();
    }

    return(
        <div>
           <h1>차트</h1>
           <div className="col-md-12">
                <div className='row'>
                    <div className="col-md-6" >
                        <Link to="/main" role="button" className="btn btn-secondary">취소</Link>
                        <Link to="/manage" role="button" className="btn btn-primary">먹은음식</Link>
                    </div>
                </div>
                <div className='col-md-6' style={{display: 'flex'}}>
                    <DatePicker locale={ko} dateFormat="yyyy-MM-dd" selected={startDate} onChange={(date) => setStartDate(date) } />
                    <DatePicker locale={ko} dateFormat="yyyy-MM-dd" selected={endDate} onChange={(date) => setEndDate(date)} />
                </div>
                <div className='col-md-5' style={{display: 'flex'}}>
                    <CustomPieChart datasets = {datasets} />
                    <CustomBarChart datasets = {datasets} />
                </div>
                <div>
                    <CustomEatTable onDelete = {handleOnDelete} datasets = {datasets} />
                </div>
            </div>
        </div>
    );

};