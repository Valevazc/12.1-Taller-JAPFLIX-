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
            console.error('Error:', error);
        });
});
