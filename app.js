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

function handlePostPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    if (!postId) {
        window.location.href = 'index.html';
        return;
    }

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts.find(p => p.id === postId);

    if (!post) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-content').textContent = post.content;
    document.getElementById('created-at').textContent = new Date(post.createdAt).toLocaleString();

    document.getElementById('edit-btn').addEventListener('click', function() {
        document.getElementById('view-mode').style.display = 'none';
        document.getElementById('edit-form').style.display = 'block';
        
        document.getElementById('edit-title').value = post.title;
        document.getElementById('edit-content').value = post.content;
    });

    document.getElementById('cancel-edit').addEventListener('click', function() {
        document.getElementById('view-mode').style.display = 'block';
        document.getElementById('edit-form').style.display = 'none';
    });

    document.getElementById('edit-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const updatedTitle = document.getElementById('edit-title').value.trim();
        const updatedContent = document.getElementById('edit-content').value.trim();
        
        if (!updatedTitle || !updatedContent) {
            alert('Please fill in all fields');
            return;
        }
        
        const postIndex = posts.findIndex(p => p.id === postId);
        if (postIndex !== -1) {
            posts[postIndex] = {
                ...posts[postIndex],
                title: updatedTitle,
                content: updatedContent
            };
            
            localStorage.setItem('posts', JSON.stringify(posts));
            window.location.reload(); 
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadPosts();
    handlePostForm();
    handlePostPage(); 
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