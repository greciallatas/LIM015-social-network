import { modalPost } from '../views/modal.js';

// importar de firebase
import {
    createPost,
    getAllPost,
    getPost,
    editDataPost,
    deleteDataPost,
} from '../firebase/fb-firestore.js';
import { currentUser, signOut } from '../firebase/fb-auth.js';
import { uploadFileStorage, getFileStorage } from '../firebase/fb-storage.js';

let editStatus = false;
let id = '';

// Crear post
const addPost = () => {
    const sectionModalPost = document.querySelector('#sectionModalPost');
    const btnPublishPost = document.querySelector('#btnPublishPost');
    btnPublishPost.addEventListener('click', async (e) => {
        e.preventDefault();

        const uid = currentUser().uid;
        const email = currentUser().email;
        const nameUser = currentUser().displayName;
        const photoUser = currentUser().photoURL;

        const contentPost = document.querySelector('#textAreaPost');
        const photoPost = document.querySelector('#photoPost');
        const file = photoPost.files[0];
        const path = 'imagesPost';
            if (editStatus === false) {
                if (contentPost.value.length === 0) {
                    btnPublishPost.disabled = false;
                    if (photoPost.files.length === 1) {
                        btnPublishPost.disabled = true;
                        const namePhoto = file.name;
                        const metadata = { contentType: file.type };

                        uploadFileStorage(path, namePhoto, file, metadata)
                        .then(() => getFileStorage(path, namePhoto))
                        .then((url) => {
                            createPost(uid, email, nameUser, photoUser, contentPost.value, url);
                            sectionModalPost.classList.remove('show-modal');
                        });
                    } else {
                        btnPublishPost.disabled = false;
                    }
                } else if (contentPost.value.length !== 0) {
                    btnPublishPost.disabled = true;
                    if (photoPost.files.length === 1) {
                        const namePhoto = file.name;
                        const metadata = { contentType: file.type };

                        uploadFileStorage(path, namePhoto, file, metadata)
                        .then(() => getFileStorage(path, namePhoto))
                        .then((url) => {
                            createPost(uid, email, nameUser, photoUser, contentPost.value, url);
                            sectionModalPost.classList.remove('show-modal');
                        });
                    } else {
                        createPost(uid, email, nameUser, photoUser, contentPost.value, '');
                        sectionModalPost.classList.remove('show-modal');
                    }
                }
            } else if (editStatus === true) {
                await editDataPost(id, { post: contentPost.value });
                sectionModalPost.classList.remove('show-modal');
            }
    });
};

// Ocultar botones(editar y eliminar), por usuario logeado
const ocultButtons = () => {
    const containerButtons = document.querySelectorAll('.div-buttons');
    containerButtons.forEach((element) => {
        const loggedUser = element.dataset.id;
        if (currentUser().uid !== loggedUser) {
            element.style.display = 'none';
        } else {
            element.style.display = 'flex';
        }
    });
};

const close = () => {
    // Cerrar el modal para post
    const btnClose = document.querySelector('#btnClose');
    btnClose.addEventListener('click', () => {
        const sectionModalPost = document.querySelector('#sectionModalPost');
        sectionModalPost.classList.remove('show-modal');
    });
};

// Editar post
const editPost = () => {
    const btnEdit = document.querySelectorAll('.btn-edit');
    btnEdit.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
            try {
                const doc = await getPost(e.target.dataset.id);

                const sectionModalPost = document.querySelector('#sectionModalPost');
                sectionModalPost.classList.add('show-modal');
                modalPost();

                const btnActualizar = document.querySelector('#btnPublishPost');
                btnActualizar.innerText = 'Editar';

                editStatus = true;

                const contentPost = document.querySelector('#textAreaPost');
                contentPost.value = doc.data().post;
                id = doc.id;

                close();
                addPost();
            } catch (error) {
                console.log(error);
            }
        });
    });
};

// ELiminar post
const deletePost = () => {
    const btnDelete = document.querySelectorAll('.btn-delete');
    btnDelete.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
            try {
                id = e.target.dataset.id;
                swal({
                    title: '¿Estás seguro?',
                    text: 'Una vez eliminado, no podrá recuperar este post.',
                    icon: 'warning',
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        deleteDataPost(id);
                        swal('El post ha sido eliminado.', {
                            icon: 'success',
                        });
                    } else {
                        swal('Tu post está a salvo.');
                    }
                });
            } catch (error) {
                console.log(error);
            }
        });
    });
};

// Like post
const likePost = () => {
    const btnLike = document.querySelectorAll('.btn-like');
    const heart = document.querySelector('.fa-heart');
    btnLike.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            getPost(e.target.dataset.id)
            .then((response) => {
                id = response.id;
                const arrayLikes = response.data().likes;
                if (arrayLikes.includes(currentUser().uid) === false) {
                    arrayLikes.push(currentUser().uid);
                    editDataPost(id, { likes: arrayLikes });
                    heart.classList.remove('far');
                    heart.classList.add('fas');
                    // console.log('like');
                } else {
                    const dontLike = arrayLikes.filter((currentValue) => {
                        currentValue !== currentUser().uid;
                    });
                    editDataPost(id, { likes: dontLike });
                    heart.classList.add('far');
                    heart.classList.remove('fas');
                    // console.log('Dislike');
                }
            })
            .catch((error) => console.log(error));
        });
    });
};

// Cerrar sesión
const signOutUser = () => {
    const btnSignOut = document.querySelector('#btnSignOut');
    btnSignOut.addEventListener('click', (e) => {
        e.preventDefault();
        signOut();
    });
};

// Mostrar todos los post
const showAllPost = () => {
    getAllPost().onSnapshot((querySnapshot) => {
        const articlePost = document.querySelector('#articlePost');
        articlePost.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const infoPost = doc.data();
            infoPost.id = doc.id;
            articlePost.innerHTML += `<section id="section-${doc.id}" class="section-content">
                                        <div class="name-photo">
                                            <figure>
                                                <img src="${infoPost.photoUser}" class='photoUser'/>
                                            </figure>
                                            <div class="div-date">
                                                <h4> ${infoPost.name} </h4>
                                                <h6> ${infoPost.datePost} <h6>
                                            </div>
                                        </div>
                                        <div class="div-content-post">
                                            <p> ${infoPost.post} </p>
                                        </div>
                                        <figure class="div-photo-post" id="contentPhoto-${doc.id}">
                                            <img src="${infoPost.photoPost}" class="img-photo-post" id="imgPhotoPost-${doc.id}" />
                                        </figure>
                                        <div class="content-btn-like">
                                            <button class="btn-like"><i class="far fa-heart" id="btnLike-${doc.id}" data-id="${doc.id}"></i></button>
                                            <span id="nameUserlike-${doc.id}" class="name-user-like">${(infoPost.likes.length) ? infoPost.likes.length : ''}</span>
                                        </div>
                                        <div class="div-buttons" data-id="${infoPost.uid}">
                                            <button class="btn-edit" data-id="${doc.id}"><i class="fas fa-edit"></i>Edit</button>
                                            <button class="btn-delete" data-id="${doc.id}"><i class="fas fa-trash-alt"></i>Delete</button>
                                        </div>
                                    </section>`;

            ocultButtons();
            editPost();
            deletePost();
            likePost();
        });
        return articlePost;
    });
};

// Mostrar post en home
export const post = () => {
    const sectionModalPost = document.querySelector('#sectionModalPost');

    // Abrir modal para crear post
    const btnCreatePost = document.querySelector('#btnCreatePost');
    btnCreatePost.addEventListener('click', (e) => {
        e.preventDefault();
        sectionModalPost.classList.add('show-modal');
        modalPost();
        addPost();
        close();
    });
    signOutUser();
    showAllPost();
};
