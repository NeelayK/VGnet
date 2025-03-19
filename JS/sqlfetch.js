
async function fetchPublications() {
    try {
        //const response = await fetch("http://127.0.0.1:5000/publications");
        const response = await fetch("https://vgnetv3.onrender.com/publications");
        
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to fetch data");
        }
        const infoSection = document.querySelector('.info-section');
        const Canvas = document.createElement('canvas');
        Canvas.id = 'missionCanvas';
        infoSection.appendChild(Canvas);

        const infoContainer = document.querySelector('.publications');
        infoContainer.innerHTML = '';
        
        data.forEach((publication) => {
            const infoBox = document.createElement('div');
            infoBox.classList.add('info-box');

            const authors = document.createElement('h4');
            authors.textContent = publication.authors;

            const title = document.createElement('h2');
            title.textContent = publication.paperName;

            const date = document.createElement('p');
            date.textContent = publication.date;

            infoBox.appendChild(authors);
            infoBox.appendChild(title);
            infoBox.appendChild(date);
            infoContainer.appendChild(infoBox);
        });
        
        canvasLoad(200,100, 1.1);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchProjects() {
    try {
        const response = await fetch("https://vgnetv3.onrender.com/projects");

        //const response = await fetch("http://127.0.0.1:5000/projects");

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to fetch data");
        }

        const infoSection = document.querySelector('.info-section');
        const Canvas = document.createElement('canvas');
        Canvas.id = 'missionCanvas';
        infoSection.appendChild(Canvas);

        const infoContainer = document.querySelector('.projects');
        infoContainer.innerHTML = '';

        data.forEach((project) => {
            const infoBox = document.createElement('div');
            infoBox.classList.add('info-box');

            const title = document.createElement('h3');
            title.textContent = project.title;

            const desc = document.createElement('p');
            desc.textContent = project.desc;

            infoBox.appendChild(title);
            infoBox.appendChild(desc);
            infoContainer.appendChild(infoBox);
        });
        
        canvasLoad(60,120, 1.3);
    } catch (error) {
        console.error('Error:', error);
    }
}







async function fetchCollab() {
    try {
        
        const response = await fetch("https://vgnetv3.onrender.com/collabs");
        //const response = await fetch("http://127.0.0.1:5000/collabs");


        const data = await response.json();
        console.log("Projects data:", data);

        if (!response.ok) {
            throw new Error(data.error || "Failed to fetch data");
        }

        const headContainer = document.querySelector('.collabsHead');
        headContainer.innerHTML = '';

        const categories = {
            1: { title: "Industrial Collaborators", id: "IC" },
            2: { title: "Government Research Collaborators", id: "GC" },
            3: { title: "Research/Academic Collaborators", id: "AC" }
        };

        const sections = {};

        Object.values(categories).forEach(({ title, id }) => {
            // Create heading
            const h2 = document.createElement('h2');
            h2.style.textDecoration = "underline";
            h2.textContent = title;
            headContainer.appendChild(h2);

            const div = document.createElement('div');
            div.id = id;
            div.classList.add("objectives-section", "collabs", "fade-in");
            headContainer.appendChild(div);

            sections[id] = div;
        });

        data.forEach((project) => {
            const { collab_type, collab, desc } = project;
            const category = categories[collab_type];

            if (category) {
                const infoContainer = sections[category.id]; 

                const title = document.createElement('h2'); 
                title.textContent = collab;

                const description = document.createElement('p');
                description.textContent = desc;
                infoContainer.appendChild(title);
                infoContainer.appendChild(description);
            } else {
                console.warn(`Unknown collab_type: ${collab_type}`);
            }
        });

    } catch (error) {
        console.error("Error:", error);
    }
}














async function fetchTeam() {
    try {
        //const response = await fetch("http://127.0.0.1:5000/team");
        const response = await fetch("https://vgnetv3.onrender.com/team");

        if (!response.ok) {
            throw new Error("Failed to fetch team data");
        }

        const data = await response.json();

        const categories = {
            1: document.getElementById("bsms"),
            2: document.getElementById("pphd"),
            3: document.getElementById("cphd"),
            4: document.getElementById("ps")
        };

        Object.values(categories).forEach(category => {
            if (category) category.innerHTML = "";
        });

        data.forEach((team) => {
            const groupId = parseInt(team.group, 10);
            if (!categories[groupId]) {
                console.warn(`Unknown team group: ${groupId}`);
                return;
            }

            const teamMember = document.createElement("div");
            teamMember.classList.add("team-member");

            const img = document.createElement("img");
            img.src = team.image_link || "default-image.jpg"; 
            img.alt = team.name;

            const teamText = document.createElement("div");
            teamText.classList.add("team-text");

            const name = document.createElement("h2");
            name.textContent = team.name;

            const interest = document.createElement("p");
            interest.textContent = team.research_interest;

            teamText.appendChild(name);
            teamText.appendChild(interest);
            teamMember.appendChild(img);
            teamMember.appendChild(teamText);

            categories[groupId].appendChild(teamMember);
        });

    } catch (error) {
        console.error("Error:", error);
    }
}


