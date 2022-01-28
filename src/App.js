
//This has to be the width of the whole page
//Box element
//min width/ height 100vh
//We can get the call using a useEffect hook
//Let's do that first, actually

import React from 'react'
import { createApi } from 'unsplash-js'
import { Box, Grid, Flex } from '@chakra-ui/react'
import Navbar from './components/Navbar.js'
import DisplayContainer from './components/DisplayContainer'
import {keyframes} from '@emotion/react'
import {css} from '@emotion/css'
import styles from './styles/background.module.css'
function App() {
  const [weather, setWeather] = React.useState()

  React.useEffect(() => {
    fetch('https://pro.openweathermap.org/data/2.5/forecast?lat=41.141&lon=-73.264&exclude=minutely,hourly&appid=69216bc1e255a60480a846fcb5004876&units=imperial')
        .then(response => response.json())
        .then(response => setWeather(response.list[0].weather[0]['main']))

    console.log(weather)
  }, [])
  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      height='100vh'
    >
      <div className={styles.backgroundModule}><div className={css`
      background: url(https://source.unsplash.com/random/2400x1801/?nature,${weather});
      height: 100%;
      width: 100%;
      `}></div></div>
      <DisplayContainer />
    </Flex>
  );
}

export default App;
