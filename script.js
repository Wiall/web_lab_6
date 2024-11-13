let collapses = [];

function addCollapse() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (title && content) {
        collapses.push({ title, content });
        renderCollapses();
        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
    }
}

function renderCollapses() {
    const container = document.getElementById('collapsesContainer');
    container.innerHTML = '';

    collapses.forEach((collapse, index) => {
        const div = document.createElement('div');
        div.className = 'collapse';

        div.innerHTML = `
            <h3 onclick="toggleContent(${index})">${collapse.title}</h3>
            <p style="display:none;">${collapse.content}</p>
        `;
        container.appendChild(div);
    });
}

function toggleContent(index) {
    const content = document.querySelectorAll('.collapse p')[index];
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
}

function saveCollapses() {
    fetch('save.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(collapses)
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.error('Помилка:', error));
}

function loadCollapses() {
    fetch('load.php')
        .then(response => response.json())
        .then(data => displayCollapses(data))
        .catch(error => console.error('Помилка:', error));
}

function displayCollapses(data) {
    const container = document.getElementById('collapsesDisplay');
    container.innerHTML = '';

    data.forEach((collapse, index) => {
        const div = document.createElement('div');
        div.className = 'collapse';
        div.innerHTML = `
            <h3 onclick="toggleContent(${index})">${collapse.title}</h3>
            <p style="display:none;">${collapse.content}</p>
        `;
        container.appendChild(div);
    });
}

window.onload = loadCollapses;
