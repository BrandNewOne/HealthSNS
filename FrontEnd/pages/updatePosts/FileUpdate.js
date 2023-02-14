import React, { useEffect, useState, useRef } from "react";

import store from '../../store/index';
import { SET_DUMP } from '../../store/User';
import { CustomAxios } from '../../api/CustomAxios';

import { DELETE_ImageFileList } from '../../store/ImageFile';
import { API } from '../../api/Config';

import styles from '../../style/File.module.css'

const getByteSize = (size) => {
  const byteUnits = ["KB", "MB", "GB", "TB"];

  for (let i = 0; i < byteUnits.length; i++) {
    size = Math.floor(size / 1024);

    if (size < 1024) return size.toFixed(1) + byteUnits[i];
  }
};

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

export default function FileUpload({data, onDelete}) {

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
      console.log('Ref', inputRef);
      inputRef.current.files = fileset.files;
    }

    setFiles(newFiles);

  };
  const handleImageDelete = (e) => {
    onDelete(e);
  }

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

    const params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    
    formData.append("postsId",id);
    if(!(store.getState().imageFile.fileList === null)){
      console.log("updateFiles",store.getState().imageFile.fileList);
      formData.append("updateFiles",store.getState().imageFile.fileList);
    }

    try {
      const response = await CustomAxios.put(`${API.FILEUPDATE}`,formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      console.log('생성된 파일 넘버', response.data.message);
      store.dispatch(SET_DUMP(response.data.message));
      store.dispatch(DELETE_ImageFileList());

      SetErrorMessage('');
      alert("성공");

    } catch (error) {
      SetErrorMessage(error.response.data.message);
      console.log('실패',error);
    }
  };

  return (
    <div>
        <input ref={inputRef} type="file" multiple onChange={handleChange} accept='image/jpg,image/png,image/jpeg,image/gif'/>

        <ul>
          {files.map((file, index) => (
            <li key={file.name}>
              {`${file.name} | ${getByteSize(file.size)} `}
              <button onClick={() => handleDelete(index)}>삭제</button>
            </li>
          ))}
          {
            data.map((item) => {
              return (
                <React.Fragment key={item.saveName}>
                  <li> {item.originName}
                    <button id={item.saveName} type="button" onClick={handleImageDelete} >삭제 </button>
                  </li>
                </React.Fragment>
              );
            })
          }
        </ul>
        <p className='text-danger'>{errorMessage}</p>
        <button onClick={upload} > 전송 </button>
    </div>
  );
}