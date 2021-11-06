// Agregar un usuario a la coleccion USERS
export const addUsers = (uid, name, photo) => {
    return firebase.firestore().collection('users').doc(uid).set(
        {
            uid,
            name,
            photo,
        },
    );
};

// Funcion para fecha actual
export const datePost = () => {
    const date = new Date().toLocaleDateString('es-ES');
    return date;
};

// Agregar informacion de un post a la coleccion POST
export const createPost = (uid, email, name, photoUser, post, photoPost) => {
    return firebase.firestore().collection('post').add(
        {
            uid,
            email,
            name,
            photoUser,
            post,
            photoPost,
            datePost: datePost(),
            likes: [],
            timePost: firebase.firestore.FieldValue.serverTimestamp(),
        },
    );
};

// Obtener información de todos los post
export const getAllPost = () => firebase.firestore().collection('post').orderBy('timePost', 'desc');

// Obtener información de un post de la colleción POST
export const getPost = (id) => firebase.firestore().collection('post').doc(id).get();

// Editar un post de la colleción POST
export const editDataPost = (id, updatePost) => firebase.firestore().collection('post').doc(id).update(updatePost);

// Eliminar un post de la colleción POST
export const deleteDataPost = (id) => firebase.firestore().collection('post').doc(id).delete();
