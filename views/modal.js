export const modalPost = () => {
    const viewModalPost = document.querySelector('#sectionModalPost');
    viewModalPost.innerHTML = `<section id="modalPost" class="modal-post">
                                    <button id="btnClose" class="btn-close"> X </button>
                                    <h2>Crear Publicación</h2>
                                    <textarea id="textAreaPost" class="input-post" type="text" placeholder="¿Cuéntanos donde fuiste a comer?"></textarea>
                                    <label class="btn-photo-modal">
                                        <i class="far fa-images"></i> Agregar foto
                                        <input type="file" name="photoPost" value="" id="photoPost" accept=".jpg, .jpeg, .png">
                                    </label>
                                    <button id="btnPublishPost" class="btn-publish-post"> Publicar </button>
                                </section>`;
    return viewModalPost;
};
