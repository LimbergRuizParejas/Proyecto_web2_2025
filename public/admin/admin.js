function mostrarSeccion(id) {
  document.querySelectorAll('.seccion').forEach(sec => sec.classList.remove('activa'));
  document.getElementById(id).classList.add('activa');
}

let idGeneroEditando = null;
let idArtistaEditando = null;

document.getElementById("form-genero").addEventListener("submit", async e => {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);

  if (idGeneroEditando) {
    await fetch(`http://localhost:3000/api/generos/${idGeneroEditando}`, {
      method: "PUT",
      body: data
    });
    idGeneroEditando = null;
    form.querySelector("button").textContent = "Guardar Género";
    form.querySelector("button").style.backgroundColor = "";
  } else {
    await fetch("http://localhost:3000/api/generos", {
      method: "POST",
      body: data
    });
  }

  form.reset();
  cargarGeneros();
  cargarSelectGeneros();
});

async function cargarGeneros() {
  const res = await fetch("http://localhost:3000/api/generos");
  const generos = await res.json();
  const ul = document.getElementById("lista-generos");
  ul.innerHTML = "";
  generos.forEach(g => {
    ul.innerHTML += `
      <li>
        ${g.nombre}
        <button class="delete" onclick="eliminarGenero(${g.id})">🗑</button>
        <button class="edit" onclick="editarGenero(${g.id}, '${g.nombre}')">✏️</button>
      </li>`;
  });
}

function editarGenero(id, nombre) {
  document.getElementById("nombre-genero").value = nombre;
  document.getElementById("imagen-genero").value = ""; // Limpia el input file
  idGeneroEditando = id;
  const btn = document.querySelector("#form-genero button");
  btn.textContent = "Actualizar Género";
  btn.style.backgroundColor = "#ffc107";
}

async function eliminarGenero(id) {
  await fetch(`http://localhost:3000/api/generos/${id}`, { method: "DELETE" });
  cargarGeneros();
  cargarSelectGeneros();
}

// ------------------ ARTISTA ------------------
document.getElementById("form-artista").addEventListener("submit", async e => {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);

  if (idArtistaEditando) {
    await fetch(`http://localhost:3000/api/artistas/${idArtistaEditando}`, {
      method: "PUT",
      body: data
    });
    idArtistaEditando = null;
    form.querySelector("button").textContent = "Guardar Artista";
    form.querySelector("button").style.backgroundColor = "";
  } else {
    await fetch("http://localhost:3000/api/artistas", {
      method: "POST",
      body: data
    });
  }

  form.reset();
  cargarArtistas();
  cargarSelectArtistas();
});
function editarArtista(id, nombre, id_genero) {
  document.getElementById("nombre-artista").value = nombre;
  document.getElementById("id-genero-artista").value = id_genero;
  document.getElementById("foto-artista").value = null; // Limpia campo de imagen
  idArtistaEditando = id;
  const btn = document.querySelector("#form-artista button");
  btn.textContent = "Actualizar Artista";
  btn.style.backgroundColor = "#ffc107";
}

async function cargarArtistas() {
  const res = await fetch("http://localhost:3000/api/artistas");
  const artistas = await res.json();
  const ul = document.getElementById("lista-artistas");
  ul.innerHTML = "";
  artistas.forEach(a => {
    ul.innerHTML += `
      <li>
        ${a.nombre} (Género ${a.id_genero})
        <button class="delete" onclick="eliminarArtista(${a.id})">🗑</button>
        <button class="edit" onclick="editarArtista(${a.id}, '${a.nombre}', ${a.id_genero})">✏️</button>
      </li>`;
  });
}

async function eliminarArtista(id) {
  await fetch(`http://localhost:3000/api/artistas/${id}`, { method: "DELETE" });
  cargarArtistas();
  cargarSelectArtistas();
}
// ---------------- ÁLBUM ----------------

document.getElementById("form-album").addEventListener("submit", async e => {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  await fetch("http://localhost:3000/api/albumes", {
    method: "POST",
    body: data
  });
  form.reset();
  cargarAlbumes();
  cargarSelectAlbumes();
});

async function cargarAlbumes() {
  const res = await fetch("http://localhost:3000/api/albumes");
  const albumes = await res.json();
  const ul = document.getElementById("lista-albumes");
  ul.innerHTML = "";
  albumes.forEach(a => {
    ul.innerHTML += `
      <li>
        ${a.titulo} (Artista ${a.id_artista})
        <button class="delete" onclick="eliminarAlbum(${a.id})">🗑</button>
      </li>`;
  });
}

async function eliminarAlbum(id) {
  await fetch(`http://localhost:3000/api/albumes/${id}`, {
    method: "DELETE"
  });
  cargarAlbumes();
  cargarSelectAlbumes();
}
// ---------------- CANCIÓN ----------------

document.getElementById("form-cancion").addEventListener("submit", async e => {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  await fetch("http://localhost:3000/api/canciones", {
    method: "POST",
    body: data
  });
  form.reset();
  cargarCanciones();
});

async function cargarCanciones() {
  const res = await fetch("http://localhost:3000/api/canciones");
  const canciones = await res.json();
  const ul = document.getElementById("lista-canciones");
  ul.innerHTML = "";
  canciones.forEach(c => {
    ul.innerHTML += `
      <li>
        ${c.titulo} (Álbum ${c.id_album})
        <button class="delete" onclick="eliminarCancion(${c.id})">🗑</button>
      </li>`;
  });
}

async function eliminarCancion(id) {
  await fetch(`http://localhost:3000/api/canciones/${id}`, {
    method: "DELETE"
  });
  cargarCanciones();
}
// ---------------- SELECTS ----------------

async function cargarSelectGeneros() {
  const res = await fetch("http://localhost:3000/api/generos");
  const generos = await res.json();
  const select = document.getElementById("id-genero-artista");
  if (!select) return;
  select.innerHTML = "<option disabled selected>Selecciona un género</option>";
  generos.forEach(g => {
    const opt = document.createElement("option");
    opt.value = g.id;
    opt.textContent = g.nombre;
    select.appendChild(opt);
  });
}

async function cargarSelectArtistas() {
  const res = await fetch("http://localhost:3000/api/artistas");
  const artistas = await res.json();
  const select = document.getElementById("id-artista-album");
  if (!select) return;
  select.innerHTML = "<option disabled selected>Selecciona un artista</option>";
  artistas.forEach(a => {
    const opt = document.createElement("option");
    opt.value = a.id;
    opt.textContent = a.nombre;
    select.appendChild(opt);
  });
}

async function cargarSelectAlbumes() {
  const res = await fetch("http://localhost:3000/api/albumes");
  const albumes = await res.json();
  const select = document.getElementById("id-album-cancion");
  if (!select) return;
  select.innerHTML = "<option disabled selected>Selecciona un álbum</option>";
  albumes.forEach(a => {
    const opt = document.createElement("option");
    opt.value = a.id;
    opt.textContent = a.titulo;
    select.appendChild(opt);
  });
}

// 🚀 INICIAL
cargarGeneros();
cargarArtistas();
cargarAlbumes();
cargarCanciones();
cargarSelectGeneros();
cargarSelectArtistas();
cargarSelectAlbumes();
