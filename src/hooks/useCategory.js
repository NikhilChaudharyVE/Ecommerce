import React,{useState,useEffect} from "react";
import axios from "axios";
import {getAllCategoryURL} from '../config/Api';
const useCategory=()=>{
    const[categories,setCategories]=useState([]);
    const getCategory = async() =>{
    try {
        const {data}= await getAllCategoryURL();
    setCategories(data?.data);    
    } catch (error) {
        console.log("eror are in useCategory file : ",error);
    }   
    }
useEffect(()=>{
    getCategory()
},[]);
return categories;
}
export default useCategory;