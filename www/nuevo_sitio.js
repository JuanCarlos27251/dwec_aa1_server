document.addEventListener('DOMContentLoaded', () => {
    const addSiteForm = document.getElementById('add-site-form');

    // Validaciones dinámicas
    const validateField = (field, condition, errorMessage) => {
        const errorElement = field.nextElementSibling; 
        if (!condition) {
            field.classList.add('is-invalid');
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
        } else {
            field.classList.remove('is-invalid');
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    };

    const validateForm = () => {
        let isValid = true;

        const siteName = document.getElementById('site-name');
        const siteUser = document.getElementById('site-user');
        const sitePassword = document.getElementById('site-password');

        // Validar nombre del sitio
        validateField(siteName, siteName.value.trim() !== '', 'El nombre del sitio es obligatorio.');
        if (siteName.value.trim() === '') isValid = false;

        // Validar usuario
        validateField(siteUser, siteUser.value.trim() !== '', 'El usuario es obligatorio.');
        if (siteUser.value.trim() === '') isValid = false;

        // Validar contraseña
        validateField(
            sitePassword,
            sitePassword.value.trim().length >= 6,
            'La contraseña debe tener al menos 6 caracteres.'
        );
        if (sitePassword.value.trim().length < 6) isValid = false;

        return isValid;
    };

    // Función para añadir un nuevo sitio
    const addSite = (event) => {
        event.preventDefault();

        // Validar formulario antes de enviar
        if (!validateForm()) {
            return;
        }

        const siteName = document.getElementById('site-name').value;
        const siteUrl = document.getElementById('site-url').value;
        const siteUser = document.getElementById('site-user').value;
        const sitePassword = document.getElementById('site-password').value;
        const siteDescription = document.getElementById('site-description').value;
        const categoryId = new URLSearchParams(window.location.search).get('categoryId'); // Obtiene el ID de la categoría de la URL

        if (categoryId) {
            fetch(`http://localhost:3000/categories/${categoryId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: siteName,
                    url: siteUrl,
                    user: siteUser,
                    password: sitePassword,
                    description: siteDescription
                })
            })
            .then(response => response.json())
            .then(data => {
                alert('Sitio añadido con éxito');
                window.location.href = 'index.html'; // Redirigir a la página principal
            })
            .catch(error => console.error('Error adding site:', error));
        }
    };

    // Validar dinámicamente en tiempo real
    const siteName = document.getElementById('site-name');
    const siteUser = document.getElementById('site-user');
    const sitePassword = document.getElementById('site-password');

    siteName.addEventListener('input', () =>
        validateField(siteName, siteName.value.trim() !== '', 'El nombre del sitio es obligatorio.')
    );

    siteUser.addEventListener('input', () =>
        validateField(siteUser, siteUser.value.trim() !== '', 'El usuario es obligatorio.')
    );

    sitePassword.addEventListener('input', () =>
        validateField(sitePassword, sitePassword.value.trim().length >= 6, 'La contraseña debe tener al menos 6 caracteres.')
    );

    addSiteForm.addEventListener('submit', addSite);
});
