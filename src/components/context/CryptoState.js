import React,{useState,useEffect} from 'react'
import CryptoContext from './CryptoContext'
const CryptoState = ({children}) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  useEffect(() => {
    if(currency==="INR"){
      setSymbol("₹");
    } 
    else if(currency==="USD") {
      setSymbol("$");
    }
    
  }, [currency])
  
  return (
   <CryptoContext.Provider value={{currency,symbol,setCurrency}}>
    {children}
   </CryptoContext.Provider>
  )
}

export default CryptoState