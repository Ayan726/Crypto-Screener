import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import { CryptoContext } from "./CryptoContext";

// create context object
export const StorageContext = createContext({});


export const StorageProvider = ({children}) => {

    const [allCoins, setAllCoins] = useState([]);
    const [savedData, setSavedData] = useState([]);
    let {currency, sortby} = useContext(CryptoContext);

    const getSavedData = async (totalCoins = allCoins) => {
        
        try{
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${totalCoins.join(',')}&order=${sortby}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`)
            
            const data = await res.json()
            console.log("Saved",data);
            setSavedData(data);

        } catch(err){
            console.log(err);
        }
    }

    const saveCoin = (coinId) => {
        let oldCoins = JSON.parse(localStorage.getItem("coins"));
        if (oldCoins.includes(coinId))return null;
        setAllCoins([...oldCoins, coinId]);
        localStorage.setItem("coins", JSON.stringify([...oldCoins,coinId]));
    }

    const removeCoin = (coinId) => {
        let oldCoins = JSON.parse(localStorage.getItem("coins"));
        let newcoins = oldCoins.filter(el => el !== coinId);
        setAllCoins(newcoins);
        localStorage.setItem("coins", JSON.stringify(newcoins));
    }

    const resetSavedResult = () => {
        getSavedData();
    }

    useEffect(() => {
        if(allCoins.length > 0){
            getSavedData(allCoins);
        }else{
            setSavedData();
        }
    }, [allCoins])

    useLayoutEffect(() => {
        let isThere = JSON.parse(localStorage.getItem("coins")) || false;
        if (!isThere){
            localStorage.setItem("coins", JSON.stringify([]));
        }else{
            let totalCoins = JSON.parse(localStorage.getItem("coins"));
            setAllCoins(totalCoins);
            if(totalCoins.length > 0){
                getSavedData(totalCoins);
            }
        }
    }, [])

    return (
        <StorageContext.Provider value = {{allCoins, saveCoin, removeCoin, savedData, resetSavedResult}}>
            {children}
        </StorageContext.Provider>
    )
}
