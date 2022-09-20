import React from "react";
import CurrentWeather from "./CurrentWeather";
import axios from "axios";

function App() {
  const [data, setData] = React.useState("");
  const [city, setCity] = React.useState("");
  const [err, setErr] = React.useState("");

  async function postCity(e) {
    e.preventDefault()
    try {
      await axios.post("/post_city", { city })
      .then(res => {
        setErr(res.data);
      })
      setData(data);
    } catch (error) {
        console.error("error");
        setErr("Error: "+error);   
    }
  }


  function createCurrentWeather(city) {
    return (
      <CurrentWeather
        id={city._id}
        city={city.name}
        temperature={city.temperature}
        humidity={city.humidity}
        windSpeed={city.wind}
        date={city.date}
      />
    )
  }
  function getWeatherData() {
    fetch("/get_cities")
      .then((res) => res.json())
      .then((data) => setData(data));
  };
  
async function updateWeather() {
  try {
    setErr("");
    await axios.post("/update_weather");
  } catch (error) {
    console.error(error);
    setErr("Error: Could not update weather.")
  }
  }


  React.useEffect(() => {
    getWeatherData();
    setInterval(() => { getWeatherData() }, 300000);
  }, [setData, data, city, setCity]);




  return (
    <div className="App">
      <script src="https://kit.fontawesome.com/0d278e64bf.js" crossorigin="anonymous"></script>
      <div>
        <form onSubmit={postCity}>
          <input type="text" placeholder="Enter city..." className="search" value={city} onChange={(e) => setCity(e.target.value)} />
          <button type="submit" className="button-13">Add City</button>
        </form></div>
        <h3 className="error-message">{err}</h3>
        <button onClick={updateWeather} className="button-13">Update</button>
      <div className="weather">
        {!data ? "Loading..." : data.map(createCurrentWeather)}
      </div>
    </div>
  );
}
export default App;
