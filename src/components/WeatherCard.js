import React from 'react';
import {Box, Text, Icon} from '@chakra-ui/react'
import {BsSun, BsMoonFill, BsCloudSnow, BsClouds} from 'react-icons/bs'

const AdaptiveIcon = ( props ) => {
   
    
    
    return (String(props.weather).includes("Snow")) ? (<Icon as={BsCloudSnow} boxSize={35} marginBottom={props.marginBottom} />) : ((String(props.weather).includes("Clouds") ? (<Icon as={BsClouds} boxSize={35} marginBottom={props.marginBottom} />) : <></>))

}

const WeatherCard = () => {
    const [temperature, setTemperature] = React.useState();
    const [weather, setWeather] = React.useState();
    const [isLoaded, setIsLoaded] = React.useState(false);

   const setVariables = (temp, weather) => {
       setTemperature(temp)
       setWeather(weather)
   }

    const getTemp = () => {
         fetch('https://pro.openweathermap.org/data/2.5/forecast?lat=41.141&lon=-73.264&exclude=minutely,hourly&appid=69216bc1e255a60480a846fcb5004876&units=imperial')
        .then(response => response.json())
        .then(response => setVariables(response.list[0].main.temp, response.list[0].weather[0].main))
        .then(console.log(temperature))
        .then(setIsLoaded(true))
    }
    React.useEffect(() => {
        getTemp()
        console.log('main weather card weather is', weather)
    }, [])

    //How to set an array of weathercards
    //Initialize a state variable that holds an array of objects
    //We can initialize the variable, prepopulating it with 7 empty instances
    //Each object has two variables, temperature and weather
    //We can initialize the variables, by setting both to placeholder values
    //On an api call, use a map function to populate this array

  return isLoaded ? (
    <Box>
        <Box 
            textAlign='center'
            paddingX={15}
            borderBottom='1px solid white'
        >
            <AdaptiveIcon weather={weather} marginBottom={-20} />
            <Text fontSize='48px' marginBottom={-20}>
                {`${weather}`}
            </Text>
            <Text fontSize='30px'>
                {`${temperature}°F`}
            </Text>
        </Box>
    </Box>
  ) : (
        <Box>
            <Text fontSize='36px'>
                Loading...
            </Text>
        </Box>
        )
};
export {AdaptiveIcon}
export default WeatherCard;
