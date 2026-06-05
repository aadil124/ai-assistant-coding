import { test, expect } from '@playwright/test';

/**
 * FEATURE: Multi-Display & Extension Detection (FEAT-008)
 * COVERAGE: Functional, Security, Validation, Edge Cases
 */

test.describe('FEAT-08: Screen and Extension lockdown checks', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('#username', 'candidate_sarah');
    await page.fill('#password', 'SecurePass123!');
    await page.click('button[type="submit"]');
    await page.goto('/exams/sess_882a-bc923/workspace');
  });

  /**
   * TC-FE-008-01: Functional - Secondary Monitor Check
   * Requirement Mapping: FR-8.1
   * Priority: P0
   */
  test('TC-FE-008-01: Block exam loading and show warning modal when display count > 1', async ({ page }) => {
    await page.evaluate(() => {
      (window as any).setMockDisplayCount(2);
      window.dispatchEvent(new Event('resize'));
    });
    
    const warningOverlay = page.locator('.lockdown-shield-modal');
    await expect(warningOverlay).toBeVisible();
    await expect(warningOverlay.locator('.warning-title')).toContainText('Multiple Monitors Detected');
  });

  /**
   * TC-FE-008-02: Security - Extension DOM Mutation Observer
   * Requirement Mapping: FR-8.4
   * Priority: P0
   */
  test('TC-FE-008-02: Trigger anomaly warning and lock screen when extension injects unauthorized div element', async ({ page }) => {
    await page.evaluate(() => {
      const extensionDiv = document.createElement('div');
      extensionDiv.id = 'unauthorized-translate-extension-bubble';
      extensionDiv.textContent = 'Translation helper active';
      document.body.appendChild(extensionDiv);
    });
    
    const lockOverlay = page.locator('.lockdown-shield-modal');
    await expect(lockOverlay).toBeVisible();
    await expect(lockOverlay.locator('.warning-title')).toContainText('Security Lockout - Unauthorized Extension');
  });

  /**
   * TC-FE-008-03: Edge Case - Focus Loss duration limits
   * Requirement Mapping: VAL-8.1
   * Priority: P1
   */
  test('TC-FE-008-03: Focus loss less than 3 seconds logs anomaly but does not lock screen layout', async ({ page }) => {
    await page.evaluate(() => {
      window.dispatchEvent(new Event('blur'));
    });
    
    await page.waitForTimeout(2000);
    
    await page.evaluate(() => {
      window.dispatchEvent(new Event('focus'));
    });
    
    const warningOverlay = page.locator('.lockdown-shield-modal');
    await expect(warningOverlay).toBeHidden();
  });
});
