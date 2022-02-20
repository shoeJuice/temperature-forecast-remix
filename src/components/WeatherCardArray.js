import React from 'react';
import {Flex, Box, HStack, Stack, StackDivider, useMediaQuery, Text} from '@chakra-ui/react'
import TestCard from './testCard'
    //How to set an array of weathercards
    //Initialize a state variable that holds an array of objects
    //We can initialize the variable, prepopulating it with 7 empty instances
    //Each object has two variables, temperature and weather
    //We can initialize the variables, by setting both to placeholder values
    //On an api call, use a map function to populate this array


const WeatherCardArray = (props) => {

    const [temperature, setTemperature] = React.useState();
    const [weather, setWeather] = React.useState();
    const [fList, setfList] = React.useState([
        {"temp": {"day": 'undefined',
                "min": 'undefined'},
        "weather": [{"main": 'undefined'}],
        "dt": null
    }

]);
    const [loading, setLoading] = React.useState(true);
    const [isPhoneDisplay] = useMediaQuery('(max-width: 420px)') 
    const [isSurfaceDuo] = useMediaQuery('only screen and (-webkit-min-device-pixel-ratio: 2.5)')
    
   const setVariables = (temp, weather) => {
       setTemperature(temp)
       setWeather(weather)
   }

   function unixTimeToHumanReadable(seconds)
    {
 
        // Save the time in Human
        // readable format
        let ans = "";
 
        // Number of days in month
        // in normal year
        let daysOfMonth = [ 31, 28, 31, 30, 31, 30,
                              31, 31, 30, 31, 30, 31 ];
 
        let currYear, daysTillNow, extraTime,
            extraDays, index, date, month, hours,
            minutes, secondss, flag = 0;
 
        // Calculate total days unix time T
        daysTillNow = parseInt(seconds / (24 * 60 * 60), 10);
        extraTime = seconds % (24 * 60 * 60);
        currYear = 1970;
 
        // Calculating current year
        while (daysTillNow >= 365)
        {
            if (currYear % 400 == 0 ||
               (currYear % 4 == 0 &&
                currYear % 100 != 0))
            {
                daysTillNow -= 366;
            }
            else
            {
                daysTillNow -= 365;
            }
            currYear += 1;
        }
 
        // Updating extradays because it
        // will give days till previous day
        // and we have include current day
        extraDays = daysTillNow + 1;
 
        if (currYear % 400 == 0 ||
           (currYear % 4 == 0 &&
            currYear % 100 != 0))
            flag = 1;
 
        // Calculating MONTH and DATE
        month = 0; index = 0;
        if (flag == 1)
        {
            while (true)
            {
                if (index == 1)
                {
                    if (extraDays - 29 < 0)
                        break;
 
                    month += 1;
                    extraDays -= 29;
                }
                else
                {
                    if (extraDays -
                        daysOfMonth[index] < 0)
                    {
                        break;
                    }
                    month += 1;
                    extraDays -= daysOfMonth[index];
                }
                index += 1;
            }
        }
        else
        {
            while (true)
            {
                if (extraDays - daysOfMonth[index] < 0)
                {
                    break;
                }
                month += 1;
                extraDays -= daysOfMonth[index];
                index += 1;
            }
        }
 
        // Current Month
        if (extraDays > 0)
        {
            month += 1;
            date = extraDays;
        }
        else
        {
            if (month == 2 && flag == 1)
                date = 29;
            else
            {
                date = daysOfMonth[month - 1];
            }
        }
 
        // Calculating HH:MM:YYYY
        hours = parseInt(extraTime / 3600, 10);
        minutes = parseInt((extraTime % 3600) / 60, 10);
        secondss = parseInt((extraTime % 3600) % 60, 10);
 
        ans += currYear.toString();
        ans += "-";
        ans += month.toString();
        ans += "-";
        ans += date.toString();
        
        
 
        // Return the time
        return ans;
    }

   const numberToDay = (dtSeconds) => {
        let milliseconds = dtSeconds * 1000
        let date = unixTimeToHumanReadable(dtSeconds)
        let dateObject = new Date(milliseconds)
        console.log(dateObject.getDay())
        let dayOfWeek = ''
        switch(dateObject.getDay()){
            case 0:
                dayOfWeek = 'Sunday'
                break
            case 1:
                dayOfWeek = 'Monday'
                break
            case 2:
                dayOfWeek = 'Tuesday'
                break
            case 3:
                dayOfWeek = 'Wednesday'
                break
            case 4:
                dayOfWeek = 'Thursday'
                break
            case 5:
                dayOfWeek = 'Friday'
                break
            default:
                dayOfWeek = 'Saturday'
                break
        }
        
        return dayOfWeek.substring(0, 3)
   }

   
    const getTemp = () => {
         fetch('https://pro.openweathermap.org/data/2.5/onecall?lat=41.141&lon=-73.264&exclude=minutely,hourly&appid=69216bc1e255a60480a846fcb5004876&units=imperial')
        .then(response => response.json())
        .then(response => {
            
        })
        .then(console.log("hi", temperature))
        .then(setLoading(true))
        
    }

    const initializeList = () => {
        setfList(props.sourceArray)
        setLoading(false)
    }

    React.useEffect(() => {
        //getTemp()
        setfList([])
        initializeList()
        console.log("flist is:", fList)
    }, [props.sourceArray])

        
        

        return (props.sourceArray) ? (<Stack
            
            textAlign='center'
            divider={(isPhoneDisplay || isSurfaceDuo) ? <StackDivider borderColor='white' /> : <></>}
            
            
            
            borderTop={['1px solid white', '1px solid white', '1px solid white', '1px solid white']}
            borderBottom={['1px solid white', '1px solid white', '1px solid white', '1px solid white']}
            
            direction={{base: 'column', sm:'column', md:'row'}}
        >
            { (Array.isArray(fList)) ? fList.map((id, key) => (<div key={key}>
                <TestCard temperature={parseInt(id['temp'].day)} weather={id['weather'][0].main}  min={parseInt(id['temp'].min)} day={numberToDay(id['dt'])} />
            </div>)) : <Text>Loading</Text> }
        </Stack>) :  (<Text>Loading..</Text>);
};

export default WeatherCardArray;
