// Crear un usuario
export const createUserBD = (email, password) =>
    firebase.auth().createUserWithEmailAndPassword(email, password);

// Obtener datos del usuario
export const currentUser = () => firebase.auth().currentUser;

// Login con correo
export const logInEmail = (email, password) =>
    firebase.auth().signInWithEmailAndPassword(email, password);

// Login con google
export const logInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
};

// Cerrar Sesion
export const signOut = () => firebase.auth().signOut();
