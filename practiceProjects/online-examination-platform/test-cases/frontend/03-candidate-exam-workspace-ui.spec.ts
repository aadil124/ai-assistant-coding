import { test, expect } from '@playwright/test';

/**
 * FEATURE: Candidate Exam Workspace UI (FEAT-003)
 * COVERAGE: Functional, UI, Accessibility, Edge Cases
 */

test.describe('FEAT-003: Candidate Workspace UI', () => {

  test.beforeEach(async ({ page }) => {
    // Precondition: Candidate logged in, pre-flight check passed, exam session started
    await page.goto('/login');
    await page.fill('#username', 'candidate_sarah');
    await page.fill('#password', 'SecurePass123!');
    await page.click('button[type="submit"]');
    await page.goto('/exams/sess_882a-bc923/workspace');
  });

  /**
   * TC-FE-003-01: UI - Distraction-Free Layout Check
   * Requirement Mapping: FR-3.1
   * Priority: P0
   */
  test('TC-FE-003-01: Verify exam viewport hides global headers and sidebars', async ({ page }) => {
    const header = page.locator('header.global-navigation');
    const footer = page.locator('footer.global-footer');
    
    // Global components must be hidden during active exam
    await expect(header).toBeHidden();
    await expect(footer).toBeHidden();
    
    // Exam toolbar must be visible
    await expect(page.locator('.exam-workspace-toolbar')).toBeVisible();
  });

  /**
   * TC-FE-003-02: Functional - Answer Selection State
   * Requirement Mapping: FR-3.2
   * Priority: P0
   */
  test('TC-FE-003-02: MCQ option highlights on click and updates state', async ({ page }) => {
    const firstOption = page.locator('[data-testid="option-a"]');
    await firstOption.click();
    
    // Check style highlight class
    await expect(firstOption).toHaveClass(/selected-highlight/);
    
    // Verify question sidebar indicator updates to "Answered" (Green)
    const navBtn = page.locator('[data-testid="nav-btn-q1"]');
    await expect(navBtn).toHaveClass(/status-answered/);
  });

  /**
   * TC-FE-003-03: Functional/UI - Timer Color Shifts
   * Requirement Mapping: FR-3.3, UIC-004
   * Priority: P1
   */
  test('TC-FE-003-03: Timer changes color based on remaining time checkpoints', async ({ page }) => {
    const timerElement = page.locator('[data-testid="countdown-timer"]');
    
    // Mock session state with 5 minutes remaining
    await page.evaluate(() => {
      (window as any).setMockRemainingSeconds(300); // 5 mins
    });
    // Check class changes to orange
    await expect(timerElement).toHaveClass(/timer-warning-orange/);
    
    // Mock session state with 1 minute remaining
    await page.evaluate(() => {
      (window as any).setMockRemainingSeconds(60); // 1 min
    });
    // Check class changes to flashing red
    await expect(timerElement).toHaveClass(/timer-danger-flashing-red/);
  });

  /**
   * TC-FE-003-04: Edge Case - Confirmation Dialog on double submission
   * Requirement Mapping: VAL-3.3
   * Priority: P1
   */
  test('TC-FE-003-04: Submit button prompts double-confirmation dialog and blocks double-click submission', async ({ page }) => {
    const submitBtn = page.locator('[data-testid="submit-exam-btn"]');
    await submitBtn.click();
    
    const confirmModal = page.locator('.submit-confirm-modal');
    await expect(confirmModal).toBeVisible();
    
    const finalSubmitBtn = confirmModal.locator('[data-testid="final-confirm-btn"]');
    await finalSubmitBtn.click();
    
    // Verify button disabled immediately on first click to block double-click bugs
    await expect(finalSubmitBtn).toBeDisabled();
    await expect(page.locator('.loading-spinner')).toBeVisible();
  });
});
