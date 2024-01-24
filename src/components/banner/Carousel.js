import React, { useEffect, useContext, useState } from 'react'
import { TrendingCoins } from '../../config/api'
import CryptoContext from '../context/CryptoContext'
import AliceCarousel from 'react-alice-carousel';
import { Link } from "react-router-dom";
const Carousel = () => {
  const carouselStyle = {
    height: "50%",
    display: "flex",
    alignItems: "center",
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const carouselItem = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  }
  var profit = false
  const [trending, setTrending] = useState([])
  const { currency, symbol } = useContext(CryptoContext)
  const fetchTrendingCoins = async () => {
    try {
      const response = await fetch(TrendingCoins(currency),{
        
          method:'GET',
          mode:'cors'
        
      })
    const json = await response.json();
    setTrending(json)
    } catch (error) {
      console.log(error.message);
    }
    
  }
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  useEffect(() => {
    fetchTrendingCoins()
  }, [currency])
  return (
    <div className="carousel" style={carouselStyle}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={trending.map((coin) => {
          profit = false;
          if (coin.price_change_percentage_24h >= 0) {
            profit = true;
          }
          return (
            <Link style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              textTransform: "uppercase",
              color: "white",
            }} to={`/coins/${coin.id}`}>
              <img
                src={coin.image}
                alt={coin.name}
                height="80"
                style={{ marginBottom: 10 }}
              />
              <span>
                {coin.symbol}
                &nbsp;
                <span  style={{
              color: profit===true ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}>
              {
                profit>0?"+":""
              }
               {coin.price_change_percentage_24h.toFixed(2)}%

                </span>
              </span>

<span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
        </span>
            </Link>
          )

        })}
        autoPlay />
    </div>
  )
}

export default Carousel