const getRequest = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
        return [];
    }
};

const postRequest = async (url, body) => {
    try {
        const response = await fetch(url, {
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

const putRequest = async (url, body) => {
    try {
        const response = await fetch(url, {
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


const deleteRequest = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
        });
        return response.ok;
    } catch (err) {
        console.log(err);
        return false;
    }
};




export { getRequest, postRequest, putRequest, deleteRequest };
