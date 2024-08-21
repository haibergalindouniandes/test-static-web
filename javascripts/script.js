// Definición de constantees

const textoEntrada = document.getElementById('texto-entrada');
const textoVisibleH2 = document.getElementById('texto-visible-h2');
const textoVisibleP = document.getElementById('texto-visible-p');
const muneco = document.getElementById('muneco');
const botonCopiar = document.getElementById('boton-copiar');
const textoVisible = document.querySelector('.texto-visible');

// Diccionario de codificación para encriptar y desencriptar texto
const diccionarioCodificacion = { e: 'enter', i: 'imes', a: 'ai', o: 'ober', u: 'ufat' };

/**
 * Función que permita validar el texto ingresado.
 * Solo se permite letras minúsculas, números, espacios y guiones bajos.
 * @returns {boolean} - Retorna true si el texto es válido, de lo contrario false.
 */
function validarTexto(text) {
    // Expresión regular y validación del texto ingresado
    let regex = /^[a-z0-9\s_]+$/;
    if (!regex.test(text)) {
        alert('¡¡¡El texto ingresado no es válido. Recuerde que no debe tener letras en mayúsculas, acentos o caracteres especiales!!!');
        return false;
    }
    return true;
}

/**
 * Función que permite encriptar el texto ingresado, siempre y cuando sea válido.
 */
function botonEncriptar() {
    // Validación del texto ingresado
    if (textoEntrada.value === '') {
        valoresPorDefecto();
    } else {
        if (validarTexto(textoEntrada.value)) {                      
            // Modificar estilos
            textoVisible.style.justifyContent = 'space-between';
            muneco.classList.remove('visible');
            muneco.classList.add('oculto');
            botonCopiar.classList.remove('oculto');
            botonCopiar.classList.add('visible');
            textoVisibleH2.classList.add('oculto');
            textoVisibleP.classList.remove('texto-med');
            textoVisibleP.classList.add('texto-gra', 'texto-ali-izq');
            // Se muestra el texto cifrado
            textoVisibleP.innerHTML = encriptar(textoEntrada.value);
        }
    }
}

/**
 * Función que permite desencriptar el texto ingresado, siempre y cuando sea válido.
 */
function botonDesencriptar() {
    // Validación del texto ingresado
    if (textoEntrada.value === '') {
        valoresPorDefecto();
    } else {
        if (validarTexto(textoEntrada.value)) {
            // Modificar estilos
            muneco.classList.remove('visible');
            muneco.classList.add('oculto');
            botonCopiar.classList.remove('oculto');
            botonCopiar.classList.add('visible');
            textoVisibleH2.classList.add('oculto');
            textoVisibleP.classList.remove('texto-med');
            textoVisibleP.classList.add('texto-gra', 'texto-ali-izq');

            // Se muestra el texto cifrado
            textoVisibleP.innerHTML = ''
            textoVisibleP.innerHTML = desencriptar(textoEntrada.value);
        }
    }
}

/**
 * Función que permite copiar el texto del área de mensaje al portapapeles.
 */
// async function botonCopiarTexto() {
function botonCopiarTexto() {    
    try {
        navigator.clipboard.writeText(textoVisibleP.innerHTML);
        alert('Texto copiado correctamente.');
    } catch (error) {
        alert('Se genero un error al tratar de copiar el texto.');
    }
}

/**
 * Función que permite encriptar el texto ingresado utilizando la matriz de codificación.
 * @param {string} texto - Texto a encriptar.
 * @returns {string} - Texto encriptado.
 */
function encriptar(texto) {
    // Reemplazo de las vocales segín diccionario de codificación
    let textoEncriptado = texto;
    for (const [clave, valor] of Object.entries(diccionarioCodificacion)) {
        if (textoEncriptado.includes(clave)) {
            textoEncriptado = textoEncriptado.replaceAll(clave, valor);
        }
    }
    return textoEncriptado;

}

/**
 * Función que permite desencriptar el texto utilizando la matriz de codificación.
 * @param {string} texto - Texto a desencriptar.
 * @returns {string} - Texto desencriptado.
 */
function desencriptar(texto) {
    let textoDesencriptado = texto;
    for (const [clave, valor] of Object.entries(diccionarioCodificacion)) {
        if (textoDesencriptado.includes(valor)) {
            textoDesencriptado = textoDesencriptado.replaceAll(valor, clave);
        }
    }
    return textoDesencriptado;
}

/**
 * Función que carga los valores por defecto.
 */
function valoresPorDefecto() {
    // Estilos
    textoVisible.style.removeProperty('justify-content');
    botonCopiar.classList.remove('visible');
    botonCopiar.classList.add('oculto');
    muneco.classList.add('visible');
    textoVisibleH2.classList.remove('oculto');
    textoVisibleP.classList.add('texto-med');
    textoVisibleP.classList.remove('texto-gra', 'texto-ali-izq');

    // Mensajes
    textoVisibleH2.innerHTML = 'Ningún mensaje fue encontrado';
    textoVisibleP.innerHTML = 'Ingrese el texto que desees encríptar o desencriptar';
}

// Codigo que se ejecuta al iniciar el programa
textoEntrada.focus();
valoresPorDefecto()