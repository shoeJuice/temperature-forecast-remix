
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
  
  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      height='100vh'
      
    >
      <div className={styles.backgroundModule}></div>
      <DisplayContainer />
    </Flex>
  );
}

export default App;
