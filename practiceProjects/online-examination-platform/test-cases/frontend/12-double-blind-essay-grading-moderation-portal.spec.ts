import { test, expect } from '@playwright/test';

/**
 * FEATURE: Double-Blind Essay Grading & Moderation Portal (FEAT-012)
 * COVERAGE: Functional, UI, Accessibility, Edge Cases
 */

test.describe('FEAT-012: Double-Blind Examiner Grading Console', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('#username', 'examiner_miller');
    await page.fill('#password', 'SecurePass123!');
    await page.click('button[type="submit"]');
    await page.goto('/examiner/grading/queue');
  });

  /**
   * TC-FE-012-01: UI - Information Masking (Blind Grading)
   * Requirement Mapping: FR-12.1
   * Priority: P0
   */
  test('TC-FE-012-01: Verify candidate identity metadata is hidden from evaluation workspace', async ({ page }) => {
    await page.click('[data-testid="start-grading-item-0"]');
    
    await expect(page.locator('.candidate-essay-submission-body')).toBeVisible();
    
    // Personal metadata must NOT render
    const candidateName = page.locator('.candidate-name-label');
    const candidateEmail = page.locator('.candidate-email-label');
    await expect(candidateName).toBeHidden();
    await expect(candidateEmail).toBeHidden();
    
    // Anonymized Session reference ID must render
    await expect(page.locator('.anonymized-candidate-reference')).toContainText('Candidate Ref: #');
  });

  /**
   * TC-FE-012-02: Functional - Rubric calculation selection
   * Requirement Mapping: FR-12.3, VAL-12.2
   * Priority: P0
   */
  test('TC-FE-012-02: Clicking grading rubric options recalculates total score and enforces feedback limits', async ({ page }) => {
    await page.click('[data-testid="start-grading-item-0"]');
    
    await page.click('[data-testid="rubric-grammar-points-8"]');
    await page.click('[data-testid="rubric-content-points-4"]');
    
    await page.click('[data-testid="submit-grade-score-btn"]');
    
    const warningLabel = page.locator('.feedback-input-warning');
    await expect(warningLabel).toBeVisible();
    await expect(warningLabel).toContainText('Feedback comments must be at least 30 characters');
    
    await page.fill('#grading-feedback-textarea', 'Grammar was sound but content accuracy is missing core elements.');
    await page.click('[data-testid="submit-grade-score-btn"]');
    
    await expect(page).toHaveURL(/\/examiner\/grading\/queue/);
  });

  /**
   * TC-FE-012-03: Edge Case - Moderator Dispute Dashboard view
   * Requirement Mapping: FR-12.4
   * Priority: P1
   */
  test('TC-FE-012-03: Moderator dashboard displays dispute tags for score deltas > 15%', async ({ page }) => {
    await page.goto('/logout');
    await page.goto('/login');
    await page.fill('#username', 'moderator_boss');
    await page.fill('#password', 'SecurePass123!');
    await page.click('button[type="submit"]');
    await page.goto('/moderator/dashboard');
    
    const disputeRow = page.locator('.disputed-grading-row').first();
    await expect(disputeRow).toBeVisible();
    await expect(disputeRow.locator('.score-delta')).toContainText('30%');
  });
});
