import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function CustomBarChart({datasets}) {

    const [barChartLabels, setBarChartLabels] = useState([]);
    const [barChartData, setBarChartData] = useState([])
    const [barChartTanData, setBarChartTanData] = useState([])
    const [barChartDanData, setBarChartDanData] = useState([])
    const [barChartGeData, setBarChartGeData] = useState([])

    const barChartDataSet = () => {
        const tempDataSet = [];
        const tempTanDataSet = [];
        const tempDanDataSet = [];
        const tempGeDataSet = [];
        const tempExtDataSet = [];
        const tempLabelSet = [];
        
        datasets.map(d => {
            let date = new Date(d.date);
            const tempDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
            let i = tempLabelSet.indexOf(tempDate);
            if(i == -1 ){
                tempLabelSet.push(tempDate);    
                tempDataSet.push((d.calories*d.eat_gram));
                tempTanDataSet.push((d.tan*d.eat_gram));
                tempDanDataSet.push((d.dan*d.eat_gram));
                tempGeDataSet.push((d.ge*d.eat_gram));
            }
            else{
                tempDataSet[i] += d.calories*d.eat_gram; 
                tempTanDataSet[i] += d.tan*d.eat_gram; 
                tempDanDataSet[i] += d.dan*d.eat_gram; 
                tempGeDataSet[i] += d.ge*d.eat_gram; 
            }
        });

        setBarChartLabels(tempLabelSet);
        setBarChartData(tempDataSet);
        setBarChartTanData(tempTanDataSet);
        setBarChartDanData(tempDanDataSet);
        setBarChartGeData(tempGeDataSet);

    }


    useEffect(() => {
        barChartDataSet();
    }, [datasets] )

    const options = {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: '날짜별 상세 성분',
            },
        },
    };
    
    const data = {
        labels: barChartLabels,
        datasets: [
            {
            label: '칼로리',
            data: barChartData,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: '탄수화물',
              data: barChartTanData,
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: '단백질',
                data: barChartDanData,
                backgroundColor: 'rgba(255, 206, 86, 0.5)',
            },
            {
                label: '지방',
                data: barChartGeData,
                backgroundColor: 'rgba(255, 108, 235, 0.5)',
            },
        ],
    };

    return (
        <Bar options={options} data={data} /> 
    )
}