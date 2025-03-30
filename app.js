// Load posts from localStorage
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postsContainer = document.getElementById('posts-container');

    if (posts.length === 0) {
        postsContainer.innerHTML = '<p>No posts yet. <a href="new-post.html">Create your first post!</a></p>';
        return;
    }

    postsContainer.innerHTML = posts.map(post => `
        <div class="post-card">
            <h2>${post.title}</h2>
            <p>${post.content.substring(0, 100)}...</p>
            <a href="post.html?id=${post.id}">Read More</a>
        </div>
    `).join('');
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', loadPosts);