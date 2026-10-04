import { renderUsers } from './scripts/dom/render';
import { createUser } from './scripts/api/create';

const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api/users';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await renderUsers(apiUrl);
    } catch (error) {
        console.error(error);
    }
});

const form = document.getElementById('create-user-form');
const formError = document.getElementById('form-error');

function showError(message) {
    formError.textContent = message;
    formError.classList.remove('d-none');
}

function hideError() {
    formError.classList.add('d-none');
    formError.textContent = '';
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;

    hideError();

    try {
        await createUser(apiUrl, { name, age, email });

        form.reset();
        await renderUsers(apiUrl);
    } catch (error) {
        showError(error.message)
    }

});