import { test, expect } from '@playwright/test';

/**
 * FEATURE: Visual & Audio AI Proctoring Engine (FEAT-009)
 * COVERAGE: Functional, UI, Security, Edge Cases
 */

test.describe('FEAT-009: Visual and Audio AI Proctoring Feedback', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('#username', 'candidate_sarah');
    await page.fill('#password', 'SecurePass123!');
    await page.click('button[type="submit"]');
    await page.goto('/exams/sess_882a-bc923/workspace');
  });

  /**
   * TC-FE-009-01: UI - Camera Preview Box Render
   * Requirement Mapping: FR-9.1, FR-9.3
   * Priority: P0
   */
  test('TC-FE-009-01: Webcam video preview widget displays in footer with active track indicators', async ({ page }) => {
    const webcamThumbnail = page.locator('[data-testid="webcam-pip-preview"]');
    await expect(webcamThumbnail).toBeVisible();
    
    // Check overlay track status indicator (Green dot means webcam is steaming)
    const statusDot = webcamThumbnail.locator('.webcam-active-dot');
    await expect(statusDot).toBeVisible();
    await expect(statusDot).toHaveClass(/active-green/);
  });

  /**
   * TC-FE-009-02: Functional/Security - Gaze Warning overlay
   * Requirement Mapping: FR-9.2, VAL-9.1
   * Priority: P0
   */
  test('TC-FE-009-02: Looking away for more than 4 seconds triggers warning overlay screen', async ({ page }) => {
    // Mock gaze detector reporting deviation angle > 35 degrees
    await page.evaluate(() => {
      (window as any).mockGazeDeviation(40); // 40 degrees
    });
    
    // Wait 4 seconds for time threshold trigger
    await page.waitForTimeout(4500);
    
    // Anomaly warning modal must display on candidate screen
    const warningToast = page.locator('.proctor-warning-toast');
    await expect(warningToast).toBeVisible();
    await expect(warningToast).toContainText('Please keep eyes on screen');
  });

  /**
   * TC-FE-009-03: Edge Case - Loud noise spikes trigger check
   * Requirement Mapping: FR-9.3, VAL-9.2
   * Priority: P1
   */
  test('TC-FE-009-03: Loud volume spike triggers local banner check indicator', async ({ page }) => {
    const statusBanner = page.locator('[data-testid="sync-status-banner"]');
    
    // Mock audio level spike
    await page.evaluate(() => {
      (window as any).mockVolumeSpike(85); // 85 dB
    });
    
    // Wait for debounce buffer limit
    await page.waitForTimeout(2000);
    
    // Check banner temporarily displays warning status badge
    await expect(page.locator('.banner-audio-alert')).toBeVisible();
  });
});
