import React from 'react';
import {Flex, Box, HStack} from '@chakra-ui/react'
import TestCard from './testCard'
    //How to set an array of weathercards
    //Initialize a state variable that holds an array of objects
    //We can initialize the variable, prepopulating it with 7 empty instances
    //Each object has two variables, temperature and weather
    //We can initialize the variables, by setting both to placeholder values
    //On an api call, use a map function to populate this array

const ArrayTesterComponent = (props) => {
    return <h1>{props.testValue}</h1>
}


const WeatherCardArray = (props) => {

    const [temperature, setTemperature] = React.useState();
    const [weather, setWeather] = React.useState();
    const [fList, setfList] = React.useState([]);
    const [isLoaded, setIsLoaded] = React.useState(false);

   const setVariables = (temp, weather) => {
       setTemperature(temp)
       setWeather(weather)
   }

   const setArray = (arr) => {
       let tempArray = []
       for(let i = 1; i < 5; i++){
        tempArray.push({temp: arr[i].main['temp'], weather: arr[i].weather[0]['main']})
        
        }
       setfList(tempArray)
   }
    const getTemp = () => {
         fetch('https://pro.openweathermap.org/data/2.5/forecast?lat=41.141&lon=-73.264&exclude=minutely,hourly&appid=69216bc1e255a60480a846fcb5004876&units=imperial')
        .then(response => response.json())
        .then(response => {
            setVariables(response.list[1].main.temp, response.list[1].weather[0].main)
            setArray(response.list)
        })
        .then(console.log("hi", temperature))
        .then(setIsLoaded(true))
        
    }
    React.useEffect(() => {
        getTemp()
        console.log(fList)
    }, [])

        
        

        return (<HStack
            marginTop={30}
            spacing={45}
        >
           {fList.map((id, key) => (<div id={key}>
                <TestCard temperature={id['temp']} weather={id['weather']} />
           </div>))}
        </HStack>);
};

export default WeatherCardArray;
