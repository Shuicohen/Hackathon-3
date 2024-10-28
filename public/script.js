// Fetch and display projects dynamically
document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/projects')
        .then(response => response.json())
        .then(projects => {
            const projectsList = document.getElementById('projects-list');

            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                
                projectCard.innerHTML = `
                    <h4>${project.title}</h4>
                    <p>${project.description}</p>
                    <p><strong>Category:</strong> ${project.category}</p>
                `;

                projectsList.appendChild(projectCard);
            });
        })
        .catch(err => console.error('Error fetching projects:', err));
});
