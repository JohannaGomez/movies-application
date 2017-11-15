const $ = require('jquery');

const {getMovies} = require('./api.js');

getMovies().then((movies) => {
    const $loading = $('#loading').hide();
    $(document)
        .ajaxStart(function () {
            $loading.hide('body');
        })
        .ajaxStop(function () {
            $loading.show('body');
        });
    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
    });
  buildHtml(movies);
  editMovies(movies);
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});



// ======================Function to build 1st list of movies from db.json======================================
function buildHtml(arrObjs) {
    var arrObjsHtml = "";
    arrObjs.forEach(function (movie, index, array) {
        const {title, rating, id} = movie;
        arrObjsHtml += `<tr id="movie-${id}"><th>${title}</th><th>${rating}</th><th>${id}</th>
                        <th><button class="btn btn-primary" id="editMovieBtn${movie.id}">Edit</button></th>
                        <th><button class="btn btn-primary" id="deleteMovieBtn${movie.id}">Delete</button></th></tr>
                        <div id="editMovieRow-${id}"></div>`;
    });
    $("#insertMovies").html(arrObjsHtml);

};


// =====================Event listener to show the form when clicked on Add movies===================
$('#add_movies').click(function () {
    $('#addMovies').toggleClass('invisible');
});


// =====================Event listener to ADD movies after submiting the button======================
$('#addMovieBtn').click(function () {
    const moviePost = {title: $('#movie_name').val() , rating: $('#rating_value').val() };
    const url = '/api/movies';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(moviePost)
    };

    fetch(url, options)
        .then(console.log("fetch for adding movies"))
        .catch(console.log("error for adding movies"));
});

// ==================================Edit movie
function editMovies(arrObjs) {
    var arrObjsHtmlEditMovies = "";
    arrObjs.forEach(function (movie, index, array) {
        const {title, rating, id} = movie;
        $(`#editMovieBtn${movie.id}`).click(function () {
            console.log("clicking on edit movies: " + id);
            arrObjsHtmlEditMovies += `<div id="editMovieRow-${movie.id}">
                    <form id="form_to_edit_movies">
                    <input id="edit_movie_name" type="text" placeholder="Edit movie here">
                    <div>
                    <label for="edit_movie_name">
                    <select id="edit_rating_value">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    </select>
                    </label>
                    </div>
                    <button id="submitEditBtn">
                    Submit edition
                </button>
                </form>
                </div>`
        });
        $(`#editMovieRow-${movie.id}`).html(arrObjsHtmlEditMovies);
    });
};






// $('#editMovieBtn${movie.id}').click(function () {
//     console.log("clicking on edit movies");

    // $(button name ${element.id).click

    // $('tr').click(function (e) {
    //     $(this).css("background-color", "blue");
    //     console.log(e.currentTarget.id);
    //     const movieId = e.currentTarget.id;
    //     const newNameeOfMovie = prompt("Edit name of the movie");
    //     const newRating = prompt("New rating of the movie");
    //
    // });
    //
    // // const moviePost = {title: $('#movie_name').val() , rating: $('#rating_value').val() };
    // const url = '/api/movies{movies/id}';
    // const options = {
    //     method: 'PUT',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify()
    // };
    //
    // fetch(url, options)
    //     .then(console.log("fetch for editing movies"))
    //     .catch(console.log("error for editing movies"));
// });






















