import { Flex, 
        Input } from '@chakra-ui/react'
import React from 'react';



//Because the interior components all belong to Navbar, functional components will be written above
//We need a flex 
//Space between
//Logo on one side
//Links + Input on the other

function Navbar() {
  return (<Flex
    justifyContent='space-between'
    
  >
      <h1>Main Container Goes Here</h1>
  </Flex>);
}

export default Navbar;
