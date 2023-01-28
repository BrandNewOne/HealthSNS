import React, { useEffect, useState, useRef } from "react";

import store from '../store/index';
import { SET_DUMP } from '../store/User';
import { CustomAxios } from '../api/CustomAxios';

import { API } from '../api/Config';

const getUniqueObjectArray = (arr1, arr2, key) => {
  const resultArr = [];
  const uniqueItem = [];
  
  arr1.forEach((item) => {
    if(!uniqueItem.includes(item[key])){
      uniqueItem.push(item[key]);
      resultArr.push(item);
    }
  })

  arr2.forEach((item) => {
    if(!uniqueItem.includes(item[key])){
      uniqueItem.push(item[key]);
      resultArr.push(item);
    }
  })

  return resultArr;
}

export default function FileUpload(prop) {

  const inputRef = useRef([]);
  const [files, setFiles] = useState([]);
  const [errorMessage, SetErrorMessage] = useState("");
  
  const handleChange = (e) => {

    const uploadFiles = Array.from(e.target.files || []);
    const newFiles = getUniqueObjectArray(files, uploadFiles, 'name');

    console.log('newFiles',newFiles);

    const fileset = new DataTransfer();
    newFiles.forEach((file) => fileset.items.add(file));

    if(inputRef.current) {
      inputRef.current.files = fileset.files;
    }

    setFiles(newFiles);

  };

  const handleDelete = (index) => {
    const newFiles = [...files.slice(0, index), ...files.slice(index + 1)];

    const fileset = new DataTransfer();
    newFiles.forEach((file) => fileset.items.add(file));

    if(inputRef.current) {
      inputRef.current.files = fileset.files;
    }

    setFiles(newFiles);
  };

  useEffect(() => {
}, [files]); 
  

  const upload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // @ts-ignore
    Array.from(files).forEach((el) => {
      formData.append("files", el);
    });

    formData.append("uid",store.getState().authUser.id);

    try {
      const response = await CustomAxios.post(`${API.FILESAVE}`,formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      console.log('생성된 파일 넘버', response.data.message);
      store.dispatch(SET_DUMP(response.data.message));
      SetErrorMessage('');
      alert("성공");

    } catch (error) {
      SetErrorMessage(error.response.data.message);
      console.log('실패',error);
    }
  };

  return (
    <div>
        <input ref={inputRef} type="file" multiple onChange={handleChange} accept='image/jpg,image/png,image/jpeg,image/gif' />

        <ul>
          {files.map((file, index) => (
            <li key={file.name}>
              {file.name}
              <button onClick={() => handleDelete(index)}>삭제</button>
            </li>
          ))}
        </ul>
        <p className='text-danger'>{errorMessage}</p>
        <button onClick={upload} > 전송 </button>
    </div>
  );
}