let peliculasData; 

document.addEventListener('DOMContentLoaded', () => {
    let url = 'https://japceibal.github.io/japflix_api/movies-data.json';

   
    fetch(url)
        .then(response => response.json())
        .then(data => {
            peliculasData = data; 
            console.log('Datos cargados:', peliculasData);
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });

    document.getElementById('btnBuscar').addEventListener('click', buscarPeliculas);
});


function buscarPeliculas() {
    let inputBuscar = document.getElementById('inputBuscar').value.trim().toLowerCase();  //toLowerCase() pasa a las palabras a minúsculas y trim() saca los espacios vacios

    if (inputBuscar) {
        
        let peliculasFiltradas = peliculasData.filter(pelicula =>
            pelicula.title.toLowerCase().includes(inputBuscar) ||   // includes() es un método que revisa si una cadena de texto contiene otra cadena. Por ejemplo, si buscamos "king" en "The Lion King" devuelve true
            pelicula.genres.join(', ').toLowerCase().includes(inputBuscar) ||  // join va a convertir a los generos que son arrays a cadena de texto
            pelicula.tagline.toLowerCase().includes(inputBuscar) ||
            pelicula.overview.toLowerCase().includes(inputBuscar)
        );

        mostrarPeliculas(peliculasFiltradas); 
    } else {
        console.log('El campo de búsqueda está vacío.');
    }
}


function mostrarPeliculas(peliculas) {
    let lista = document.getElementById('lista');
    lista.innerHTML = ''; 

    if (peliculas.length > 0) {
        peliculas.forEach(pelicula => {
            let item = document.createElement('li');
            item.classList.add('list-group-item', 'bg-dark', 'text-light');
            item.innerHTML = `
                <h3>${pelicula.title}</h3>
                <p>${pelicula.tagline}</p>
                <p>${generarEstrellas(pelicula.vote_average)}</p>
                <button class="btn btn-secondary" id="btnInfo-${pelicula.id}">Información Adicional</button>
                <div id="infoAdicional-${pelicula.id}" style="display: none;">
                    <p><strong>Año de Lanzamiento:</strong> ${new Date(pelicula.release_date).getFullYear()}</p>
                    <p><strong>Duración:</strong> ${pelicula.runtime} minutos</p>
                    <p><strong>Presupuesto:</strong> $${pelicula.budget}</p>
                    <p><strong>Ganancias:</strong> $${pelicula.revenue}</p>
                </div>
            `;

            item.addEventListener('click', () => mostrarDetalles(pelicula));

            
            const btnInfo = item.querySelector(`#btnInfo-${pelicula.id}`);
            btnInfo.addEventListener('click', (event) => {
                const infoAdicional = item.querySelector(`#infoAdicional-${pelicula.id}`);
                infoAdicional.style.display = infoAdicional.style.display === 'none' ? 'block' : 'none';
            });

            // detalles de la película
            function mostrarDetalles(pelicula) {
                let contenedorDetalles = document.getElementById('contenedorDetalles');
                contenedorDetalles.innerHTML = ''; 
            
                let genresList = pelicula.genres.map(genre => genre.name).join(', ');
            
                contenedorDetalles.innerHTML = `
                    <h2>${pelicula.title}</h2>
                    <p>${pelicula.overview}</p>
                    <p><strong>Géneros:</strong> ${genresList}</p>
                `;
            
                contenedorDetalles.style.display = 'block'; // Muestra el contenedor
            }

            lista.appendChild(item); 
        });
    } else {
        lista.innerHTML = '<li class="list-group-item bg-dark text-light">No se encontraron resultados</li>';
    }
}



function generarEstrellas(vote_average) {
    let estrellas = '';
    let rating = Math.round(vote_average / 2); // Convierte la calificación de 0-10 a 0-5

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            estrellas += '★'; 
        } else {
            estrellas += '☆'; 
        }
    }

    return estrellas;
}
