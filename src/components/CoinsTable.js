import React, { useState, useEffect, useContext} from 'react'
import { CoinList } from '../config/api'
import { LinearProgress, TableCell, TableRow, Paper, TextField, Container,  Typography } from '@mui/material';
import { Table, TableHead, TableBody, TableContainer,Pagination } from '@mui/material';
import CryptoContext from './context/CryptoContext'
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const CoinsTable = () => {
  let navigate = useNavigate();
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1);
  const { currency, symbol } = useContext(CryptoContext)
  const fetchCoin = async () => {
    setLoading(true);
    try {
    const response = await fetch(CoinList(currency),{
      method:'GET',
      mode:'cors'
    });
    const json = await response.json()
    setCoins(json)
    setLoading(false)
    } catch (error) {
      console.log(error.message);
    }
    
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const TableRowStyle={
    backgroundColor:"#16171a",
    cursor:"pointer",
    "&:hover":{
      backgroundColor:"#131111",
    },
    fontFamily:"Montserrat"
  }
  useEffect(() => {
    fetchCoin();
  }, [currency])
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer component={Paper}>
          {
            loading ? <LinearProgress style={{ backgroundColor: "gold" }} /> : (
              <Table aria-label="simple table">
                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                  <TableRow>
                    {
                      ["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                        <TableCell
                          style={{
                            color: "black",
                            fontWeight: "700",
                            fontFamily: "Montserrat",
                            
                          }}
                          key={head}
                          align={head === "Coin" ? "" :head==="Price"?"center": "right"}
                         
                        >
                          {head}
                        </TableCell>
                      ))
                    }
                  </TableRow>
                </TableHead>

                <TableBody>

                  {
                    handleSearch()
                    .slice((page-1)*10,(page-1)*10+10)
                    .map((row) => {
                      var profit = row.price_change_percentage_24h > 0;
                      return (
                        <TableRow key={row.name}
                        sx={
                          TableRowStyle
                        }
                          onClick={() => {
                            navigate(`/coins/${row.id}`)
                          }}
                        >
                          {/* first cell */}
                          <TableCell
                            component="th"
                            scope="row"
                            style={{
                              display: "flex",
                              gap: 15,
                            }}
                          >
                            <img
                              src={row.image}
                              alt={row.name}
                              height="50"
                              style={{ marginBottom: 10 }}
                            />
                            <div
                              style={{ display: "flex", flexDirection: "column" }}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 22,
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span style={{ color: "darkgrey" }}>
                                {row.name}
                              </span>
                            </div>
                          </TableCell>

                          {/* second cell */}
                          <TableCell>
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                          </TableCell>
                          
                              {/* third cell */}
                              <TableCell
                               align="right"
                               style={{
                                 color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                 fontWeight: 500,
                               }}>
                              {
                               profit>0?"+":""
                              }
                                {row.price_change_percentage_24h.toFixed(2)}%
                              </TableCell>
                              {/* fourth cell */}
                              <TableCell align='right'>
                              {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                              </TableCell>
                            

                        </TableRow>
                      )
                    })
                  }


                </TableBody>



              </Table>
            )
          }
        </TableContainer>
           {/* Pagination */}
           <Pagination
          sx={{button:{color: 'gold'}}}
           count={(handleSearch().length/10).toFixed(0)}
           style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          onChange={
            (event,value)=>{
              setPage(value);
              window.scroll(0,450);

            }
          }
           >
           </Pagination>
      </Container>
    </ThemeProvider>
  )
}

export default CoinsTable