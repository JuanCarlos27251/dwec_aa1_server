document.addEventListener('DOMContentLoaded', () => {
    const addCategoryLink = document.getElementById('add-category-link');
    const addSiteLink = document.getElementById('add-site-link');
    const categorySection = document.getElementById('category-section');
    const siteSection = document.getElementById('site-section');
    const addCategoryForm = document.getElementById('add-category-form');
    const categoryList = document.getElementById('category-list');
    const siteList = document.getElementById('site-list');

    // Mostrar formulario de añadir categoría
    addCategoryLink.addEventListener('click', () => {
        addCategoryForm.style.display = 'block';
        siteSection.style.display = 'none';
    });

    // Función para redirigir a la página de añadir sitio
    function navigateToAddSite(categoryId) {
        window.location.href = `nuevo_sitio.html?categoryId=${categoryId}`;
    }

    // Función para renderizar una categoría como card
    const renderCategoryCard = (category) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'col-md-4 mb-3';

        const card = document.createElement('div');
        card.className = 'card card-category shadow-sm';
        card.style.cursor = 'pointer';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = category.name;

        const categoryActions = document.createElement('div');
        categoryActions.className = 'category-actions text-right';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm';
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm('¿Está seguro de que desea eliminar esta categoría?')) {
                fetch(`http://localhost:3000/categories/${category.id}`, {
                    method: 'DELETE',
                })
                .then((res) => {
                    if (res.ok) {
                        cardDiv.remove();
                    } else {
                        throw new Error('Error eliminando categoría');
                    }
                })
                .catch((err) => console.error(err));
            }
        });

        categoryActions.appendChild(deleteBtn);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(categoryActions);
        card.appendChild(cardBody);
        cardDiv.appendChild(card);

        // Evento para seleccionar una categoría y mostrar sus sitios
        card.addEventListener('click', () => {
            fetch(`http://localhost:3000/categories/${category.id}`)
            .then((res) => res.json())
            .then((data) => {
                const sites = data.sites || [];
                siteList.innerHTML = '';
                sites.forEach((site) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${site.name}</td>
                        <td>${site.user || 'Sin usuario'}</td>
                        <td>
                            <button class="btn btn-danger btn-sm">Eliminar</button>
                        </td>
                    `;
                    row.querySelector('button').addEventListener('click', (e) => {
                        e.stopPropagation();
                        if (confirm('¿Está seguro de que desea eliminar este sitio?')) {
                            fetch(`http://localhost:3000/sites/${site.id}`, {
                                method: 'DELETE',
                            })
                            .then((res) => {
                                if (res.ok) {
                                    row.remove();
                                }
                            })
                            .catch((err) => console.error(err));
                        }
                    });
                    siteList.appendChild(row);
                });

                // Muestra la sección de sitios y configura el enlace para añadir nuevos sitios
                siteSection.style.display = 'block';
                addSiteLink.style.display = 'block';
                addSiteLink.onclick = () => navigateToAddSite(category.id);
            })
            .catch((err) => console.error(err));
        });

        categoryList.appendChild(cardDiv);
    };

    // Cargar categorías
    fetch('http://localhost:3000/categories')
    .then((res) => res.json())
    .then((categories) => {
        categories.forEach((category) => renderCategoryCard(category));
    })
    .catch((err) => console.error('Error cargando categorías:', err));

    // Añadir categoría
    addCategoryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const categoryName = document.getElementById('category-name').value;
        fetch('http://localhost:3000/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: categoryName }),
        })
        .then((res) => res.json())
        .then((category) => {
            renderCategoryCard(category);
            addCategoryForm.style.display = 'none';
            addCategoryForm.reset();
        })
        .catch((err) => console.error('Error añadiendo categoría:', err));
    });
});
