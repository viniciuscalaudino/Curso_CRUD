import { renderUsers, findUserById } from './scripts/dom/render.js';
import { createUser } from './scripts/api/create.js';
import { deleteUser } from './scripts/api/delete.js';

const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api/users';
const form = document.getElementById('create-user-form');
const formError = document.getElementById('form-error');
const usersSection = document.getElementById('users');

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await renderUsers(apiUrl);
    } catch (error) {
        console.error(error);
    }
});

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

function getUserFromCard(button) {
    const card = button.closest('.user-card');
    return findUserById(Number(card.id));
}

usersSection.addEventListener('click', async (event) => {
    const { target } = event;

    if (target.dataset.action === 'delete') {
        const user = getUserFromCard(target);

        if (!confirm('Are you sure you want to delete this user?')) return;

        try {
            await deleteUser(apiUrl, user.id);
            await renderUsers(apiUrl);
        } catch (error) {
            showError(error.message);
        }
    }
});
