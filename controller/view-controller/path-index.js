// importar firebase
import { auth } from '../../firebase/config-firebase.js';

// importar vistas
import { components } from '../../views/index.js';

import { loginDB } from '../login.js';
import { signupDB } from '../signup.js';
import { post } from '../post.js';

export const changeView = (route) => {
    const container = document.getElementById('container');
    container.innerHTML = ''; // Limpia en contenedor de las vistas

    switch (route) {
        case '':
        case '#':
        case '#/':
            {
                const login = container.appendChild(components.login()); // Diseño Vista Login
                loginDB(); // Eventos Vista Login
                return login;
            }
        case '#/signup':
            {
                // Diseño Vista Registrarse
                const signup = container.appendChild(components.signup());
                signupDB(); // Eventos Vista Registrarse
                return signup;
            }
        case '#/home':
            {
                auth.onAuthStateChanged((user) => {
                    if (user) {
                        container.appendChild(components.home());
                        post();
                    } else {
                        window.location.hash = '#/';
                    }
                });
                break;
            }
        default:
            { return container.appendChild(components.error()); }
    }
};
