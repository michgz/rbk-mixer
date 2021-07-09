import { filename, filepath } from '../src/stores.js';
export function openDialog(dir, serv) {
    const dialog = window.__TAURI__.dialog;
    return dialog
        .open({
            'defaultPath': dir,
            'filters': [{
                name: 'casio_rbk',
                extensions: ['rbk']
            }],
            'multiple': false,
            'directory': false
        })
        .then(
            path => {
                const url = serv + '/import?filename=' + path;
                filename.set(getFileFromPath(path));
                filepath.set(getFileLocFromPath(path));
                const http = window.__TAURI__.http;
                return http.fetch(url);
            })
        .catch(err => console.log(err));
}

export function submitForm(formElement, server) {
    const formData = new FormData(formElement);
    const url = server + '/export';
    const http = window.__TAURI__.http;
    return http.fetch(url, {
        method: 'POST',
        body: formData
    }).then(response => response.json())
}

function getFileLocFromPath(path) {
    const pathArr = path.split('/');
    let pathStr = '';
    for (let i = 0; i < pathArr.length - 1; i++) {
        pathStr += pathArr[i] + "/";
    }
    return pathStr;
}

function getFileFromPath(path) {
    const pathArr = path.split("/");
    const lastIndex = pathArr.length - 1;
    return pathArr[lastIndex];
}

export function arraysMatch(arr1, arr2) {
	// Check if the arrays are the same length
	if (arr1.length !== arr2.length) return false;
	// Check if all items exist and are in the same order
	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}
	// Otherwise, return true
	return true;
};

export function fsLog(msg) {
    const fs = window.__TAURI__.fs;
    const relativeLogLoc = '../../logs';
    // migsTODO: code
}

export function pyLog(serv, msg) {
    const formData = new FormData();
    formData.append('line', msg);
    const url = serv + '/log';
    return fetch(url, {
        method: 'PUT',
        body: formData
    }).then(response => response.json())
}