import { useEffect, useState } from 'react';
import './App.css';
import Category from './Category/Category';
import Headr from './Headr/header'
import axios from './axios';
import Loading from './Loading/Loading';
import FastFoodList from './FastFoodList/fastFoodList';
import SearchBar from './SearchBar/searchBar';
import notfound from './assets/images/404.png'

function App() {
  const [loading ,setLoading ] = useState(false);
  const [fastFoodItems ,setFastFood] = useState([]);
  const fetchData =async(categoryId = null) => {
    setLoading(true);
    const response = await axios.get(`/FastFood/list/${categoryId ? "?categoryId=" + categoryId : ""}`
    );

    setLoading(false);
    setFastFood(response.data);

  };

  useEffect(()=>{
    fetchData()
  },[])
  const fillterItems = (categoryId) =>{
    fetchData(categoryId);
  }
  const searchItems = async (term)=>{
    setLoading(true);
    const response = await axios.get(`/FastFood/search/${term ? '?term=' + term : "" }
    `);
    setLoading(false);
    setFastFood(response.data);

  };
   const renderContent = ()=>{
    if (loading){
      return <Loading  theme="dark"/>
    }
    if (fastFoodItems.length === 0){
       return(
        <>
        <div className='alert  alert-warning text-center '>
          داده ای یافت نشد 
        </div>
        {/* <img  className='mx-auto mt-5 d-block' src={notfound}/> */}

        </>
       )

    }
   
    return <FastFoodList fastFoodItems ={fastFoodItems}/>
   }
  return (
   <div className='wrapper bg-faded-dark'>
     <Headr></Headr>
<Category fillterItems={fillterItems}>
  <SearchBar  searchItems={searchItems} />
   </Category>
<div className='container mt-4'>{renderContent()}</div>
   </div>
  );
}

export default App;
