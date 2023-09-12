import React, { useEffect, useState } from "react";
import './style.css';

const CurrentWeather = () => {

    // const [weatherData, setWeatherData] = useState([]);
    const [dailyweatherData, setDailyWeatherData] = useState('');
    const [longtitude, setlongtitude] = useState('')
    const [latitude, setlatitude] = useState('')

    // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=0.31&appid=f35723917969d2ffdb6efed8797927b5`;
    const dailyfeatherForcastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longtitude}&appid=f35723917969d2ffdb6efed8797927b5`

    useEffect(() => {
        fetchData(dailyfeatherForcastUrl)
        console.log(dailyweatherData);
    }, [latitude, longtitude])

    const fetchData = async (url) => {
        try {
            navigator.geolocation.getCurrentPosition((position) => {
                setlatitude(position.coords.latitude);
                setlongtitude(position.coords.longitude);
            });
            const data = await fetch(url);
            const result = await data.json();
            setDailyWeatherData(result);
            console.log(dailyweatherData);
        } catch (error) {
            console.log(error);
        }
    }

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
                    <p>
                        {
                            dailyweatherData.timezone
                        }
                    </p>
                  {
                    dailyweatherData.daily &&
                    dailyweatherData.daily.map((value, key) => {
                        return (
                            <div className="daily-weather-data" key={key}>
                                <p>
                                    {value.clouds}
                                </p>
                                 {/* <table style={{ border: '1px solid black' }}>
                                    {
                                        value.daily((value, key) => {
                                            return (
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <p></p>
                                                        </td>
                                                    </tr>
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
                                                </tbody>
                                            )
                                        })
                                    }
                                </table>  */}
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