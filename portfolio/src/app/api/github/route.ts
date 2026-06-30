import { NextResponse } from 'next/server';
import { fallbackRepos } from '@/utils/fallbackData';

export async function GET() {
  // Always return the curated list of active Netlify/Vercel deployments
  return NextResponse.json(fallbackRepos);
}
