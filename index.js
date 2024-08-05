import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const config = {
    params: { appid: "81a3830886814ee09e835e15df9e5172" }
};

app.get("/", (req, res) => {
    res.render("index.ejs", { currentContent: null, error: null });
});

app.post("/getweather", async (req, res) => {
    const cityName = req.body.city;
    const lat = req.body.lat;
    const lon = req.body.lon;

    try {
        let weatherResponse;

        if (lat && lon) {
            // If latitude and longitude are provided, use them to get the weather data
            weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`, config);
        } else {
            // Otherwise, use the city name to first get the coordinates, then fetch the weather data
            const geocodingResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${config.params.appid}`);

            if (geocodingResponse.data.length === 0) {
                throw new Error("City not found");
            }

            const { lat, lon } = geocodingResponse.data[0];
            weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`, config);
        }

        res.render("index.ejs", {
            currentContent: weatherResponse.data,
            error: null
        });
    } catch (error) {
        res.render("index.ejs", {
            currentContent: null,
            error: error.message || "Could not retrieve weather data. Please try again."
        });
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
