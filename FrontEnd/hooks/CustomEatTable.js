import React, { useEffect, useState } from 'react';
import { API } from '../api/Config';
import { CustomAxios } from '../api/CustomAxios';


export function CustomEatTable({datasets}) {

    const deleteEatData = async (id) => {
        const response = await CustomAxios.delete(`${API.EATDELETE}`,{params:{id:id}})        
    };

    return (
        <div>
        <table className='table table-horizontal table-boardered' >
            <thead className='thead-strong'>
                <tr>
                    <th> 음식이름 </th>
                    <th></th>
                </tr>
            </thead>
            <tbody id = 'tbody'>
                {
                    datasets.map((item) => {
                        return (
                            <tr key = {item.id}>
                                <td>{item.foodName}</td>
                                <button type="button" onClick={() => deleteEatData(item.id)}>삭제</button>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>

    </div>
    )
}