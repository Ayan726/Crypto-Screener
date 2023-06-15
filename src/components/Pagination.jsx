import React, { useContext, useRef, useState } from 'react'
import paginationArrow from '../assets/pagination-arrow.svg'
import { CryptoContext } from '../context/CryptoContext';
import submitIcon from '../assets/submit-icon.svg'

const Perpage = () => {
    let inputRef = useRef(null);
    let {setPerPage} = useContext(CryptoContext);

    const handlePerPage = (e) => {
        e.preventDefault();
        let val = inputRef.current.value;
        setPerPage(val);
        inputRef.current.value = val;
    }


    return (
        <>
            <form onSubmit={handlePerPage} className='relative flex items-center justify-center font-nunito text-base font-semibold'>
                <label className='mr-3' htmlFor="perPage">per page:</label>
                <input ref={inputRef} className='h-7 w-16 bg-gray-200 placeholder:text-gray-100 rounded pl-2 border-cyan outline-0 focus:border-[1px]' type="number" name='perPage' placeholder='e.g 5' min={1} max={250} />
                <button className='ml-2 cursor-pointer' type='submit'>
                    <img src={submitIcon} alt="icon" />
                </button>
            </form>
        </>
    )
}


function Pagination() {

    let { page, setPage, totalPages, perPage, cryptoData } = useContext(CryptoContext);
    let totalNum = Math.ceil(totalPages / perPage);

    const next = () => {
        if (page === totalNum) {
            return null;
        }
        setPage(page => page + 1);
    }

    const prev = () => {
        if (page === 1) return null;
        else {
            setPage(page => page - 1);
        }
    }

    const multiStepNext = () => {
        if (page + 3 >= totalNum) setPage(totalNum - 1);
        else {
            setPage(page => page + 3);
        }
    }
    const multiStepPrev = () => {
        if (page - 3 <= 1) setPage(2);
        else {
            setPage(page => page - 2);
        }
    }

    

        if(cryptoData && cryptoData.length >= perPage){
            return (
                <div className='flex sm:flex-row flex-col items-start sm:items-center gap-8'>
            <Perpage/>

            <ul className='flex items-center justify-end'>
                <li>
                    <button onClick={prev} className='outline-0 border-0 hover:text-cyan cursor-pointer rotate-180 translate-y-1'>
                        <img className='w-full h-auto' src={paginationArrow} alt="prev" />
                    </button>
                </li>
                <li>
                    {
                        page === 1 ?
                            null :
                            <button onClick={multiStepPrev} className='text-lg flex justify-center items-center w-8 h-8 rounded-full hover:text-cyan'>...</button>
                    }

                </li>
                <li><button onClick={prev} className={page === 1 ? "hidden" : "flex justify-center items-center  w-8 h-8 rounded-[50%] hover:text-cyan bg-gray-200 mx-2"}>{page - 1}</button>
                </li>

                <li><button disabled className='flex justify-center items-center w-8 h-8 rounded-full bg-cyan text-gray-200 mx-2 cursor-pointer'>{page}</button></li>

                <li>
                    {
                        page === totalNum || page === totalNum - 1 ?
                            null
                            :
                            <button onClick={next} className='flex justify-center items-center w-8 h-8 rounded-full hover:text-cyan bg-gray-200 mx-2'>{page + 1}</button>
                    }

                </li>


                <li>
                    {
                        page === totalNum || page === totalNum - 1 ?
                            null
                            :
                            <button onClick={multiStepNext} className='text-lg flex justify-center items-center w-8 h-8 rounded-full hover:text-cyan'>
                                ...
                            </button>

                    }

                </li>


                <li>
                    {
                        page === totalNum ?
                            null
                            :
                            <button onClick={() => setPage(totalNum)} className='flex justify-center items-center w-8 h-8 rounded-full hover:text-cyan bg-gray-200 mx-2'>{totalNum}</button>

                    }

                </li>
                <li>
                    <button onClick={next} className='outline-0 border-0 hover:text-cyan cursor-pointer translate-y-[1px]'>

                        <img className='w-full h-auto' src={paginationArrow} alt="next" />

                    </button>


                </li>
            </ul>


        </div>
            )
        }
        else {
            return null;
        }
        
    
}

export default Pagination
