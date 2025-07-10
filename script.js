document.addEventListener("DOMContentLoaded", () => {
    // Hide loader after 2 seconds
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
    }, 2000);

    // Live Feed Animation
    const feed = document.getElementById("feed");
    const wins = [
        "Jessica R. just won $7,100 at Royal Panda 🎉",
        "Michael S. won $4,200 at Spin Casino 🇨🇦",
        "Emma L. hit $9,800 at Jackpot City! 💰",
        "Liam T. scored $5,500 at Royal Panda 🎰"
    ];
    let index = 0;
    setInterval(() => {
        const newFeed = document.createElement("div");
        newFeed.className = "feed-item";
        newFeed.textContent = wins[index % wins.length];
        feed.prepend(newFeed);
        if (feed.children.length > 3) feed.removeChild(feed.lastChild);
        index++;
    }, 5000);

    // Accordion Functionality
    const headers = document.querySelectorAll(".accordion-header");
    headers.forEach(header => {
        header.addEventListener("click", () => {
            const content = header.nextElementSibling;
            content.classList.toggle("active");
        });
    });

    // Filter Buttons
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });

    // Registration Counter
    let count = 1297;
    setInterval(() => {
        count += Math.floor(Math.random() * 3);
        document.querySelector(".registration-counter").textContent = `${count} players registered today!`;
    }, 10000);

    // Live Chat Pop-up
    const chat = document.getElementById("live-chat");
    chat.addEventListener("click", () => {
        alert("Live chat is currently unavailable. Please email support@casinofortune.ca");
    });
});