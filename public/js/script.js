document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("#weatherForm");
    const header = document.querySelector("header");
    const input = document.querySelector('input[name="city"]');
    const getWeatherButton = document.querySelector('button[type="submit"]');
    const locateButton = document.querySelector('#locateButton');

    // Get weather button functionality
    getWeatherButton.addEventListener("click", (event) => {
        console.log("Get Weather button clicked");
        const h2 = document.querySelector('#cityName');
        h2.innerText = input.value;

        event.preventDefault(); // Prevent the form from submitting immediately
        header.classList.add("hidden"); // Hide the header
        form.submit(); // Manually submit the form
    });

    // Locate button functionality
    locateButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent any default button behavior
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    });

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Set the form's action to include the latitude and longitude
        form.action = `/getweather?lat=${latitude}&lon=${longitude}`;
        header.classList.add("hidden"); // Hide the header
        form.submit(); // Manually submit the form
    }

    function error() {
        alert("Unable to retrieve your location. Please enter your city manually.");
    }
});
