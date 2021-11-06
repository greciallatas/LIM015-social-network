// Este es el punto de entrada a tu aplicacion
import { changeView } from './controller/view-controller/path-index.js';

// myFunction();
const init = () => {
    changeView(window.location.hash);
    window.addEventListener('hashchange', () => changeView(window.location.hash)); // detectar cambios de la URL
};

window.addEventListener('load', init);
