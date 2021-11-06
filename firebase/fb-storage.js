import { storage } from './config-firebase.js';

// Agregar una archivo(foto) en el storage
export const uploadFileStorage = (path, name, file, metadata) => storage.ref().child(`${path}/${name}`).put(file, metadata);

// Obtener un archivo(foto) del storage
export const getFileStorage = (path, name) => storage.refFromURL(`gs://socialnetwork-warique.appspot.com/${path}/${name}`).getDownloadURL();
