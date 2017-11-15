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
    // console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
    });
  buildHtml(movies);
  editMovies(movies);
  deleteMovies(movies);
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
                        <th><button class="btn btn-danger" id="deleteMovieBtn${movie.id}">Delete</button></th></tr>
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

// ================================== Function to bring the movies to edition ==============================

function editMovies(arrObjs) {
    var editHtml = "";
    arrObjs.forEach(function (movie, index, array) {
        const {title, rating, id} = movie;
        $(`#editMovieBtn${movie.id}`).click(function () {
            $('#editingMovies').toggleClass('invisible');
            editHtml = `<input id="edit_movie_name" type="text" value="${movie.title}">  Rating: ${movie.rating}<div id="tempID">${movie.id}</div>`;
            $("#print-edited-movies").html(editHtml);
        });

    });
    $("#editingMovieBtn").click(function () {
        const moviePut = {title: $('#edit_movie_name').val() , rating: $('#edit_rating_value').val() };
        const id = $('#tempID').html();
        console.log(moviePut);
        const url = `/api/movies/${id}`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(moviePut)
        };

        fetch(url, options)
            .then(() => {

                getMovies().then((movies) => {
                    const $loading = $('#loading').hide();
                    $(document)
                        .ajaxStart(function () {
                            $loading.hide('body');
                        })
                        .ajaxStop(function () {
                            $loading.show('body');
                        });
                    // console.log('Here are all the movies:');
                    movies.forEach(({title, rating, id}) => {
                        console.log(`id#${id} - ${title} - rating: ${rating}`);
                    });
                    buildHtml(movies);
                    editMovies(movies);
                    deleteMovies(movies);
                }).catch((error) => {
                    alert('Oh no! Something went wrong.\nCheck the console for details.')
                    console.log(error);
                });

            })
            .catch(console.log("error for editing movies"));
    })

};


// ================================== Function to delete movies ==============================

function deleteMovies(arrObjs) {
    arrObjs.forEach(function (movie, index, array) {
        const {title, rating, id} = movie;
        $(`#deleteMovieBtn${movie.id}`).click(function () {
            console.log("delete button clicked");
            const movieDelete = {title: movie.title, rating: movie.rating, id: movie.id};
            const url = `/api/movies/${id}`;
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(movieDelete)
            };

            fetch(url, options)
                .then(console.log("fetch for editing movies"))
                .catch(console.log("error for editing movies"));
        })
    });
};



























