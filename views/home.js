import { currentUser } from '../firebase/fb-auth.js';

// funcion para mostrar el home
export const home = () => {
    const nameUser = currentUser().displayName;
    const photoUser = currentUser().photoURL;

    const viewHome = document.createElement('section');
    viewHome.innerHTML = `<header class="header-home" id="headerHome">
                                <nav class="nav" id="nav">
                                    <a href="#/home" >
                                        <figure class="figure-title">
                                            <img class="title" src="./img/warique.png" alt="Warique" />
                                        </figure>
                                    </a>
                                    <button class="nav-toggle" id="navToggle">
                                        <i class="fas fa-bars"></i>
                                    </button>
                                    <ul class="nav-menu" id="navMenu">
                                        <li class="nav-menu-item">
                                            <a href="#/home" class="nav-menu-link">Inicio</a>
                                        </li>
                                        <li class="nav-menu-item">
                                            <a href="#/profile" class="nav-menu-link">Perfil</a>
                                        </li>
                                        <li class="nav-menu-item">
                                            <a href="#/" id="btnSignOut" class="nav-menu-link">Cerrar sesión</a>
                                        </li>
                                    </ul>
                                </nav>
                            </header>
                            <section id="sectionModalPost" class="section-modal-post"></section>
                            <section id="sectionProfile" class="section-profile">
                                <figure>
                                    <img src="${photoUser}" id='photoProfile' class='photo-profile'/>
                                </figure>
                                <div id='divName' class='div-name'>
                                    <h2 id="nameProfile"> ${nameUser} </h2>
                                </div>
                                <div class="div-show-profile">
                                    <button id="btnShowProfile" class="btn-show-profile">Ver Perfil</button>
                                </div>
                            </section>
                            <section id="sectionPost" class="section-post">
                                <div id="sectionBTNPost" class="section-btn-post">
                                    <button class="btn-create-post" id="btnCreatePost">¿Dónde fuiste a comer?</button>
                                    <span><i class="far fa-images"></i> Foto </span>
                                </div>
                                <article id="articlePost" class="article-post">
                                </article>
                            </section>
                            <footer>
                                <p>&copy; 2021 - Developed by Grecia &amp; Yandali</p>
                            </footer>`;

    const navToggle = viewHome.querySelector('#navToggle');
    const navMenu = viewHome.querySelector('#navMenu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('nav-menu_visibily');
    });
    return viewHome;
};
