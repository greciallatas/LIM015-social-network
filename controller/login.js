import { logInEmail, currentUser } from '../firebase/fb-auth.js';
import { googleSignUp } from './google-signup.js';

// Funcion para login
export const loginDB = () => {
    const formLogin = document.querySelector('#formLogin');

    const msg = document.querySelector('#smsEP');

    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.querySelector('#inputEmail').value;
        const password = document.querySelector('#inputPassword').value;

        logInEmail(email, password)
            .then(() => {
                // console.log(response);
                if (currentUser().emailVerified === true) {
                    window.location.href = '#/home';
                } else {
                    msg.style.display = 'block';
                    msg.classList.add('sms-ep');
                    msg.innerText = 'Cuenta no verificada, por favor revise su email';
                }
            }).catch((err) => {
                const errCode = err.code;
                // const errMessage = err.message;

                msg.style.display = 'block';
                msg.classList.add('sms-ep');

                // Verificando el Codigo de Error
                switch (errCode) {
                    case ('auth/invalid-email'):
                        msg.innerText = 'Ingrese correo electronico';
                        break;
                    case ('auth/internal-error'):
                        msg.innerText = 'Ingrese su contraseña';
                        break;
                    case 'auth/wrong-password':
                        msg.innerText = 'La contraseña no es correcta. Compruébala.';
                        break;
                    case 'auth/user-not-found':
                        msg.innerText = 'El correo no se encuentra registrado';
                        break;
                    default:
                        msg.innerText = 'Los datos ingresados son incorrectos, vuelve a ingresarlos';
                        break;
                }
            });
    });
    googleSignUp();
};
