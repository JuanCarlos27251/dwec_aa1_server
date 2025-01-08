document.addEventListener('DOMContentLoaded', () => {
    const addCategoryLink = document.getElementById('add-category-link');
    const addSiteLink = document.getElementById('add-site-link');
    const categorySection = document.getElementById('category-section');
    const siteSection = document.getElementById('site-section');
    const addCategoryForm = document.getElementById('add-category-form');
    const categoryList = document.getElementById('category-list');
    const siteList = document.getElementById('site-list');
    const categoryIdInput = document.getElementById('category-id');

    // Mostrar formulario de añadir categoría
    addCategoryLink.addEventListener('click', () => {
        addCategoryForm.style.display = 'block';
        siteSection.style.display = 'none';
    });

    // Función para añadir una nueva categoría
    const addCategory = (event) => {
        event.preventDefault();
        const categoryName = document.getElementById('category-name').value;
        if (categoryName) {
            fetch('http://localhost:3000/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: categoryName })
            })
            .then(response => response.json())
            .then(data => {
                const newCategory = document.createElement('li');
                newCategory.className = 'list-group-item d-flex justify-content-between align-items-center';
                newCategory.style.cursor = 'pointer';
                newCategory.innerText = data.name;

                // Botón de eliminar
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'btn btn-danger btn-sm';
                deleteBtn.innerText = 'Eliminar';
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation(); // Evitar que el evento de clic en el li se dispare
                    fetch(`http://localhost:3000/categories/${data.id}`, {
                        method: 'DELETE'
                    })
                    .then(res => {
                        if (res.ok) {
                            // Eliminar la categoría de la lista
                            newCategory.remove();
                        } else {
                            return res.json().then(error => {
                                throw new Error(error.message);
                            });
                        }
                    })
                    .catch(error => console.error('Error eliminando categoría:', error));
                });

                newCategory.appendChild(deleteBtn);
                newCategory.addEventListener('click', () => {
                    fetch(`http://localhost:3000/categories/${data.id}`)
                        .then(res => res.json())
                        .then(categoryData => {
                            const sites = categoryData.sites; // Acceder a la propiedad 'sites'
                            if (Array.isArray(sites)) {
                                siteList.innerHTML = '';
                                sites.forEach(site => {
                                    const siteItem = document.createElement('li');
                                    siteItem.className = 'list-group-item d-flex justify-content-between align-items-center';
                                    siteItem.style.cursor = 'pointer';
                                    siteItem.innerText = site.name;

                                    // Botón de eliminar
                                    const deleteSiteBtn = document.createElement('button');
                                    deleteSiteBtn.className = 'btn btn-danger btn-sm';
                                    deleteSiteBtn.innerText = 'Eliminar';
                                    deleteSiteBtn.addEventListener('click', (e) => {
                                        e.stopPropagation(); // Evitar que el evento de clic en el li se dispare
                                        fetch(`http://localhost:3000/sites/${site.id}`, {
                                            method: 'DELETE'
                                        })
                                        .then(res => {
                                            if (res.ok) {
                                                // Eliminar el sitio de la lista
                                                siteItem.remove();
                                            } else {
                                                return res.json().then(error => {
                                                    throw new Error(error.message);
                                                });
                                            }
                                        })
                                        .catch(error => console.error('Error eliminando sitio:', error));
                                    });

                                    siteItem.appendChild(deleteSiteBtn);
                                    siteList.appendChild(siteItem);
                                });
                                siteSection.style.display = 'block';
                                addSiteLink.style.display = 'block';
                                addSiteLink.onclick = () => navigateToAddSite(data.id); // Redirigir a la página de añadir sitio con el ID de la categoría
                            } else {
                                console.error('La respuesta no es un array:', sites);
                            }
                        })
                        .catch(error => console.error('Error fetching sites:', error));
                });
                categoryList.appendChild(newCategory);
            })
            .catch(error => console.error('Error adding category:', error));
        }
    };

    addCategoryForm.addEventListener('submit', addCategory);

    // Cargar categorías al inicio
    fetch('http://localhost:3000/categories')
        .then(res => res.json())
        .then(data => {
            data.forEach(category => {
                const categoryItem = document.createElement('li');
                categoryItem.className = 'list-group-item d-flex justify-content-between align-items-center';
                categoryItem.style.cursor = 'pointer';
                categoryItem.innerText = category.name;

                // Botón de eliminar
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'btn btn-danger btn-sm';
                deleteBtn.innerText = 'Eliminar';
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation(); // Evitar que el evento de clic en el li se dispare
                    fetch(`http://localhost:3000/categories/${category.id}`, {
                        method: 'DELETE'
                    })
                    .then(res => {
                        if (res.ok) {
                            // Eliminar la categoría de la lista
                            categoryItem.remove();
                        } else {
                            return res.json().then(error => {
                                throw new Error(error.message);
                            });
                        }
                    })
                    .catch(error => console.error('Error eliminando categoría:', error));
                });

                categoryItem.appendChild(deleteBtn);
                categoryItem.addEventListener('click', () => {
                    fetch(`http://localhost:3000/categories/${category.id}`)
                        .then(res => res.json())
                        .then(categoryData => {
                            const sites = categoryData.sites; // Acceder a la propiedad 'sites'
                            if (Array.isArray(sites)) {
                                siteList.innerHTML = '';
                                sites.forEach(site => {
                                    const siteItem = document.createElement('li');
                                    siteItem.className = 'list-group-item d-flex justify-content-between align-items-center';
                                    siteItem.style.cursor = 'pointer';
                                    siteItem.innerText = site.name;

                                    // Botón de eliminar
                                    const deleteSiteBtn = document.createElement('button');
                                    deleteSiteBtn.className = 'btn btn-danger btn-sm';
                                    deleteSiteBtn.innerText = 'Eliminar';
                                    deleteSiteBtn.addEventListener('click', (e) => {
                                        e.stopPropagation(); // Evitar que el evento de clic en el li se dispare
                                        fetch(`http://localhost:3000/sites/${site.id}`, {
                                            method: 'DELETE'
                                        })
                                        .then(res => {
                                            if (res.ok) {
                                                // Eliminar el sitio de la lista
                                                siteItem.remove();
                                            } else {
                                                return res.json().then(error => {
                                                    throw new Error(error.message);
                                                });
                                            }
                                        })
                                        .catch(error => console.error('Error eliminando sitio:', error));
                                    });

                                    siteItem.appendChild(deleteSiteBtn);
                                    siteList.appendChild(siteItem);
                                });
                                siteSection.style.display = 'block';
                                addSiteLink.style.display = 'block';
                                addSiteLink.onclick = () => navigateToAddSite(categoryData.id); // Redirigir a la página de añadir sitio con el ID de la categoría
                            } else {
                                console.error('La respuesta no es un array:', sites);
                            }
                        })
                        .catch(error => console.error('Error fetching sites:', error));
                });
                categoryList.appendChild(categoryItem);
            });
        })
        .catch(error => console.error('Error fetching categories:', error));
});

// Función para redirigir a la página de añadir sitio con el ID de la categoría
function navigateToAddSite(categoryId) {
    window.location.href = `nuevo_sitio.html?categoryId=${categoryId}`;
}
