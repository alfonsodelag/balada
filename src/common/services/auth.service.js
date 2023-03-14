// eslint-disable-next-line no-undef
const db = require('./user.db.json');
const { usersList, tokens } = db;
const users = usersList.reduce((prev, act) => {
  prev[act.user] = act;
  return prev;
}, {});
const usersIdx = Object.keys(users);

const AuthServicePriv = {
  /**
   * Pseudobackend que valida los datos enviados por el cliente
   * @typedef {'token'|'user'} LoginType
   * @typedef {{ user: string, name: string }} UserLogged
   * @param {LoginType} type
   * @param {{ user: string, pass: string }} userData
   */
  autentica: (type, userData) => {
    const { user: username, pass } = userData;
    let autenticat;
    // Validamos el tipo de login
    if (type === 'token') {
      // Validamos si el token existe
      if (tokens.includes(pass))
        autenticat = { user: 'invitado@test.com', name: 'Invitado' };
    } else {
      // Validamos credenciales contra la "DB"
      if (
        usersIdx.includes(username) &&
        users[username].passwd === userData.pass
      ) {
        const { user, name } = users[username];
        autenticat = { user, name };
      }
    }

    return autenticat;
  },
};

/**
 * Clase que permite la autenticación de un usuario en la aplicación
 * @memberof Auth
 * @class
 */
const AuthService = {
  /**
   * Metodo que loguea el cliente a través de usuario y contraseña
   * @method
   * @param {string} username
   * @param {string} password
   * @returns {Promise<{ status: number, message: string, data: UserLogged|undefined }>}
   */
  loginUser: (username, password) => {
    return new Promise((resolve, reject) => {
      const time = Math.random() * 1000 + 1000;
      const user = AuthServicePriv.autentica('user', {
        user: username,
        pass: password,
      });

      setTimeout(() => {
        if (user) resolve({ status: 200, message: 'Login OK!', data: user });
        else reject({ status: 401, message: 'Login KO!', data: undefined });
      }, time);
    });
  },

  /**
   * Metodo que loguea el cliente a través de token
   * @method
   * @param {string} token
   * @returns {Promise<{ status: number, message: string, data: UserLogged|undefined }>}
   */
  loginToken: (token) => {
    return new Promise((resolve, reject) => {
      const time = Math.random() * 1000 + 1000;
      const user = AuthServicePriv.autentica('token', {
        user: undefined,
        pass: token,
      });

      setTimeout(() => {
        if (user) resolve({ status: 200, message: 'Login OK!', data: user });
        else reject({ status: 401, message: 'Login KO!', data: undefined });
      }, time);
    });
  },
};

export default AuthService;
