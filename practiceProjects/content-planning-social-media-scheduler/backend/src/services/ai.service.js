// Service for generating captions and hashtags using Gemini API with fallback mocks.

export const generateCaption = async (prompt, tone, platform, length = 'medium') => {
  const apiKey = process.env.GEMINI_API_KEY;

  // Rich mock options for development or if no API key is specified
  const mockCaptions = {
    linkedin: {
      PROFESSIONAL: [
        "💡 Focus on standardizing details to streamline workflows! Check out how we unified scheduling queues. #SaaS #CreatorEconomy #Productivity",
        "Empower your marketing workflows with cohesive planning systems. Standard setups fail, but CreatorSuite helps you coordinate calendar assets elegantly. #B2BMarketing #Workflows"
      ],
      CASUAL: [
        "Keeping setups simple is key to staying productive. Here is a quick breakdown of how we reorganized our team's scheduling queue. 👇 #creator #agency",
        "Workflow tip of the day: standardizing templates saves hours every week. What is your go-to productivity hack? Let's discuss! #remotework"
      ],
      BOLD: [
        "Standard workflows are broken. That's why we built workspace features to help SMMs pace calendar drafts and assets at scale! 🚀 #marketing #startup",
        "Stop guessing when to post. Coordinated schedules and high-fidelity feed previews are now live on CreatorSuite! #tech #creators"
      ],
      PLAYFUL: [
        "Pacing drafts doesn't have to be a puzzle! Our client workspace feeds are looking cleaner than ever today 🌿✨ #socialmedia #SaaS",
        "Say goodbye to last-minute scheduling panic! Let's plan, preview, and post with time to spare. 🥳 #marketinghumor #growth"
      ],
      HUMOROUS: [
        "My therapist: 'So, are you planning your posts in advance?' Me: 'Does writing drafts 2 minutes before publishing count?' CreatorSuite: *cries in background queue* 🙃",
        "There are two types of social media managers: those who have a scheduler calendar, and those who like living on the edge. Choose wisely. #agencyLife"
      ]
    },
    twitter: {
      BOLD: [
        "Standard setups fail, but custom visual grid schedules empower SMMs to pacing calendar content elegantly. #workflow #marketing",
        "AI caption helpers and mobile feed previews are now live. Elevate your workspace game! 🚀 #CreatorSuite"
      ],
      CASUAL: [
        "Just mapped out next month's posts in under 5 minutes. Keeping scheduling queues organized feels good. ☕ #workflow",
        "Quick poll: do you write copy in bulk or draft it on the fly? #SMM #marketing"
      ]
    },
    instagram: {
      BOLD: [
        "Eco-friendly packaging shifts require bold plans. Our client workspaces are already aligning drafts for launching soon! 🌿 #SaaS #Marketing",
        "Visuals are everything. Preview exactly what your feed looks like before going live with our simulator! 📸✨"
      ],
      CASUAL: [
        "A behind-the-scenes look at how we compile workspace assets. Standard processes made simple. ✌️ #creators #agency",
        "Creating beautiful grids is easier when your scheduler is visual. Drag, drop, and you're good to go! 🗓️"
      ]
    }
  };

  // Safe accessor function for mock copy
  const getMockData = () => {
    const platData = mockCaptions[platform.toLowerCase()] || mockCaptions.linkedin;
    const toneData = platData[tone.toUpperCase()] || platData.BOLD || Object.values(platData)[0];
    return toneData;
  };

  if (!apiKey) {
    console.log('Gemini API key missing, returning mock responses.');
    return {
      captions: getMockData(),
      tokensConsumed: 150
    };
  }

  try {
    const systemInstruction = `You are a social media copywriter. Generate 2 distinct social media captions for platform ${platform} with tone ${tone} and length ${length} based on the user instructions. Do not include quotes around captions. Return them as a JSON array format: ["caption 1", "caption 2"].`;
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `${systemInstruction}\n\nInstructions: ${prompt}` }]
          }]
        })
      }
    );

    const json = await response.json();
    const responseText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!responseText) {
      throw new Error('Invalid response from Gemini API');
    }

    // Attempt to parse JSON array from Gemini output
    let parsedCaptions;
    try {
      const match = responseText.match(/\[.*\]/s);
      parsedCaptions = JSON.parse(match ? match[0] : responseText);
    } catch (e) {
      parsedCaptions = [responseText.trim()];
    }

    return {
      captions: Array.isArray(parsedCaptions) ? parsedCaptions : [parsedCaptions],
      tokensConsumed: 220
    };
  } catch (error) {
    console.error('Gemini API query error:', error.message);
    return {
      captions: getMockData(),
      tokensConsumed: 150,
      fallback: true
    };
  }
};

export const generateHashtags = async (captionText) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const mockHashtags = ['#CreatorSuite', '#SaaS', '#Workflow', '#Marketing', '#SocialMedia', '#Productivity'];

  if (!apiKey) {
    return mockHashtags;
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `Analyze the following social media post text and return a JSON list of 5-6 relevant hashtags: "${captionText}"` }]
          }]
        })
      }
    );

    const json = await response.json();
    const responseText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!responseText) {
      return mockHashtags;
    }

    const match = responseText.match(/\[.*\]/s);
    const parsed = JSON.parse(match ? match[0] : responseText);
    return Array.isArray(parsed) ? parsed : mockHashtags;
  } catch (error) {
    console.error('Gemini API hashtag error:', error.message);
    return mockHashtags;
  }
};
