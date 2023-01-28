import React, { useState, useEffect } from 'react';

import { CustomPieChart } from '../hooks/UsePieChart';
import { CustomBarChart } from '../hooks/UseBarChart';

export default function Chart(){

    const [datasets, setData] = useState([{}]);
    
    const baseData = () => {
        setData([
            {foodName:'라면',calories:4,tan:1,dan:1,ge:1,eat_gram:1,date:'2023-01-08T11:58:20.551705'}
        ,   {foodName:'라면',calories:4,tan:1,dan:1,ge:1,eat_gram:1,date:'2023-01-08T11:59:20.551705'}
        ,   {foodName:'떡볶이',calories:4,tan:1,dan:1,ge:1,eat_gram:1,date:'2023-01-09T11:59:20.551705'}
        ,   {foodName:'라면',calories:4,tan:1,dan:1,ge:1,eat_gram:1,date:'2023-01-10T11:59:20.551705'}
        ,   {foodName:'김치',calories:4,tan:1,dan:1,ge:1,eat_gram:1,date:'2023-01-12T11:59:20.551705'}
        ,   {foodName:'젓갈',calories:4,tan:1,dan:1,ge:1,eat_gram:1,date:'2023-01-13T11:59:20.551705'}
        ]);
    }
    
    useEffect(() => {
        baseData();
    }, []);


    return(
        <div>
           <h1>차트</h1>
           <div className="col-md-12">
                <div className="row">
                    <div className="col-md-5" >
                        <CustomPieChart datasets = {datasets} />
                        <CustomBarChart datasets = {datasets} />
                    </div>
                </div>
            </div>
        </div>
    );

};