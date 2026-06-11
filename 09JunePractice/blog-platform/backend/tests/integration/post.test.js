import request from 'supertest';
import app from '../../app.js';
import User from '../../models/User.js';
import Post from '../../models/Post.js';
import Comment from '../../models/Comment.js';
import { generateToken } from '../../services/authService.js';

describe('Posts Feed API (GET /api/posts)', () => {
  let authorId;

  beforeEach(async () => {
    // Seed an author
    const author = await User.create({
      username: 'jane_doe',
      email: 'jane@doe.com',
      password: 'SecurePassword123',
    });
    authorId = author._id;

    // Seed posts
    await Post.create([
      {
        title: 'React 19 Overview',
        slug: 'react-19-overview',
        description: 'Explore the new features in React 19.',
        content: 'Full content of React 19 overview.',
        status: 'Published',
        category: 'Technology',
        tags: ['React', 'JS'],
        author: authorId,
        views: 10,
      },
      {
        title: 'Design Systems',
        slug: 'design-systems',
        description: 'Creating maintainable layouts.',
        content: 'Full content of Design Systems.',
        status: 'Published',
        category: 'Design',
        tags: ['Design', 'CSS'],
        author: authorId,
        views: 20,
      },
      {
        title: 'Draft Post Idea',
        slug: 'draft-post-idea',
        description: 'This is a draft.',
        content: 'Not published yet.',
        status: 'Draft',
        category: 'Technology',
        tags: ['Draft'],
        author: authorId,
        views: 0,
      },
      {
        title: 'Node 22 LTS Features',
        slug: 'node-22-lts-features',
        description: 'ESM and native test runners.',
        content: 'Full content of Node 22.',
        status: 'Published',
        category: 'Technology',
        tags: ['Node', 'JS'],
        author: authorId,
        views: 30,
      },
    ]);
  });

  it('should return 200 OK and only published posts sorted by date', async () => {
    const res = await request(app)
      .get('/api/posts')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('posts');
    expect(res.body.posts).toHaveLength(3); // React 19, Design Systems, Node 22
    expect(res.body.posts[0].slug).toBe('node-22-lts-features'); // Most recent first
    expect(res.body.posts[0].author.username).toBe('jane_doe');
    expect(res.body.posts[0].status).toBe('Published');
    expect(res.body.totalPosts).toBe(3);
    expect(res.body.totalPages).toBe(1);
    expect(res.body.currentPage).toBe(1);
  });

  it('should filter posts by category', async () => {
    const res = await request(app)
      .get('/api/posts?category=Design')
      .expect(200);

    expect(res.body.posts).toHaveLength(1);
    expect(res.body.posts[0].category).toBe('Design');
    expect(res.body.posts[0].title).toBe('Design Systems');
  });

  it('should filter posts by tag', async () => {
    const res = await request(app)
      .get('/api/posts?tag=JS')
      .expect(200);

    expect(res.body.posts).toHaveLength(2); // React 19, Node 22 both have JS tag
    expect(res.body.posts.map((p) => p.slug)).toContain('react-19-overview');
    expect(res.body.posts.map((p) => p.slug)).toContain('node-22-lts-features');
  });

  it('should search posts by title or description matching query', async () => {
    const res = await request(app)
      .get('/api/posts?search=React')
      .expect(200);

    expect(res.body.posts).toHaveLength(1);
    expect(res.body.posts[0].title).toBe('React 19 Overview');
  });

  it('should handle pagination limits and offsets', async () => {
    const res = await request(app)
      .get('/api/posts?page=1&limit=2')
      .expect(200);

    expect(res.body.posts).toHaveLength(2); // React 19, Node 22 (sorted)
    expect(res.body.currentPage).toBe(1);
    expect(res.body.totalPages).toBe(2); // 3 published posts / 2 limit = 2 pages
    expect(res.body.totalPosts).toBe(3);

    const resPage2 = await request(app)
      .get('/api/posts?page=2&limit=2')
      .expect(200);

    expect(resPage2.body.posts).toHaveLength(1); // Design Systems
    expect(resPage2.body.currentPage).toBe(2);
  });

  it('should return correct categories and counts', async () => {
    const res = await request(app)
      .get('/api/categories')
      .expect(200);

    expect(res.body).toHaveLength(2);
    expect(res.body).toContainEqual({ name: 'Technology', count: 2 });
    expect(res.body).toContainEqual({ name: 'Design', count: 1 });
  });

  it('should return sorted unique tags', async () => {
    const res = await request(app)
      .get('/api/tags')
      .expect(200);

    expect(res.body).toEqual(['CSS', 'Design', 'JS', 'Node', 'React']);
  });

  it('should ignore whitespace-only search query and return all published posts', async () => {
    const res = await request(app)
      .get('/api/posts?search=   ')
      .expect(200);

    expect(res.body.posts).toHaveLength(3); // All 3 published posts
  });

  it('should escape regex special characters in search query safely', async () => {
    const res = await request(app)
      .get('/api/posts?search=React.*')
      .expect(200);

    expect(res.body.posts).toHaveLength(0); // Safely escaped, no match
  });

  it('should return 200 OK and post details for a valid published slug', async () => {
    const res = await request(app)
      .get('/api/posts/react-19-overview')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('title');
    expect(res.body.title).toBe('React 19 Overview');
    expect(res.body.slug).toBe('react-19-overview');
    expect(res.body.status).toBe('Published');
    expect(res.body.author.username).toBe('jane_doe');
  });

  it('should return 404 Not Found if slug belongs to a Draft post', async () => {
    const res = await request(app)
      .get('/api/posts/draft-post-idea')
      .expect('Content-Type', /json/)
      .expect(404);

    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toContain('Article not found');
  });

  it('should return 404 Not Found if slug does not exist', async () => {
    const res = await request(app)
      .get('/api/posts/nonexistent-slug')
      .expect('Content-Type', /json/)
      .expect(404);

    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toContain('Article not found');
  });
});

describe('Post Creation API (POST /api/posts)', () => {
  let author;
  let token;

  beforeEach(async () => {
    // Seed an author
    author = await User.create({
      username: 'post_author',
      email: 'author@post.com',
      password: 'SecurePassword123',
    });
    token = generateToken(author._id);
  });

  it('should return 201 Created and the post details on success', async () => {
    const postPayload = {
      title: 'A Brand New Article',
      description: 'Intro to the article.',
      content: 'This is the body content of the article.',
      category: 'Tutorial',
      tags: ['new', 'article'],
      status: 'Published',
    };

    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send(postPayload)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe(postPayload.title);
    expect(res.body.slug).toBe('a-brand-new-article');
    expect(res.body.description).toBe(postPayload.description);
    expect(res.body.content).toBe(postPayload.content);
    expect(res.body.category).toBe(postPayload.category);
    expect(res.body.status).toBe(postPayload.status);
    expect(res.body.author.toString()).toBe(author._id.toString());
  });

  it('should automatically resolve slug collisions by appending index suffixes', async () => {
    const postPayload1 = {
      title: 'Collision Title',
      content: 'Content 1',
      category: 'Tutorial',
      status: 'Published',
    };

    const postPayload2 = {
      title: 'Collision Title',
      content: 'Content 2',
      category: 'Tutorial',
      status: 'Draft',
    };

    // First post creation
    const res1 = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send(postPayload1)
      .expect(201);

    expect(res1.body.slug).toBe('collision-title');

    // Second post creation with identical title
    const res2 = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send(postPayload2)
      .expect(201);

    expect(res2.body.slug).toBe('collision-title-1');
  });

  it('should return 400 Bad Request if title, category, or content is missing', async () => {
    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Missing fields',
      })
      .expect(400);

    expect(res.body).toHaveProperty('error', 'Title, category, and content are required fields.');
  });

  it('should return 401 Unauthorized if no token is provided', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({
        title: 'No token',
        content: 'No token content',
        category: 'Tutorial',
      })
      .expect(401);

    expect(res.body).toHaveProperty('error');
  });

  it('should sanitize content to prevent HTML script/event injection', async () => {
    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'XSS Post',
        content: 'Clean text <script>alert(1)</script> and <img src="x" onerror="evil()">',
        category: 'Security',
      })
      .expect(201);

    expect(res.body.content).toBe('Clean text  and <img src="x">');
  });
});

describe('Post Modification API (PUT /api/posts/:id)', () => {
  let owner;
  let nonOwner;
  let ownerToken;
  let nonOwnerToken;
  let post;

  beforeEach(async () => {
    // Seed users
    owner = await User.create({
      username: 'post_owner',
      email: 'owner@post.com',
      password: 'SecurePassword123',
    });
    ownerToken = generateToken(owner._id);

    nonOwner = await User.create({
      username: 'non_owner',
      email: 'nonowner@post.com',
      password: 'SecurePassword123',
    });
    nonOwnerToken = generateToken(nonOwner._id);

    // Seed a post belonging to owner
    post = await Post.create({
      title: 'Original Title',
      slug: 'original-title',
      description: 'Original Description',
      content: 'Original Content',
      category: 'Original Category',
      tags: ['original'],
      status: 'Published',
      author: owner._id,
    });
  });

  it('should return 200 OK and updated post on successful owner edit', async () => {
    const editPayload = {
      title: 'Modified Title',
      description: 'Modified Description',
      content: 'Modified Content',
      category: 'Modified Category',
      tags: ['modified'],
      status: 'Draft',
    };

    const res = await request(app)
      .put(`/api/posts/${post._id}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send(editPayload)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body.title).toBe(editPayload.title);
    expect(res.body.slug).toBe('modified-title');
    expect(res.body.description).toBe(editPayload.description);
    expect(res.body.content).toBe(editPayload.content);
    expect(res.body.category).toBe(editPayload.category);
    expect(res.body.status).toBe(editPayload.status);
    expect(res.body.author.toString()).toBe(owner._id.toString());
  });

  it('should return 403 Forbidden when edited by a non-owner author', async () => {
    const editPayload = {
      title: 'Hack Attempt',
      content: 'Hack Content',
      category: 'Hack Category',
    };

    const res = await request(app)
      .put(`/api/posts/${post._id}`)
      .set('Authorization', `Bearer ${nonOwnerToken}`)
      .send(editPayload)
      .expect('Content-Type', /json/)
      .expect(403);

    expect(res.body).toHaveProperty('error', 'Access Denied: You do not own this post.');
  });

  it('should resolve slug collisions on title change', async () => {
    // Seed another post that occupies the slug 'colliding-slug'
    await Post.create({
      title: 'Colliding Slug',
      slug: 'colliding-slug',
      description: 'Some desc',
      content: 'Some content',
      category: 'Some cat',
      author: owner._id,
    });

    const editPayload = {
      title: 'Colliding Slug',
      content: 'Updated Content',
      category: 'Updated Category',
    };

    const res = await request(app)
      .put(`/api/posts/${post._id}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send(editPayload)
      .expect(200);

    expect(res.body.slug).toBe('colliding-slug-1');
  });

  it('should keep the same slug if the title is unchanged or only case changes', async () => {
    const editPayload = {
      title: 'original title', // changed only case
      content: 'Updated Content',
      category: 'Updated Category',
    };

    const res = await request(app)
      .put(`/api/posts/${post._id}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send(editPayload)
      .expect(200);

    expect(res.body.slug).toBe('original-title');
  });

  it('should return 400 Bad Request if title, content, or category are missing', async () => {
    const res = await request(app)
      .put(`/api/posts/${post._id}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({
        description: 'Missing title/content/category',
      })
      .expect(400);

    expect(res.body).toHaveProperty('error', 'Title, category, and content are required fields.');
  });

  it('should sanitize content to prevent HTML script/event injection on update', async () => {
    const res = await request(app)
      .put(`/api/posts/${post._id}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({
        title: 'Original Title',
        content: 'Clean text <script>alert(2)</script>',
        category: 'Security',
      })
      .expect(200);

    expect(res.body.content).toBe('Clean text ');
  });
});

describe('Post Deletion API (DELETE /api/posts/:id)', () => {
  let owner;
  let nonOwner;
  let ownerToken;
  let nonOwnerToken;
  let post;
  let comment;

  beforeEach(async () => {
    // Seed users
    owner = await User.create({
      username: 'post_owner',
      email: 'owner@post.com',
      password: 'SecurePassword123',
    });
    ownerToken = generateToken(owner._id);

    nonOwner = await User.create({
      username: 'non_owner',
      email: 'nonowner@post.com',
      password: 'SecurePassword123',
    });
    nonOwnerToken = generateToken(nonOwner._id);

    // Seed post
    post = await Post.create({
      title: 'Post to delete',
      slug: 'post-to-delete',
      description: 'Desc',
      content: 'Content',
      category: 'Category',
      author: owner._id,
    });

    // Seed comment referencing the post
    comment = await Comment.create({
      post: post._id,
      name: 'Reader',
      content: 'Comment text',
    });
  });

  it('should return 200 OK and delete both post and associated comments if deleted by owner', async () => {
    const res = await request(app)
      .delete(`/api/posts/${post._id}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('message', 'Post successfully deleted.');

    // Check post is deleted from database
    const foundPost = await Post.findById(post._id);
    expect(foundPost).toBeNull();

    // Check comments are deleted from database (cascading delete)
    const foundComments = await Comment.find({ post: post._id });
    expect(foundComments).toHaveLength(0);
  });

  it('should return 403 Forbidden and NOT delete records if called by non-owner author', async () => {
    const res = await request(app)
      .delete(`/api/posts/${post._id}`)
      .set('Authorization', `Bearer ${nonOwnerToken}`)
      .expect('Content-Type', /json/)
      .expect(403);

    expect(res.body).toHaveProperty('error', 'Access Denied: You do not own this post.');

    // Check post still exists
    const foundPost = await Post.findById(post._id);
    expect(foundPost).not.toBeNull();

    // Check comment still exists
    const foundComments = await Comment.find({ post: post._id });
    expect(foundComments).toHaveLength(1);
  });

  it('should return 404 Not Found if post does not exist', async () => {
    const nonexistentId = '60d0fe4f5311236168a109cc';
    const res = await request(app)
      .delete(`/api/posts/${nonexistentId}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(404);

    expect(res.body).toHaveProperty('error', 'Post not found');
  });

  it('should return 401 Unauthorized if no token is provided', async () => {
    const res = await request(app)
      .delete(`/api/posts/${post._id}`)
      .expect(401);

    expect(res.body).toHaveProperty('error');
  });
});


