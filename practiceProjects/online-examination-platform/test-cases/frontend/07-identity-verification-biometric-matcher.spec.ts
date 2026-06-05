import { test, expect } from '@playwright/test';

/**
 * FEATURE: Identity Verification & Biometric Matcher (FEAT-007)
 * COVERAGE: Functional, UI, Negative, Edge Cases
 */

test.describe('FEAT-007: Biometric Identity Verification Workspace', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('#username', 'candidate_sarah');
    await page.fill('#password', 'SecurePass123!');
    await page.click('button[type="submit"]');
    await page.goto('/exams/ex_biology_final_uuid/identification');
  });

  /**
   * TC-FE-007-01: UI - Camera Frame Bounding guides
   * Requirement Mapping: FR-7.1, FR-7.2
   * Priority: P0
   */
  test('TC-FE-007-01: Verify face oval guides and ID scanner frames render correctly', async ({ page }) => {
    const faceGuide = page.locator('.camera-face-oval-guide');
    const idGuide = page.locator('.camera-id-rectangle-guide');
    
    await expect(faceGuide).toBeVisible();
    await expect(idGuide).toBeVisible();
  });

  /**
   * TC-FE-007-02: Functional - Complete Match successfully
   * Requirement Mapping: FR-7.3, FR-7.4
   * Acceptance Criteria: AC-103
   * Priority: P0
   */
  test('TC-FE-007-02: Match biometric face successfully when score meets threshold', async ({ page }) => {
    // Click Capture selfie & ID (Mock camera frame returning matched test face vector)
    await page.click('[data-testid="capture-selfie-btn"]');
    
    // Select fake valid photo ID file to upload
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click('[data-testid="upload-id-btn"]');
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('test-cases/fixtures/valid_id.png'); // Mock valid ID image
    
    await page.click('[data-testid="execute-verification-btn"]');
    
    // Verify scanner spinner triggers, matches, and redirects to exam dashboard
    await expect(page.locator('.verification-loader')).toBeVisible();
    await expect(page).toHaveURL(/\/exams\/ex_biology_final_uuid\/dashboard/);
  });

  /**
   * TC-FE-007-03: Edge Case/Negative - Similarity below threshold triggers Proctor block
   * Requirement Mapping: BRL-001, FR-7.4
   * Acceptance Criteria: AC-103
   * Priority: P0
   */
  test('TC-FE-007-03: Display manual proctor queue notification when similarity score falls below limit', async ({ page }) => {
    await page.click('[data-testid="capture-selfie-btn"]');
    
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click('[data-testid="upload-id-btn"]');
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('test-cases/fixtures/blurry_id.png'); // Low quality ID triggers poor similarity score
    
    await page.click('[data-testid="execute-verification-btn"]');
    
    // Check warning block notice
    const failNotice = page.locator('.biometric-manual-review-alert');
    await expect(failNotice).toBeVisible();
    await expect(failNotice).toContainText('Identity match low. A Proctor has been notified');
    
    // Unlocks wait state only when mocked websocket message reports proctor override approval
    await page.evaluate(() => {
      window.dispatchEvent(new MessageEvent('message', {
        data: JSON.stringify({ type: 'PROCTOR_APPROVAL_OVERRIDE', approved: true })
      }));
    });
    
    // Redirects to dashboard after proctor manual override approval
    await expect(page).toHaveURL(/\/exams\/ex_biology_final_uuid\/dashboard/);
  });
});
