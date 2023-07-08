import React, { useEffect, useState } from 'react';
import { server } from "../index";
import axios from 'axios';
import { Container, HStack, Heading, Image, VStack ,Text } from '@chakra-ui/react';
import ErrorComponent from "./ErrorComponent";
import Loader from "./Loader";

const Exchange = () => {
    const [exchange, setexchange] = useState([])
    const [loading,setloading] = useState(true);
    const [error,seterror] = useState(false);

    useEffect(() => {
        const fetchExchanges = async()=>{
            try {
                const {data} = await axios.get(`${server}/exchanges?per_page=50`);
                console.log(data);
                setexchange(data);
                setloading(false);
                
            } catch (error) {
                setloading(false);
                seterror(true);
            }
        }
        
        fetchExchanges();
    }, [])

    if(error) return <ErrorComponent message={"Error while fetching Exchange"} />
    
  return (
    <Container maxW={"container.xl"}>
        {loading ? (<Loader/>):(
        <>
            <HStack wrap={'wrap'} justifyContent={"space-evenly"}>
                {exchange.map((i)=>(
                    <ExchangeCard key={i.id} name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url}  />
                ))}
            </HStack>
        </>)
        }

    </Container>
  )
}

const ExchangeCard = ({name,img,rank,url})=>{
    return (
        <a href={url} target={'blank'}>
            <VStack w={'52'} p={'8'} shadow={'lg'} borderRadius={'8'} transition={'all 0.3s'} m={'4'} css={{"&:hover":{ transform:"scale(1.1)"}}}>
                <Image src={img} w={'10'} h={'10'} objectFit={'contain'} alt={'Exchange'} />
                <Heading size={'md'} noOfLines={1}>
                    {rank}
                </Heading>
                <Text>{name}</Text>
            </VStack>
        </a>
    )
};

export default Exchange;
