document.addEventListener('DOMContentLoaded', () => {
    const addSiteForm = document.getElementById('add-site-form');

    // Función para añadir un nuevo sitio
    const addSite = (event) => {
        event.preventDefault();
        const siteName = document.getElementById('site-name').value;
        const siteUrl = document.getElementById('site-url').value;
        const siteUser = document.getElementById('site-user').value;
        const sitePassword = document.getElementById('site-password').value;
        const siteDescription = document.getElementById('site-description').value;
        const categoryId = new URLSearchParams(window.location.search).get('categoryId'); // Obtener el ID de la categoría de la URL
        if (siteName && siteUrl && siteUser && sitePassword && siteDescription && categoryId) {
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

    addSiteForm.addEventListener('submit', addSite);
});
