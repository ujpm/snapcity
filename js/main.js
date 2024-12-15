// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCharts();
    loadSocialFeed();
    loadMissions();
    initializeChat();
    initializeSnapPoints();
    initializeStatCounters();
});

// Navigation handling
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Show dashboard by default
    document.getElementById('dashboard').classList.add('active');
    document.querySelector('a[href="#dashboard"]').classList.add('active');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// SnapPoints System
function initializeSnapPoints() {
    let points = 0;
    const pointsDisplay = document.getElementById('snapPoints');
    
    const rewards = [
        { name: 'Free Bus Pass', cost: 100 },
        { name: 'Community Event Ticket', cost: 200 },
        { name: 'Local Shop Discount', cost: 150 },
        { name: 'Park Facility Booking', cost: 300 },
        { name: 'City Museum Pass', cost: 250 }
    ];

    const activities = [
        { action: 'Report Issue', points: 10, description: 'Report a city issue with photo evidence' },
        { action: 'Verify Report', points: 5, description: 'Confirm another user\'s report' },
        { action: 'Complete Survey', points: 15, description: 'Participate in city planning surveys' },
        { action: 'Attend Event', points: 20, description: 'Participate in community events' },
        { action: 'Submit Feedback', points: 10, description: 'Provide detailed feedback on city services' }
    ];

    // Display available activities and rewards
    const missionsList = document.getElementById('missionsList');
    if (missionsList) {
        const activitiesHtml = activities.map(activity => `
            <div class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div class="flex justify-between items-center mb-2">
                    <h4 class="font-semibold text-lg">${activity.action}</h4>
                    <span class="text-blue-600 font-bold">+${activity.points} SP</span>
                </div>
                <p class="text-gray-600">${activity.description}</p>
                <button onclick="earnPoints(${activity.points}, '${activity.action}')" 
                        class="mt-3 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
                    Complete Activity
                </button>
            </div>
        `).join('');

        const rewardsHtml = rewards.map(reward => `
            <div class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div class="flex justify-between items-center mb-2">
                    <h4 class="font-semibold text-lg">${reward.name}</h4>
                    <span class="text-green-600 font-bold">${reward.cost} SP</span>
                </div>
                <button onclick="redeemReward('${reward.name}', ${reward.cost})" 
                        class="mt-3 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors">
                    Redeem Reward
                </button>
            </div>
        `).join('');

        missionsList.innerHTML = `
            <div class="col-span-full mb-6">
                <h2 class="text-2xl font-bold mb-4">Earn SnapPoints</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${activitiesHtml}
                </div>
                <h2 class="text-2xl font-bold my-6">Available Rewards</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${rewardsHtml}
                </div>
            </div>
        `;
    }

    // Function to earn points
    window.earnPoints = function(amount, activity) {
        points += amount;
        updatePointsDisplay(points);
        showNotification(`Earned ${amount} SP for ${activity}!`, 'success');
    };

    // Function to redeem rewards
    window.redeemReward = function(rewardName, cost) {
        if (points >= cost) {
            points -= cost;
            updatePointsDisplay(points);
            showNotification(`Redeemed ${rewardName} for ${cost} SP!`, 'success');
        } else {
            showNotification(`Not enough points to redeem ${rewardName}`, 'error');
        }
    };

    function updatePointsDisplay(value) {
        pointsDisplay.textContent = `${value} SP`;
        pointsDisplay.classList.add('animate-bounce');
        setTimeout(() => pointsDisplay.classList.remove('animate-bounce'), 1000);
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white animate-fadeIn`;
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.classList.add('animate-fadeOut');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
}

// Initialize dashboard charts
function initializeCharts() {
    // Active Issues Chart
    const issuesCtx = document.getElementById('issuesChart')?.getContext('2d');
    if (issuesCtx) {
        new Chart(issuesCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Active Issues',
                    data: [15, 18, 24, 20, 15, 12, 24],
                    borderColor: 'rgb(59, 130, 246)',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(59, 130, 246, 0.1)'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Add more chart initializations here...
}

// Load social feed with mock data
function loadSocialFeed() {
    const feed = document.getElementById('socialFeed');
    if (!feed) return;

    const posts = [
        {
            user: 'Sarah M.',
            content: 'Just reported a pothole on Main St. Hope it gets fixed soon! #CityMaintenance',
            time: '5m ago',
            likes: 12,
            comments: 3
        },
        {
            user: 'Mike R.',
            content: 'Great community cleanup event today! Earned 50 SP and met amazing neighbors ',
            time: '15m ago',
            likes: 24,
            comments: 7
        },
        // Add more mock posts...
    ];

    feed.innerHTML = posts.map(post => `
        <div class="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <div class="flex items-center mb-2">
                <div class="font-semibold">${post.user}</div>
                <div class="text-gray-500 text-sm ml-2">${post.time}</div>
            </div>
            <p class="text-gray-700">${post.content}</p>
            <div class="flex items-center mt-3 text-gray-500 text-sm">
                <button class="flex items-center hover:text-blue-600">
                    <svg class="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    ${post.likes}
                </button>
                <button class="flex items-center ml-4 hover:text-blue-600">
                    <svg class="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    ${post.comments}
                </button>
            </div>
        </div>
    `).join('');
}

// Initialize chat functionality
function initializeChat() {
    const chatMessages = document.getElementById('chatMessages');
    const chatForm = document.getElementById('chatForm');
    const minimizeChat = document.getElementById('minimizeChat');

    if (!chatMessages || !chatForm || !minimizeChat) return;

    // Welcome message
    appendMessage('AI', 'Welcome to SnapCity! How can I help you improve our city today?');

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = chatForm.querySelector('input');
        const message = input.value.trim();
        
        if (message) {
            appendMessage('User', message);
            input.value = '';
            
            // Simulate AI response
            setTimeout(() => {
                appendMessage('AI', getAIResponse(message));
            }, 1000);
        }
    });

    minimizeChat.addEventListener('click', () => {
        chatMessages.parentElement.parentElement.classList.toggle('hidden');
    });

    function appendMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message mb-4 ${sender === 'AI' ? 'ml-4' : 'mr-4'}`;
        messageDiv.innerHTML = `
            <div class="${sender === 'AI' ? 'bg-blue-100' : 'bg-gray-100'} rounded-lg p-3">
                <p class="text-sm">${text}</p>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getAIResponse(message) {
        // Simple response logic - can be enhanced with actual AI integration
        const responses = [
            'I understand your concern. I\'ve logged this issue for immediate attention.',
            'Thank you for your feedback! This will help improve our city services.',
            'I\'ve added this to our community discussion board. Other citizens can now vote on this issue.',
            'Great suggestion! I\'ve forwarded this to the relevant department.',
            'Would you like to earn SnapPoints by creating a detailed report about this?'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Load and display missions with interactive features
function loadMissions() {
    const mockMissions = [
        {
            title: 'Report Road Issues',
            description: 'Submit photos of potholes or road damage in your area',
            reward: 50,
            difficulty: 'Easy',
            timeLeft: '2 days',
            progress: 60
        },
        {
            title: 'Community Survey',
            description: 'Complete the monthly citizen satisfaction survey',
            reward: 30,
            difficulty: 'Easy',
            timeLeft: '5 days',
            progress: 100
        },
        {
            title: 'Green Initiative',
            description: 'Document and report areas needing tree planting',
            reward: 100,
            difficulty: 'Medium',
            timeLeft: '1 week',
            progress: 25
        }
    ];

    const missionsList = document.getElementById('missionsList');
    missionsList.innerHTML = mockMissions.map(mission => `
        <div class="border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors">
            <div class="flex justify-between items-start">
                <h4 class="font-semibold">${mission.title}</h4>
                <div class="flex items-center">
                    <i class="fas fa-coins text-yellow-500 mr-1"></i>
                    <span class="text-sm font-semibold">${mission.reward} SP</span>
                </div>
            </div>
            <p class="text-gray-600 text-sm mt-2">${mission.description}</p>
            <div class="mt-4">
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                         style="width: ${mission.progress}%"></div>
                </div>
            </div>
            <div class="flex justify-between items-center mt-4 text-sm">
                <span class="text-gray-500">${mission.difficulty}</span>
                <span class="text-blue-600">${mission.timeLeft} left</span>
            </div>
        </div>
    `).join('');
}

// Initialize feedback functionality
function initializeFeedback() {
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackList = document.getElementById('feedbackList');

    // Mock feedback data
    const recentFeedback = [
        {
            category: 'Infrastructure',
            description: 'Street lights not working on Oak Avenue',
            status: 'Under Review',
            timestamp: '1 hour ago'
        },
        {
            category: 'Environment',
            description: 'Need more recycling bins in Central Park',
            status: 'Approved',
            timestamp: '2 hours ago'
        },
        {
            category: 'Safety',
            description: 'Crosswalk signals malfunctioning at Main St intersection',
            status: 'In Progress',
            timestamp: '3 hours ago'
        }
    ];

    // Display recent feedback
    feedbackList.innerHTML = recentFeedback.map(feedback => `
        <div class="border-b pb-4">
            <div class="flex justify-between items-start">
                <span class="font-semibold">${feedback.category}</span>
                <span class="text-sm px-2 py-1 rounded-full ${
                    feedback.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    feedback.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                }">${feedback.status}</span>
            </div>
            <p class="text-gray-600 mt-2">${feedback.description}</p>
            <span class="text-sm text-gray-500">${feedback.timestamp}</span>
        </div>
    `).join('');

    // Handle form submission
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(feedbackForm);
        
        // Show success message
        const alert = document.createElement('div');
        alert.className = 'fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 animate-fadeIn';
        alert.innerHTML = `
            <p class="font-bold">Success!</p>
            <p>Your feedback has been submitted. Thank you for helping improve our city!</p>
        `;
        document.body.appendChild(alert);
        
        // Remove alert after 3 seconds
        setTimeout(() => {
            alert.classList.add('animate-fadeOut');
            setTimeout(() => document.body.removeChild(alert), 500);
        }, 3000);
        
        // Reset form
        feedbackForm.reset();
    });
}

// Initialize animated counter for statistics
function initializeStatCounters() {
    const stats = document.querySelectorAll('[data-count]');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-count'));
                animateCounter(target, countTo);
                observer.unobserve(target);
            }
        });
    }, options);

    stats.forEach(stat => observer.observe(stat));

    function animateCounter(target, countTo) {
        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = countTo / (duration / 16); // 60fps
        
        function updateCount() {
            count += increment;
            if (count < countTo) {
                target.textContent = Math.floor(count).toLocaleString();
                requestAnimationFrame(updateCount);
            } else {
                target.textContent = countTo.toLocaleString();
            }
        }
        
        updateCount();
    }
}
