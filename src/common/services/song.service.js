// eslint-disable-next-line no-undef
const songs = require('./songs.db.json');
const groups = songs.reduce((prev, actu) => {
  if (prev[actu.group]) prev[actu.group]++;
  else prev[actu.group] = 1;

  return prev;
}, {});
const uniqeGroups = Object.keys(groups);

/**
 * @typedef {Object} Cancion
 * @property {string} title 
 * @property {string} album 
 * @property {string} group 
 * @property {number} rating 
 * @property {number} song_number 
 * @property {number} duration 
 * @property {string} src 
 */

/**
 * @typedef {Object} Artistas
 * @property {string} name 
 * @property {number} n_songs 
 */

/**
 * Servicio para recuperar datos de las canciones
 * @memberof Song
 * @class
 */
const SongService = {

  /**
   * Función que recupera y filtra las canciones disponibles
   * @method
   * @param {number} nPage
   * @param {number} itemsPerPage
   * @param {(c: Cancion) => boolean} [filter]
   * @returns {Promise<{ status: number, message: string, canciones: Cancion[]|undefined, nPages: number }>}
   */
  listaCanciones: (nPage, itemsPerPage, filter) => {
    return new Promise((resolve, reject) => {
      let llista;
      let res;
      const time = (Math.random() * 1000) + 1000;
      const start = nPage * itemsPerPage;
      const end = start + itemsPerPage;

      if (start < songs.length) {
        if (filter)
          llista = songs.filter(filter);
        else
          llista = songs;

        res = { status: 200, message: 'OK!', canciones: llista.slice(start, end), nPages: Math.ceil(llista.length / itemsPerPage) };
      }
  
      setTimeout(() => {
        if (res) resolve(res);
        else reject({ status: 400, message: 'Bad request', canciones: undefined, nPages: 0 });
      }, time);
    });

  },

  /**
   * Función que recupera, filtra y ordena los artistas
   * @method
   * @param {number} nPage
   * @param {number} itemsPerPage
   * @param {(a: string) => boolean} [filter]
   * @param {(a: string, b: string) => number} [order]
   * @returns {Promise<{ status: number, message: string, artistas: Artistas[], nPages: number }>}
   */
  listaArtistas: (nPage, itemsPerPage, filter, order) => {
    return new Promise(resolve => {
      let llista;
      let res;
      const time = (Math.random() * 1000) + 1000;
      let start = nPage * itemsPerPage;
      const end = start + itemsPerPage;

      if (filter)
        llista = uniqeGroups.filter(filter);
      else
        llista = uniqeGroups;

      if (order)
        llista = llista.sort(order);
      
      const llistaResultat = [];
      if (llista.length > 0) {
        while (start < llista.length && start < end) {
          const grup = llista[start];
          llistaResultat.push({ name: grup, n_songs: groups[grup] });
          start++;
        }

        res = { status: 200, message: 'OK!', artistas: llistaResultat, nPages: Math.ceil(llista.length / itemsPerPage) };
      } else {
        res = { status: 204, message: 'No content', artistas: [], nPages: 0 };
      }

      setTimeout(() => resolve(res), time);
    });
  },
};

export default SongService;
