const API_URL = '/api/city-info';

async function getCityInfo() {
  const city = document.getElementById('city').value.trim();

  if (!city) {
    alert('Please enter city');
    return;
  }

  try {
    const response = await fetch(`${API_URL}?city=${city}`);
    const data = await response.json();

    if (response.ok) {
      displayWeather(data.weather);
      displayMap(data.weather.coordinates);
      displayResources();
      displayDistricts();
      displayStreets();
    } else {
      alert(`Error: ${data.error}`);
    }
  } catch (error) {
    console.error('Error fetching city info:', error);
    alert('Failed to fetch city information.');
  }
}

function displayWeather(weather) {
  const weatherDiv = document.getElementById('weather');
  weatherDiv.innerHTML = `
    <h4>Weather Information</h4>
    <img src="${weather.icon}" alt="${weather.description}">
    <p><strong>Temperature:</strong> ${weather.temperature}°C</p>
    <p><strong>Feels Like:</strong> ${weather.feels_like}°C</p>
    <p><strong>Description:</strong> ${weather.description}</p>
    <p><strong>Humidity:</strong> ${weather.humidity}%</p>
    <p><strong>Pressure:</strong> ${weather.pressure} hPa</p>
    <p><strong>Wind Speed:</strong> ${weather.wind_speed} m/s</p>
    <p><strong>Country:</strong> ${weather.country}</p>
  `;
}

function displayMap(coordinates) {
  if (!coordinates || !coordinates.latitude || !coordinates.longitude) {
    console.error('Coordinates are missing or invalid:', coordinates);
    alert('Unable to display map due to missing location data.');
    return;
  }

  const mapDiv = document.getElementById('map');
  const map = new google.maps.Map(mapDiv, {
    center: { lat: coordinates.latitude, lng: coordinates.longitude },
    zoom: 10,
  });

  new google.maps.Marker({
    position: { lat: coordinates.latitude, lng: coordinates.longitude },
    map: map,
    title: 'City Location',
  });
}

function displayResources() {
  const resourcesDiv = document.getElementById('resources');
  resourcesDiv.innerHTML = `
    <ul>
      <li>Этнонимы: Каспийское море (от этнонима древних каспиев), Шеркала (от каз. "шер" — лев, что связывается с историей кочевых племен).</li>
      <li>Цвет и оттенки воды: Қаракөл (каз. "чёрное озеро"), Ақкөл (каз. "белое озеро"), Сарыкөл (каз. "жёлтое озеро").</li>
      <li>Характер течения: Өліқолтық (каз. "мёртвый залив"), Құйлыс (каз. "слияние").</li>
      <li>Величина, объём: Қошқар-Ата (впадина), Қарасу (каз. "чёрная вода").</li>
      <li>Обоняние, вкус: Тұзбайыр (каз. "солёный выход"), Тұздыбас (каз. "солёная вершина").</li>
      <li>Форма русла: Бозашы (извилистые русла), Құланды (каз. "изогнутое").</li>
      <li>Критерий прозрачности и чистоты: Ақсу (каз. "чистая вода"), Мөлдірсу (каз. "прозрачная вода").</li>
      <li>Гидронимы-зоонимы: Марқакөл (каз. марқа ‘ягненок’), Текесу (каз. теке ‘козел’).</li>
      <li>Общая эмоциональная оценка: Зайсан (от монг. сайхан ‘красивый’), Жаманкөл (каз. ‘плохое озеро’).</li>
      <li>Характер грунта: Балқаш (каз. ‘болотистая местность’), Тассуат (каз. ‘каменистый водопой’).</li>
    </ul>
  `;
}

function displayDistricts() {
  const districtsDiv = document.getElementById('districts');
  districtsDiv.innerHTML = `
    <ul>
      <li>город Актау</li>
      <li>Бейнеуский р-н: Акжигит, Бейнеу, Жангельдин, Ногайты, Опорный, Сарша, Сынгырлау, Турыш, Устюрт</li>
      <li>Каракиянский р-н: Аккудук, Бекет-Ата, Жетыбай, Курык, Мунайши, Сенек</li>
      <li>Мангистауская обл: город Жанаозен</li>
      <li>Мангистауский р-н: Жармыш, Кызан, Онды, Сайотес, Тущикудук, Уштаган, Шаир, Шетпе</li>
      <li>Тупкараганский р-н: Акшукур, Баутино, Каражанбас, Кзыл-Озен, Таучик, Форт-Шевченко</li>
    </ul>
  `;
}

function displayStreets() {
  const streetsDiv = document.getElementById('streets');
  streetsDiv.innerHTML = `
    <ul>
      <li>мкр.1: Дома: Т/Ц "Карагоз", Почтовый индекс: 130001</li>
      <li>мкр.14: Дома: Б/Ц "Звезда Актау", Почтовый индекс: 130000</li>
      <li>мкр.2: Дома: 11 а, 11 б, 47 а, 47 б, 47 в, Почтовый индекс: 130001</li>
      <li>мкр.22: Дома: 10/6, 5 а, 5 в, 7/б, Почтовый индекс: 130001</li>
      <li>мкр.23: Почтовый индекс: 130001</li>
      <li>мкр.24: Почтовый индекс: 130003</li>
      <li>мкр.26: Дома: дом 45, кв 5/6, Почтовый индекс: 130003</li>
      <li>мкр.27: Почтовый индекс: 130003</li>
      <li>мкр.28: Почтовый индекс: 130003</li>
      <li>мкр.28а: Почтовый индекс: 130003</li>
      <li>мкр.29: Почтовый индекс: 130003</li>
      <li>мкр.3: Дома: 146 а, 154 а, 158 а, 32 а, Почтовый индекс: 130001</li>
      <li>мкр.3а: Почтовый индекс: 130001</li>
      <li>мкр.4: Почтовый индекс: 130001</li>
      <li>мкр.5: Дома: здание 15, ТЦ Волна, Почтовый индекс: 130001</li>
      <li>мкр.6: Почтовый индекс: 130002</li>
      <li>мкр.7: Почтовый индекс: 130002</li>
      <li>мкр.8: Почтовый индекс: 130002</li>
      <li>Новый приозерный: Почтовый индекс: 130001</li>
      <li>Приозерный: Почтовый индекс: 130001</li>
    </ul>
  `;
}


document.getElementById('get-info-btn').addEventListener('click', getCityInfo);
