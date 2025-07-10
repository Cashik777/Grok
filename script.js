document.addEventListener("DOMContentLoaded", () => {
    // Initialize Particles.js
    particlesJS("particles-js", {
        particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: "#FFD700" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: false },
            move: { enable: true, speed: 1, direction: "none", random: true }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } },
            modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } }
        }
    });

    // Initialize Chart.js
    const ctx = document.getElementById("chart-container").getContext("2d");
    const chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [
                {
                    label: "Deposits",
                    data: [12000, 15000, 18000, 14000, 20000, 22000, 24895],
                    borderColor: "#44FF44",
                    fill: false
                },
                {
                    label: "Withdrawals",
                    data: [5000, 7000, 6000, 8000, 9000, 8500, 9843],
                    borderColor: "#FF4444",
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Player Data
    const players = [
        { id: 1, name: "John D.", avatar: "https://i.pravatar.cc/40?img=1", status: "active", lastDeposit: 1200, totalWagered: 12450 },
        { id: 2, name: "Marie C.", avatar: "https://i.pravatar.cc/40?img=2", status: "vip", lastDeposit: 3500, totalWagered: 42800 },
        { id: 3, name: "Michael S.", avatar: "https://i.pravatar.cc/40?img=3", status: "inactive", lastDeposit: 0, totalWagered: 3200 },
        { id: 4, name: "Sarah L.", avatar: "https://i.pravatar.cc/40?img=4", status: "active", lastDeposit: 800, totalWagered: 7500 },
        { id: 5, name: "David K.", avatar: "https://i.pravatar.cc/40?img=5", status: "vip", lastDeposit: 5200, totalWagered: 68300 }
    ];

    // DOM Elements
    const addPlayerBtn = document.getElementById("add-player-btn");
    const addPlayerModal = document.getElementById("add-player-modal");
    const closeModal = document.querySelector(".close-modal");
    const playerForm = document.getElementById("player-form");
    const notification = document.getElementById("notification");
    const liveChat = document.getElementById("live-chat");
    const feed = document.getElementById("feed");
    const spinBonusBtn = document.getElementById("spin-bonus");

    // Hide Loader
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
    }, 2000);

    // Live Feed
    const activities = [
        "John D. just deposited $1,200! 🎉",
        "Marie C. claimed a VIP bonus! 🇨🇦",
        "Sarah L. won $2,500 on slots! 💰",
        "David K. activated a 100% match bonus! 🎰"
    ];
    let feedIndex = 0;
    setInterval(() => {
        const newFeed = document.createElement("div");
        newFeed.className = "feed-item";
        newFeed.textContent = activities[feedIndex % activities.length];
        feed.prepend(newFeed);
        if (feed.children.length > 3) feed.removeChild(feed.lastChild);
        feedIndex++;
    }, 5000);

    // Update Players Table
    function updatePlayersTable() {
        const tbody = document.getElementById("players-table-body");
        tbody.innerHTML = "";
        players.forEach(player => {
            const row = document.createElement("tr");
            let statusClass = player.status === "inactive" ? "status-inactive" : player.status === "vip" ? "status-vip" : "status-active";
            row.innerHTML = `
                <td><div class="player-name"><img src="${player.avatar}" alt="Player" class="player-avatar">${player.name}</div></td>
                <td><span class="player-status ${statusClass}">${player.status.charAt(0).toUpperCase() + player.status.slice(1)}</span></td>
                <td>$${player.lastDeposit.toLocaleString()}</td>
                <td>$${player.totalWagered.toLocaleString()}</td>
                <td>
                    <button class="action-btn" title="Edit">✏️</button>
                    <button class="action-btn" title="Message">💬</button>
                    <button class="action-btn" title="Ban">🚫</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // Show Notification
    function showNotification(message, type) {
        const notificationMessage = notification.querySelector(".notification-message");
        const notificationIcon = notification.querySelector(".notification-icon");
        notification.className = `notification notification-${type}`;
        notificationMessage.textContent = message;
        notificationIcon.textContent = type === "success" ? "✓" : "✗";
        notification.classList.add("show");
        setTimeout(() => {
            notification.classList.remove("show");
        }, 3000);
    }

    // Add Player
    addPlayerBtn.addEventListener("click", () => {
        addPlayerModal.style.display = "flex";
    });

    closeModal.addEventListener("click", () => {
        addPlayerModal.style.display = "none";
    });

    playerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newPlayer = {
            id: players.length + 1,
            name: document.getElementById("player-name").value,
            avatar: `https://i.pravatar.cc/40?img=${players.length + 10}`,
            status: document.getElementById("player-status").value,
            lastDeposit: 0,
            totalWagered: 0
        };
        players.unshift(newPlayer);
        updatePlayersTable();
        addPlayerModal.style.display = "none";
        playerForm.reset();
        showNotification("Player added successfully!", "success");
    });

    // Live Chat
    liveChat.addEventListener("click", () => {
        alert("Live chat is currently unavailable. Please email support@goldenvault.ca");
    });

    // Spin Bonus Animation
    spinBonusBtn.addEventListener("click", () => {
        const bonuses = ["100% Match Bonus", "50 Free Spins", "200% Deposit Bonus", "$100 Cashback"];
        const randomBonus = bonuses[Math.floor(Math.random() * bonuses.length)];
        showNotification(`You won a ${randomBonus}!`, "success");
    });

    // Simulate Real-time Updates
    setInterval(() => {
        players.forEach(player => {
            if (player.status !== "inactive") {
                player.lastDeposit += Math.floor(Math.random() * 100);
                player.totalWagered += Math.floor(Math.random() * 500);
            }
        });
        updatePlayersTable();
    }, 5000);

    // Initial Setup
    updatePlayersTable();
});
