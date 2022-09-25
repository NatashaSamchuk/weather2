const arrayUrl = ["https://api.openweathermap.org/data/2.5/weather?id=703448&appid=bf35cac91880cb98375230fb443a116f&units=metric",
"https://api.openweathermap.org/data/2.5/weather?id=2643743&appid=bf35cac91880cb98375230fb443a116f&units=metric",
"https://api.openweathermap.org/data/2.5/weather?id=2267057&appid=bf35cac91880cb98375230fb443a116f&units=metric"];

//http://api.openweathermap.org/data/2.5/weather?id=5128638&appid=bf35cac91880cb98375230fb443a116f&units=metric


let weather = document.querySelector(".container_weather");

async function loadWeather(url) {

    const response = await fetch(url);
    const responseResult = await response.json();

    if (response.ok) {
        setWeather(responseResult);
    }

    function setWeather(data){
        let city = data.name; // название города
        let temperature = Math.round(data.main.temp) + "&#176C"; // температура
        let weatherImgSrc = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"; // картинка погоды Src
        let weatherImgAlt = data.weather[0].main; // Alt у картинки погоды
        // http://openweathermap.org/img/wn/'+data.weather[0]['icon']+'@2x.png
        let speed = data.wind.speed + " m/s"; // скорость ветра
        let direction = data.wind.deg + "deg";// поворот стрелки ветра с учетом начального направления
        let pressure = Math.round(data.main.pressure*0.75006) + " mm Hg"; //lfdktybt
        let sunrise = transformation(data.sys.sunrise, data.timezone);
        let sunset = transformation(data.sys.sunset, data.timezone);
        let weatherDescription = data.weather[0].description;

        function transformation(timeSun, timezone){
            let timezoneOffset = new Date().getTimezoneOffset() * 60; //cмещение часового пояса относительно часового пояса UTC в минутах для текущей локали *60 cek
            let date = new Date((timeSun + timezoneOffset + timezone) * 1000);//получаем дату от 01.01.70, но нам важно время
            let hours = date.getHours(); //вернет количество часов
            let minutes = "0" + date.getMinutes(); //вернет количество минут или 0х или 0ху
            let time = hours + ":" + minutes.slice(-2); //часы:минуты(последие 2 цифры 0х или ху, чтоб не былы одна цифра)
            return time;
        }

        let template = `
    <div class="item">
        <div class="main_information">
            <div class="city">${city}</div>
            <div>
                <div class="temperature">${temperature}</div>
                <div class="weather_description">${weatherDescription}</div>
            </div>    
            <div class="weather_img">
                <img src=${weatherImgSrc} alt=${weatherImgAlt}>
            </div>
        </div>
        <div class="expand_information">
            <i class="fa-solid fa-angle-down"></i>
        </div>
        <div class="information_container">
            <div class="department_speed">
                <span>W. Speed</span>
                <div>${speed}</div>
            </div>
            <div class="department_direction">
                <span>W. Direction</span>
                <div>
                    <i class="fa-solid fa-arrow-up-long" style = "transform: rotate(${direction})"></i>
                </div>
            </div>
            <div class="department_pressure">
                <span>Pressure</span>
                <div>${pressure}</div>
            </div>
            <div class="department_sunrise">
                <span>Sunrise</span>
                <div>${sunrise}</div>
            </div>
            <div class="department_sunset">
                <span>Sunset</span>
                <div>${sunset}</div>
            </div>
        </div>
    </div>`;

        weather.innerHTML += template;
    }

    let arrows = document.querySelectorAll(".expand_information");

    for (let i = 0; i < arrows.length; i++) {
        arrows[i].addEventListener("click", function(){
            let information = arrows[i].nextElementSibling;
            information.classList.toggle("information_container");
            information.classList.toggle("information_container_flex");
            arrows[i].firstElementChild.classList.toggle("up_arrow");
        });
    }

    let celsius = document.querySelector(".c");
    let fahrenheit = document.querySelector(".f");
    let temperatures = document.querySelectorAll(".temperature");

    celsius.addEventListener("click", function(){
        if(!celsius.classList.contains("color")){
            celsius.classList.add("color");
            fahrenheit.classList.remove("color");
            for (let i = 0; i < temperatures.length; i++) {
                console.log(temperatures[i].innerHTML.slice(0,-2));
                temperatures[i].innerHTML = Math.round((+temperatures[i].innerHTML.slice(0,-2) - 32)/1.8);
                temperatures[i].innerHTML += "&#176C";
            }
        }
    });

    fahrenheit.addEventListener("click", function(){
        if(!fahrenheit.classList.contains("color")){
            fahrenheit.classList.add("color");
            celsius.classList.remove("color");
            for (let i = 0; i < temperatures.length; i++) {
                console.log(temperatures[i].innerHTML.slice(0,-2));
                temperatures[i].innerHTML = Math.round(+temperatures[i].innerHTML.slice(0,-2)*1.8 + 32) + "&#176F";
            }
        }
    });

}


for (let i = 0; i < arrayUrl.length; i++) {
    const element = arrayUrl[i];
    loadWeather(element);
}

