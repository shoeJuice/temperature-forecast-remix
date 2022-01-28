import React from 'react';
import { AdaptiveIcon } from './WeatherCard';
import {Box, Text} from '@chakra-ui/react'
import {BsSun, BsMoonFill} from 'react-icons/bs'
const testCard = (props) => {
    return (
        <Box 
        textAlign='center'
        borderBottom='1px solid white'
        >
            <Text fontSize='20px' >
                {`${props.day}`}
            </Text>
            <AdaptiveIcon weather={props.weather} marginBottom={-20} />
            <Text fontSize='20px' marginBottom={-20}>
                {`${props.weather}`}
            </Text>
            <Text fontSize='20px'>
                {`${props.temperature}°F`}
            </Text>
        </Box>
    );
};

export default testCard;
