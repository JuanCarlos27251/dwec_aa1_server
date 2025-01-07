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
                newCategory.innerText = data.name;
                newCategory.addEventListener('click', () => {
                    fetch(`http://localhost:3000/categories/${data.id}`)
                        .then(res => res.json())
                        .then(sites => {
                            siteList.innerHTML = '';
                            sites.forEach(site => {
                                const siteItem = document.createElement('li');
                                siteItem.innerText = site.name;
                                siteList.appendChild(siteItem);
                            });
                            siteSection.style.display = 'block';
                        });
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
                categoryItem.innerText = category.name;
                categoryItem.addEventListener('click', () => {
                    fetch(`http://localhost:3000/categories/${category.id}`)
                        .then(res => res.json())
                        .then(sites => {
                            siteList.innerHTML = '';
                            sites.forEach(site => {
                                const siteItem = document.createElement('li');
                                siteItem.innerText = site.name;
                                siteList.appendChild(siteItem);
                            });
                            siteSection.style.display = 'block';
                        });
                });
                categoryList.appendChild(categoryItem);
            });
        })
        .catch(error => console.error('Error fetching categories:', error));
});
