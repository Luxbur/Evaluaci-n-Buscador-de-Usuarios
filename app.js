// Tarea 2: Obtener y Mostrar Datos
async function obtenerYMostrarUsuarios() {
  const contenedor = document.getElementById('lista-usuarios');

  try {
    const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!respuesta.ok) {
      throw new Error(`¡Error HTTP! Estado: ${respuesta.status}`);
    }

    const usuarios = await respuesta.json();

    usuarios.forEach(usuario => {
      
      const tarjetaUsuario = document.createElement('div');
      tarjetaUsuario.classList.add('card-usuario'); 


      tarjetaUsuario.innerHTML = `
        <h3>${usuario.name}</h3>
        <p>Email: ${usuario.email}</p>
      `;

      contenedor.appendChild(tarjetaUsuario);
    });

  } catch (error) {
   
    console.error('Error al obtener los datos:', error);
    contenedor.innerHTML = `<p>Error al cargar los datos.</p>`;
  }

  

}

obtenerYMostrarUsuarios();