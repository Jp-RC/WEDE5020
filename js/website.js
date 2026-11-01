//animations
//interaction on website
const animals =["🐕",
    "🐎", 
    "🫏", 
    "🐄", 
    "🐐", 
    "🐑", 
    "🐖", 
    "🐓", 
    "🐇" ];

    document.addEventListener("click", function (event){
        const animal = document.createElement("Span");

        const randomIndex = Math.floor(Math.random() * animals.length);

        animal.textContent = animals[randomIndex];
        animal.style.position = "fixed";
        animal.style.left = event.clientX + "px";
        animal.style.top = event.clientY + "px";
        animal.style.fontSize = "20px";
        animal.style.zIndex = "99999";
        animal.style.pointerEvents = "none";
        animal.style.opacity = "1";
        animal.style.transition = "transform 1.5s ease-out, opacity 1.5s ease-out";

        document.body.appendChild(animal);

        requestAnimationFrame(function() {
            animal.style.transform = "translateY(-60px)";
            animal.style.opacity = "0";
        })
        setTimeout(function () {
            animal.remove();
        }, 1500);
    });

    //animation for the Donation button
    const donateButton = document.querySelector(".Dono");

    if (donateButton) {
       let enlarged = false;

       setInterval(function () {
        enlarged = !enlarged;

        donateButton.style.transform = enlarged
            ? "scale(1.08)"
            : "scale(1)";
       }, 750);
    }
// the counts how many people visit the website temporarily
const visitorCount = document.getElementById("visitor-count");

if(visitorCount){
    const hasCounted = sessionStorage.getItem("kpiCounted");
    const target = 1000;

    if (hasCounted){
        visitorCount.textContent = "1,000+";
    } else {
        const duration = 2000;
        const startTime = performance.now();

        sessionStorage.setItem("kpiCounted", "true");

        function countUp(currentTime) {
            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );
            visitorCount.textContent = 
            Math.floor(target * progress).toLocaleString() +
            (progress === 1 ? "+" : "");

            if (progress < 1) {
                requestAnimationFrame(countUp);
            }
        }
        requestAnimationFrame(countUp);
    }
}
//INTERACTIVE MAP
const rescueMap = document.getElementById("rescue-map");

if (rescueMap && typeof L !== "undefined") {
    const map = L.map("rescue-map").setView(
        [-25.792573, 28.576557],
        13
    );

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([-25.792573, 28.5765557])
        .addTo(map)
        .bindPopup(
            "<b>Wet Nose Animal Rescue Centre</b><br>" +
            "Plot 75 R104, Vaalbank-B, Bronkhorstsspuit"
        )
        .openPopup();
}
//transition of donation button
const transButton = document.querySelector(".Dono");

if (transButton) {
    transButton.addEventListener("mouseenter", function () {
        transButton.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
        transButton.style.transform = "translateY(-4px)";
        transButton.style.boxShadow = "0 6px 12px rgba(0,0,0,0.2s)";
    });

    transButton.addEventListener("mouseleave", function () {
        transButton.style.transform = "translateY(0)";
        transButton.style.boxShadow = "none";
    });
}
//lightbox of images
const revealElements = document.querySelectorAll("img").forEach(function (image){
    image.style.cursor = "pointer";

    image.addEventListener("click", function() {

        const lightbox = document.createElement("div");

        lightbox.style.position = "fixed";
        lightbox.style.top = "0";
        lightbox.style.left = "0";
        lightbox.style.width = "100%";
        lightbox.style.height = "100%";
        lightbox.style.backgroundColor = "rgba(0,0,0,0.85)";
        lightbox.style.display = "flex";
        lightbox.style.justifyContent = "center";
        lightbox.style.alignItems = "9999";
        lightbox.style.cursor = "pointer";

        const enlargedImage = document.createElement("img");
        enlargedImage.src = image.src;
        enlargedImage.alt = image.alt;
        enlargedImage.style.maxWidth = "90%";
        enlargedImage.style.maxHeight = "85%";
        enlargedImage.style.objectFit = "contain";
        enlargedImage.style.borderRadius = "8px";
        enlargedImage.style.cursor = "default";

        lightbox.appendChild(enlargedImage);
        document.body.appendChild(lightbox);

        //closes when back ground is clicked
        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                lightbox.remove();
            }
        });
        function closeLightbox (event) {
            if (event.key === "Escape") {
                lightbox.remove();
                document.removeEventListener("keydown", closeLightbox)
            }
        }
        document.addEventListener("keydown", closeLightbox);
    });
});
//dynamically load content on Letters and News
const eventsContent = document.getElementById("events-content");

if (eventsContent) {
    fetch("./documents/post.json")
    .then(response => {
        if(!response.ok) {
            throw new Error("Could not load posts.json");    
        }
        return response.json();
    })
    .then(data => {
        const description = document.createElement("p");
        description.textContent = data.title;

        eventsContent.appendChild(description);

        const activityList = document.createElement("ul");

        data.description.forEach(activity => {
            const listItem = document.createElement("li");
            listItem.textContent = activity;
            activityList.appendChild(listItem);
        });
        eventsContent.appendChild(activityList);

    })
    .catch(error => {
        console.error("Error loading events:", error);
        eventsContent.innerHTML = 
        "<h3>Events:</h3><p>Sorry, activities could not be loaded.</p>";
    });
}
//buttons feature in footer for user to switch between contact us and social medias
function openFooterTab(event, tabName) {

    const tabContents = document.querySelectorAll(".tab-content");

    tabContents.forEach(tab=> {
        tab.classList.remove("active");
    })

    const tabButtons = document.querySelectorAll(".tab-button");

    tabButtons.forEach(button => {
        button.classList.remove("active");
    });
    document.getElementById(tabName).classList.add("active");

    event.currentTarget.classList.add("active");
}
