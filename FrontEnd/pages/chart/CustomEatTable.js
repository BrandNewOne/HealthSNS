import React from 'react';
import { API } from '../../api/Config';
import { CustomAxios } from '../../api/CustomAxios';


export function CustomEatTable({onDelete, datasets}) {

    const deleteEatData = async (id) => {
        await CustomAxios.delete(`${API.EATDELETE}`,{params:{id:id}})    
        onDelete();
    };

    return (
        <div>
        <table className='table table-horizontal table-boardered' >
            <thead className='thead-strong'>
                <tr>
                    <th> 음식이름 </th>
                    <th> 먹은 시간 </th>
                    <th> 먹은 그램 </th>
                    <th></th>
                </tr>
            </thead>
            <tbody id = 'tbody'>
                {
                    datasets.map((item, index) => {
                        return (
                            <tr key = {index}>
                                <td>{item.foodName}</td>
                                <td>{item.date.replace('T', ' ').split('.')[0]}</td>
                                <td>{item.eat_gram}</td>
                                <td> <button type="button" className='btn btn-danger' onClick={() => deleteEatData(item.id)}>삭제</button></td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>

    </div>
    )
}