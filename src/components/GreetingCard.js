import React from 'react';
import {Box, Text} from '@chakra-ui/react'


const GreetingCard = () => {
  const dateObject = new Date(Date.now());
  const [day, setDate] = React.useState()
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  React.useEffect(() => {
    console.log(dateObject.toLocaleDateString('en-US', options))
    let dateFullString = dateObject.toLocaleDateString('en-US', options)
    setDate(dateFullString)
  
  }, [])
  return (
        <Box
            textAlign="center"
        >
            <Text
                fontSize={50}
                marginBottom={-5}
            >Hello, Remy</Text>
            <Text>Today is {day} </Text>
        </Box>
      );
};

export default GreetingCard;
