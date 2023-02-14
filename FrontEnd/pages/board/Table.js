import React from "react";
import { Link } from 'react-router-dom';
import styles from '../../style/MainTable.module.css'


const Table = ({setPage, totalPage, page, data, onUpdate}) => {

    const updatePosts = (postId) => {
        onUpdate(postId)
    }

    const makePagination = () =>{
        let arr = [];
        for (let i=1; i<=totalPage; i++){
            if(i == page+1){
                arr.push(
                    <li key={i} className='page-item active'><a className='page-link' onClick={paginationClick}>{i}</a></li>
            )}
            else{
                arr.push(
                    <li key={i} className='page-item'><a className='page-link' onClick={paginationClick}>{i}</a></li>
            )}
        }
        return arr;
    }

    const paginationClick = (e) => {
        const clickPage = e.target.innerHTML-1
        setPage(clickPage);
    }

    const paginationFirstClick = (e) => {
        setPage(0);
    }
    const paginationListClick = (e) => {
        setPage(totalPage-1);
    }

    return(
        <div>
        <table className='table table-horizontal table-boardered table-hover' >
            <thead className='thead-strong'>
                <tr>
                    <th className={`${styles.tdWidth15}`} > 번호 </th>
                    <th className={`${styles.tdWidth70}`} > 제목 </th>
                    <th className={`${styles.tdWidth15}`} > 작성자 </th>
                </tr>
            </thead>
            <tbody id = 'tbody'>
                {
                    data.map((item,index) => {
                        return (
                            <tr key = {index} onClick={() => updatePosts(item.id)}>
                                <td >{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.nickName}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>

        <ul>
            <li className={`${styles.width80}`}>
                <nav aria-label="Page navigation" className={`${styles.Center}`}>
                    <ul className='pagination'>
                        <li className="page-item">
                        <a className="page-link" onClick={paginationFirstClick} aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                        </li>
                            {makePagination()}
                        <li className="page-item">
                        <a className="page-link" onClick={paginationListClick} aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                        </li>
                    </ul>
                </nav>
            </li>
            <li className={`${styles.width20}`}>
                <Link to='/iposts' className={`btn btn-primary ${styles.width100}`} role='button' >글등록</Link>
            </li>
        </ul>
    </div>
    )
};

export default Table;