
//This has to be the width of the whole page
//Box element
//min width/ height 100vh
//We can get the call using a useEffect hook
//Let's do that first, actually

import React from 'react'
import { createApi } from 'unsplash-js'
import { Box, Grid, Flex, ChakraProvider, useColorMode, useMediaQuery } from '@chakra-ui/react'

import DisplayContainer from './components/DisplayContainer'
import {keyframes} from '@emotion/react'
import {css} from '@emotion/css'
import styles from './styles/background.module.css'
function App() {
  const [weather, setWeather] = React.useState()
  const [city, setCity] = React.useState()
  const [location, setLocation] = React.useState()
  const [latitude, setLatitude] = React.useState(40.7128);
  const [longitude, setLongitude] = React.useState(-74.0060);
  const {colorMode, toggleColorMode} = useColorMode()
  const [locationLoading, setLocationLoading] = React.useState(true)
  const [time, setTime] = React.useState()

  const [isDawn, setIsDawn] = React.useState(false)
  const [isNight, setIsNight] = React.useState(false)
  const [isEvening, setIsEvening] = React.useState(false)
  const [isMorning, setIsMorning] = React.useState(false)
  

  const [mobileLandscape] = useMediaQuery('screen and (max-height: 420px) and (orientation: landscape)')


  let today = new Date();
  const initLocation = () => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    function onSuccess(position){
      console.log("Bingo!")
      console.log("Latitude: ", position.coords.latitude)
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
      console.log("Longitude: ", position.coords.longitude)
      setLocationLoading(false)
    }

    function onError(){
      console.log("Could not complete")
    }
  }
  
  const setVariables = (weather, city) => {
    console.log(weather)
    setWeather(weather)
    setCity(city)
  }

  const handleTime = (time) => {
    if(time > 20 && time < 25 || time > 0 && time < 4){
      setIsNight(true)
      setIsDawn(false)
      setIsEvening(false)
      setIsMorning(false)
    }
    if(time > 4 && time <= 7){
      setIsNight(false)
      setIsDawn(true)
      setIsEvening(false)
      setIsMorning(false)
    }
    if(time > 7 && time < 12 || time >= 25){
      setIsMorning(true)
      setIsNight(false)
      setIsDawn(false)
      setIsEvening(false)
    }
    if(time >= 12 && time < 18){
      setIsMorning(false)
      setIsNight(false)
      setIsDawn(false)
      setIsEvening(false)
    }
    if(time > 18 && time <= 20){
      setIsMorning(false)
      setIsNight(false)
      setIsDawn(false)
      setIsEvening(true)
    }
  }
  
  React.useEffect(() => {
    initLocation()
    if (!navigator.geolocation) {
      console.error(`Your browser doesn't support Geolocation`);
    }
    
    let t = today.getHours();
    console.log('Time:', t)
    setTime(t)
    handleTime(time)


    fetch(`https://pro.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`)
        .then(response => response.json())
        .then(response => setVariables(response.weather[0]['main'], response.name))
    
    console.log("Weather:", weather)
  }, [weather, locationLoading])

  //TODO
  // TO be frank, there's too many API calls per render, this makes the SPA incredibly exhaustive and scalability isn't even on the table.
  // There's 3 API calls per render

  //Array
  //Location
  //MainCard

  // Because we can change the state of some of these components multiple times, tracking this becomes rather tedious
  // We should be able to reduce the number of calls being made. One of the responses holds the weekly forecast including current readings. 
  // We can parse the first element into the main card
  // We can parse the remaining elements into the ArrayCard

  //Let's handle this procedurally, through pseudocode first then through mini-implementations

  return (
    <ChakraProvider>
      <Flex
        alignItems='center'
        justifyContent='center'
        height='100vh'
        overflowX='hidden'
        overflowY={mobileLandscape ? 'auto' : 'hidden'}
      >
        <div className={styles.backgroundModule}><div className={isNight? css`
        background: url(https://source.unsplash.com/random/2400x1801/?night,moon,stars);
        height: 100vh;
        width: 100%;
        ` : isDawn? css`
        background: url(https://source.unsplash.com/random/2400x1801/?nature,${weather},dawn,sunrise);
        height: 100vh;
        width: 100%;
        ` : isMorning? css`
        background: url(https://source.unsplash.com/random/2400x1801/?nature,${weather},morning);
        height: 100vh;
        width: 100%;
        ` : isEvening? css`
        background: url(https://source.unsplash.com/random/2400x1801/?${weather},evening,sunset);
        height: 100vh;
        width: 100%;
        ` : css`
        background: url(https://source.unsplash.com/random/2400x1801/?nature,${weather});
        height: 100vh;
        width: 100%;
        `}></div></div>
        <DisplayContainer latitude={latitude} longitude={longitude} isDark={isNight} city={city}/>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
