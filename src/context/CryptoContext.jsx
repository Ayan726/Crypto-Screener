import { createContext, useEffect, useState } from "react";

// create context object
export const CryptoContext = createContext({});


export const CryptoProvider = ({children}) => {

    const [cryptoData, setCryptoData] = useState();
    const [searchData, setSearchData] = useState();
    const [coinSearch, setCoinSearch] = useState('');
    const [currency, setCurrency] = useState('usd');
    const [sortby, setSortby] = useState('market_cap_desc');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(250);
    const [perPage, setPerPage] = useState(10);
    const [coinData, setCoinData] = useState();

    const getCoinData = async (coinId) => {
        setCoinData();
        const data = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=false`)
        .then(res => res.json())
        .then(json => json)
        console.log(data);
        setCoinData(data);

    }


    const resetFunction = () => {
        setPage(1);
        setSortby('market_cap_desc');
        setCoinSearch("");
    }

    const getCryptoData = async () => {
        setCryptoData();
        try{
            const data = await fetch('https://api.coingecko.com/api/v3/coins/list')
            .then(res => res.json())
            .then(json => json);
            // console.log(data);
            setTotalPages(data.length);
        } catch(err){
            console.log(err);
        }

        try{
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortby}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`);
            if(!res.ok){
                return;
            }
            const data = await res.json()
            // console.log(data);
            setCryptoData(data);

        } catch(err){
            console.log(err);
        }
    }


    const getSearchResult = async (query) => {
        try{

            const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`)
            if(!res.ok){
                console.log('error occured');
                return;
            }
            const data = await res.json()
            setSearchData(data)
            console.log(data)
        } catch(err){
            console.log(err)
        }

    }

    useEffect(() => {
        getCryptoData();
    }, [coinSearch, currency, sortby, page, perPage])

    return (
        <CryptoContext.Provider value = {{cryptoData, getCryptoData, searchData, setSearchData, getSearchResult, coinSearch, setCoinSearch, currency, setCurrency, sortby, setSortby, page, setPage, totalPages, setTotalPages, resetFunction, perPage, setPerPage, getCoinData, coinData}}>
            {children}
        </CryptoContext.Provider>
    )
}
