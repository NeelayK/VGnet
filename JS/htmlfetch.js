function loadComponent(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.error(`Error loading ${file}:`, error));
}

document.addEventListener("DOMContentLoaded", function () {
    loadComponent("header", "header.html");
    loadComponent("footer", "footer.html");
    loadPage("home")
    
});

function loadPage(page) {
    let pageFile = `${page}.html`;
    
    fetch(pageFile)
        .then(response => response.text())
        .then(data => {
            
            window.scrollTo({ top: 0, behavior: "smooth" });
            document.getElementById("content").innerHTML = data;

            if (document.getElementById("missionCanvas")) {
                canvasLoad();
            }

            if (document.querySelector(".publications")) {
                fetchPublications();
            }

            if (document.querySelector(".projects")) {
                fetchProjects();
            }

            if (document.querySelector(".collabsHead")) {
                fetchCollab();
            }

            if (document.querySelector(".team-category")) {
                fetchTeam();
                fetchGallery()
            }
            
            
            handleScroll();
        })
        .catch(error => console.error(`Error loading ${pageFile}:`, error));
}

