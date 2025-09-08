//Variable para almacenar los usuarios obtenidos
let todosLosUsuarios = [];

//Elementos HTMl para mostrar la información
const campoBusqueda = document.getElementById('buscar-usuario'); //Input de búsqueda
const contenedorUsuarios = document.getElementById('lista-usuarios'); //Contenedor de las tarjetas de usuario
const contenedorDetalles = document.getElementById('detalles-usuario'); //Contenedor para los detalles del usuario

// Tarea 2 y 4: Obtener y Mostrar los Datos - Mostrar los Destalles.

/**
 * Mostrar la lista de usuarios
 * @param {Array<Object>} usuarios 
 */
function mostrarUsuarios(usuarios) {
  
    //Limpiar el contenedor antes de mostrar nuevos usuarios
    contenedorUsuarios.innerHTML = '';
    contenedorDetalles.innerHTML = '';

    //Mensaje por si no hay usuarios que mostrar
    if (usuarios.length === 0) {
        contenedorUsuarios.innerHTML = '<p>No se encontraron usuarios que coincidan con la búsqueda.</p>';
        return;
    }

    //Crear una tarjeta para cada usuario
    usuarios.forEach(usuario => {
        const tarjetaUsuario = document.createElement('div');
        tarjetaUsuario.classList.add('card-usuario');
        tarjetaUsuario.innerHTML = `
            <h3>${usuario.name}</h3>
            <p>Email: ${usuario.email}</p>
        `;

        //Listener para que cuando se haga clic en la tarjeta, se muestren los detalles del usuario
        tarjetaUsuario.addEventListener('click', () => {
            mostrarDetallesUsuario(usuario);
        });

        //Agregar la tarjeta al contenedor
        contenedorUsuarios.appendChild(tarjetaUsuario);
    });
}

/**
 * Mostrar los detalles de un usuario
 * @param {Object} usuario 
 */
function mostrarDetallesUsuario(usuario) {
    
    //Limpiar el contenedor de detalles antes de mostrar nuevos detalles
    contenedorDetalles.innerHTML = '';

    //Crear una tarjeta con los detalles del usuario
    const detallesCard = document.createElement('div');
    detallesCard.classList.add('card-detalles');
    detallesCard.innerHTML = `
        <h2>${usuario.name}</h2>
        <p><strong>Nombre de Usuario:</strong> ${usuario.username}</p>
        <p><strong>Email:</strong> ${usuario.email}</p>
        <p><strong>Teléfono:</strong> ${usuario.phone}</p>
        <p><strong>Compañía:</strong> ${usuario.company.name}</p>
        <p><strong>Sitio Web:</strong> ${usuario.website}</p>
        <button id="cerrar-detalles">Cerrar</button>
    `;
    
    //Listener para el botón de cerrar detalles
    const botonCerrar = detallesCard.querySelector('#cerrar-detalles');
    botonCerrar.addEventListener('click', () => {
        contenedorDetalles.innerHTML = '';
    });

    //Agregar la tarjeta de detalles al contenedor
    contenedorDetalles.appendChild(detallesCard);
}

// Tarea 2 y 3: Obtener y Mostrar los Daros - Busqueda

/**
 * Función asincrónica para obtener los datos de la API y mostrar los usuarios.
 */
async function iniciarApp() {
    try {
        //Obtener los datos de la API
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!respuesta.ok) {
            throw new Error(`¡Error HTTP! Estado: ${respuesta.status}`);
        }
        
        //Convertir la respuesta a JSON
        todosLosUsuarios = await respuesta.json();
        
        //Mostrar todos los usuarios inicialmente
        mostrarUsuarios(todosLosUsuarios);
    } catch (error) {
        //Manejar errores de red o de la API
        console.error('Error al obtener los datos:', error);
        contenedorUsuarios.innerHTML = `<p>Error al cargar los datos.</p>`;
    }
}

//Evento de keyup para el campo de búsqueda
campoBusqueda.addEventListener('keyup', () => {
    
    //Obtener el texto en el campo de búsqueda y convertirlo a minúsculas
    const textoBusqueda = campoBusqueda.value.toLowerCase();

    //Filtrar los usuarios que coincidan con el texto de búsqueda
    const usuariosFiltrados = todosLosUsuarios.filter(usuario =>
        usuario.name.toLowerCase().includes(textoBusqueda)
    );

    //Mostrar los usuarios filtrados
    mostrarUsuarios(usuariosFiltrados);
});

//Iniciar la aplicación
iniciarApp();