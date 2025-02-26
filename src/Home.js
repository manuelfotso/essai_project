import React from 'react'
import {useEffect} from 'react'
import {useState} from 'react'
import axios from 'axios';
import './style.css'


function Home() {
    const [data, setData] = useState({
        celcius:10,
        name: 'London',
        humidity:10,
        speed:2,
        image:'/Images/cloud.png'
    })
    const [name,setName] = useState('');
   
    const handleClick = () => {
        if(name !== "") {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=8b4b118316b650ab19786e9891a0ad68&units=metric`;
            axios.get(apiUrl)
            .then(res => {
                let imagePath = '';
                if(res.data.weather[0].main == "Clouds"){
                    imagePath ="/Images/cloud.png"
                }else if(res.data.weather[0].main == "Clear"){
                    imagePath ="/Images/clear.png"
                }else if(res.data.weather[0].main == "Rain"){
                    imagePath ="/Images/rain.png"
                }else if (res.data.weather[0].main == "Drizzle"){
                    imagePath="/Images/drizzle.png"
                }else if (res.data.weather[0].main == "Mist"){
                    imagePath="Images/mist.png"
                }else{
                    imagePath ='/Images/cloud.png'
                }  
                console.log(res.data);
              setData({...data, celcius: res.data.main.temp, name: res.data.name, 
                    humidity: res.data.main.humidity, speed: res.data.wind.speed,
                image:imagePath})
            })
            .catch(err => console.log(err));  
        }
    }
    return(
        <div className='container'>
            <div className="weather">
                <div className="search">
                <input type="text"  placeholder='enter city name' onChange={e => setName(e.target.value)}/>
                <button><img src="/Images/search.png" onClick={handleClick} alt=""/></button>
                </div>
               <div className="winfo">
                    <img src={data.image} alt="" className='icon'/>
                    <h1>{Math.round(data.celcius)}°c</h1>
                    <h2>{data.name}</h2>
                    <div className="details">
                        <div className="col">
                            <img src="/Images/wet.png" alt=""/> 
                            <div className='humidity'>
                                <p>{Math.round(data.humidity)}%</p>
                                <p>humidity</p>
                            </div>
                        </div>
                        <div className="col">
                            <img src="/Images/winds.png" alt=""/> 
                            <div className='wind'>
                             <p>{Math.round(data.speed)} km/h</p>
                             <p>Wind</p>
                            </div>
                        </div>
                    </div>

                </div>
               
            </div>
        </div>
    )
}

export default Home