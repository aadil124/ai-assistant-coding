import request from 'supertest';
import app from '../../app.js';
import User from '../../models/User.js';

describe('Auth Registration API (POST /api/auth/register)', () => {
  const validUser = {
    username: 'testAuthor',
    email: 'test@author.com',
    password: 'SecurePassword123',
  };

  it('should register a new author and return user details and JWT token', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(validUser)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user.username).toBe(validUser.username);
    expect(res.body.user.email).toBe(validUser.email.toLowerCase());
    expect(res.body.user).not.toHaveProperty('password');

    // Assert user created in database
    const dbUser = await User.findOne({ email: validUser.email.toLowerCase() });
    expect(dbUser).toBeTruthy();
    expect(dbUser.username).toBe(validUser.username);
  });

  it('should return 400 Bad Request if fields are missing', async () => {
    const incompleteUser = {
      username: 'testAuthor',
    };

    const res = await request(app)
      .post('/api/auth/register')
      .send(incompleteUser)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toContain('Please provide username, email and password');
  });

  it('should return 400 Bad Request if email already exists', async () => {
    // Register the first user
    await User.create(validUser);

    // Try registering with the same email
    const duplicateEmailUser = {
      username: 'anotherUsername',
      email: validUser.email,
      password: 'AnotherPassword123',
    };

    const res = await request(app)
      .post('/api/auth/register')
      .send(duplicateEmailUser)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toContain('Email already exists');
  });

  it('should return 400 Bad Request if username already exists', async () => {
    // Register the first user
    await User.create(validUser);

    // Try registering with the same username
    const duplicateUsernameUser = {
      username: validUser.username,
      email: 'another@email.com',
      password: 'AnotherPassword123',
    };

    const res = await request(app)
      .post('/api/auth/register')
      .send(duplicateUsernameUser)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toContain('Username already exists');
  });

  it('should return 400 Bad Request if password length is under 8 characters', async () => {
    const weakPasswordUser = {
      username: 'weakUser',
      email: 'weak@user.com',
      password: '123',
    };

    const res = await request(app)
      .post('/api/auth/register')
      .send(weakPasswordUser)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toContain('Password must be at least 8 characters long');
  });

  it('should return 400 Bad Request if email format is invalid', async () => {
    const invalidEmailUser = {
      username: 'invalidUser',
      email: 'not-an-email',
      password: 'SecurePassword123',
    };

    const res = await request(app)
      .post('/api/auth/register')
      .send(invalidEmailUser)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toContain('Please provide a valid email address');
  });
});

describe('Auth Login API (POST /api/auth/login)', () => {
  const registerUser = {
    username: 'loginAuthor',
    email: 'login@author.com',
    password: 'SecurePassword123',
  };

  beforeEach(async () => {
    // Seed user in database for login tests
    await User.create(registerUser);
  });

  it('should authenticate user and return 200 OK with user details and JWT token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: registerUser.email,
        password: registerUser.password,
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user.username).toBe(registerUser.username);
    expect(res.body.user.email).toBe(registerUser.email.toLowerCase());
    expect(res.body.user).not.toHaveProperty('password');
  });

  it('should return 401 Unauthorized for incorrect password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: registerUser.email,
        password: 'WrongPassword123',
      })
      .expect('Content-Type', /json/)
      .expect(401);

    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toContain('Invalid email or password');
  });

  it('should return 401 Unauthorized for non-existent email', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'nonexistent@author.com',
        password: registerUser.password,
      })
      .expect('Content-Type', /json/)
      .expect(401);

    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toContain('Invalid email or password');
  });

  it('should return 400 Bad Request for invalid format input (NoSQL Injection check)', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: { $gt: '' },
        password: registerUser.password,
      })
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toContain('Invalid input format');
  });
});

