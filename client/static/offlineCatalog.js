class OfflineCatalog {
    getFilmList() {
        let filmListJson = localStorage.getItem("offlineFilmList");
        if (filmListJson !== null) {
            return JSON.parse(filmListJson);
        }
        return [];
    }

    deleteFromFilmList(id) {
        let filmList = this.getFilmList();
        const index = filmList.findIndex(n => n.id === id);
        filmList.splice(index, 1);
        localStorage.setItem('offlineFilmList', JSON.stringify(filmList));
        this.renderCatalogByFilter();
    }

    renderCatalogByFilter() {
        let filmList = this.getFilmList();
        let country = document.getElementById("country-filter").value;
        let genre = document.getElementById("genre-filter").value;
        let yearFrom = document.getElementById("yearFrom-filter").value;
        let yearTo = document.getElementById("yearTo-filter").value;

        if (country !== "0") {
            filmList = filmList.filter(n => n.country === country);
        }
        if (genre !== "0") {
            filmList = filmList.filter(n => n.genre === genre);
        }
        if (yearFrom !== "" || yearTo !== "") {
            filmList = filmList.filter(n => n.releaseDate <= yearTo && n.releaseDate >= yearFrom);
        }
        this.catalogRender(filmList);
    }

    catalogRender(filmList) {
        let htmlCatalog = '';
        if (filmList.length > 0) {
            filmList.forEach(({
                                  id,
                                  name,
                                  country,
                                  genre,
                                  screenwriter,
                                  producer,
                                  operator,
                                  composer,
                                  budget,
                                  worldFees,
                                  ageRate,
                                  filmLength,
                                  releaseDate,
                                  posterUrl,
                                  director
                              }) => {
                htmlCatalog += `
                <li class="catalog-element">
                    <span class="catalog-element__name center2">${name}</span>
                    <img class="catalog-element__img" src="${posterUrl}" />
                    <span class="catalog-element__description sp"><p class="text-film">Страна:</p> <p class="text-film">${countries.find(item => item.id == country).country}</p> </span>
                    <span class="catalog-element__description sp"><p class="text-film">Жанр:</p> <p class="text-film">${genres.find(item => item.id == genre).genre}</p> </span>
                    <span class="catalog-element__description sp"><p class="text-film">Режисер:</p> <p class="text-film">${director}</p> </span>
                    <span class="catalog-element__description sp"><p class="text-film">Сценарист:</p> <p class="text-film">${screenwriter}</p> </span>
                    <span class="catalog-element__description sp"><p class="text-film">Продюсер:</p> <p class="text-film">${producer}</p> </span>
                    <span class="catalog-element__description sp"><p class="text-film">Оператор:</p> <p class="text-film">${operator}</p> </span>
                    <span class="catalog-element__description sp"><p class="text-film">Композитор:</p> <p class="text-film">${composer}</p> </span>
                    <span class="catalog-element__description sp"><p class="text-film">Бюджет:</p> <p class="text-film">${budget}</p> </span>
                    <span class="catalog-element__description sp"><p class="text-film">Мировые сборы:</p> <p class="text-film">${worldFees}</p> </span>
                    <span class="catalog-element__description sp"><p class="text-film">Возрастной рейтинг:</p> <p class="text-film">${ageRate}</p> </span>
                    <span class="catalog-element__description sp"><p class="text-film">Длительность:</p> <p class="text-film">${filmLength}</p> </span>
                    <span class="catalog-element__description sp"><p class="text-film">Дата релиза:</p> <p class="text-film">${releaseDate}</p> </span>
                    <div id="buttons" class="film-red">

                        <button class="catalog-element__btn buttons-2" onclick="commentMethods.renderCommentList('${id}','${name}')">Комментарии</button>
                        <button class="catalog-element__btn buttons-2" onclick="commentMethods.renderAddComment('${id}')">Добавить комментарий</button>
                        <button class="catalog-element__btn buttons-2" onclick="offlineCatalog.deleteFromFilmList('${id}')">Удалить фильм</button>
                    </div>

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
                <h1>Фильмы не добавлены</h1>
            </ul>
        `;
        }
    }
}

const offlineCatalog = new OfflineCatalog();
filter.filterRender();
offlineCatalog.renderCatalogByFilter();
