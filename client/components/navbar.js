function MiComponente(elementoPadre) {
    this.elementoPadre = elementoPadre;
    this.elementoHijo = document.createElement('div');
    const username = "";
    const userImg = "";
    const searchIcon = ["../assets/ant-design_search-outlined.svg", "../assets/close.svg"];
    let searchIconIndex = 0; // Índice para rastrear el ícono actual
  
    this.searchMovies = async function (query) {
      // Utiliza loadMedias para cargar las películas desde la base de datos
      const movies = await loadMedias(moviesURL); // Reemplaza 'URL_DE_TU_API' con la URL correcta
  
      // Filtra las películas que coinciden con la consulta
      const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
  
      // Actualiza el contenido de la barra de búsqueda con los resultados
      const searchImgs = this.elementoHijo.querySelector(".search-imgs");
      searchImgs.innerHTML = filteredMovies.map(movie => `
        <a href="#" class="search-img-poster">
          <img src="${movie.imageURL}" alt="${movie.title}">
          <p>${movie.title}</p>
        </a>
      `).join('');
    };
  
    const handleClickSearch = () => {
      const searchDropdown = this.elementoHijo.querySelector(".search-dropdown");
      const searchLink = this.elementoHijo.querySelector("#search-link");
  
      // Cambiar el ícono de búsqueda al alternar la visualización de la barra de búsqueda
      if (searchDropdown.style.display === "none" || searchDropdown.style.display === "") {
        searchDropdown.style.display = "block";
        searchDropdown.style.top = "-27%";
        searchDropdown.style.transition = "top 1s";
        setTimeout(() => {
          searchDropdown.style.top = "9.5%";
        }, 0);
        // Cambiar a la segunda imagen (ícono de cierre)
        searchLink.querySelector("img").src = searchIcon[1];
        searchIconIndex = 1;
      } else {
        searchDropdown.style.top = "-27%";
        setTimeout(() => {
          searchDropdown.style.display = "none";
        }, 1000);
        // Cambiar al ícono de búsqueda al cerrar
        searchLink.querySelector("img").src = searchIcon[0];
        searchIconIndex = 0;
      }
    };
  
    this.elementoHijo.innerHTML = `
      <ul class="nav-ul">
        <li class="user-li">
          <a id="userProfileLink" href="profiles.html">
            <img class="img-user" src="${userImg}">
            ${username}
          </a>
        </li>
        <li class="search-li">
          <a id="search-link">
            <img src="${searchIcon[0]}">
          </a>
        </li>
        <li>
          <a href="#">Series</a>
        </li>
        <li>
          <a href="#">Movies</a>
        </li>
        <li>
          <a href="#myList">My List</a>
        </li>
      </ul>
      <div class="search-dropdown hidden">
        <input id="input-search" type="text" placeholder="Search for a show, movie, genre, e.t.c."/>
        <div class="search-imgs"></div>
      </div>
    `;
  
    this.elementoPadre.appendChild(this.elementoHijo);
  
    // Agregar un manejador de evento clic al enlace de búsqueda
    const searchLink = this.elementoHijo.querySelector("#search-link");
    searchLink.addEventListener("click", handleClickSearch);
  
    // Agregar un manejador de evento "input" al campo de búsqueda
    const searchInput = this.elementoHijo.querySelector("#input-search");
    searchInput.addEventListener("input", function(event) {
      const inputValue = event.target.value;
      // Llama al método searchMovies con el valor del campo de búsqueda
      miComponente.searchMovies(inputValue);
    });
  }
  
  // Para usar el componente:
  const contenedor = document.getElementById('main-nav');
  const miComponente = new MiComponente(contenedor);
  
  // Carga inicial de películas (puedes ajustar el valor predeterminado según tus necesidades)
  miComponente.searchMovies('');
  
  async function loadMedias(url) {
    let response = await fetch(url);
    if (response.status != 200) return [];
    return await response.json();
  }
  