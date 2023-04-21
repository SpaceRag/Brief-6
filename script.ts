import key from "./key"


const baseUrl: string = "https://api.themoviedb.org/3"
const apiKey: string = 'api_key=' + key + '&language=fr-FR'
var page: number = 1
const searchBar = document.querySelector('.searchBar')
////////////////////////////// PAGE ACCEUIL - CATEGOMOVIES ////////////////////////////////////

const logoRefresh: Element | null = document.querySelector('h1')
logoRefresh?.addEventListener('click', (event: Event) => {
    location.reload()
})

///////////////////////////////// SEARCH BAR ////////////////////////////////////////////////


// Récupère l'élement button Search
const searchButton: Element | null = document.querySelector('.btnSearch') as HTMLElement
// Ecoute le user clique sur l'element et execute la fonction userSearch 
searchButton.addEventListener('click', () => {
    userSearch()
})

async function userSearch() {
    try {
        const searchUrl = baseUrl + '/search/movie?'
        // Select l'élément input 
        const searchBar: Element | null = document.querySelector('.searchBar') as HTMLElement
        const searchList: Element | null = document.querySelector('.searchList') as HTMLElement
        const sectionPopular: Element | null = document.querySelector('.popular')
        const sectionDocu: Element | null = document.querySelector('.Docu')
        const sectionHome: Element | null = document.querySelector('.Home')




        // Ajoute un eventlistener a l'input 
        searchBar.addEventListener('keypress', async (event: Event) => {
            // Si entrer et press par le user     
            if (event.key === 'Enter') {
                const searchTerm = event.target.value
                const url = searchUrl + apiKey + '&query=' + searchTerm + '&page=' + page + '&include_adult=false'
                const response = await fetch(url)
                const data = await response.json()
                // console.log(data.results)



                // Récupere le resultat de la recherche        
                const searchResult = data.results
                // console.log(searchResult);


                searchList.innerHTML = ''; // Efface les résultats précédents
                const btnDiv: Element | null = document.querySelector('.btnDiv') as HTMLElement
                const nextbtn = document.createElement('button')
                const prevbtn = document.createElement('button')
                

                // Crée les button 
                btnDiv.appendChild(prevbtn)
                btnDiv.appendChild(nextbtn)
                
                // Ajoute le text dans les btn
                prevbtn.innerHTML = 'Previous'
                nextbtn.innerHTML = 'Next'

                // Ecoute le user click et incrémente les pages 
                nextbtn.addEventListener('click', async () => {
                    if (page < data.total_pages) {
                        page++;
                        const url = searchUrl + apiKey + '&query=' + searchTerm + '&page=' + page + '&include_adult=false';
                        const response = await fetch(url);
                        const data = await response.json();
                        const searchResult = data.results;
                        searchList.innerHTML = '';
                        // afficher les nouveaux résultats de la recherche sur la page
                    }
                })


                // Décrémente
                prevbtn.addEventListener('click', async () => {
                    if (page < data.total_pages) {
                        page--;
                        const url = searchUrl + apiKey + '&query=' + searchTerm + '&page=' + page + '&include_adult=false';
                        const response = await fetch(url);
                        const data = await response.json();
                        const searchResult = data.results;
                        searchList.innerHTML = '';
                        
                    }
                })


               
                // Affiche les 20 résultat dans la section home
                searchResult.forEach(movie => {

                    // Crée l'image des films 
                    const imageUrl = 'https://image.tmdb.org/t/p/w154' + movie.poster_path
                    // Récupère l'Id du film
                    const movieId = movie.id
                    // console.log(movieId);

                    // Cache les section non utiles
                    sectionHome?.classList.add('hidden')
                    sectionPopular?.classList.add('hidden')
                    sectionDocu?.classList.add('hidden')


                    if (movie.poster_path !== null) {
                        // Crée la liste de films 
                        const title = document.createElement('h2')
                        const listItem = document.createElement('li')
                        const image = document.createElement('img')

                        image.classList.add('imageFilm')
                        image.src = imageUrl
                        image.setAttribute('movieId', `${movieId}`)

                        // Ajoute les images a la liste
                        listItem.appendChild(image)

                        // Ajoute la liste a la div
                        searchList.appendChild(listItem)

                        ///////////////////// DETAIL FILM /////////////////////////////////////////////////////////////////

                        // Ajoute un event listener sur chaque image pour afficher les détails du film
                        image.addEventListener('click', async () => {
                            const detailsUrl = baseUrl + '/movie/' + movieId + '?' + apiKey
                            const detailsResponse = await fetch(detailsUrl)
                            const detailsData = await detailsResponse.json()

                            // Crée un élément div pour les détails du film
                            const detailsDiv = document.createElement('div')
                            detailsDiv.classList.add('detailsFilm')
                            detailsDiv.innerHTML = `

                            <button onclick="location.reload()" class="btnSearch">Close</button>    
                            <h2>${detailsData.title}</h2>
                                <h3>Release Date :${detailsData.release_date}</h3>
                                <div>
                                <p>${Math.round(detailsData.vote_average)} /10</p>
                                <h4>Vote count : ${detailsData.vote_count}</h4>
                                </div>
                                <img src="https://image.tmdb.org/t/p/w342/${detailsData.poster_path}">
                                <h4>${detailsData.overview}</h4>
                            `

                            // Ajoute les détails à la section de détails
                            const detailsSection: Element | null = document.querySelector('.detailsFilm') as HTMLElement
                            detailsSection?.appendChild(detailsDiv)
                        })



                    }

                })
            }
        })

    } catch (error) {
        console.log(error)

    }

}
userSearch()



//////////////////////////////////////////////////////////////////////////////////////////////////////////


// // Récupère l'élement button Search
// const searchButton: Element | null = document.querySelector('.btnSearch') as HTMLElement
// // Ecoute le user clique sur l'element et execute la fonction userSearch 
// searchButton.addEventListener('click', async (event: Event) => {
//     userSearch()
// })






///////////////////////// HERO VIDEOS ///////////////////////////////////////////////////

async function getMovieVideo() {
    try {
        const response = await fetch(baseUrl + '/movie/502356/videos?' + apiKey + 'language=fr-FR')
        const data = await response.json()
        // console.log(data)

        const popularMoviesVideo = data.results
        const heroBanner: Element | null = document.querySelector('.hero') as HTMLElement
        popularMoviesVideo.forEach(results => {
            const videoUrl = 'https://www.youtube.com/watch?v=' + results.key
            const video = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${results.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
            heroBanner.innerHTML = video


        });

    } catch (error) {
        console.log(error)

    }
}
getMovieVideo()
//////////////////// POPULAR MOVIE /////////////////////////////////////////////

async function getMoviePopular() {
    try {
        const response = await fetch(baseUrl + '/movie/popular?' + apiKey)
        const data = await response.json()

        const popularMovies = data.results

        // Sélectionner l'élément de la page où afficher les images des films
        const movieList: Element | null = document.querySelector('.popularCarouselCard') as HTMLElement
        // Accéder à la liste des films populaires dans la réponse JSON
        popularMovies.forEach(movie => {
            // Construire l'URL complet de l'image du film
            const imageUrl = 'https://image.tmdb.org/t/p/w154' + movie.poster_path

            // Créer un élément <li> contenant l'image et le titre du film
            const listItem = document.createElement('li')
            const image = document.createElement('img')
            image.src = imageUrl
            // const title = document.createElement('h2')
            // title.textContent = movie.title

            // Ajouter les image a la liste
            listItem.appendChild(image)
            // listItem.appendChild(title);

            // Ajouter l'élément <li> à la liste HTML
            movieList.appendChild(listItem)

        })

    } catch (error) {
        console.log(error);

    }
}
// getMoviePopular()

////////////////////////////////////// DOCUMENTARY MOVIE ////////////////////////////////////


// Filtrer par genre 
const filterGenre = "&with_genres="
// ID du genre "documentaire"
const genreID = "99"
// Filter les contenu adulte
const filterAdulte = '&include_adult=false'

async function getMovieDocu() {
    try {
        const response = await fetch(baseUrl + '/discover/movie?' + apiKey + filterGenre + genreID + filterAdulte)
        const data = await response.json()

        const movieDocuList = data.results
        // console.log(movieDocuList);

        // Sélectionner l'élément de la page où afficher les images des films
        const docuList: Element | null = document.querySelector('.docuCarouselCard') as HTMLElement
        // Accéder à la liste des films populaires dans la réponse JSON
        movieDocuList.forEach(movie => {
            const imageUrl = 'https://image.tmdb.org/t/p/w154' + movie.poster_path
            const img = document.createElement('img')
            const listItem = document.createElement('li')
            img.src = imageUrl
            // Ajouter l'élément <li> à la liste HTML
            listItem.appendChild(img)
            docuList.appendChild(listItem)
        })

    } catch (error) {
        console.log(error);

    }

}
// getMovieDocu()

////////////////////////////////////// Fonction génerique pour Récuperer une liste de films /////////////////////////////////////////////////////

async function getMoviesFromApi(apiUrl: string, elementSelector: string) {
    try {
        const response = await fetch(apiUrl)
        const data = await response.json()

        const movies = data.results

        // Sélectionne l'élément de la page où afficher les images des films
        const movieList: Element | null = document.querySelector(elementSelector) as HTMLElement

        // Accéde à la liste des films dans la réponse JSON
        movies.forEach(movie => {
            // Construi l'URL complet de l'image du film
            const imageUrl = 'https://image.tmdb.org/t/p/w154' + movie.poster_path

            if (movie.poster_path !== null) {
                // Crée un élément <li> contenant l'image et le titre du film
                const listItem = document.createElement('li')
                const image = document.createElement('img')
                image.src = imageUrl

                // Ajoute les image a la liste
                listItem.appendChild(image)

                // Ajoute l'élément <li> à la liste HTML
                movieList.appendChild(listItem)
            }
        })

    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////// POPULAR MOVIE //////////////////////////////////////

getMoviesFromApi(baseUrl + '/search/movie?' + apiKey + '&query=documentary', '.docuCarouselCard');

////////////////////////////////////// DOCUMENTARY MOVIE ////////////////////////////////////

getMoviesFromApi(baseUrl + '/movie/popular?' + apiKey, '.popularCarouselCard')
