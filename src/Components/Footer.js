import {Box, Stack, VStack,Heading,HStack,Button,Input,Text} from "@chakra-ui/react";
import React from 'react'
import {AiOutlineSend,AiFillYoutube,AiFillInstagram,AiFillFacebook} from "react-icons/ai";

const Footer = () => {
  return (
    <Box bgColor={"blackAlpha.900"} minH={"40"} p="16" color={'white'}>
        <Stack direction={['column','row']}>
            
            <VStack alignItems={'stretch'} width={'full'} px={'4'}>
                <Heading size="md" textTransform={'uppercase'} textAlign={['center','left']}>
                    Subscribe to get updates
                </Heading>
                <HStack borderBottom={"2px solid white"}>
                    <Input placeholder="Enter Email here" border={'none'} borderRadius={'none'} outline={'none'} focusBorderColor="none"/>
                    <Button p={'0'} colorScheme={"purple"} variant={"ghost"} borderRadius={'0 20px 20px 0'}>
                        <AiOutlineSend size={'20'}/>
                    </Button>
                </HStack>
            </VStack>

            <VStack w={'full'} borderLeft={['none','1px solid white']} borderRight={['none','1px solid white']}>
                <Heading size={'md'} textTransform={"uppercase"} textAlign={'center'}>
                    CryptoX
                </Heading>
                <Text>
                    All rights reserved
                </Text>
            </VStack>

            <VStack w={'full'}>
                <Heading size={'md'} textTransform={'uppercase'}>
                    Social Media
                </Heading>
                <Button variant={'link'} colorScheme={'white'}>
                    <a target="blank" href="https://youtube.com">
                        <AiFillYoutube size={'30'} />
                    </a>
                    <a target="blank" href="https://instagram.com">
                        <AiFillInstagram size={'30'} />
                    </a>
                    <a target="blank" href="https://facebook.com">
                        <AiFillFacebook size={'28'} />
                    </a>
                </Button>
            </VStack>
        </Stack>
    </Box>
  )
}

export default Footer
