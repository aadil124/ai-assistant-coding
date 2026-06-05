import { test, expect } from '@playwright/test';

/**
 * FEATURE: Fullscreen Lockdown & Client Event Controls (FEAT-005)
 * COVERAGE: Functional, Security, Validation, Edge Cases
 */

test.describe('FEAT-005: Fullscreen Lockdown and Client Interceptors', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('#username', 'candidate_sarah');
    await page.fill('#password', 'SecurePass123!');
    await page.click('button[type="submit"]');
    await page.goto('/exams/sess_882a-bc923/workspace');
  });

  /**
   * TC-FE-005-01: Functional - Fullscreen API Enforce
   * Requirement Mapping: FR-5.1
   * Priority: P0
   */
  test('TC-FE-005-01: Require fullscreen trigger before active question load', async ({ page }) => {
    const shieldModal = page.locator('.lockdown-shield-modal');
    
    // Initial load: Fullscreen is false, check shield overlay is visible
    await expect(shieldModal).toBeVisible();
    await expect(shieldModal.locator('button')).toContainText('Enter Fullscreen and Resume');
    
    // Click button to invoke Fullscreen
    await shieldModal.locator('button').click();
    
    // Shield modal must disappear once Fullscreen mode returns true
    await expect(shieldModal).toBeHidden();
  });

  /**
   * TC-FE-005-02: Security - Keyboard Event Block
   * Requirement Mapping: FR-5.2
   * Priority: P0
   */
  test('TC-FE-005-02: Intercept and block copying text values inside workspace', async ({ page }) => {
    const questionText = page.locator('.question-body');
    await questionText.selectText();
    
    // Press Ctrl+C copy shortcut
    await page.keyboard.press('Control+KeyC');
    
    // Check tooltip is triggered showing blocked alert
    const tooltip = page.locator('.blocked-alert-tooltip');
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toContainText('Copy blocked');
  });

  /**
   * TC-FE-005-03: Edge Case - Fullscreen Warning Countdown Limit
   * Requirement Mapping: FR-5.3, VAL-5.1
   * Priority: P1
   */
  test('TC-FE-005-03: Exiting fullscreen mode triggers modal warning and submits exam after 4 exits', async ({ page }) => {
    // 1. Exit fullscreen (simulate event)
    await page.evaluate(() => {
      document.dispatchEvent(new Event('fullscreenchange'));
    });
    
    const warningModal = page.locator('.lockdown-shield-modal');
    await expect(warningModal).toBeVisible();
    await expect(warningModal.locator('.countdown-text')).toContainText('20 seconds remaining');
    
    // 2. Mock 4th fullscreen exit
    await page.evaluate(() => {
      (window as any).setMockFullscreenExitCount(4);
    });
    
    // Verify immediate redirect to validation submission page
    await expect(page).toHaveURL(/\/exams\/invalidated/);
    await expect(page.locator('.lockout-notice')).toContainText('Exam terminated');
  });
});
