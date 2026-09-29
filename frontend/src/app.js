import { renderUsers } from './scripts/dom/render';

const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api/users';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await renderUsers(apiUrl);
    } catch (error) {
        console.error(error);
    }
});