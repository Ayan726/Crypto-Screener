import { createContext, useEffect, useState } from "react";

// create context object
export const TrendingContext = createContext({});


export const TrendingProvider = ({children}) => {

    const [trendData, setTrendData] = useState();


    const getTrendingData = async () => {

        try{
            const res = await fetch(`https://api.coingecko.com/api/v3/search/trending`)
            if(!res.ok){
                console.log('error occured');
                return;
            }
            const data = await res.json()
            console.log(data);
            setTrendData(data.coins);

        } catch(err){
            console.log(err);
        }
    }

    const resetTrendingResult = () => {
        getTrendingData();
    }


    useEffect(() => {
        getTrendingData();
    }, [])

    return (
        <TrendingContext.Provider value = {{trendData, getTrendingData, resetTrendingResult}}>
            {children}
        </TrendingContext.Provider>
    )
}
