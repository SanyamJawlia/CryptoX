import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import btcimg from "../Images/pexels-photo-5980743.jpeg"
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <>
      <Box w="full" h="85vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <motion.div
          initial={{ translateY: 0 }}
          animate={{ translateY: ['20px', '-20px', '20px'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Image w="80vw" h="60vh" objectFit="contain" src={btcimg} />
        </motion.div>

        <Text fontSize={"6xl"} textAlign={"center"} fontWeight={"thin"} color={"gray"}>CryptoX</Text>
      </Box>
    </>
  )
}

export default Home
