export function getLocalstorage (key) {  
    return JSON.parse(localStorage.getItem(key));
}

export function setLocalstorage (key, value) {  
    return localStorage.setItem(key,JSON.stringify(value));
}