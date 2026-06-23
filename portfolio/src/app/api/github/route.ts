import { NextResponse } from 'next/server';
import { fallbackRepos } from '@/utils/fallbackData';

export async function GET() {
  try {
    // We sort repositories by updated time and fetch up to 12 items.
    const response = await fetch('https://api.github.com/users/aadil124/repos?sort=updated&per_page=12', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'portfolio-aadil124',
      },
      // Cache the result for 1 hour on the server side to protect against rate limits.
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned status: ${response.status}`);
    }

    const repos = await response.json();
    
    // Check if the response is actually an array
    if (Array.isArray(repos)) {
      // Map only necessary fields to keep payload lightweight
      const mappedRepos = repos.map((repo: {
        name: string;
        description: string | null;
        html_url: string;
        stargazers_count: number;
        language: string | null;
        updated_at: string;
      }) => ({
        name: repo.name,
        description: repo.description || 'No description provided.',
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        language: repo.language || 'JavaScript',
        updated_at: repo.updated_at,
      }));

      return NextResponse.json(mappedRepos);
    } else {
      throw new Error('GitHub API response is not an array');
    }
  } catch (error) {
    console.warn('GitHub API fetch failed. Returning local fallback repository cache.', error);
    return NextResponse.json(fallbackRepos);
  }
}
