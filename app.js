let todosLosUsuarios = [];

const campoBusqueda = document.getElementById('buscar-usuario');
const contenedorUsuarios = document.getElementById('lista-usuarios');
const contenedorDetalles = document.getElementById('detalles-usuario');

// Tarea 2 y 4: Obtener y Mostrar los Datos - Mostrar los Destalles.

/**
 * @param {Array<Object>} usuarios 
 */
function mostrarUsuarios(usuarios) {
  
    contenedorUsuarios.innerHTML = '';
    
    contenedorDetalles.innerHTML = '';

    if (usuarios.length === 0) {
        contenedorUsuarios.innerHTML = '<p>No se encontraron usuarios que coincidan con la búsqueda.</p>';
        return;
    }

    usuarios.forEach(usuario => {
        const tarjetaUsuario = document.createElement('div');
        tarjetaUsuario.classList.add('card-usuario');
        tarjetaUsuario.innerHTML = `
            <h3>${usuario.name}</h3>
            <p>Email: ${usuario.email}</p>
        `;

        
        tarjetaUsuario.addEventListener('click', () => {
            mostrarDetallesUsuario(usuario);
        });

        contenedorUsuarios.appendChild(tarjetaUsuario);
    });
}

/**
 * @param {Object} usuario 
 */
function mostrarDetallesUsuario(usuario) {
    
    contenedorDetalles.innerHTML = '';

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
    
    
    const botonCerrar = detallesCard.querySelector('#cerrar-detalles');
    botonCerrar.addEventListener('click', () => {
        contenedorDetalles.innerHTML = '';
    });

    contenedorDetalles.appendChild(detallesCard);
}

// Tarea 2 y 3: Obtener y Mostrar los Daros - Busqueda

async function iniciarApp() {
    try {
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!respuesta.ok) {
            throw new Error(`¡Error HTTP! Estado: ${respuesta.status}`);
        }
        
        
        todosLosUsuarios = await respuesta.json();
        
        
        mostrarUsuarios(todosLosUsuarios);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        contenedorUsuarios.innerHTML = `<p>Error al cargar los datos.</p>`;
    }
}


campoBusqueda.addEventListener('keyup', () => {
    
    const textoBusqueda = campoBusqueda.value.toLowerCase();

    
    const usuariosFiltrados = todosLosUsuarios.filter(usuario =>
        usuario.name.toLowerCase().includes(textoBusqueda)
    );

    
    mostrarUsuarios(usuariosFiltrados);
});


iniciarApp();