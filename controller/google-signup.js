import { logInWithGoogle } from '../firebase/fb-auth.js';

export const googleSignUp = () => {
    const imgGoogle = document.querySelector('#imgGoogle');

    imgGoogle.addEventListener('click', (e) => {
        e.preventDefault();
        logInWithGoogle()
            .then((result) => {
                window.location.href = '#/home';
                localStorage.setItem('user', result.user.displayName);
                localStorage.setItem('photo', result.user.photoURL);
            }).catch((error) => console.log(error, 'no es correcto'));
    });
};
