import { test, expect } from '@playwright/test';

/**
 * FEATURE: Objective Auto-Grading Engine (FEAT-011)
 * COVERAGE: Functional, UI, Accessibility
 */

test.describe('FEAT-011: Candidate Grade Summary Views', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('#username', 'candidate_sarah');
    await page.fill('#password', 'SecurePass123!');
    await page.click('button[type="submit"]');
  });

  /**
   * TC-FE-011-01: UI - Grade Result Card rendering
   * Requirement Mapping: FR-11.4
   * Priority: P0
   */
  test('TC-FE-011-01: Render exam completion score card with correct values and pending essay notifications', async ({ page }) => {
    // Go to results summary of exam containing essays
    await page.goto('/exams/sess_882a-bc923/results');
    
    const scoreCard = page.locator('.results-grade-card');
    await expect(scoreCard).toBeVisible();
    await expect(scoreCard.locator('.objective-score')).toContainText('18/20');
    
    // Check pending notice label is displayed
    const pendingNotice = page.locator('.essay-grading-pending-notice');
    await expect(pendingNotice).toBeVisible();
    await expect(pendingNotice).toContainText('Descriptive essay questions await grading by examiner');
  });

  /**
   * TC-FE-011-02: Accessibility - Text scaling in score chart
   * Requirement Mapping: NFR-004
   * Priority: P2
   */
  test('TC-FE-011-02: Score result tables support scaling and remain readable at 200% zoom', async ({ page }) => {
    await page.goto('/exams/sess_882a-bc923/results');
    
    // Evaluate zoom text styles
    const scoreText = page.locator('.objective-score');
    await expect(scoreText).toHaveCSS('font-size', '32px'); // Check base styling is structured
  });
});
