import React, { useEffect, useState } from "react";
import './style.css';
import FetchWithCity from './fetchWithCity.js';

const CurrentWeather = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [dailyweatherData, setDailyWeatherData] = useState([]);
    const [longtitude, setlongtitude] = useState('')
    const [latitude, setlatitude] = useState('')
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=0.31&appid=f35723917969d2ffdb6efed8797927b5`;
    const dailyfeatherForcastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longtitude}&appid=f35723917969d2ffdb6efed8797927b5`
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            // console.log(position.coords.latitude, position.coords.longitude);
            setlatitude(position.coords.latitude);
            setlongtitude(position.coords.longitude);
        });
        const fetchingData = async (url) => {
            const data = await fetch(url);
            const result = await data.json();
            setWeatherData(result);
            // console.log(result);
        }
        const dailyfeatherForcast = async (url) => {
            const dailData = await fetch(url);
            const datilyResult = await dailData.json();
            // console.log(datilyResult);
            setDailyWeatherData(datilyResult);
        }
        fetchingData(url);
        dailyfeatherForcast(dailyfeatherForcastUrl);
        // console.log(typeof (weatherData));
        console.log(FetchWithCity);
    }, [latitude, longtitude])
    return (
        <React.Fragment>
            <div className="main-class">

                <p className="heading">Weather Data</p>

                <input type="text"
                    placeholder="latitude..."
                    onChange={(e) => {
                        setlatitude(e.target.value)
                    }} />
                <input type="text"
                    placeholder="longtitude..."
                    onChange={(e) => {
                        setlongtitude(e.target.value);
                    }} />
                {
                    dailyweatherData.daily &&
                    dailyweatherData.daily.map(value => {
                        return (
                            <div className="daily-weather-data">
                                <table style={{ border: '1px solid black' }}>
                                    <tr>
                                        <td>
                                            <label>
                                                clouds
                                            </label>
                                            <p>{value.clouds}</p>
                                        </td>
                                        <td>
                                            <label>humidity</label>
                                            <p>{value.humidity}</p>
                                        </td>
                                        <td>
                                            <label>sunrise</label>
                                            <p>{value.sunrise}</p>
                                        </td>
                                        <td>
                                            <label>sunset</label>
                                            <p>{value.sunset}</p>
                                        </td>
                                    </tr>
                                </table>
                                <div className="otherDetails">
                                    <p>Other details</p>
                                    <p>Day description : {value.weather[0].description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </React.Fragment>
    )
}

export default CurrentWeather;