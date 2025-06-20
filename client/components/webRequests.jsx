import { baseURL } from "../src/global";

const getRequest = async (endpoint) => {
    try {
        const response = await fetch(`${baseURL}${endpoint}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
        return [];
    }
};

const postRequest = async (endpoint, body) => {
    try {
        const response = await fetch(`${baseURL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const putRequest = async (endpoint, body) => {
    try {
        const response = await fetch(`${baseURL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};


const deleteRequest = async (endpoint) => {
    try {
        const response = await fetch(`${baseURL}${endpoint}`, {
            method: 'DELETE',
        });
        return response.ok;
    } catch (err) {
        console.log(err);
        return false;
    }
};




export { getRequest, postRequest, putRequest, deleteRequest };
