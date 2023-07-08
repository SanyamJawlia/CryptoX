import React, { useEffect, useState } from 'react';
import { server } from "../index";
import axios from 'axios';
import { Container, HStack, Heading, Image, VStack ,Text ,Button, RadioGroup ,Radio, Center } from '@chakra-ui/react';
import ErrorComponent from "./ErrorComponent";
import { Link } from 'react-router-dom';
import Loader from "./Loader";


const Coins = () => {
    const [coins, setcoins] = useState([])
    const [loading,setloading] = useState(true);
    const [error,seterror] = useState(false);
    const [page,setPage] = useState(1);
    const [currency,setCurrency] = useState("inr");

    const currencySymbol = currency === "inr" ? "₹" : currency === "usd" ? "$" : "€";

    const changePage=(page)=>{
      setPage(page);
      setloading(true);
    }

    const btns = new Array(132).fill(1);

    useEffect(() => {
        const fetchCoins = async()=>{
            try {
                const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
                console.log(data);
                setcoins(data);
                setloading(false);
                
            } catch (error) {
                setloading(false);
                seterror(true);
            }
        }
        
        fetchCoins();
    }, [currency,page])

    if(error) return <ErrorComponent message={"Error while fetching coins"} />
    
  return (
    <Container maxW={"container.xl"}>
        {loading ? (<Loader/>):(
        <>
            <RadioGroup value={currency} onChange={setCurrency}>
                <HStack spacing={'4'}>
                    <Radio value={"inr"}>INR</Radio>
                    <Radio value={"usd"}>USD</Radio>
                    <Radio value={"eur"}>EUR</Radio>
                </HStack>
            </RadioGroup>
            <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
                {coins.map((i)=>(
                    <CoinCard key={i.id} id={i.id} name={i.name} img={i.image} price={i.current_price} symbol={i.symbol} currencySymbol={currencySymbol}  />
                ))}
            </HStack>
            <HStack w={"full"} overflowX={"auto"} mb={'8'} justifyContent={"center"}>
              
              {btns.map((item,index)=>(
                <Button key={index} bgColor={page===index+1?"grey":"blackAlpha.900"} color={"white"} onClick={()=>changePage(index+1) }>
                  {index+1}
                </Button>
              ))}

            </HStack>
        </>)
        }

    </Container>
  )
}

const CoinCard = ({id,name,img,symbol,price,currencySymbol="₹"})=>{
    return (
        <Link to={`/coins/${id}`}>
            <VStack w={'52'} p={'8'} shadow={'lg'} borderRadius={'8'} transition={'all 0.3s'} m={'4'} css={{"&:hover":{ transform:"scale(1.1)"}}}>
                <Image src={img} w={'10'} h={'10'} objectFit={'contain'} alt={'Exchange'} />
                <Heading size={'md'} noOfLines={1}>
                    {symbol}
                </Heading>
                <Text>{name}</Text>
                <Text>{price?`${currencySymbol}${price}`:"NA"}</Text>
            </VStack>
        </Link>
    )
};

export default Coins;
