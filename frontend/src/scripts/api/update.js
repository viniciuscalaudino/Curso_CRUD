import axios from 'axios';

export async function updateUser(apiUrl, id, { name, age, email }) {
    try {
        const response = await axios.put(`${apiUrl}?id=${id}`, {
            name,
            age: Number(age),
            email,
        });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.error || 'Failed to update user';
        throw new Error(message);
    }
}

export async function patchUser(apiUrl, id, fields) {
    if (fields)    
}