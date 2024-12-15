document.addEventListener('DOMContentLoaded', function() {
    // Initialize like buttons
    const likeButtons = document.querySelectorAll('.post-interaction');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const countSpan = button.querySelector('span');
            let count = parseInt(countSpan.textContent);
            if (button.classList.contains('liked')) {
                count--;
                button.classList.remove('liked');
                button.style.color = '#4B5563';
            } else {
                count++;
                button.classList.add('liked');
                button.style.color = '#3B82F6';
            }
            countSpan.textContent = count;
        });
    });

    // Handle post creation
    const postForm = document.querySelector('.post-creation');
    const postInput = document.querySelector('textarea');
    const shareButton = document.querySelector('.share-button');

    if (postForm && postInput && shareButton) {
        shareButton.addEventListener('click', function() {
            const content = postInput.value.trim();
            if (content) {
                // Here you would typically send the post to a server
                // For demo purposes, we'll just clear the input
                postInput.value = '';
                alert('Post shared successfully!');
            }
        });

        // Auto-resize textarea
        postInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }

    // Handle hashtag clicks
    const hashtags = document.querySelectorAll('.hashtag');
    hashtags.forEach(hashtag => {
        hashtag.addEventListener('click', function(e) {
            e.preventDefault();
            const tag = this.textContent;
            // Here you would typically filter posts by hashtag
            alert(`Showing posts for ${tag}`);
        });
    });
});
