import request from 'supertest';
import app from '../../app.js';
import User from '../../models/User.js';
import Post from '../../models/Post.js';
import Comment from '../../models/Comment.js';

describe('Comments API', () => {
  let authorId;
  let publishedPostId;
  let draftPostId;

  beforeEach(async () => {
    // Seed an author
    const author = await User.create({
      username: 'jane_doe',
      email: 'jane@doe.com',
      password: 'SecurePassword123',
    });
    authorId = author._id;

    // Seed a published post
    const publishedPost = await Post.create({
      title: 'React 19 Overview',
      slug: 'react-19-overview',
      description: 'Explore the new features in React 19.',
      content: 'Full content of React 19 overview.',
      status: 'Published',
      category: 'Technology',
      tags: ['React', 'JS'],
      author: authorId,
    });
    publishedPostId = publishedPost._id;

    // Seed a draft post
    const draftPost = await Post.create({
      title: 'Draft Post Idea',
      slug: 'draft-post-idea',
      description: 'This is a draft.',
      content: 'Not published yet.',
      status: 'Draft',
      category: 'Technology',
      tags: ['Draft'],
      author: authorId,
    });
    draftPostId = draftPost._id;
  });

  describe('GET /api/posts/:postId/comments', () => {
    it('should return 200 OK and comments in chronological order', async () => {
      // Seed comments with different timestamps
      const comment1 = await Comment.create({
        post: publishedPostId,
        name: 'Reader One',
        content: 'First comment content',
        createdAt: new Date(Date.now() - 10000), // 10 seconds ago
      });

      const comment2 = await Comment.create({
        post: publishedPostId,
        name: 'Reader Two',
        content: 'Second comment content',
        createdAt: new Date(Date.now()), // current time
      });

      const res = await request(app)
        .get(`/api/posts/${publishedPostId}/comments`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).toHaveLength(2);
      expect(res.body[0]._id).toBe(comment1._id.toString());
      expect(res.body[1]._id).toBe(comment2._id.toString());
    });

    it('should return 404 for a draft post', async () => {
      const res = await request(app)
        .get(`/api/posts/${draftPostId}/comments`)
        .expect(404);

      expect(res.body).toHaveProperty('error', 'Post not found');
    });

    it('should return 404 for a nonexistent post ID', async () => {
      const nonexistentId = '60d0fe4f5311236168a109cc';
      const res = await request(app)
        .get(`/api/posts/${nonexistentId}/comments`)
        .expect(404);

      expect(res.body).toHaveProperty('error', 'Post not found');
    });

    it('should return 400 for a malformed post ID', async () => {
      const res = await request(app)
        .get('/api/posts/invalid-id/comments')
        .expect(400);

      expect(res.body).toHaveProperty('error');
    });
  });

  describe('POST /api/posts/:postId/comments', () => {
    it('should create a comment and return 201 Created', async () => {
      const newComment = {
        name: 'Jane Reader',
        content: 'Excellent article!',
      };

      const res = await request(app)
        .post(`/api/posts/${publishedPostId}/comments`)
        .send(newComment)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(res.body).toHaveProperty('_id');
      expect(res.body.name).toBe(newComment.name);
      expect(res.body.content).toBe(newComment.content);
      expect(res.body.post).toBe(publishedPostId.toString());
    });

    it('should sanitize HTML inputs to prevent XSS', async () => {
      const newComment = {
        name: '<script>alert("hack")</script> Jane',
        content: 'Check this out: <a href="http://evil.com">link</a>',
      };

      const res = await request(app)
        .post(`/api/posts/${publishedPostId}/comments`)
        .send(newComment)
        .expect(201);

      expect(res.body.name).toBe('&lt;script&gt;alert(&quot;hack&quot;)&lt;/script&gt; Jane');
      expect(res.body.content).toBe('Check this out: &lt;a href=&quot;http:&#x2F;&#x2F;evil.com&quot;&gt;link&lt;/a&gt;');
    });

    it('should return 404 when posting to a draft post', async () => {
      const res = await request(app)
        .post(`/api/posts/${draftPostId}/comments`)
        .send({ name: 'Bob', content: 'Nice draft' })
        .expect(404);

      expect(res.body).toHaveProperty('error', 'Post not found');
    });

    it('should return 400 when fields are missing', async () => {
      const res = await request(app)
        .post(`/api/posts/${publishedPostId}/comments`)
        .send({ name: 'Bob' })
        .expect(400);

      expect(res.body).toHaveProperty('error');
    });

    it('should return 400 when fields contain only whitespace', async () => {
      const res = await request(app)
        .post(`/api/posts/${publishedPostId}/comments`)
        .send({ name: '   ', content: '   ' })
        .expect(400);

      expect(res.body).toHaveProperty('error');
    });
  });
});
