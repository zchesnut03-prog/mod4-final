
  // Navbar buttons
  const moviesBtn = document.getElementById('moviesBtn');
  const homeBtn = document.getElementById('homeBtn');

  const landingPage = document.getElementById('landing-page');
  const moviesPage = document.getElementById('movies-page');

  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  const moviesContainer = document.getElementById('moviesContainer');

  const contactBtn = document.getElementById('contactBtn');
  const contactModal = document.getElementById('contactModal');
  const closeModal = document.getElementById('closeModal');

  const searchBtnLanding = document.getElementById('searchBtnLanding');
  const searchInputLanding = document.getElementById('searchInputLanding');

  // Spinner
  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  spinner.innerHTML = `<div class="loader"></div>`;
  document.body.appendChild(spinner);

  function showLoader() {
  spinner.classList.add('show');
}

 function hideLoader() {
  spinner.classList.remove('show');
}

  // Navigation
  moviesBtn.addEventListener('click', () => {
    landingPage.classList.add('hidden');
    moviesPage.classList.remove('hidden');
  });

  homeBtn.addEventListener('click', () => {
    landingPage.classList.remove('hidden');
    moviesPage.classList.add('hidden');
  });

  // Landing page search
  searchBtnLanding.addEventListener('click', async () => {
    const query = searchInputLanding.value.trim();
    if (!query) return;

    landingPage.classList.add('hidden');
    moviesPage.classList.remove('hidden');
    searchInput.value = query;

    showLoader();
    const minTime = new Promise(r => setTimeout(r, 600)); // spinner shows at least 600ms
    const fetchData = fetchMovies(query);
    await Promise.all([minTime, fetchData]);
    hideLoader();
  });

  // Movies page search
  searchBtn.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (!query) return;

    showLoader();
    const minTime = new Promise(r => setTimeout(r, 600));
    const fetchData = fetchMovies(query);
    await Promise.all([minTime, fetchData]);
    hideLoader();
  });

  // Contact modal
  contactBtn.addEventListener('click', () => {
  contactModal.classList.add('active');
});

closeModal.addEventListener('click', () => {
  contactModal.classList.remove('active');
});

window.addEventListener('click', (e) => {
  if (e.target === contactModal) {
    contactModal.classList.remove('active');
  }
});

  // Movie fetch
  async function fetchMovies(query) {
    const apiKey = 'c24179a6';
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}&type=movie`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const sortedMovies = data.Search
  .sort((a, b) => Number(b.Year) - Number(a.Year))
  .slice(0, 6);

displayMovies(sortedMovies);

      if (data.Response === 'True') {


      } else {
        moviesContainer.innerHTML = `<p>No movies found</p>`;
      }
    } catch (err) {
      console.error(err);
      moviesContainer.innerHTML = `<p>Error fetching movies</p>`;
    }
  }

  function displayMovies(movies) {
  moviesContainer.innerHTML = '';

  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';

    card.innerHTML = `
      <img src="${movie.Poster !== 'N/A' ? movie.Poster : ''}">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    `;

    card.addEventListener('click', () => {
      openMovieDetails(movie.imdbID);
    });

    moviesContainer.appendChild(card);
  });
}

async function openMovieDetails(imdbID) {
  const apiKey = 'c24179a6';
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`;

  try {
    const res = await fetch(url);
    const movie = await res.json();

    // TEMP: just to prove it works
    alert(`${movie.Title}\n\n${movie.Plot}`);

  } catch (err) {
    console.error(err);
  }
}
