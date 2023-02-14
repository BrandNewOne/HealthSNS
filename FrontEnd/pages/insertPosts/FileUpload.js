import React, { useEffect, useState, useRef } from "react";

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


export default function FileUpload({files, setFiles}) {

  const inputRef = useRef([]);
  
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
    </div>
  );
}