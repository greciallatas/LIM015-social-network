// Función para registrar un usuario
export const signup = () => {
    const viewSignup = document.createElement('article');
    viewSignup.className = 'article-signup';
    viewSignup.innerHTML = `<figure class="figure-signup">
                                <img class="img-signup" src="./img/newLogo.png" alt="signup" />
                            </figure>
                            <article class="content">
                                <figure class="figure-title-signup">
                                    <img class="img-title" src="./img/warique.png" alt="Warique" />
                                </figure>
                                <span class="span-signup">&boxh;&boxh;&boxh;&boxh; Regístrate &boxh;&boxh;&boxh;&boxh;</span>
                                <form action="#" class="form-signup" id="formSignup">
                                    <div class="form-signup-inputs">
                                        <input type="text" class="signup-inputs" id="nameSignup" placeholder="Name" />
                                        <span class="msg-error"></span >
                                    </div>
                                    <div class="form-signup-inputs">
                                        <input type="email" class="signup-inputs" id="emailSignup" placeholder="Email" />
                                        <span class="msg-error"></span >
                                    </div>
                                    <div class="form-signup-inputs">
                                        <input type="password" class="signup-inputs" id="passwordSignup" placeholder="Password" />
                                        <span class="msg-error"></span >
                                    </div>
                                    <div class="form-signup-inputs">
                                        <input type="password" class="signup-inputs" id="confirmSignup" placeholder="Confirm Password" />
                                        <span class="msg-error"></span >
                                    </div>
                                    <span id="smsEP" class="msg-EP"><i class="fas fa-exclamation-triangle"></i></span>
                                    <button type="submit" class="btn-signup" id="btnSignup">Registrarse</button>
                                </form>
                                <span class="span-loginWith">O ingresa con ...</span>
                                <figure class="figure-google">
                                    <img class="img-google" id="imgGoogle" src="./img/google.png" alt="google" />
                                </figure>
                                <div>
                                    <span class="span-account">¿Ya tienes cuenta?</span>
                                    <a href="#/" class="a-login-signup" id="aLogin">Iniciar sesión</a>
                                </div>
                            </article>`;
    return viewSignup;
};
