
class OnlineFilmList2 {
    connectionToApi(url) {
        fetch(url, {
            method: 'GET',
            headers: {
                'X-API-KEY': '11311686-cebf-44be-a210-8321cfd3a069',
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(function (json) {
                let tempFilmList = [];
                try {
                    for (let i = 0; i < json.films.length; i++) {
                        tempFilmList.push(new SimpleFilm(json.films[i]));
                    }
                } catch (err) {
                    for (let i = 0; i < json.items.length; i++) {
                        tempFilmList.push(new SimpleFilm(json.items[i]));
                    }
                }
                localStorage.setItem('onlineFilmList', JSON.stringify(tempFilmList))
            })
            .catch(err => console.log(err))
    }

    setFilmsBySearch(keyword) {
        if (keyword == "" || keyword == null) {
            keyword = "Шрек";
        }
        let url = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=' + keyword + '&page=1';
        this.connectionToApi(url);
        this.catalogRender();
    }

    setFilmsByFilter(country, genre, yearFrom, yearTo) {
        let url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films?';
        let yearFromTrusted = 1000;
        let yearToTrusted = 3000;
        if (country != null && country !== "" && country !== "0") {
            url += 'countries=' + country;
        }
        if (genre != null && genre !== "" && genre !== "0") {
            url += '&genres=' + genre;
        }
        if (yearFrom == null && yearFrom === "" && !isNaN(yearFrom)) {
            yearFromTrusted = yearFrom;
        }
        if (yearTo != null && yearTo !== "" && !isNaN(yearTo)) {
            yearToTrusted = yearTo;
        }
        url += '&order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=' + yearFromTrusted + '&yearTo=' + yearToTrusted + '&page=1';
        this.connectionToApi(url);
        this.catalogRender();
    }

    catalogRender() {
        let htmlCatalog = '';
        const filmList = this.getFilmList('onlineFilmList');
        if (filmList.length > 0) {
            filmList.forEach(({nameRu, country, filmLength, year, posterUrl, genres}) => {
                htmlCatalog += `
                <li class="catalog-element">
                    <span class="catalog-element__name text-film2">${nameRu}</span>
                    <img class="catalog-element__img text-film2" src="${posterUrl}" />
                    <span class="catalog-element__description text-film2">Страна: ${country}</span>
                    <span class="catalog-element__description text-film2">Дата выхода: ${year} год</span>
                    <span class="catalog-element__description text-film2">Длительность: ${filmLength}</span>
                    <span class="catalog-element__description text-film2">Жанр: ${genres}</span>
                </li>
            `;
            });
            document.getElementById('catalog').innerHTML = `
            <ul class="catalog-container">
                ${htmlCatalog}
            </ul>
        `;
        } else {
            document.getElementById('catalog').innerHTML = `
            <ul class="catalog-container">
                <h1>Не удалось получить ответ. Попробуйте еще</h1>
            </ul>
        `;
        }
    }

    getFilmList(localStorageName) {
        let filmListJson = localStorage.getItem(localStorageName);
        if (filmListJson !== null) {
            return JSON.parse(filmListJson);
        }
        return [];
    }
}

class SimpleFilm {
    constructor(film) {
        this.nameRu = film.nameRu;
        this.country = film.countries[0].country;
        if(film.filmLength === "" || film.filmLength == null) {
            this.filmLength = "01:29";
        } else this.filmLength = film.filmLength;
        this.year = film.year;
        this.posterUrl = film.posterUrl;
        this.genres = film.genres[0].genre;
    }
}
const onlineFilmListok = new OnlineFilmList2();

filter.filterRender();
onlineFilmListok.setFilmsBySearch('');


const submitEvent = document.querySelector(".filter__btn")

submitEvent.addEventListener('click', function() {
    let random = Math.trunc(Math.random()*70);
    onlineFilmListok.setFilmsByFilter(Math.trunc(Math.random()*12) + 1, Math.trunc(Math.random()*32) + 1, 1960 + random, 2030);
    onlineFilmListok.catalogRender();
});



