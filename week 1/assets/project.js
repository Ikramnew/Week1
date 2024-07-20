let projects = [];

function addProject(event) {
    event.preventDefault();

    const projectName = document.getElementById('projectName').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const description = document.getElementById('description').value;
    const technologies = Array.from(document.querySelectorAll('input[name="technology"]:checked')).map(checkbox => checkbox.value);
    const fileInput = document.getElementById('file'); 
    const duration = calculateDuration(startDate, endDate);
    if (!projectName || !startDate || !endDate || !description || !technologies.length) {
        alert("Please fill out all required fields.");
        return;
    }

    if (new Date(startDate) > new Date(endDate)) {
        alert("End date must be after start date.");
        return;
    }
    const projectData = {
        projectName,
        startDate,
        endDate,
        description,
        technologies,
        file,
        duration
    };

    projects.push(projectData);
    displayProjects();
    document.getElementById('form-project').reset();
}

function calculateDuration(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const time = Math.abs(endDate - startDate);
    const days = Math.ceil(time / (1000 * 3600 * 24)); 

    if(days >30 || 29){
        const months= Math.ceil(days/30);
        return `${months} Bulan`;
    }else{
    return `${days} Hari`;

    }
}

function displayProjects() {
    const projectCards = document.getElementById('projectCards');
    projectCards.innerHTML = '';

    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');

        projectCard.innerHTML = `
            <a href="Detail.html">
            <img src="https://via.placeholder.com/50" alt="Project Image" class="project-image">

            </a>
            <div class="project-info">
                <h3>${project.projectName}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-dates">
                    <p>Duration</p>
                    <p><i class="fas fa-calendar-alt"></i>  ${project.startDate} - ${project.endDate}</p>
                    
                    <p><i class="fas fa-clock"></i>  ${project.duration} </p>
                </div>
                <div class="project-technologies">
                    <p>Technologies: ${project.technologies.join(', ')}</p>
                </div>
                <div class="project-file">
                    
                </div>
                <div class="project-actions">
                    <button class="edit-button" onclick="editProject(${index})">Edit</button>
                    <button class="delete-button" onclick="deleteProject(${index})">Delete</button>
                </div>
            </div>
        `;

        projectCards.appendChild(projectCard);
    });
}

function editProject(index) {
    const project = projects[index];

    document.getElementById('projectName').value = project.projectName;
    document.getElementById('startDate').value = project.startDate;
    document.getElementById('endDate').value = project.endDate;
    document.getElementById('description').value = project.description;
    
    document.querySelectorAll('input[name="technology"]').forEach(checkbox => {
        checkbox.checked = project.technologies.includes(checkbox.value);
    });
    
    projects.splice(index, 1);
    displayProjects();
}

function deleteProject(index) {
    projects.splice(index, 1);
    displayProjects();
}
