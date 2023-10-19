const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Mock in-memory database for blog posts
const blogPosts = [];

// Define routes for CRUD operations

// Create a new blog post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const newPost = {
    id: Date.now().toString(),
    title,
    content,
  };

  blogPosts.push(newPost);
  res.status(201).json(newPost);
});

// Read all blog posts
app.get('/posts', (req, res) => {
  res.json(blogPosts);
});

// Read a specific blog post by ID
app.get('/posts/:id', (req, res) => {
  const post = blogPosts.find((p) => p.id === req.params.id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
});

// Update a blog post by ID
app.put('/posts/:id', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const postIndex = blogPosts.findIndex((p) => p.id === req.params.id);
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const updatedPost = {
    id: req.params.id,
    title,
    content,
  };

  blogPosts[postIndex] = updatedPost;
  res.json(updatedPost);
});

// Delete a blog post by ID
app.delete('/posts/:id', (req, res) => {
  const postIndex = blogPosts.findIndex((p) => p.id === req.params.id);
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  blogPosts.splice(postIndex, 1);
  res.sendStatus(204); // No content
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
