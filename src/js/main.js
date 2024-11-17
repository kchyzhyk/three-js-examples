const projectSelector = document.getElementById('project-selector');
const appContainer = document.getElementById('container');

async function loadProject(projectName) {
    try {
        const projectModule = await import(`./projects/${projectName}.js`);
        appContainer.innerHTML = '';
        projectModule.default();
    } catch (error) {
        console.error(`Error loading ${projectName}:`, error);
        appContainer.innerHTML = '<p>Error loading project.</p>';
    }
}

projectSelector.addEventListener('change', (event) => {
    const selectedProject = event.target.value;
    loadProject(selectedProject);
});

loadProject(projectSelector.value);