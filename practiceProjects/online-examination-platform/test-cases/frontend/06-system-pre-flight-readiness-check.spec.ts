import { test, expect } from '@playwright/test';

/**
 * FEATURE: System Pre-flight Readiness Check (FEAT-006)
 * COVERAGE: Functional, Validation, Negative, UI, Accessibility
 */

test.describe('FEAT-006: System Readiness Diagnostics', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('#username', 'candidate_sarah');
    await page.fill('#password', 'SecurePass123!');
    await page.click('button[type="submit"]');
    await page.goto('/exams/ex_biology_final_uuid/readiness');
  });

  /**
   * TC-FE-006-01: Functional - Grant Permissions successfully
   * Requirement Mapping: FR-6.1, FR-6.2
   * Priority: P0
   */
  test('TC-FE-006-01: Complete device check successfully when permissions are granted and input is active', async ({ page }) => {
    // Grant media permissions inside context (pre-configured in test environment)
    const startCheckBtn = page.locator('[data-testid="run-diagnostics-btn"]');
    await startCheckBtn.click();
    
    // Check webcam display renders green badge
    const cameraBadge = page.locator('[data-testid="status-camera"]');
    await expect(cameraBadge).toHaveClass(/check-passed-green/);
    
    // Check mic meter displays activity
    const volumeMeter = page.locator('[data-testid="volume-meter-bar"]');
    await expect(volumeMeter).toBeVisible();
    
    // Check network completes
    const speedBadge = page.locator('[data-testid="status-network"]');
    await expect(speedBadge).toHaveClass(/check-passed-green/);
    
    // Proceed button is enabled
    const proceedBtn = page.locator('[data-testid="proceed-to-id-btn"]');
    await expect(proceedBtn).toBeEnabled();
  });

  /**
   * TC-FE-006-02: Negative/UI - Block on denied permissions
   * Requirement Mapping: FR-6.1
   * Priority: P0
   */
  test('TC-FE-006-02: Block diagnostics run and display setup help text when camera permission is denied', async ({ page, context }) => {
    // Force context to deny camera access permissions
    await context.clearPermissions();
    await context.grantPermissions([]); // Deny all
    
    const startCheckBtn = page.locator('[data-testid="run-diagnostics-btn"]');
    await startCheckBtn.click();
    
    // Verify webcam checklist item changes to Red error cross
    const cameraBadge = page.locator('[data-testid="status-camera"]');
    await expect(cameraBadge).toHaveClass(/check-failed-red/);
    
    // Check setup instruction guidelines are displayed
    const setupHelpText = page.locator('.camera-permission-instructions');
    await expect(setupHelpText).toBeVisible();
    await expect(setupHelpText).toContainText('Please check browser settings and allow camera access');
    
    // Proceed button remains disabled
    const proceedBtn = page.locator('[data-testid="proceed-to-id-btn"]');
    await expect(proceedBtn).toBeDisabled();
  });

  /**
   * TC-FE-006-03: Validation - Screen resolution check limits
   * Requirement Mapping: FR-6.4
   * Priority: P1
   */
  test('TC-FE-006-03: Block checkout with warning details when screen resolution is below limits', async ({ page }) => {
    // Set viewport dimensions below bounds
    await page.setViewportSize({ width: 800, height: 600 });
    
    const startCheckBtn = page.locator('[data-testid="run-diagnostics-btn"]');
    await startCheckBtn.click();
    
    const screenBadge = page.locator('[data-testid="status-screen"]');
    await expect(screenBadge).toHaveClass(/check-failed-red/);
    await expect(page.locator('.screen-resolution-error')).toContainText('Minimum resolution 1024x768 required');
  });
});
