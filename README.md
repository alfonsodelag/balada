# Proyecto Balada

## Tabla de contenido
- [Info básica](#info-básica)
- [Requisitos](#requisitos)
- [Setup](#setup)
- [Especificación](#especificación)
  - [1 - Login](#1---login)
  - [2 - Navegación](#2---navegación)
  - [3 - Lista de artistas](#3---lista-de-artistas)
  - [4 - Lista de canciones](#4---lista-de-canciones)
  - [5 - Reproductor de música](#5---reproductor-de-música)
- [Especificación técnica](#especificación-técnica)
- [Entrega](#entrega)

## Info básica
Este ejercicio está pensado para cumplir una serie de objetivos mínimos, no es obligatorio hacer el 100%, no se penalizará si alguno de los requisitos no es implementado.
El objetivo de este ejercicio es valorar las capacidades del desarrollador y el conocimiento de las API de React JS.

Para poder proseguir con el ejercicio hay que cumplir los siguientes requisitos y hacer el [setup](#setup) del proyecto.

## Requisitos
- NodeJS `v14.15.2` (o superior) [(url)](https://nodejs.dev/)
- npm `v6.14.9` (o superior)
- Visual Studio Code [(url)](https://code.visualstudio.com/)
- Estándar de JS: ES6

## Setup
Instalar dependencias
```
npm install
```

Iniciar dev server
```
npm run start
```

Iniciar tests unitarios
```
npm run test
```

## Especificación
Se pide la creación de un reproductor de música web simplificado parecido a los servicios de música en streaming: Youtube Music, Spotify, Tidal, Deezer, Amazon music, etc...

Se permite libertad en el diseño del layout y estilos de la aplicación mientras este cumpla con los requisitos técnicos.

La aplicación constará de los siguientes apartados:
- 1 - Login
- 2 - Navegación
- 3 - Lista de artistas
- 4 - Lista de canciones
- 5 - Reproductor de música

### 1 - Login
Al usuario se le presentará un formulario múltiple en un modal.
En el modal Se han de presentar 2 opciones de formulario
> 1 Usuario registrado
> 2 Usuario invitado

El usuario registrado ha de hacer login con usuario y contraseña ([ver especificación técnica](#especificación---login)).
El usuario invitado tendrá que hacer login con un token de invitado ([ver especificación técnica](#especificación---login)).

Ambos formularios han de presentar la opción para que se mantenga la sesión del usuario activa aún si refresca la página (F5).

[Ver más detalles en la especificación técnica...](#especificación---login)

### 2 - Navegación
Una vez logueado el usuario será presentado con opciones de navegación que deben estar visibles/disponibles en todo momento.
Al hacer clic en una de las opciones se deberá navegar a la pantalla esperada.

### 3 - Lista de artistas
Una vez logueado el usuario será presentado con esta pantalla por defecto.
La pantalla debe contener información sin necesidad de interacción del usuario en el primer aceso.

En la pantalla deberán mostrarse los siguientes elementos:
- Un filtro de búsqueda por nombre
- Una lista paginada

#### 3 - Lista de artistas - Extra
- Selector con el nº de elementos a mostrar por pagina
- La lista de artistas ha de estar ordenada alfabéticamente [A -> Z].
- Al hacer clic en una fila de la lista paginada se redirigirá a la [lista de canciones](#4---lista-de-canciones), filtrando las canciones de forma automática y mostrando únicamente las del artista seleccionado.

[Ver más detalles en la especificación técnica...](#especificación---lista-de-artistas)

### 4 - Lista de canciones
Al acceder a esta pantalla se presentará una lista paginada de canciones.

En la pantalla deberán mostrarse los siguientes elementos:
- Un filtro de búsqueda por nombre y por artista
- Una lista paginada

#### 4 - Lista de canciones - EXTRA
- Selector con el nº de elementos a mostrar por pagina
- Pre cargar datos en el filtro de búsqueda a través de parámetros GET en la URL y hacer una búsqueda de canciones según esos parámetros.
- Al hacer clic en una fila se debería de empezar a reproducir

[Ver más detalles en la especificación técnica...](#especificación---lista-de-canciones)

### 5 - Reproductor de música
Se requiere diseñar un reproductor con los controles básicos:
- Reproduce/Pausa
- Parar
- Barra de búsqueda/progreso de la canción
- Información de la pista

#### 5 - Reproductor de música - EXTRA
- Implementar un reproductor de música funcional

[Ver más detalles en la especificación técnica...](#especificación---reproductor-de-música)

## Especificación técnica
### Especificación - Login
La autenticación del usuario se hará contra la API del servicio `AuthService`, este servicio ya se encuentra implementado y **no está permitido modificarlo**.

El servicio nos puede devolver 2 resultados a través de una `Promise`.

**OK 200**
> { status: 200, message: 'Login OK!', data: { user: 'invitado@test.com', name: 'Invitado' } }

**KO 401 (*Login invalido*)**
> { status: 401, message: 'Login KO!', data: undefinied }

Se debe de implementar un sistema el cual pueda mantener la sesión del cliente activa solamente si marca la opción en el formulario de login.

#### Datos de Login de prueba
Usuario y contraseña
```
user: test01@test.com
pass: 123456789
--------------------
user: test02@test.com
pass: 987654321
```

Tokens de invitado
```
ee8d8f32-0199-4ea8-b6e6-16a28688c740
--------------------
07b65fc9-3f33-4fe6-839c-12d2cd91fba5
```

### Especificación - Lista de artistas
Los datos de los artistas se recuperarán a través de la API del servicio `SongService`, este servicio ya se encuentra implementado y **no está permitido modificarlo**.

El servicio nos puede devolver 2 resultados a través de una `Promise`.

**OK 200**
> { status: 200, message: 'OK!', artistas: <resultat[]>, nPages: 10 }
> <resultat> -> { name: 'Destripando la Historia', n_songs: 3 }

**OK 204 (*No content*)**
> { status: 204, message: 'No content', artistas: [], nPages: 0 }

Al cargar la página hay que presentar la lista con **10 registros**.
La lista debe ser paginada en caso de que se dispongan de más de 1 página para los resultados filtrados y presentar los siguientes campos:
- Nº de índice (teniendo en cuenta la paginación)
- Nombre Artista
- Número de canciones

El filtro de búsqueda se contempla como *case sensitive* y solo filtraremos los datos cuando el usuario haga click en el botón buscar.

#### Extra

Se ha de implementar un selector desplegable que permita escoger el tamaño mínimo de elementos a mostrar por cada página de la lista.
Se ha de implementar un algoritmo de ordenación para que los resultados de la Lista estén ordenados alfabéticamente de [A -> Z].
Se ha de implementar un evento ***Click*** en cada fila de la lista para navegar hacia la **Lista de canciones** del artista filtrando por el ***nombre*** del artista. El cómo se haga la comunicación entre pantallas se deja a decisión del programador.

### Especificación - Lista de canciones

Los datos de las canciones se recuperarán a través de la API del servicio `SongService`, este servicio ya se encuentra implementado y **no está permitido modificarlo**.

El servicio nos puede devolver 2 resultados a través de una `Promise`.

**OK 200**
> { status: 200, message: 'OK!', canciones: <resultat[]>, nPages: 10 }

resultat[0]:
```json
{
  "title": "Hermes",
  "album": "Hermes",
  "group": "Destripando la Historia",
  "rating": 5,
  "song_number": 1,
  "duration": 200,
  "src": "/assets/audio/test1.mp3"
}
```

**OK 400 (*Bad request*)**
> { status: 400, message: 'Bad request', canciones: undefined, nPages: 0 }

Al cargar la página hay que presentar la lista con **10 registros**.
La lista debe ser paginada en caso de que se dispongan de más de 1 página para los resultados filtrados y presentar los siguientes campos:
- Nº de índice (teniendo en cuenta la paginación)
- Nombre de la canción
- Nombre del álbum
- Nombre Artista
- Puntuación de la canción con "⭐" dependiendo de la puntuación
- La duración de la canción en minutos (formato: mm:ss)

El filtro de búsqueda se contempla como *case sensitive* y solo filtraremos los datos cuando el usuario haga clic en el botón buscar.

#### Extra

Se ha de implementar un selector desplegable que permita escoger el tamaño mínimo de elementos a mostrar por cada página de la lista.
Se quiere implementar la función de *deeplink* en la que podrán acceder directamente a esta página con parámetros en la URL.
Si existen parámetros en la URL hay que pre-informar el filtro y hacer una búsqueda de canciones con los datos informados.
Se ha de implementar un evento ***Click*** en cada fila de la lista. En caso de que el usuario haga clic en una fila, se deberá de empezar a reproducir la canción.

### Especificación - Reproductor de música

Se pide que se diseñe una maqueta en la que deben estar presentes los siguientes elementos:
- Reproduce/Pausa
- Parar
- Barra de búsqueda/progreso de la canción
- Información de la pista
  - Nombre
  - Álbum
  - Artista
  - Duración
- Puntuación
- Volumen

No es necesario que sea responsive, pero se pide que el diseño y la disposición de los controles tenga una cierta coherencia y estilo.

#### Extra

Se pide que mediante la API de [`Audio` de HTML5](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement) se pueda reproducir una canción, así como controlarla a través de los controles implementados en el punto anterior.
En caso de que se haya implementado la parte extra de la lista de canciones se deberá unificar con este punto.

------

### Entrega

Se dispone de 2 días para realizar este ejercicio.
Como se ha mentado anteriormente, no es necesario hacer el 100% de cada apartado.

El ejercicio será enviado por mail para su revisión comprimido en zip.

Se pide que no se incluyan las carpetas `.vscode`, `.git`, `node_modules`, `dist`, en la solución entregada.

# balada
