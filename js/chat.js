document.addEventListener('DOMContentLoaded', function() {
    const chatWidget = document.getElementById('chat-widget');
    const chatBody = chatWidget.querySelector('.chat-body');
    const chatHeader = chatWidget.querySelector('.chat-header');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = chatWidget.querySelector('.chat-input');
    const quickResponses = document.querySelector('.quick-responses');

    // Initialize collapsed state
    chatWidget.classList.add('collapsed');
    chatBody.style.display = 'none';

    // Welcome messages to be shown when chat is first opened
    const welcomeMessages = [
        {
            type: 'assistant',
            message: '👋 Welcome to SnapCity! I\'m your personal assistant, here to help you make our city better.',
            delay: 0
        },
        {
            type: 'assistant',
            message: '🌟 You can ask me about:<br>' +
                    '• Current missions and rewards<br>' +
                    '• How to report urban issues<br>' +
                    '• Your impact score and achievements<br>' +
                    '• Community events and activities',
            delay: 800
        },
        {
            type: 'assistant',
            message: 'How can I assist you today? Feel free to select a quick response below or type your own question! 😊',
            delay: 1600
        }
    ];

    // Quick response suggestions
    const quickResponseOptions = [
        {
            text: "🎯 Active Missions",
            value: "What missions are currently available?"
        },
        {
            text: "🏆 My Achievements",
            value: "Show me my achievements and impact score"
        },
        {
            text: "🚨 Report Issue",
            value: "I want to report an urban issue"
        },
        {
            text: "📅 Community Events",
            value: "What community events are happening soon?"
        },
        {
            text: "💡 How It Works",
            value: "Explain how SnapCity works"
        },
        {
            text: "🎮 Earning Points",
            value: "How can I earn more points?"
        }
    ];

    // Add a message to the chat
    function addMessage(type, content, isHtml = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type}-message mb-4 ${type === 'assistant' ? 'flex' : ''}`;
        
        let messageContent = `
            ${type === 'assistant' ? '<div class="assistant-avatar mr-2"><img src="images/assistant-avatar.png" alt="Assistant" class="w-8 h-8 rounded-full"></div>' : ''}
            <div class="message-content p-3 rounded-lg ${type === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-100'}">
                ${isHtml ? content : content.replace(/\n/g, '<br>')}
            </div>
        `;
        
        messageDiv.innerHTML = messageContent;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator flex items-center p-2';
        typingDiv.innerHTML = `
            <div class="dot-pulse">
                <div class="dot-pulse__dot"></div>
            </div>
            <span class="text-sm text-gray-500 ml-2">Assistant is typing...</span>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return typingDiv;
    }

    // Initialize quick response buttons
    function initializeQuickResponses() {
        quickResponses.innerHTML = quickResponseOptions.map(option => `
            <button class="quick-response-btn bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-sm mb-2 mr-2 hover:bg-blue-100 transition-colors">
                ${option.text}
            </button>
        `).join('');

        quickResponses.addEventListener('click', function(e) {
            const button = e.target.closest('.quick-response-btn');
            if (button) {
                const selectedOption = quickResponseOptions.find(opt => opt.text === button.textContent.trim());
                if (selectedOption) {
                    handleUserInput(selectedOption.value);
                }
            }
        });
    }

    // Handle user input
    function handleUserInput(message) {
        addMessage('user', message);
        chatInput.value = '';

        // Show typing indicator
        const typingIndicator = showTypingIndicator();

        // Simulate AI response based on user input
        setTimeout(() => {
            typingIndicator.remove();
            let response = '';

            if (message.toLowerCase().includes('mission')) {
                response = '🎯 Here are your active missions:\n\n' +
                          '1. "Green Scout" - Document 3 green spaces in your neighborhood\n' +
                          '2. "Urban Explorer" - Report road conditions in 2 different areas\n' +
                          '3. "Community Champion" - Attend the upcoming town hall meeting';
            } else if (message.toLowerCase().includes('achievement')) {
                response = '🏆 Your Achievements:\n\n' +
                          '• Impact Score: 750 points\n' +
                          '• Rank: Urban Pioneer\n' +
                          '• Completed Missions: 12\n' +
                          '• Community Recognition: 4 badges';
            } else if (message.toLowerCase().includes('report')) {
                response = '🚨 To report an urban issue:\n\n' +
                          '1. Take a photo of the problem\n' +
                          '2. Add location details\n' +
                          '3. Describe the issue\n' +
                          '4. Submit through the "Report" button\n\n' +
                          'Would you like to start a report now?';
            } else if (message.toLowerCase().includes('event')) {
                response = '📅 Upcoming Community Events:\n\n' +
                          '• Dec 20 - Winter Community Cleanup\n' +
                          '• Dec 23 - Urban Planning Workshop\n' +
                          '• Dec 25 - Holiday Community Gathering\n' +
                          '• Jan 2 - New Year City Walk';
            } else if (message.toLowerCase().includes('how')) {
                response = '💡 SnapCity works by turning urban improvement into an engaging game!\n\n' +
                          '• Complete missions to earn points\n' +
                          '• Report and fix urban issues\n' +
                          '• Collaborate with your community\n' +
                          '• Earn rewards and recognition';
            } else if (message.toLowerCase().includes('point')) {
                response = '🎮 Earn points through:\n\n' +
                          '• Completing missions: 50-200 points\n' +
                          '• Reporting issues: 25 points\n' +
                          '• Attending events: 100 points\n' +
                          '• Getting solutions implemented: 500 points';
            } else {
                response = 'Thank you for your message! Is there anything specific you\'d like to know about SnapCity? Feel free to use the quick response buttons below or ask me anything! 😊';
            }
            addMessage('assistant', response);
        }, 1500);
    }

    // Toggle chat widget
    function toggleChat() {
        const isCollapsed = chatWidget.classList.contains('collapsed');
        
        if (isCollapsed) {
            // Expanding
            chatWidget.classList.remove('collapsed');
            chatBody.style.display = 'block';
            
            // Show welcome messages if chat is empty
            if (chatMessages.children.length === 0) {
                welcomeMessages.forEach((msg, index) => {
                    setTimeout(() => {
                        addMessage(msg.type, msg.message, true);
                    }, msg.delay);
                });
            }
            
            chatInput.focus();
            chatMessages.scrollTop = chatMessages.scrollHeight;
        } else {
            // Collapsing
            chatWidget.classList.add('collapsed');
            setTimeout(() => {
                chatBody.style.display = 'none';
            }, 300);
        }
    }

    // Add click event listeners
    chatHeader.addEventListener('click', toggleChat);

    // Handle chat input
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim() !== '') {
            handleUserInput(this.value.trim());
        }
    });

    // Initialize quick responses
    initializeQuickResponses();
});
