import Post from '../models/Post.js';

let intervalId = null;

export const startScheduler = () => {
  if (intervalId) return;

  console.log('Post Scheduler Engine started (checking every 60 seconds)...');
  intervalId = setInterval(async () => {
    try {
      const now = new Date();
      // Find posts with status APPROVED scheduled for now or in the past
      const postsToPublish = await Post.find({
        status: 'APPROVED',
        scheduledTime: { $lte: now }
      });

      if (postsToPublish.length > 0) {
        console.log(`Scheduler found ${postsToPublish.length} post(s) to publish.`);
      }

      for (const post of postsToPublish) {
        try {
          console.log(`Publishing post ${post._id} to channels: ${post.platforms.join(', ')}`);
          
          // Simulation: transition post to PUBLISHED status
          post.status = 'PUBLISHED';
          post.publishedTime = new Date();
          await post.save();
          
          console.log(`Post ${post._id} successfully published.`);
        } catch (publishErr) {
          console.error(`Failed to publish post ${post._id}:`, publishErr.message);
          post.status = 'FAILED';
          post.errorLog = publishErr.message;
          await post.save();
        }
      }
    } catch (error) {
      console.error('Error in post scheduler interval:', error.message);
    }
  }, 60000); // 60 seconds
};

export const stopScheduler = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    console.log('Post Scheduler Engine stopped.');
  }
};
