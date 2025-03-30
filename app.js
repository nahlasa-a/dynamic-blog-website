function handlePostForm() {
    const form = document.getElementById('post-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('title').value.trim();
            const content = document.getElementById('content').value.trim();
            
            if (!title || !content) {
                alert('Please insert both title and content fields.');
                return;
            }
            
            const newPost = {
                id: Date.now().toString(),
                title,
                content,
                createdAt: new Date().toISOString()
            };
            
            savePost(newPost);
            
            window.location.href = 'index.html?t=' + Date.now();
        });
    }
}

function savePost(post) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.unshift(post); 
    localStorage.setItem('posts', JSON.stringify(posts));
}

document.addEventListener('DOMContentLoaded', function() {
    loadPosts();
    handlePostForm(); 
});

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postsContainer = document.getElementById('posts-container');
    
    if (!postsContainer) return;
    
    if (posts.length === 0) {
        postsContainer.innerHTML = '<p>No posts yet. <a href="new-post.html">Create your first post!</a></p>';
        return;
    }
    
    postsContainer.innerHTML = '';
    
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post-card';
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content.substring(0, 100)}${post.content.length > 100 ? '...' : ''}</p>
            <a href="post.html?id=${post.id}">Read More</a>
        `;
        postsContainer.appendChild(postElement);
    });
}

document.addEventListener('DOMContentLoaded', loadPosts);