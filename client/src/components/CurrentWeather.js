import React from "react";
import axios from "axios";
import App from "./App";
async function deleteCity(e) {
    e.preventDefault()
    try {
      await axios.post("http://localhost:3001/delete_city", {id: e.target.value});
    } catch (error) {
      console.error(error);
    }
  }

function CurrentWeather(props) {
    return (
        <div className="city">
            <h4 className="city-name">{props.city} <button type="submit" name="deleteButton" className="button-13" onClick={deleteCity} value={props.id}>X</button></h4>
            <p>Temperature: {props.temperature}°C</p>
            <p>Humidity: {props.humidity}%</p>
            <p>Wind Speed: {props.windSpeed} m/s</p>
            <p>Updated: {props.date}</p>
        </div>
    );
}
export default CurrentWeather;