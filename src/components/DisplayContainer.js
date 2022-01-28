import React from 'react';
import {Flex, Grid, Box} from '@chakra-ui/react'
import WeatherCard from './WeatherCard'
import GreetingCard from './GreetingCard'
import WeatherCardArray from './WeatherCardArray'
function DisplayContainer(props) {
  return (
  <Flex
    justifyContent='space-between'
    bgColor='rgba(160, 174, 192, .15)'
    width='650px'
    height='800px'
    justifyContent='center'
    alignItems='center'
    borderRadius={props.borderRadius? props.borderRadius : 6}
    backdropFilter={'auto'}
    backdropBlur='16px'
    flexDirection='column'
    padding={30}
  >
      <GreetingCard />
      <WeatherCard/>
      <WeatherCardArray />
  </Flex>
  );
}

export default DisplayContainer;
