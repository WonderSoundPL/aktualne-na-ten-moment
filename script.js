let artists = JSON.parse(localStorage.getItem("artists")) || [];
let songs = JSON.parse(localStorage.getItem("songs")) || [];

function saveToLocalStorage() {
    localStorage.setItem("artists", JSON.stringify(artists));
    localStorage.setItem("songs", JSON.stringify(songs));
}

const countries = ["USA", "Polska", "UK", "Japonia", "Korea Płd.", "Chiny", "Niemcy"];

// Dodawanie artysty
document.getElementById("add-artist-form").addEventListener("submit", function (e) {
    e.preventDefault();
    let artistName = document.getElementById("artist-name").value;

    artists.push({ name: artistName });
    saveToLocalStorage();
    alert(`Dodano artystę: ${artistName}`);
    document.getElementById("add-artist-form").reset();
});

// Dodawanie piosenki
document.getElementById("add-song-form").addEventListener("submit", function (e) {
    e.preventDefault();
    let songTitle = document.getElementById("song-title").value;
    let songArtist = document.getElementById("song-artist").value;

    let songData = {
        title: songTitle,
        artist: songArtist,
        totalStreams: Math.floor(Math.random() * 10000000),
        countryStreams: {}
    };

    let remainingStreams = songData.totalStreams;
    countries.forEach((country, index) => {
        let countryShare = index === countries.length - 1 ? remainingStreams : Math.floor(Math.random() * remainingStreams / 2);
        songData.countryStreams[country] = countryShare;
        remainingStreams -= countryShare;
    });

    songs.push(songData);
    saveToLocalStorage();
    alert(`Dodano piosenkę: ${songTitle}`);
    document.getElementById("add-song-form").reset();
});

// Aktualizacja odtworzeń co 2 minuty
function updateStreams() {
    songs.forEach(song => {
        let newStreams = Math.floor(Math.random() * 500000);
        song.totalStreams += newStreams;

        countries.forEach(country => {
            song.countryStreams[country] += Math.floor(newStreams / countries.length);
        });
    });

    saveToLocalStorage();
}

setInterval(updateStreams, 120000);
