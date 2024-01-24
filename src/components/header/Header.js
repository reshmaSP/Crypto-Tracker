import React,{useContext} from 'react'
import { Select, MenuItem, AppBar, Container, Toolbar, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'
import CryptoContext from '../context/CryptoContext';
const Header = () => {
  let navigate = useNavigate();
  const globalState=useContext(CryptoContext);
  function handleClick() {
    navigate("/");
  }

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography onClick={handleClick} flexGrow={1} sx={{
              color: "gold",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: "bold",
              cursor: "pointer"
            }
            }>
              Crypto Tracker
            </Typography>
            <Select variant='outlined' sx={{ minWidth: 100, height: 40, marginRight: 15,}} size="small"
            value={globalState.currency} 
            onChange={(e)=>{
              globalState.setCurrency(e.target.value);
            }}>
              <MenuItem value={"INR"}>INR</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header
