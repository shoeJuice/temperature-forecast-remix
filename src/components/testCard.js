import React from 'react';
import { AdaptiveIcon } from './WeatherCard';
import {Box, Text, Flex, Spacer, useMediaQuery} from '@chakra-ui/react'
import {BsSun, BsMoonFill} from 'react-icons/bs'

import { createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
})


const TestCard = (props) => {
    const [isPhoneDisplay] = useMediaQuery('(max-width: 420px)') 
    const [isSurfaceDuo] = useMediaQuery('only screen and (-webkit-min-device-pixel-ratio: 2.5)')
    return (
        <Flex 
        textAlign={{base: 'center', sm:'left', md:'center', lg:'center'}}
        
        justifyContent='space-between'
        flexDirection={['row', 'row', 'column']}
        alignItems='center'
        paddingX='2ex'
        paddingY='0.6ex'
        borderTop={['none', 'none', 'none', 'none']}
        borderBottom={['none', 'none', 'none', 'none']}
        >
            
            <Box
                textAlign='center'
                alignContent='center'
                width='6ex'
                marginX='10px'
                
            >
                <Text fontSize={['2.3ex']} fontWeight='medium'>
                    {`${props.day}`}
                </Text>
                
                <AdaptiveIcon boxSize={[6, 8, 9, 10]} weather={props.weather}  />
                <Text display={isSurfaceDuo? 'none' : {base:'none', sm:'block', md:'none', lg:'none'}} fontSize={['1.2ex']} fontWeight='normal' padding={0} >
                    {`${props.weather}`}
                </Text>
            </Box>
            
            <Box
            paddingLeft={(isPhoneDisplay || isSurfaceDuo) ? '6ex' : '0px'}
            >
                <Text  fontSize={['16px']}>
                    {`${props.temperature}°F`}
                </Text>
                <Text color='whiteAlpha.700' fontSize={['16px']}>
                    {`${props.min}°F`}
                </Text>
            </Box>
        </Flex>
    );
};

export default TestCard;
