const API_URL = '/api/city-info';

const cityData = {
  "Актау": {
    districts: [
      "Микрорайон 1", "Микрорайон 2", "Микрорайон 3", "Микрорайон 4", "Микрорайон 5", 
      "Микрорайон 6", "Микрорайон 7", "Микрорайон 8", "Микрорайон 9", "Микрорайон 10", 
      "Микрорайон 11", "Микрорайон 12", "Микрорайон 13", "Микрорайон 14", "Микрорайон 15", 
      "Микрорайон 16", "Микрорайон 17", "Микрорайон 18", "Микрорайон 19", "Микрорайон 20", 
      "Приморский", "Нурсая"
    ],
    streets: [
      "проспект Тараса Шевченко", "проспект Абая", "проспект Назарбаева", "улица 14", 
      "улица 17", "улица 27", "улица Шахова", "улица Есет батыра", "улица Мунайлы", 
      "улица Акбота", "улица Акбулак", "улица Самал", "улица Ботакоз", "улица Жанибека", 
      "улица Султана Бейбарса", "улица Ханга Батыра", "улица Маншук Маметовой", 
      "улица 8 марта", "улица Байтерек", "улица Туран", "улица Батыр", "улица Оркен", 
      "улица Каспийская", "улица Айгерим", "улица Толегенова", "улица Атамекен", 
      "улица Бауыржана Момышулы", "улица Жамбыла Жабаева"
    ]
  },
  "Жанаозен": {
    districts: [
      "Рахат", "Тенге", "Кендерли", "Жалын", "Шанырак", "Мамыр", "Арай", 
      "Актас", "Жулдыз", "Сарыкамыс", "Бостан", "Коктем", "Самал", "Оркен"
    ],
    streets: [
      "улица Сатпаева", "улица Тауке хана", "проспект Бейбарыса", "улица Алтын Орда", 
      "улица Толе би", "улица Абай", "улица Конырат", "улица Бейсембаева", 
      "улица Шокан Уалиханова", "улица Казыбек би", "улица Тулепова", "улица Еркебулан", 
      "улица Шахманова", "улица Караганда", "улица Айтеке би", "улица Мунайшылар", 
      "улица Актау", "улица Кенесары хана", "улица Достык", "улица Батыс", 
      "улица Алтын Орда", "улица Арман"
    ]
  },
  "Форт-Шевченко": {
    districts: [
      "Центр", "Прибрежный", "Курортный", "Северный", "Южный", "Западный", "Восточный", 
      "Атамекен", "Жана Кала", "Жигер", "Ак Булак", "Байтерек", "Оркен", "Бозжыра"
    ],
    streets: [
      "улица Достык", "улица Абая", "улица Актюбинская", "улица Нурлы Жол", 
      "улица Алтын Орда", "улица Мунайшылар", "улица Айтеке би", "улица Кенесары хана", 
      "улица Еркин", "улица Сары Арка", "улица Тулепова", "улица Байконур", 
      "улица Жибек Жолы", "улица Шокан Уалиханова", "улица Тауке хана", 
      "улица Бейбарыса", "улица Актас", "улица Арман", "улица Жансугурова", 
      "улица Ак Кент", "улица Самал", "улица Оркен"
    ]
  },
  "Курык": {
    districts: [
      "Старый Курык", "Новый Курык", "Жана Кала", "Береке", "Байтерек", 
      "Актау", "Оркен", "Астана", "Самал", "Еркин"
    ],
    streets: [
      "улица Атырауская", "улица Казахстан", "улица Темиртау", "улица Бейбарыса", 
      "улица Тауке хана", "улица Достык", "улица Сары Арка", "улица Жибек Жолы", 
      "улица Байконур", "улица Мунайшылар", "улица Тулепова", "улица Еркин", 
      "улица Оркен", "улица Самал", "улица Актас", "улица Арман", 
      "улица Жансугурова", "улица Ак Кент", "улица Астана"
    ]
  },
  "Бейнеу": {
    districts:  [
      "Северный", "Южный", "Центральный", "Жана Кала", "Береке", 
      "Астана", "Байтерек", "Самал", "Оркен", "Еркин"
    ],
    streets: [
      "улица Байтурсынова", "улица Сейфуллина", "улица Назарбаева", "улица Ауэзова",
      "улица Абая", "улица Достык", "улица Алтын Орда", "улица Мунайшылар", 
      "улица Кунаева", "улица Бейбарыса", "улица Тауке хана", "улица Жибек Жолы",
      "улица Байконур", "улица Сары Арка", "улица Тулепова", "улица Еркин", 
      "улица Оркен", "улица Самал", "улица Актас", "улица Арман"
    ]
  }
};

async function getCityInfo() {
  const city = document.getElementById('city').value.trim();
  
  if (!city) {
    alert('Введите город!');
    return;
  }

  if (cityData[city]) {
    displayDistricts(cityData[city].districts);
    displayStreets(cityData[city].streets);
  } else {
    alert("Город не найден в базе данных!");
  }

  try {
    const response = await fetch(`${API_URL}?city=${city}`);
    const data = await response.json();

    if (response.ok) {
      displayWeather(data.weather);
      displayMap(data.weather.coordinates);
      displayToponyms(data.toponyms);
    } else {
      alert(`Ошибка: ${data.error}`);
    }
  } catch (error) {
    console.error('Ошибка при получении информации о городе:', error);
    alert('Не удалось получить данные.');
  }
}

function displayWeather(weather) {
  const weatherDiv = document.getElementById('weather');
  weatherDiv.innerHTML = `
    <h4>Погода</h4>
    <img src="${weather.icon}" alt="${weather.description}">
    <p><strong>Температура:</strong> ${weather.temperature}°C</p>
    <p><strong>Ощущается как:</strong> ${weather.feels_like}°C</p>
    <p><strong>Описание:</strong> ${weather.description}</p>
    <p><strong>Влажность:</strong> ${weather.humidity}%</p>
    <p><strong>Давление:</strong> ${weather.pressure} hPa</p>
    <p><strong>Скорость ветра:</strong> ${weather.wind_speed} м/с</p>
    <p><strong>Страна:</strong> ${weather.country}</p>
  `;
}

function displayMap(coordinates) {
  if (!coordinates || !coordinates.latitude || !coordinates.longitude) {
    console.error('Координаты отсутствуют или некорректны:', coordinates);
    alert('Невозможно отобразить карту из-за отсутствия данных.');
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
    title: 'Расположение города',
  });
}

function displayToponyms() {
  const toponymsDiv = document.getElementById('toponyms');
  toponymsDiv.innerHTML = `
    <h4>Типы топонимов Мангистауской области</h4>
    <ol>
      <li><strong>Ойконимы (населённые пункты):</strong> Актау, Жанаозен, Бейнеу, Форт-Шевченко.</li>
      <li><strong>Оронимы (горы, возвышенности):</strong> Шеркала, Айракты, Отпантау.</li>
      <li><strong>Гидронимы (водоёмы, реки):</strong> Каспийское море, Қошқар-Ата, Өліқолтық.</li>
      <li><strong>Дромонимы (дороги, улицы):</strong> проспект Абая, улица Назарбаева, Транскаспийский маршрут.</li>
      <li><strong>Хоронимы (регионы, территории):</strong> Мангистауская область, полуостров Бозашы.</li>
      <li><strong>Фитонимы (связаны с растительностью):</strong> Жиде (от каз. ‘ива’), Ағаштык (каз. ‘лесная местность’).</li>
      <li><strong>Зоонимы (связаны с животными):</strong> Қужатқан (каз. ‘место, где водились лебеди’), Бозашы (каз. ‘верблюжий’).</li>
      <li><strong>Лимнонимы (озёра, болота):</strong> Қаракөл, Ақкөл, Тұзбайыр.</li>
      <li><strong>Спелеонимы (пещеры, подземные объекты):</strong> Шакпак-Ата (пещерный комплекс), Масат-Ата.</li>
      <li><strong>Антропотопонимы (названия по именам людей):</strong> Тауке хана (улица), Бекет-Ата (историческое место).</li>
    </ol>
  `;
}

function displayDistricts(districts) {
  const districtsDiv = document.getElementById("districts");
  districtsDiv.innerHTML = "<h4>Районы</h4>";

  if (!districts || districts.length === 0) {
    districtsDiv.innerHTML += "<p>Нет данных.</p>";
    return;
  }

  const list = document.createElement("ul");
  districts.forEach(district => {
    const listItem = document.createElement("li");
    listItem.textContent = district;
    list.appendChild(listItem);
  });

  districtsDiv.appendChild(list);
}

function displayStreets(streets) {
  const streetsDiv = document.getElementById("streets");
  streetsDiv.innerHTML = "<h4>Улицы</h4>";

  if (!streets || streets.length === 0) {
    streetsDiv.innerHTML += "<p>Нет данных.</p>";
    return;
  }

  const list = document.createElement("ul");
  streets.forEach(street => {
    const listItem = document.createElement("li");
    listItem.textContent = street;
    list.appendChild(listItem);
  });

  streetsDiv.appendChild(list);
}

document.getElementById('get-info-btn').addEventListener('click', getCityInfo);
