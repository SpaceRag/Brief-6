import key from "./key"


const baseUrl: string = "https://api.themoviedb.org/3"
const apiKey: string = 'api_key=' + key + '&language=fr-FR'


////////////////////////////// PAGE ACCEUIL - CATEGOMOVIES ////////////////////////////////////

///////////////////////////////// SEARCH BAR ////////////////////////////////////////////////

async function userSearch() {
    try {
        const searchUrl = baseUrl + '/search/movie?'
        // Select l'élément input 
        const searchBar: Element | null = document.querySelector('.searchBar') as HTMLElement
        const searchButton: Element | null = document.querySelector('.btnSearch')
        const searchList: Element | null = document.querySelector('.searchList') as HTMLElement
        // Ajoute un eventlistener a l'input 
        searchBar.addEventListener('keypress', async (event) => {
            // Si entrer et press par le user     
            if (event.key === 'Enter') {
                const searchTerm = event.target.value
                const url = searchUrl + apiKey + '&query=' + searchTerm + '&page=1&include_adult=false'
                const response = await fetch(url)
                const data = await response.json()
                console.log(data.results)
                // Récupere le resultat de la recherche        
                const searchResult = data.results
                // Affiche les 20 résultat dans une page "popup"
                searchResult.forEach(movie => {
                    // Créer l'image des films 
                    const imageUrl = 'https://image.tmdb.org/t/p/w154' + movie.poster_path
                    // Créer la liste de films 
                    const listItem = document.createElement('li')
                    const image = document.createElement('img')
                    image.src = imageUrl
                    // const title = document.createElement('h2')
                    // title.textContent = movie.title
                    // Ajouter les images a la liste
                    listItem.appendChild(image)
                    // Ajoute l'élément html a la liste 
                    searchList.appendChild(listItem)

                })



            }
        })

    } catch (error) {
        console.log(error)

    }

}
userSearch()

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
getMoviePopular()

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
getMovieDocu()

