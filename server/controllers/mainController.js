const mongoose = require('mongoose');
const CityFromMongo = mongoose.model('City');
const axios = require('axios');
const config = require("dotenv").config();
setInterval(updateWeather, 900000); 

exports.postCity = async (req, res) => {
    let { city } = req.body;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
    let newCity = new CityFromMongo();
    newCity.name = city.toUpperCase();
    axios.get(url)
        .then((response) => {
            let tempCelsius = (response.data.main.temp - 273, 15);
            newCity.temperature = tempCelsius;
            newCity.humidity = response.data.main.humidity;
            newCity.wind = response.data.wind.speed;
            newCity.date = dateTime();
            newCity.save((error, response) => {
                if (!error) {
                    console.log(response);
                    res.send("");
                }
                else {
                    console.log(error);
                    res.send("Error: " + error.response.data.message);
                }
            });
        })
        .catch(error => {
            console.log(error.response.data.message);
            res.send("Error: " + error.response.data.message);
        });

};


exports.deleteCity = (req, res) => {
    const checkedItemId = req.body.id;
    CityFromMongo.findByIdAndRemove(checkedItemId, (error) => {
        if (!error) {
            console.log("Deleted");
        } else {
            console.log("Failed to delete");
        }
    });


};

exports.getCities = (req, res) => {
    CityFromMongo.find((error, cities) => {
        if (!error) {
            res.json(cities);
        } else {
            console.log(error);
        }
    });

};
exports.manualUpdate = (req, res) => {
    updateWeather();
};

function updateWeather(){
    CityFromMongo.find((error, cities) => {
        if (!error) {
            JSON.stringify(cities);
            cities.forEach(city => {
                updateCity(city._id, city.name);
            });
        } else {
            console.log(error);
        }
    });
}
function updateCity(id, cityName) {
    let city = cityName;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
    axios.get(url)
        .then((response) => {
            let tempCelsius = (response.data.main.temp - 273, 15);
            CityFromMongo.findByIdAndUpdate(id,
                {
                    temperature: tempCelsius,
                    humidity: response.data.main.humidity,
                    wind: response.data.wind.speed,
                    date: dateTime()
                },
                function (err, docs) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log("Updated City : ", docs);
                    }
                });
        })
        .catch(error => {
            console.log(error);
        });


}

function dateTime() {
    let currentDate = new Date();
    let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    let cDay = currentDate.getDate();
    let cMonth = currentDate.getMonth() + 1;
    let cYear = currentDate.getFullYear();
    let currentTime = time + " " + cDay + "." + cMonth + "." + cYear;
    return currentTime;
}

