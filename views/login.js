// Función para iniciar sesion
export const login = () => {
    const viewLogin = document.createElement('article');
    viewLogin.className = 'article-login';
    viewLogin.innerHTML = `<figure class="figure-login">
                                <img class="img-login" src="./img/newLogo.png" alt="login">
                            </figure>
                            <article class="content">
                                <figure class="figure-title-login">
                                    <img class="img-title" src="./img/warique.png" alt="Warique" />
                                </figure>
                                <form action="#" class="form-login" id="formLogin">
                                    <div class="form-login-inputs">
                                        <input type="email" placeholder="Email" class="login-inputs email-login" id="inputEmail" />
                                        <i class="far fa-check-circle"></i>
                                        <i class="fas fa-exclamation-circle"></i>
                                        <small class="msg-error"></small >
                                        <span id="pEmail" class="span-alerts span-email">* Ingrese su correo</span>
                                    </div>
                                    <div class="form-login-inputs">
                                        <input type="password" placeholder=" Password" class="login-inputs password-login" id="inputPassword" />
                                        <i class="far fa-check-circle"></i>
                                        <i class="fas fa-exclamation-circle"></i>
                                        <small class="msg-error"></small >
                                        <span id="pPassword" class="span-alerts span-password">* Ingrese su contraseña</span>
                                    </div>
                                    <span id="smsEP"></span>
                                    <button class="btn-login" id="btnLogin">Iniciar Sesión</button>
                                </form>
                                <span class="span-loginWith">O bien ingresa con ...</span>
                                <figure class="figure-google">
                                    <img class="img-google" id="imgGoogle" src="./img/google.png" alt="google" />
                                </figure>
                                <div>
                                    <span class="span-account">¿No tienes una cuenta?</span>
                                    <a href="#/signup" class="a-login-signup" id="register">Regístrate</a>
                                </div>
                            <article>`;
    return viewLogin;
};
