import { Button, Center, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div  style={{ position: 'sticky', top: 0, left: 0, width: '100%', zIndex: 999 }}>
      <HStack p={'4'} shadow={"base"} bgColor={"blackAlpha.900"} justifyContent={"center"} >
        <Button variant={'unstyled'} color={'white'} pr={"4"} pl={"4"}>
            <Link to={"/"}>Home</Link>
        </Button>
        <Button variant={'unstyled'} color={'white'} pr={"4"} pl={"4"}>
            <Link to={"/exchange"}>Exchange</Link>
        </Button>
        <Button variant={'unstyled'} color={'white'} pr={"4"} pl={"4"}>
            <Link to={"/coins"}>Coins</Link>
        </Button>
      </HStack>
    </div>
  )
}

export default Header
