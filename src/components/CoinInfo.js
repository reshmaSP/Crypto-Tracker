import React,{useState,useEffect,useContext} from 'react'
import {chartDays} from '../config/data'
import {HistoricalChart} from '../config/api'
import { useParams } from 'react-router-dom';
import CryptoContext from '../components/context/CryptoContext'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {styled} from '@mui/material/styles';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2'
import SelectButton from './SelectButton';
import { CircularProgress } from '@mui/material';
const CoinInfo = ({coin}) => {
  ChartJS.register(...registerables);
  const { id } = useParams();
  const {currency,symbol}=useContext(CryptoContext);
  const [historicData, setHistoricData] = useState();
  const [flag,setFlag]=useState(false);
  const [days,setDays]=useState(1);

  const fetchData=async()=>{
      console.log(id);
      try {
        const response=await fetch(HistoricalChart(id,days,currency),{
          method:'GET',
          mode:'cors'
        })
        const json=await response.json();
        setFlag(true)
        console.log(json.prices)
        setHistoricData(json.prices)

      } catch (error) {
        console.log(error.message)
      }
  }
  useEffect(() => {
      fetchData();
      
  }, [currency,days])
  const Container = styled('div')(({ theme }) => ({
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  }));
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
      <ThemeProvider theme={darkTheme}>
    <Container>
      {
        (!historicData | !flag)?(
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ):(
          <>
          <Line 
          data={
            {
              // takes an arrray of labels and this labels will visible on the x-axis
              // in our case we will display the date if days=30 or 3 months or 1 year
              // and if days=1 we will display the time
              
              labels:historicData.map((coin)=>{
                // coin[0] is the time and coin[1] is the price
                let date=new Date(coin[0]);
                // in case if time is greater than 12 i.e. 13:00 PM then we will subtract 12 from it
                // we want to show time between 1 to 12 only
                let time=date.getHours()>12?`${date.getHours()-12}:${date.getMinutes()} PM`:
                `${date.getHours()}:${date.getMinutes()} AM`;
                // if days=1 then we will return time else we will return date
                return days===1?time:date.toLocaleDateString();

              }),
              
              // it takes an array of objects and each object is a dataset 
              datasets:[
                {
                  data:historicData.map((coin)=>coin[1]),
                  label:`Price (Past ${days} Days) in ${symbol}`,
                  borderColor:'#EEBC1D',
                },
              ],

            }
          }
          options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}

              />

              <div style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}>
                {
                  chartDays.map((day)=>
                    <SelectButton 
                    key={day.value}
                    onClick={()=>{
                      setDays(day.value)
                      setFlag(false)
                    }
                    }
                    selected={day.value===days}
                    > 
                    {day.label}
                    </SelectButton>
                  )
                }
              </div>

          
          </>
        )
      }
      </Container>
      </ThemeProvider>
  )
}

export default CoinInfo
