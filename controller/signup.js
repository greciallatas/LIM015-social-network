import { createUserBD, currentUser } from '../firebase/fb-auth.js';
import { addUsers } from '../firebase/fb-firestore.js';
import { googleSignUp } from './google-signup.js';

// Registar una cuenta y guardarlo en la db
export const signupDB = () => {
    const formSignup = document.querySelector('#formSignup');

    formSignup.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.querySelector('#nameSignup').value;
        const email = document.querySelector('#emailSignup').value;
        const password = document.querySelector('#passwordSignup').value;
        const password2 = document.querySelector('#confirmSignup').value;

        const msgAuth = document.querySelector('#smsEP');
        msgAuth.classList.add('sms-ep');

        if (name === '' || email === '' || password === '' || password2 === '') {
            msgAuth.style.display = 'block';
            msgAuth.innerText = 'Completar todos los campos';
        } else if (password !== password2) {
            msgAuth.style.display = 'block';
            msgAuth.innerText = 'Las contraseñas no coinciden.';
        }

        // Create user
        createUserBD(email, password)
            .then((response) => {
                const photoURLDefault = 'https://firebasestorage.googleapis.com/v0/b/socialnetwork-warique.appspot.com/o/avatar.png?alt=media&token=efb8edcd-91b3-4044-a846-d2b408fc934b';

                // Signed in
                currentUser().updateProfile({
                    displayName: name,
                    photoURL: photoURLDefault,
                }).then(() => {
                    // console.log(currentUser().photoURL);
                }).catch((error) => {
                    console.log(error);
                });
                addUsers(response.user.uid, name, photoURLDefault);
                // console.log('https://firebasestorage.googleapis.com/v0/b/socialnetwork-warique.appspot.com/o/avatar.png?alt=media&token=efb8edcd-91b3-4044-a846-d2b408fc934b');
            })
            .then(() => {
                swal('Registro exitoso!', 'Verificar cuenta para iniciar sesión', 'success');
                formSignup.reset();
                currentUser().sendEmailVerification();
            })
            .catch((error) => {
                msgAuth.style.display = 'block';

                switch (error.code) {
                    case 'auth/email-already-in-use':
                        msgAuth.innerText = 'El email ya está registrado.';
                        break;
                    default:
                        msgAuth.innerText = 'Ingresar una contraseña mayor a 6 dígitos';
                        break;
                }
            });
    });
    googleSignUp();
};
