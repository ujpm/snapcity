document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    loadActivityFeed();
    setupEventListeners();
});

function initializeCharts() {
    // Activity Timeline Chart
    const activityCtx = document.getElementById('activityChart').getContext('2d');
    const activityChart = new Chart(activityCtx, {
        type: 'line',
        data: {
            labels: generateLastNDays(7),
            datasets: [{
                label: 'Issues Reported',
                data: [65, 59, 80, 81, 56, 55, 40],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Issues Resolved',
                data: [28, 48, 40, 19, 86, 27, 90],
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Categories Chart
    const categoriesCtx = document.getElementById('categoriesChart').getContext('2d');
    const categoriesChart = new Chart(categoriesCtx, {
        type: 'doughnut',
        data: {
            labels: ['Infrastructure', 'Environment', 'Safety', 'Transportation', 'Other'],
            datasets: [{
                data: [30, 25, 20, 15, 10],
                backgroundColor: [
                    'rgb(59, 130, 246)',
                    'rgb(16, 185, 129)',
                    'rgb(245, 158, 11)',
                    'rgb(139, 92, 246)',
                    'rgb(107, 114, 128)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function loadActivityFeed() {
    const activityFeed = document.getElementById('activity-feed');
    const activities = [
        {
            type: 'issue',
            title: 'Pothole reported on Main Street',
            time: '2 hours ago',
            status: 'pending',
            icon: 'alert'
        },
        {
            type: 'resolution',
            title: 'Street light fixed on Park Avenue',
            time: '4 hours ago',
            status: 'completed',
            icon: 'check'
        },
        {
            type: 'points',
            title: 'John earned 50 SnapPoints',
            time: '5 hours ago',
            status: 'success',
            icon: 'star'
        }
    ];

    activities.forEach(activity => {
        const activityItem = createActivityItem(activity);
        activityFeed.appendChild(activityItem);
    });
}

function createActivityItem(activity) {
    const div = document.createElement('div');
    div.className = 'activity-item flex items-center';
    
    const iconColor = {
        'pending': 'text-yellow-500',
        'completed': 'text-green-500',
        'success': 'text-blue-500'
    }[activity.status];

    div.innerHTML = `
        <div class="activity-icon ${iconColor}">
            ${getActivityIcon(activity.icon)}
        </div>
        <div class="activity-content">
            <p class="text-sm font-medium text-gray-900">${activity.title}</p>
            <p class="activity-time">${activity.time}</p>
        </div>
    `;

    return div;
}

function getActivityIcon(type) {
    const icons = {
        'alert': `<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>`,
        'check': `<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>`,
        'star': `<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
        </svg>`
    };
    return icons[type] || '';
}

function generateLastNDays(n) {
    const dates = [];
    for (let i = n - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    return dates;
}

function setupEventListeners() {
    // Add click handlers for stat cards
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('click', function() {
            const link = this.querySelector('a');
            if (link) link.click();
        });
    });
}

// Update SnapPoints counter periodically
setInterval(() => {
    const snappoints = document.getElementById('snappoints-count');
    if (snappoints) {
        const currentPoints = parseInt(snappoints.textContent);
        snappoints.textContent = currentPoints + Math.floor(Math.random() * 5);
    }
}, 30000);
