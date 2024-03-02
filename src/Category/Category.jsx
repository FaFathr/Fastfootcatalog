import React, { useEffect, useState } from 'react'
import axios from '../axios'
import Loading from '../Loading/Loading'
import SearchBar from '../SearchBar/searchBar';

const Category = ({fillterItems , children}) => {
  const [loading ,setLoading] = useState(true);

     const [categories ,setCategories] =useState([]);
    useEffect(()=>{
   const fetchCategories = async() =>{
     const response = await axios.get('/FoodCategory/categories');
   setCategories(response.data);
   setLoading(false);
    }
    fetchCategories()
    },[])

    const renderContent = () =>{
      if(loading){
        return <Loading/>
      }
      return (
        <div className='ps-3 w-100 d-flex align-items-center justify-content-between gap-5'>
        <ul className='nav'>
        <li className='nav-item' onClick={()=>fillterItems()}>
            <a className='nav-link' href="#">
                همه فست فود ها
            </a>
        </li>
        {
            categories.map(Category=>(
              <li className='nav-item' key={Category.id}onClick={()=>fillterItems(Category.id)} >
                <a className='nav-link' href="#">
                {Category.name}
            </a>
              </li>
            ))
        }
    </ul>
        {children}
    </div>
      )
    }

  return (
    <nav className="container mt-n5">
        <div className='d-flex align-items-center bg-white rounded-3 shadow-lg py-4' style={{height:"80px"}}>
             {renderContent()}
        </div>
    </nav>
  )
}

export default Category
