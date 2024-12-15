document.addEventListener('DOMContentLoaded', function() {
    initializeMissions();
    initializeMissionTimer();
    setupEventListeners();
});

const missions = [
    {
        id: 1,
        title: "Street Light Audit",
        description: "Survey and report non-functioning street lights in your neighborhood",
        category: "daily",
        points: 100,
        progress: 60,
        image: "assets/missions/street-lights.jpeg",
        requirements: ["GPS Location Access", "Camera Permission"],
        steps: [
            "Locate non-functioning street lights",
            "Take a photo of each light",
            "Mark the location on the map",
            "Submit report with description"
        ],
        deadline: "Today, 23:59",
        status: "active"
    },
    {
        id: 2,
        title: "Green Space Guardian",
        description: "Document and report areas that need green space maintenance",
        category: "environmental",
        points: 150,
        progress: 30,
        image: "assets/missions/green-space.jpeg",
        requirements: ["GPS Location Access", "Camera Permission"],
        steps: [
            "Identify areas needing maintenance",
            "Take before photos",
            "Measure approximate area",
            "Submit detailed report"
        ],
        deadline: "3 days left",
        status: "active"
    },
    {
        id: 3,
        title: "Community Clean-up",
        description: "Organize or participate in a local clean-up event",
        category: "weekly",
        points: 300,
        progress: 0,
        image: "assets/missions/cleanup.jpeg",
        requirements: ["Team of 3+", "Clean-up Equipment"],
        steps: [
            "Form a team",
            "Select location",
            "Document before state",
            "Perform clean-up",
            "Document after state"
        ],
        deadline: "5 days left",
        status: "active"
    }
];

function initializeMissions() {
    const grid = document.getElementById('missions-grid');
    missions.forEach(mission => {
        const card = createMissionCard(mission);
        grid.appendChild(card);
    });
}

function createMissionCard(mission) {
    const div = document.createElement('div');
    div.className = 'mission-card cursor-pointer';
    div.setAttribute('data-mission-id', mission.id);
    
    div.innerHTML = `
        <div class="mission-image" style="background-image: url('${mission.image}')">
            <div class="absolute top-4 right-4">
                <span class="status-badge ${mission.status}">
                    ${mission.status.charAt(0).toUpperCase() + mission.status.slice(1)}
                </span>
            </div>
        </div>
        <div class="p-6">
            <div class="flex justify-between items-start">
                <h3 class="text-lg font-semibold text-gray-900">${mission.title}</h3>
                <div class="flex items-center">
                    <svg class="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z"/>
                    </svg>
                    <span class="ml-1 text-sm font-medium text-gray-600">${mission.points} SP</span>
                </div>
            </div>
            <p class="mt-2 text-sm text-gray-600">${mission.description}</p>
            <div class="mt-4">
                <div class="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>${mission.progress}%</span>
                </div>
                <div class="mission-progress">
                    <div class="mission-progress-bar" style="width: ${mission.progress}%"></div>
                </div>
            </div>
            <div class="mt-4 flex justify-between items-center">
                <span class="text-sm text-gray-500">${mission.deadline}</span>
                <button class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    View Details
                </button>
            </div>
        </div>
    `;

    div.addEventListener('click', () => showMissionDetails(mission));
    return div;
}

function showMissionDetails(mission) {
    const modal = document.getElementById('mission-modal');
    const title = document.getElementById('modal-title');
    const content = document.getElementById('modal-content');

    title.textContent = mission.title;
    content.innerHTML = `
        <div class="space-y-4">
            <p class="text-gray-600">${mission.description}</p>
            
            <div class="border-t border-b border-gray-200 py-4">
                <h4 class="text-sm font-medium text-gray-900 mb-2">Requirements:</h4>
                <ul class="list-disc list-inside text-sm text-gray-600">
                    ${mission.requirements.map(req => `<li>${req}</li>`).join('')}
                </ul>
            </div>

            <div>
                <h4 class="text-sm font-medium text-gray-900 mb-2">Steps:</h4>
                <ol class="list-decimal list-inside text-sm text-gray-600">
                    ${mission.steps.map(step => `<li>${step}</li>`).join('')}
                </ol>
            </div>

            <div class="bg-blue-50 rounded-lg p-4 flex items-center justify-between">
                <div class="flex items-center">
                    <svg class="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z" clip-rule="evenodd"/>
                    </svg>
                    <span class="ml-2 text-blue-800 font-medium">${mission.points} SnapPoints</span>
                </div>
                <span class="text-blue-600 font-medium">${mission.deadline}</span>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.classList.add('hidden');
    });
}

function initializeMissionTimer() {
    const timerElement = document.getElementById('mission-timer');
    
    function updateTimer() {
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);
        
        const diff = midnight - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        timerElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

function setupEventListeners() {
    // Category filter buttons
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterMissions(button.dataset.category);
        });
    });

    // Modal close button
    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById('mission-modal').classList.add('hidden');
        });
    });

    // Start mission button
    document.querySelector('.start-mission').addEventListener('click', () => {
        // Add mission start logic here
        document.getElementById('mission-modal').classList.add('hidden');
        // Show success notification
        showNotification('Mission started! Check your tasks for next steps.');
    });
}

function filterMissions(category) {
    const grid = document.getElementById('missions-grid');
    grid.innerHTML = '';

    const filteredMissions = category === 'all' 
        ? missions 
        : missions.filter(mission => mission.category === category);

    filteredMissions.forEach(mission => {
        const card = createMissionCard(mission);
        grid.appendChild(card);
    });
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-y-0';
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateY(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
