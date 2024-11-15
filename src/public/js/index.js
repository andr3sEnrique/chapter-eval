const form = document.querySelector("form");
const errorsContainer = document.getElementById('errors');
const successContainer = document.getElementById('success');
const API_URL = 'http://localhost:3000/api/chapter/';
const chaptersContainer = document.getElementById('chapters-container');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append('isactive', document.getElementById('isactive').checked);
    const entries = formData.entries();
    const chapter = Object.fromEntries(entries);

    if( isValidChapter(chapter)) {
        const json = JSON.stringify(chapter);
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: json
        });
        const result = await response.json();
        if (response.ok && result.success) {
            successContainer.innerHTML = `<li class="text-success">Chapter added successfully</li>`;
            errorsContainer.innerHTML = '';
            form.reset();
            fetchChapters();
        }else {
            successContainer.innerHTML = '';
            errorsContainer.innerHTML = `<li class="text-danger">${result.error.message}</li>`;
        }
    }


});

const fetchChapters = async () => {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    });
    const result = await response.json();
    const chapters = result.data;
    createChapters(chapters);
    console.log(chapters);
}

fetchChapters();

const createChapters = (chapters) => {
    const chaptersNodes = chapters.map(chapter => {
        const chapterNode = document.createElement('div');
        chapterNode.classList.add('col-12', 'col-sm-6', 'col-md-6', 'mb-4'); 
        
        chapterNode.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <p><strong>Title:</strong> ${chapter.title}</p>
                    <p><strong>Number of Lessons:</strong> ${chapter.numberoflessons}</p>
                    <p><strong>Author:</strong> ${chapter.author}</p>
                    <div class="article-actions">
                        <button class="btn btn-danger" data-id="${chapter._id}">Supprimer</button>
                        <a href="chapter.html?id=${chapter._id}" class="btn btn-primary">Voir</a>
                    </div>
                </div>
            </div>
        `;
        return chapterNode;
    });
    chaptersContainer.innerHTML = ''; 
    chaptersContainer.classList.add('row', 'g-4');
    chaptersContainer.append(...chaptersNodes); 

    const deleteButtons = chaptersContainer.querySelectorAll('.btn-danger');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            const id = e.target.dataset.id;
            const answer = confirm('Are you sure you want to delete this chapter?');
            if (answer) {
                const response = await fetch(`${API_URL}/${id}`, {
                    method: 'DELETE',
                });
                const result = await response.json();
                if (response.ok && result.success) {
                    successContainer.innerHTML = `<li class="text-success">Chapter deleted successfully</li>`;
                    errorsContainer.innerHTML = '';
                    fetchChapters();
                }else {
                    successContainer.innerHTML = '';
                    errorsContainer.innerHTML = `<li class="text-danger">${result.error.message}</li>`;
                }
            }
            fetchArticles();
        })
    });
}

const isValidChapter = (chapter) => {
    let errors = [];

    if(!chapter.title || !chapter.numberoflessons || !chapter.author) {
        errors.push("Tous les champs sont obligatoires");
    }

    if (chapter.title.length < 2) {
        errors.push('Le title doit être supérieur à 2 caractères');
    }

    if (chapter.author.length < 2) {
        errors.push('Le author doit être supérieur à 2 caractères');
    }

    if (chapter.numberoflessons < 0 || chapter.numberoflessons > 999 ) {
        errors.push('Le Number of lessons doit être un numero valide');
    }

    if (errors.length >= 1) {
        let errorsHTML = '';
        errors.forEach(error => {
            errorsHTML += `<li class="text-danger">${error}</li>`
        })
        errorsContainer.innerHTML = errorsHTML;
        return false;
    }

    errorsContainer.innerHTML = '';
    return true;


}