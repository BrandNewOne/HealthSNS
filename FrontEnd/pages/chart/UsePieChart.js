import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export function CustomPieChart({datasets}) {

    const [pieChartLabels, setPieChartLabels] = useState([]);
    const [pieChartData, setPieChartData] = useState([])

    const pieChartDataSet = () => {
        const tempDataSet = [];
        const tempLabelSet = [];
        
        datasets.map(d => {
            let i = tempLabelSet.indexOf(d.foodName)
            if(i == -1 ){
                tempLabelSet.push(d.foodName);    
                tempDataSet.push((d.calories*d.eat_gram));
            }
            else{
                tempDataSet[i] += d.calories*d.eat_gram; 
            }
        });
        
        setPieChartLabels(tempLabelSet);
        setPieChartData(tempDataSet);
    }

    useEffect(() => {
        pieChartDataSet();
    }, [datasets] )

    const piChartData = {

        labels: pieChartLabels,
        datasets: [
            {
                label: ['calories'],
                data: pieChartData,
                backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(255, 108, 235, 0.2)',
                ],
                borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(150, 150, 100, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

  return (
    <div>
        <Pie data={piChartData} />
    </div>
  );
}
