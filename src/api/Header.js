function getHeaderNoToken() {
    return { 
        'Accept': "application/json", 
        'Content-Type': "application/json" 
    };
}

function getHeaderGeneral(token) {
    return { 
        'Authorization': token, 
        'Accept': "application/json", 
        'Content-Type': "application/json" 
    };
}

function getHeaderToken(token) {
    return { 'Authorization': token, 'Accept': "application/json", };
}

export default {
    getHeaderNoToken,
    getHeaderGeneral,
    getHeaderToken
};