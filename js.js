const arrayUrl = ["https://api.openweathermap.org/data/2.5/weather?id=703448&appid=bf35cac91880cb98375230fb443a116f&units=metric",
"https://api.openweathermap.org/data/2.5/weather?id=2643743&appid=bf35cac91880cb98375230fb443a116f&units=metric",
"https://api.openweathermap.org/data/2.5/weather?id=2267057&appid=bf35cac91880cb98375230fb443a116f&units=metric"];

const arrayUrlDetailed =["https://api.openweathermap.org/data/2.5/forecast?lat=50.4333&lon=30.5167&appid=e6cef18d9386d97a661e51b8061f67f2&units=metric",
"https://api.openweathermap.org/data/2.5/forecast?lat=51.5085&lon=-0.1257&appid=e6cef18d9386d97a661e51b8061f67f2&units=metric",
"https://api.openweathermap.org/data/2.5/forecast?lat=38.7167&lon=-9.1333&appid=e6cef18d9386d97a661e51b8061f67f2&units=metric"];

let weather = document.querySelector(".container_weather");

async function loadWeather(url, urlDet) {

    const response = await fetch(url);
    const responseResult = await response.json();

    if (response.ok) {
        const response2 = await fetch(urlDet);
        const responseResult2 = await response2.json();
        if (response2.ok){
            setWeather(responseResult, responseResult2);
        }
    }

    function setWeather(data, dataDet){
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

        let date = [];
        let time = [];
        let timeTemperature = [];

        for (let i = 0; i < 7; i++) {
            date[i] = dataDet.list[i].dt_txt.slice(0, 10);
            time[i] = dataDet.list[i].dt_txt.slice(11, 16);
            timeTemperature[i] = Math.round(dataDet.list[i].main.temp) + "&#176C";
        } 

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


            <div class="information_day">

                <div class="container_angle">
                    <i class="fa-solid fa-angle-down angle_right"></i>
                </div>

                <div class="container_information_day">

                    <div class="date_time">
                        <div class="date">
                            ${date[0]}
                        </div>
                        <div class="time">
                            ${time[0]}
                        </div>
                        <div class="time_temperature">${timeTemperature[0]}</div>
                    </div>

                    <div class="date_time">
                        <div class="date">
                            ${date[1]}
                        </div>
                        <div class="time">
                            ${time[1]}
                        </div>
                        <div class="time_temperature">${timeTemperature[1]}</div>
                    </div>

                    <div class="date_time">
                        <div class="date">
                            ${date[2]}
                        </div>
                        <div class="time">
                            ${time[2]}
                        </div>
                        <div class="time_temperature">${timeTemperature[2]}</div>
                    </div>

                    
                    <div class="date_time">
                        <div class="date">
                            ${date[3]}
                        </div>
                        <div class="time">
                            ${time[3]}
                        </div>
                        <div class="time_temperature">${timeTemperature[3]}</div>
                    </div>

                    
                    <div class="date_time">
                        <div class="date">
                            ${date[4]}
                        </div>
                        <div class="time">
                            ${time[4]}
                        </div>
                        <div class="time_temperature">${timeTemperature[4]}</div>
                    </div>

                    
                    <div class="date_time">
                        <div class="date">
                            ${date[5]}
                        </div>
                        <div class="time">
                            ${time[5]}
                        </div>
                        <div class="time_temperature">${timeTemperature[5]}</div>
                    </div>

                    
                    <div class="date_time">
                        <div class="date">
                            ${date[6]}
                        </div>
                        <div class="time">
                            ${time[6]}
                        </div>
                        <div class="time_temperature">${timeTemperature[6]}</div>
                    </div>

                </div>
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

    let rightArrows = document.querySelectorAll(".container_angle");

    for (let i = 0; i < rightArrows.length; i++) {
        rightArrows[i].addEventListener("click", function(){
            let information = rightArrows[i].nextElementSibling;
            information.classList.toggle("container_information_day");
            information.classList.toggle("container_information_day_flex");
            rightArrows[i].firstElementChild.classList.toggle("angle_left");
            rightArrows[i].firstElementChild.classList.toggle("angle_right");
        });
    }

    let celsius = document.querySelector(".c");
    let fahrenheit = document.querySelector(".f");
    let temperatures = document.querySelectorAll(".temperature");
    let timeTemperatures = document.querySelectorAll(".time_temperature");

    celsius.addEventListener("click", function(){
        if(!celsius.classList.contains("color")){
            celsius.classList.add("color");
            fahrenheit.classList.remove("color");
            for (let i = 0; i < temperatures.length; i++) {
                temperatures[i].innerHTML = Math.round((+temperatures[i].innerHTML.slice(0,-2) - 32)/1.8);
                temperatures[i].innerHTML += "&#176C";
            };
            for (let i = 0; i < timeTemperatures.length; i++) {
                timeTemperatures[i].innerHTML = Math.round((+timeTemperatures[i].innerHTML.slice(0,-2) - 32)/1.8);
                timeTemperatures[i].innerHTML += "&#176C";
            }
        }
    });

    fahrenheit.addEventListener("click", function(){
        if(!fahrenheit.classList.contains("color")){
            fahrenheit.classList.add("color");
            celsius.classList.remove("color");
            for (let i = 0; i < temperatures.length; i++) {
                temperatures[i].innerHTML = Math.round(+temperatures[i].innerHTML.slice(0,-2)*1.8 + 32) + "&#176F";
            };
            for (let i = 0; i < timeTemperatures.length; i++) {
                timeTemperatures[i].innerHTML = Math.round(+timeTemperatures[i].innerHTML.slice(0,-2)*1.8 + 32) + "&#176F";
            }
        }
    });

}


for (let i = 0; i < arrayUrl.length; i++) {
    const element = arrayUrl[i];
    loadWeather(element, arrayUrlDetailed[i]);
}

