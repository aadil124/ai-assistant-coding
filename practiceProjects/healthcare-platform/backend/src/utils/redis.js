class RedisStub {
  constructor() {
    this.store = new Map();
  }

  async get(key) {
    return this.store.get(key) || null;
  }

  async setex(key, seconds, value) {
    this.store.set(key, value);
    // Auto-purge simulation
    setTimeout(() => {
      this.store.delete(key);
    }, seconds * 1000);
    return 'OK';
  }

  async del(key) {
    this.store.delete(key);
    return 1;
  }

  async exists(key) {
    return this.store.has(key) ? 1 : 0;
  }

  async quit() {
    return 'OK';
  }
}

export const redis = new RedisStub();
export default redis;
