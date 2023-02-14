import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';

import { API } from '../../api/Config';
import { CustomAxios } from '../../api/CustomAxios';

import { CustomPieChart } from './UsePieChart';
import { CustomBarChart } from './UseBarChart';
import { CustomEatTable } from './CustomEatTable';

import NavBar from '../../component/NavBar';
import styles from '../../style/Chart.module.css'


export default function Chart(){

    const {id} = useSelector(state => {return state.authUser}); 
    const [datasets, setData] = useState([]);
    

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const baseAxios = async () => {
        try{
            const response = await CustomAxios.get(`${API.EATMAIN}`,{params:{id:id, start_date:startDate, end_date:endDate}})        
            setData(response.data.message);
        }
        catch(error){
            console.log(`error`,error);
        }
    } 

    useEffect(() => {
        baseAxios();
        console.log(datasets);
    }, [startDate, endDate]);


    const handleOnDelete = () => {
        baseAxios();
    }

    return(
        <div>
            <header className={`${styles.header}`}>
                <NavBar uid = {id} />
            </header>

            <div className={`col-md-12 ${styles.Main}`}>
                <table className='table table-horizontal table-boardered' >
                    <thead className='thead-strong'>
                        <tr>
                            <th className={`${styles.tdWidth80}`} scope="col"><h3>차트</h3></th>
                            <td className={`${styles.tdWidth10}`} >
                                <DatePicker locale={ko} dateFormat="yyyy-MM-dd" selected={startDate} onChange={(date) => setStartDate(date) } />
                            </td>
                            <td className={`${styles.tdWidth10}`} >
                                <DatePicker locale={ko} dateFormat="yyyy-MM-dd" selected={endDate} onChange={(date) => setEndDate(date)} />
                            </td>
                        </tr>
                    </thead>
                </table>
                { datasets.length === 0 && 
                <div style={{height:"200px", marginTop:"100px", textAlign:"center", fontSize:"30px"}}>
                    데이터가 없습니다.
                </div>}
                { datasets.length !== 0 && 
                    <div className='col-md-5' style={{display: 'flex'}}>
                        <CustomPieChart datasets = {datasets} />
                        <CustomBarChart datasets = {datasets} />
                    </div>
                }
                { datasets.length !== 0 && 
                    <div>
                        <CustomEatTable onDelete = {handleOnDelete} datasets = {datasets} />
                    </div>
                }
            </div>
        </div>
    );

};