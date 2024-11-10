class Post {
  constructor({ userId, id, title, body }) {
    this.userId = userId;
    this.id = id;
    this.title = title;
    this.body = body;
  }

  display() {
    return `
      <div class="post">
        <h2>${this.title}</h2>
        <p>${this.body}</p>
      </div>
    `;
  }

  update(data) {
    if (data.title) this.title = data.title;
    if (data.body) this.body = data.body;
  }
}

class PostManager {
  constructor(posts) {
    this.posts = posts
  }

  displayPosts() {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = this.posts.map(post => post.display()).join('');
  }

  findPostById(id) {
    return this.posts.find(post => post.id === id);
  }

  filterPostsByUserId(userId) {
    return this.posts.filter(post => post.userId === userId);
  }

  updatePost(id, newData) {
    const post = this.findPostById(id);
    if (post) {
      post.update(newData);
      console.log(`Post ${id} updated.`);
    } else {
      console.log(`Post ${id} not found.`);
    }
  }

  deletePost(id) {
    const initialLength = this.posts.length;
    this.posts = this.posts.filter(post => post.id !== id);
    if (this.posts.length < initialLength) {
      console.log(`Post ${id} deleted.`);
    } else {
      console.log(`Post ${id} not found.`);
    }
  }

  analyze(userId) {
    function logMessage(message) {
      const logContainer = document.getElementById('log-container');
      logContainer.innerHTML += `<p>${message}</p>`; // Append message to log container
    }

    logMessage(`Number of post: ${this.posts.length}`);
    const sumTitle = this.posts.reduce((total, post) => total + post.title.length, 0); // Calculate total title length
    logMessage(`Avg Title length: ${sumTitle / this.posts.length}`); // Calculate average
    logMessage(`User ID ${userId} number of post: ${this.filterPostsByUserId(userId).length}`);
  }
}

// Fetch posts and initialize PostManager
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const posts = data.map(postData => new Post(postData)); // Create Post instances
    const postManager = new PostManager(posts); // Create PostManager instance
    // postManager.displayPosts(); // Display posts

    // Example operations
    postManager.analyze(1)
    console.log(postManager.findPostById(1)); // Find post by ID
    console.log(postManager.filterPostsByUserId(1)); // Filter posts by user ID
    postManager.updatePost(1, { title: "Updated Title", body: "Updated body text." }); // Update a post
    postManager.deletePost(2); // Delete a post
    // postManager.displayPosts(); // Display posts after updates
    postManager.analyze(2);
  })
  .catch(error => console.error('There was a problem with the fetch operation:', error));