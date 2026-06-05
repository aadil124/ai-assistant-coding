import { test, expect } from '@playwright/test';

/**
 * FEATURE: Exam Configuration & Rules Engine (FEAT-002)
 * COVERAGE: Functional, Validation, Negative, UI, Accessibility
 */

test.describe('FEAT-002: Exam Configuration Builder Console', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('#username', 'examiner_test');
    await page.fill('#password', 'SecurePass123!');
    await page.click('button[type="submit"]');
    await page.goto('/examiner/exams/new');
  });

  /**
   * TC-FE-002-01: Functional - Set standard exam rules
   * Requirement Mapping: FR-2.1, FR-2.4
   * Priority: P0
   */
  test('TC-FE-002-01: Create and publish exam configuration with valid values', async ({ page }) => {
    await page.fill('#exam-title', 'Physics Midterm 2026');
    await page.fill('#exam-duration', '90'); // 90 minutes
    await page.fill('#exam-pass-percent', '70');
    
    // Choose start/end window dates
    await page.fill('#exam-start-window', '2026-06-15T09:00');
    await page.fill('#exam-end-window', '2026-06-15T18:00');
    
    // Select navigation constraints
    await page.click('input[value="sequential"]'); // Sequential mode
    await page.click('#randomize-options-checkbox'); // Randomize options on
    
    // Select static question list
    await page.click('[data-testid="static-questions-tab"]');
    await page.click('[data-testid="add-question-btn-0"]'); // Add first available
    
    await page.click('[data-testid="publish-exam-btn"]');
    
    await expect(page).toHaveURL(/\/examiner\/exams/);
    await expect(page.locator('.toast-success')).toBeVisible();
  });

  /**
   * TC-FE-002-02: Validation - Dynamic pool requirements limits
   * Requirement Mapping: VAL-2.4
   * Acceptance Criteria: AC-201 (depleted pool error)
   * Priority: P0
   */
  test('TC-FE-002-02: Block publishing when dynamic pool count exceeds limit', async ({ page }) => {
    await page.fill('#exam-title', 'Geometry Pool Validation Test');
    await page.fill('#exam-duration', '60');
    await page.fill('#exam-pass-percent', '50');
    
    // Setup dynamic rules
    await page.click('[data-testid="dynamic-pools-tab"]');
    await page.selectOption('#rule-tag-select', 'Algebra');
    await page.fill('#rule-count-input', '10'); // Request 10
    
    // Mock page visual shows "5 questions matching in bank" and warning text
    const warningLabel = page.locator('.pool-status-warning');
    await expect(warningLabel).toBeVisible();
    await expect(warningLabel).toContainText('Insufficient questions in pool');
    
    await page.click('[data-testid="publish-exam-btn"]');
    
    // Assert submission blocked
    await expect(page.locator('.validation-error-modal')).toBeVisible();
  });

  /**
   * TC-FE-002-03: Negative - Out of bounds exam duration value
   * Requirement Mapping: VAL-2.1
   * Priority: P1
   */
  test('TC-FE-002-03: Block setting exam duration exceeding maximum allowed', async ({ page }) => {
    await page.fill('#exam-title', 'Physics Duration validation test');
    await page.fill('#exam-duration', '360'); // Exceeds limit (max 300)
    
    await page.click('[data-testid="publish-exam-btn"]');
    
    const durationInput = page.locator('#exam-duration');
    await expect(durationInput).toHaveAttribute('aria-invalid', 'true');
  });

  /**
   * TC-FE-002-04: UI/Accessibility - Verify ARIA roles on Rule builder tabs
   * Requirement Mapping: NFR-004
   * Priority: P2
   */
  test('TC-FE-002-04: Tabs toggle display correctly with appropriate ARIA states', async ({ page }) => {
    const staticTab = page.locator('[data-testid="static-questions-tab"]');
    const dynamicTab = page.locator('[data-testid="dynamic-pools-tab"]');
    
    await expect(staticTab).toHaveAttribute('role', 'tab');
    await expect(staticTab).toHaveAttribute('aria-selected', 'true');
    
    await dynamicTab.click();
    await expect(dynamicTab).toHaveAttribute('aria-selected', 'true');
    await expect(staticTab).toHaveAttribute('aria-selected', 'false');
  });
});
