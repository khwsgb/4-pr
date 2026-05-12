document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const messageBox = document.getElementById('loginMessage');
    const loginBtn = document.querySelector('.btn-login');

    // 1. Обработчик отправки формы
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Отменяем перезагрузку страницы

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            // Сброс состояния сообщения
            if (messageBox) {
                messageBox.className = 'message';
                messageBox.style.display = 'none';
            }

            // Валидация
            if (!email || !password) {
                showMessage('Пожалуйста, заполните все поля.', 'error');
                return;
            }
            if (password.length < 6) {
                showMessage('Пароль должен содержать минимум 6 символов.', 'error');
                return;
            }

            // Успешная имитация входа
            showMessage('Успешный вход! Перенаправление...', 'success');
            
            // Сохраняем сессию
            localStorage.setItem('userEmail', email);
            localStorage.setItem('isLoggedIn', 'true');

            // Переход на главную через 1.5 сек
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
    }

    // 2. Функция отображения сообщений
    function showMessage(text, type) {
        if (!messageBox) return;
        messageBox.textContent = text;
        messageBox.className = `message ${type}`;
        messageBox.style.display = 'block';

        // Авто-скрытие через 4 секунды
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 4000);
    }

    // 3. Проверка авторизации при загрузке страницы
    if (localStorage.getItem('isLoggedIn') === 'true' && loginBtn) {
        loginBtn.textContent = 'Выйти';
        loginBtn.classList.remove('btn-login');
        loginBtn.style.cursor = 'pointer';
        loginBtn.style.background = '#EF4444'; // Красный цвет для выхода

        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            alert('Вы успешно вышли из аккаунта');
            location.reload();
        });
    }
});