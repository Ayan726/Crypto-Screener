import React from 'react'
import { useNavigate } from 'react-router-dom'

function TrendingCoin({data}) {
    let navigate = useNavigate();
    const getCoindtl = (id) => {
      navigate(id);
    }

  return (
    <div className='lg:w-[40%] w-[70%] bg-gray-200 mb-12 last:mb-0 rounded-lg p-4 relative cursor-pointer hover:bg-gray-100 hover:bg-opacity-40'
    onClick={() => getCoindtl(data.id)}
    >
      {data
      ? 
      <>
      <h3 className='text-base flex items-center my-0.5'>
        <span className='text-gray-100 capitalize'>Name:&nbsp;</span>
        <span className='text-cyan'>{data.name}</span>
        <img className='w-[1.5rem] h-auto mx-1.5 rounded-full' src={data.small} alt={data.name} />
      </h3>

      <h3 className='text-base flex items-center my-0.5'>
        <span className='text-gray-100 capitalize'>Market Cap Rank:&nbsp;</span>
        <span className='text-cyan'>{data.market_cap_rank}</span>
        
      </h3>

      <h3 className='text-base flex items-center my-0.5'>
        <span className='text-gray-100 capitalize'>Price:&nbsp;</span>
        <span className='text-cyan'>
        {
        new Intl.NumberFormat('en-IN', { style: 'currency', currency: "btc", maximumSignificantDigits: 5 }).format(data.price_btc)
        }

        </span>
        
      </h3>

      <h3 className='text-base flex items-center my-0.5'>
        <span className='text-gray-100 capitalize'>Score:&nbsp;</span>
        <span className='text-cyan'>{data.score}</span>
        
      </h3>

      <img className='w-[35%] h-auto rounded-full absolute top-3 sm:top-2/4 -right-12 -translate-y-2/4' src={data.large} alt={data.name} />

      </>
      
      :
      <div className='w-full h-full flex justify-center items-center'>

          <div className='w-8 h-8 border-cyan border-4 rounded-[50%] animate-spin border-b-gray-200'/>
          <span className='ml-2'>Please Wait...</span>
      </div>
      }
    </div>
  )
}

export default TrendingCoin
