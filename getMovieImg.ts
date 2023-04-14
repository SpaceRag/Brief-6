// import key from "./key"

// const baseUrl: string = "https://api.themoviedb.org/3"
// const apiKey: string = 'api_key=' + key + '&language=fr-FR'

// async function getMoviePopular() {
//     try {
//         const response = await fetch (baseUrl + '/movie/popular?' + apiKey)
//         const data = await response.json()

//         const popularMovies = data.results

//         // Sélectionner l'élément de la page où afficher les images des films
//         const movieList: Element | null = document.querySelector('.popularCarouselCard') as HTMLElement
//         // Accéder à la liste des films populaires dans la réponse JSON
//         popularMovies.forEach(movie => {
//             // Construire l'URL complet de l'image du film
//             const imageUrl = 'https://image.tmdb.org/t/p/w154' + movie.poster_path;

//             // Créer un élément <li> contenant l'image et le titre du film
//             const listItem = document.createElement('li')
//             const image = document.createElement('img')
//             image.src = imageUrl
//             // const title = document.createElement('h2')
//             // title.textContent = movie.title
//             listItem.appendChild(image)
//             // listItem.appendChild(title);

//             // Ajouter l'élément <li> à la liste HTML
//             movieList.appendChild(listItem);

//         })

//     } catch (error) {
//         console.log(error);

//     }
// }
// getMoviePopular()


// // Filtrer par genre 
// const filterGenre = "&with_genres="
// // ID du genre "documentaire"
// const genreID = "99"
// // Filter les contenu adulte
// const filterAdulte = '&include_adult=false'

// async function getMovieDocu () {
//     try {
//         const response = await fetch (baseUrl + '/discover/movie?' + apiKey + filterGenre + genreID + filterAdulte)
//         const data = await response.json()

//         const movieDocuList = data.results
//         console.log(movieDocuList);
        

//         const docuList: Element | null = document.querySelector('.docuCarouselCard') as HTMLElement

//         movieDocuList.forEach(movie => { 
//             const imageUrl = 'https://image.tmdb.org/t/p/w154' + movie.poster_path
//             const img = document.createElement('img')
//             const listItem = document.createElement('li')
//             img.src = imageUrl

//             listItem.appendChild(img)
//             docuList.appendChild(listItem)
//         })

//     } catch (error) {
//         console.log(error);

//     }
    
// }
// getMovieDocu()