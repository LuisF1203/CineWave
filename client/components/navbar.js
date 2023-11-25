function MiComponente(elementoPadre) {
  this.elementoPadre = elementoPadre;
  this.elementoHijo = document.createElement('div');
  const username = "";
  const userImg = "";
  const searchMovies = {
      "kill Bill": "https://th.bing.com/th/id/OIP.QRoYUipqebs6BA7urEIoUgHaLH?pid=ImgDet&rs=1",
      "Coraline": "https://th.bing.com/th/id/OIP.X_zYmfuYIhLPz3nHkr9wSwHaJa?pid=ImgDet&rs=1",
      "Shrek": "https://image.tmdb.org/t/p/original/WJ9WoEPmD5gWs2l3tIyPKzEI6K.jpg"
  };
  const searchIcon = ["../assets/ant-design_search-outlined.svg", "../assets/close.svg"];
  let searchIconIndex = 0; // Índice para rastrear el ícono actual

  // Convierte el objeto en un arreglo de pares clave-valor
  const searchItems = Object.entries(searchMovies).map(([title, image]) => ` 
      <a href="#" class="search-img-poster" >
          <img src="${image}" alt="${title}">
          <p>${title}</p>
      </a>
  `).join('');

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
  }

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
          <div class="search-imgs">
              ${searchItems}
          </div>
      </div>
  `;

  this.elementoPadre.appendChild(this.elementoHijo);

  // Agregar un manejador de evento clic al enlace de búsqueda
  const searchLink = this.elementoHijo.querySelector("#search-link");
  searchLink.addEventListener("click", handleClickSearch);
  // Agregar un manejador de evento "input" al campo de búsqueda
  const searchInput = this.elementoHijo.querySelector("#input-search");
  const searchImgs = this.elementoHijo.querySelector(".search-imgs");

  searchInput.addEventListener("input", function(event) {
      const inputValue = event.target.value.toLowerCase(); // Convertir a minúsculas para una comparación sin distinción entre mayúsculas y minúsculas

      // Filtrar los elementos que coinciden con el texto ingresado
      const filteredItems = Object.entries(searchMovies)
          .filter(([title]) => title.toLowerCase().includes(inputValue))
          .map(([title, image]) => ` 
              <a href="#" class="search-img-poster" >
                  <img src="${image}" alt="${title}">
                  <p>${title}</p>
              </a>
          `)
          .join('');

      // Mostrar "Película no encontrada" si no se encontraron resultados
      if (filteredItems) {
          searchImgs.innerHTML = filteredItems;
      } else {
          searchImgs.innerHTML = "Película no encontrada";
      }
  });
}

// Para usar el componente:
const contenedor = document.getElementById('main-nav');
const miComponente = new MiComponente(contenedor);
