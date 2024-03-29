import React from 'react';
import {Box, Text, Icon, Flex, useMediaQuery, HStack} from '@chakra-ui/react'
import {AdaptiveIcon} from './AdaptiveIcon.js'


const WeatherCard = (props) => {
    const [temperature, setTemperature] = React.useState('Temp Here');
    const [weather, setWeather] = React.useState('Weather Here');
    const [loading, setLoading] = React.useState(props.loading);
    const [low, setLow] = React.useState('Low Here');
    const [detailedMode, setDetailedMode] = React.useState(false);

    
    const [mQuery] = useMediaQuery('(max-width: 412px)')
    const [mobileLandscape] = useMediaQuery('screen and (orientation: landscape)')

    const fSize = (mobileLandscape ? '3ex' : '3.8ex')
    const fSizeMinor = (mobileLandscape ? '3ex' : '5ex')
   const setVariables = (high, weather, min) => {
       setTemperature(high)
       setWeather(weather)
       setLow(min)
   }

    const getTemp = () => {
         fetch('https://pro.openweathermap.org/data/2.5/weather?lat=41.141&lon=-73.264&appid=69216bc1e255a60480a846fcb5004876&units=imperial')
        .then(response => response.json())
        .then(response => setVariables(parseInt(response.main['temp']), response.weather[0].main, parseInt(response.main['temp_min'])))
        .then(console.log(temperature))
        .then(setLoading(true))
    }
    React.useEffect(() => {
        setWeather(props.weatherData)
        console.log('main weather card weather is', weather)
    }, [props.weatherData])

    //How to set an array of weathercards
    //Initialize a state variable that holds an array of objects
    //We can initialize the variable, prepopulating it with 7 empty instances
    //Each object has two variables, temperature and weather
    //We can initialize the variables, by setting both to placeholder values
    //On an api call, use a map function to populate this array

  return loading ? (
    <Box>
            <Text fontSize='36px'>
                Loading...
            </Text>
        </Box>
  ) : (
        <Box>
            <Flex
                flexDirection='column'
                alignItems='center' 
                textAlign='center'
                paddingX={15}
                paddingBottom='1ex'
            >
                <AdaptiveIcon boxSize={10} weather={props.weatherDesc}  />
                <Text fontSize={mobileLandscape ? fSize : ['16px', '18px', '40px', '48px']} >
                    {`${props.weatherDesc}`}
                </Text>
                <Text fontWeight={10}  fontSize={mobileLandscape ? fSizeMinor : ['14px', '16px', '40px', '30px']}>
                        {`${props.tempCurrent}°F`}
                </Text>
                <HStack>
                    <Text fontWeight={10}  fontSize={mobileLandscape ? fSizeMinor : ['14px', '16px', '40px', '30px']}>
                        {`High: ${props.tempMax}°F`}
                    </Text>
                    <Text color='#F7FAFC' fontWeight={10} fontSize={mobileLandscape ? fSizeMinor : ['14px', '16px', '40px', '30px']}>
                        {`Low: ${props.tempMin}°F`}
                    </Text>
                </HStack>
            </Flex>
        </Box>
        )
};
export {AdaptiveIcon}
export default WeatherCard;
