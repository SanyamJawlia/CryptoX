import { Badge, Box,Button, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'
import {useParams} from "react-router-dom"
import { server } from "../index"
import axios from "axios";
import Chart from './Chart.js';

const CoinDetails = () => {

    const [coin, setcoin] = useState({})
    const [loading, setloading] = useState(true)
    const [error,seterror] =useState(false)
    const [currency,setCurrency] = useState("inr")
    const [days,setdays] = useState("24h")
    const [chartArray,setChartArray] = useState([])

    const params = useParams();

    const btns = ["24h","7d","14d","30d","60d","200d","365d","max"];

    const switchChartStats = (key)=>{
        switch (key) {
            case "24h":
                setdays("1d");
                setloading(true);
                break;
            case "7d":
                setdays("7d");
                setloading(true);
                break;
            case "14d":
                setdays("14d");
                setloading(true);
                break;
            case "14d":
                setdays("14d");
                setloading(true);
                break;
            case "30d":
                setdays("30d");
                setloading(true);
                break;
            case "60d":
                setdays("60d");
                setloading(true);
                break;
            case "200d":
                setdays("200d");
                setloading(true);
                break;
            case "365d":
                setdays("365d");
                setloading(true);
                break;
            case "max":
                setdays("max");
                setloading(true);
                break;
        
            default:
                setdays("24h")
                setloading("true")
                break;
        }
    }

    const currencySymbol = currency === "inr" ? "₹" : currency === "usd" ? "$" : "€";

    useEffect(() => {

        const fetchcoin=async()=>{
            try {
                const { data } = await axios.get(`${server}/coins/${params.id}`);
                console.log(data);
               
                // 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=inr&days=1'
                const {data:chartdata} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
                // console.log(chartdata);
                setcoin(data);
                setChartArray(chartdata.prices);
                setloading(false);
            } catch (error) {
                setloading(false);
                seterror(true);
            }
            
        };
        fetchcoin();
        
    }, [params.id,currency,days])
    
    if(error) return <ErrorComponent message={"Coin details are not fetched."}/>


  return (
    <Container maxW={'container.xl'}>
        {
            loading ? <Loader/> : <>
                <Box width={"full"} borderWidth={"1"}>
                    <Chart arr={chartArray} currency={currencySymbol} days={days}  />
                </Box>

                <HStack p={"4"} wrap={"wrap"} justifyContent={"center"}>
                    {btns.map((i)=>(
                        <Button key={i} onClick={()=>switchChartStats(i)}>
                            {i}
                        </Button>
                    ))}
                </HStack>

                <RadioGroup value={currency} onChange={setCurrency}>
                    <HStack spacing={'4'}>
                        <Radio value={"inr"}>INR</Radio>
                        <Radio value={"usd"}>USD</Radio>
                        <Radio value={"eur"}>EUR</Radio>
                    </HStack>
                </RadioGroup>

                <VStack spacing={'4'} p={'16'} justifyContent={'flex-start'} >
                    <Text fontSize={"small"} alignSelf={"center"} opacity={0.7}>
                        Last Updated On: {Date(coin.market_data.last_updated).split("G")[0]}
                    </Text>
                        
                    <Image src={coin.image.large} w={"16"} h={"16"} objectFit={'contain'}/> 

                    <Stat>
                        <StatLabel>{coin.name}</StatLabel>
                        <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
                        <StatHelpText>
                            <StatArrow type={coin.market_data.price_change_24h_in_currency[currency]>0 ? "increase":"decrease"}/>
                            {coin.market_data.price_change_24h_in_currency[currency]}%
                        </StatHelpText>
                    </Stat>

                    <Badge fontSize={"2xl"} bgColor={"blackAlpha.900"} color={"white"}>{`#${coin.market_cap_rank}`}</Badge>

                    <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} low={`${currencySymbol}${coin.market_data.low_24h[currency]}`} />

                    <Box width={"full"} p={"4"}>
                        <Item title={"Max Supply"} value={coin.market_data.max_supply}/>
                        <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply}/>
                        <Item title={"Market Cap"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}/>
                        <Item title={"All Time Low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`}/>
                        <Item title={"All Time High"} value={`${currencySymbol}${coin.market_data.ath[currency]}`}/>
                    </Box>
                </VStack>
            </>
        }
    </Container>
  )
}

const Item=({title,value})=>(
    <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
        <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
            {title}
        </Text>
        <Text>{value?value:"NULL"}</Text>
    </HStack>
)


const CustomBar = ({high,low})=>(
    <VStack w={"full"}>
        <Progress value={50} colorScheme={"teal"} w={"full"} />
        <HStack justifyContent={"space-between"} w={"full"}>
            <Badge children={low} color={"red"}/>
                <Text fontSize={"sm"}>24H price range</Text>
            <Badge children={high} color={"green"}/>
        </HStack>
    </VStack>

)


export default CoinDetails;
