document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    try {
        const name = document.getElementById('name').value.trim();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const email = document.getElementById('email').value.trim();
        const birthdate = document.getElementById('birthdate').value;

        if (!name) throw { field: 'nameError', message: 'Nome é obrigatório.' };
        if (!username) throw { field: 'usernameError', message: 'Usuário é obrigatório.' };
        if (!password || password.length < 6) {
            throw { field: 'passwordError', message: 'Senha deve ter no mínimo 6 caracteres.' };
        }
        if (!email || !validateEmail(email)) {
            throw { field: 'emailError', message: 'Email inválido.' };
        }
        if (!birthdate || !isAdult(birthdate)) {
            throw { field: 'birthdateError', message: 'Você deve ter 18 anos ou mais.' };
        }

        document.getElementById('successMessage').textContent = 'Cadastro realizado com sucesso!';
        document.getElementById('registrationForm').reset();

    } catch (error) {
        if (error.field && error.message) {
            document.getElementById(error.field).textContent = error.message;
        } else {
            console.error("Erro desconhecido:", error);
        }
    }
});


function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function isAdult(birthdate) {
    const birth = new Date(birthdate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const hasHadBirthday =
        today.getMonth() > birth.getMonth() ||
        (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
    return age > 18 || (age === 18 && hasHadBirthday);
}

function clearErrors() {
    const errorFields = document.querySelectorAll('.error-message');
    errorFields.forEach(field => field.textContent = '');
    document.getElementById('successMessage').textContent = '';
}
