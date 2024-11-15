const API_URL = 'http://localhost:3000/api/chapter/';
const getChapterById = () => {
const urlParams = new URLSearchParams(window.location.search);
    const chapterId = urlParams.get('id');
    fetch(`${API_URL}/${chapterId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const chapter = data.data;
                document.getElementById('title').value = chapter.title;
                document.getElementById('numberoflessons').value = chapter.numberoflessons;
                document.getElementById('author').value = chapter.author;
                document.getElementById('isactive').checked = chapter.isactive;
            } else {
                alert('Chapter not found');
            }
        })
        .catch(error => {
            console.error('Error fetching chapter:', error);
            alert('Failed to load chapter details');
        });
}
getChapterById();