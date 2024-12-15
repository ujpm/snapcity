document.addEventListener('DOMContentLoaded', function() {
    initializeRewards();
    loadRedemptionHistory();
    setupEventListeners();
});

const rewards = [
    {
        id: 1,
        title: "Free Bus Pass",
        description: "One month of unlimited bus rides in the city",
        category: "transport",
        points: 500,
        image: "assets/rewards/bus-pass.jpeg",
        availability: "In Stock",
        validityPeriod: "30 days",
        termsConditions: [
            "Valid for all city bus routes",
            "Non-transferable",
            "Must be activated within 30 days of redemption"
        ],
        popularity: "High"
    },
    {
        id: 2,
        title: "Community Event Ticket",
        description: "VIP access to the upcoming city festival",
        category: "events",
        points: 300,
        image: "assets/rewards/event-ticket.jpeg",
        availability: "Limited",
        validityPeriod: "Valid for next event",
        termsConditions: [
            "One-time use",
            "Event date: December 25, 2024",
            "Includes VIP area access"
        ],
        popularity: "Medium"
    },
    {
        id: 3,
        title: "City Bike Rental",
        description: "3-day city bike rental pass",
        category: "transport",
        points: 200,
        image: "assets/rewards/bike-rental.jpeg",
        availability: "In Stock",
        validityPeriod: "3 days",
        termsConditions: [
            "Requires security deposit",
            "Includes helmet rental",
            "Must be 18 or older"
        ],
        popularity: "High"
    }
];

function initializeRewards() {
    const grid = document.getElementById('rewards-grid');
    rewards.forEach(reward => {
        const card = createRewardCard(reward);
        grid.appendChild(card);
    });
}

function createRewardCard(reward) {
    const div = document.createElement('div');
    div.className = 'reward-card cursor-pointer';
    div.setAttribute('data-reward-id', reward.id);
    
    const pointsClass = getPointsClass(reward.points);
    
    div.innerHTML = `
        <div class="relative overflow-hidden">
            <img class="reward-image" src="${reward.image}" alt="${reward.title}">
            <div class="absolute top-4 right-4">
                <span class="points-badge ${pointsClass}">
                    ${reward.points} SP
                </span>
            </div>
        </div>
        <div class="p-6">
            <div class="flex justify-between items-start">
                <h3 class="text-lg font-semibold text-gray-900">${reward.title}</h3>
                <span class="text-sm font-medium text-green-600">${reward.availability}</span>
            </div>
            <p class="mt-2 text-sm text-gray-600">${reward.description}</p>
            <div class="mt-4 flex justify-between items-center">
                <span class="text-sm text-gray-500">Valid for: ${reward.validityPeriod}</span>
                <button class="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                    View Details
                </button>
            </div>
        </div>
    `;

    div.addEventListener('click', () => showRewardDetails(reward));
    return div;
}

function getPointsClass(points) {
    const currentPoints = parseInt(document.getElementById('snappoints-count').textContent);
    if (points <= currentPoints) return 'affordable';
    if (points > currentPoints * 2) return 'expensive';
    return '';
}

function showRewardDetails(reward) {
    const modal = document.getElementById('reward-modal');
    const title = document.getElementById('modal-title');
    const content = document.getElementById('modal-content');

    title.textContent = reward.title;
    content.innerHTML = `
        <div class="space-y-4">
            <img src="${reward.image}" alt="${reward.title}" class="w-full h-48 object-cover rounded-lg">
            
            <p class="text-gray-600">${reward.description}</p>
            
            <div class="flex items-center justify-between py-2 border-b border-gray-200">
                <span class="text-gray-600">Cost</span>
                <span class="font-medium text-purple-600">${reward.points} SP</span>
            </div>
            
            <div class="flex items-center justify-between py-2 border-b border-gray-200">
                <span class="text-gray-600">Availability</span>
                <span class="font-medium ${reward.availability === 'In Stock' ? 'text-green-600' : 'text-yellow-600'}">
                    ${reward.availability}
                </span>
            </div>
            
            <div class="flex items-center justify-between py-2 border-b border-gray-200">
                <span class="text-gray-600">Validity</span>
                <span class="font-medium text-gray-900">${reward.validityPeriod}</span>
            </div>

            <div>
                <h4 class="text-sm font-medium text-gray-900 mb-2">Terms & Conditions:</h4>
                <ul class="list-disc list-inside text-sm text-gray-600">
                    ${reward.termsConditions.map(term => `<li>${term}</li>`).join('')}
                </ul>
            </div>

            <div class="bg-purple-50 rounded-lg p-4">
                <div class="flex items-center">
                    <svg class="h-5 w-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                    </svg>
                    <span class="ml-2 text-sm text-purple-800">
                        Popularity: ${reward.popularity} | Redeemed by ${Math.floor(Math.random() * 100) + 50} users
                    </span>
                </div>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
}

function loadRedemptionHistory() {
    const history = document.getElementById('redemption-history');
    const redemptions = [
        {
            reward: "Monthly Bus Pass",
            date: "2024-12-14",
            status: "completed",
            points: 500
        },
        {
            reward: "Community Event Ticket",
            date: "2024-12-10",
            status: "pending",
            points: 300
        }
    ];

    redemptions.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item flex items-center justify-between';
        
        div.innerHTML = `
            <div class="flex items-center">
                <div class="flex-shrink-0">
                    <span class="history-status ${item.status}">
                        ${item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-900">${item.reward}</p>
                    <p class="text-sm text-gray-500">${formatDate(item.date)}</p>
                </div>
            </div>
            <div class="text-sm text-gray-500">
                -${item.points} SP
            </div>
        `;

        history.appendChild(div);
    });
}

function setupEventListeners() {
    // Category filter buttons
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterRewards(button.dataset.category);
        });
    });

    // Modal close button
    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById('reward-modal').classList.add('hidden');
        });
    });

    // Redeem reward button
    document.querySelector('.redeem-reward').addEventListener('click', () => {
        const currentPoints = parseInt(document.getElementById('snappoints-count').textContent);
        const rewardPoints = parseInt(document.querySelector('.points-badge').textContent);
        
        if (currentPoints >= rewardPoints) {
            document.getElementById('reward-modal').classList.add('hidden');
            showConfetti();
            showNotification('Reward redeemed successfully! Check your email for details.');
        } else {
            showNotification('Not enough SnapPoints to redeem this reward.', 'error');
        }
    });
}

function filterRewards(category) {
    const grid = document.getElementById('rewards-grid');
    grid.innerHTML = '';

    const filteredRewards = category === 'all' 
        ? rewards 
        : rewards.filter(reward => reward.category === category);

    filteredRewards.forEach(reward => {
        const card = createRewardCard(reward);
        grid.appendChild(card);
    });
}

function showConfetti() {
    const colors = ['#FFD700', '#FF6B6B', '#4CAF50', '#2196F3'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed bottom-20 right-4 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-y-0 ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateY(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}
