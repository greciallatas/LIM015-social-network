// Función para ruta no encontrada (error 404)
export const error = () => {
    const viewError = document.createElement('div');
    viewError.innerHTML = `<figure>
                                <img class="img-404" src="./img/404.png">
                            </figure>`;
    return viewError;
};
