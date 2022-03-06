import React from 'react';
import {Box, Text, useMediaQuery} from '@chakra-ui/react'


const GreetingCard = (props) => {

  const dateObject = new Date(Date.now());
  const [day, setDate] = React.useState()
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const [name, setName] = React.useState(props.name)

  const [mQuery] = useMediaQuery('(max-width: 412px)')
  const [mobileLandscape] = useMediaQuery('screen and (orientation: landscape)')
  const fSize = (mobileLandscape ? '3ex' : '3.8ex')
  const fSizeMinor = (mobileLandscape ? '2ex' : '3ex')
  
  React.useEffect(() => {

    setName(props.name)
    console.log(dateObject.toLocaleDateString('en-US', options))
    let dateFullString = dateObject.toLocaleDateString('en-US', options)
    setDate(dateFullString)
    console.log(day)
  
  }, [props.name])
  return (
        <Box
            textAlign="center"
        >
            <Text
                fontSize={mobileLandscape ? fSize : [16, 18, 40, 50]}
                fontWeight='medium'
            >{name ? `Hello ${name}` : "Hello"}</Text>
            <Text marginBottom={[1, 2, 3, 4]} fontSize={mobileLandscape ? fSizeMinor : [16, 18, 22, 25]} fontWeight='thin'>Today is {day} </Text>
            <Text
                fontSize={[16, 22, 32, 35]}
                
            >{props.city}</Text>
        </Box>
      );
};

export default GreetingCard;
