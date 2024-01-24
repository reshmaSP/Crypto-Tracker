import React from 'react'
import { useEffect, useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../config/api.js';
import CryptoContext from '../components/context/CryptoContext.js';
import CoinInfo from '../components/CoinInfo.js';
import LinearProgress from '@mui/material/LinearProgress';
import { Typography } from '@mui/material';
import './Coin.css';
const Coin = () => {
  const { id } = useParams();
  const { currency, symbol } = useContext(CryptoContext)
  const [coin, setCoin] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  const [desc, setDesc] = useState("")
  const [mrank, setMrank] = useState(0);
  const [cprice, setCprice] = useState(0)
  const [mcap, setMcap] = useState(0)
  const fetchCoin = async () => {
    const response = await fetch(SingleCoin(id),{
      method: "GET",
      mode:'cors'
    });
    const json = await response.json();
    setDesc(json.description.en.split(". ")[0]);
    setImgUrl(json.image.large);
    setMrank(json.market_cap_rank);
    setCprice(json.market_data.current_price[currency.toLowerCase()]);
    setMcap(json.market_data.market_cap[currency.toLowerCase()])
    setCoin(json);
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  useEffect(() => {
    fetchCoin();
  }, [])


  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  return (
    <div className="coin-container">
      <div className='coin-sidebar'>
        <img src={imgUrl} alt={coin.name} height="200" style={{ marginBottom: '20' }} />
        <Typography variant='h3' sx={{
          fontWeight: "bold",
          marginBottom: "20 !important",
          fontFamily: "Montserrat",
        }} >
          {coin.name}
        </Typography>

        <Typography variant='subtitle1'
          style={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: 25,
            paddingBottom: 15,
            paddingTop: 0,
            textAlign: "justify",
          }}>
          {desc}
        </Typography>
        <div className="market-data">
          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={{
              fontWeight: "bold",
              marginBottom: "20 !important",
              fontFamily: "Montserrat",
            }}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(mrank)}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={{
              fontWeight: "bold",
              marginBottom: "20 !important",
              fontFamily: "Montserrat",
            }}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}{numberWithCommas(cprice)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={{
              fontWeight: "bold",
              marginBottom: "20 !important",
              fontFamily: "Montserrat",
            }}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(mcap.toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>


        </div>
      </div>
      <CoinInfo coin={coin}/>
    </div>
  )
}

export default Coin
