import React, { useContext, useState } from 'react'
import searchIcon from '../assets/search-icon.svg'
import { CryptoContext } from '../context/CryptoContext';
import debounce from 'lodash.debounce';

const SearchInput = (props) => {
  const [searchtext, setSearchText] = useState('');
  let {searchData, setCoinSearch, setSearchData} = useContext(CryptoContext);


  const handleSearch = (e) => {
    e.preventDefault();
    let query = e.target.value;
    console.log(query);
    setSearchText(query);
    props.func(query);
}

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const selectCoin = (coin) => {
    setCoinSearch(coin)
    setSearchText('')
    setSearchData('')
  }

  return (

    <>
    <form onSubmit={handleSubmit} className='w-full flex lg:w-96 items-center relative'>
       <input value={searchtext} onChange={handleSearch} className='border focus:border-cyan rounded w-full h-7 pl-3 bg-gray-200 outline-0 placeholder:text-gray-100' type="text" name='search' placeholder='search here...'/>
       <button className='absolute right-1 cursor-pointer' type="submit">
        <img className='h-auto w-full' src={searchIcon} alt="search-icon" />
       </button>
    </form>

    {
      searchtext.length > 0 ?
      <ul className='absolute left-6 top-12 w-96 h-96 bg-gray-200 backdrop-blur-md bg-opacity-60 rounded-lg z-10 overflow-x-hidden scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-100 '>
        {
          searchData ? 
          searchData.coins.map(el => {
            return (
              <>
            <li onClick={() => selectCoin(el.id)} key = {el.id} className='mx-6 flex items-center gap-2 h-8 w-full cursor-pointer'>
            <img className='w-[1rem] h-[1rem] rounded' src={el.thumb} alt="icon"/>
            {el.name}
            </li>
            

              </>
            )
          }
          )
          :
          <div className='w-full h-full flex justify-center items-center'>

          <div className='w-8 h-8 border-cyan border-4 rounded-[50%] animate-spin border-b-gray-200'/>
          <span className='ml-2'>Searching...</span>
          </div>
        }
        
      </ul> 
      
      :
      null
    }

</>


  )
}

function Search() {

    let {getSearchResult} = useContext(CryptoContext);
    

    let debounceFunc = debounce(function (query){
      getSearchResult(query);
    }, 2000)



    

  return (
    
    <>
      <SearchInput func = {debounceFunc}/>
    </>
  )
}

export default Search
