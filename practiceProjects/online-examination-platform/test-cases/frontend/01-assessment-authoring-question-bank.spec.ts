import { test, expect } from '@playwright/test';

/**
 * FEATURE: Assessment Authoring & Question Bank (FEAT-001)
 * COVERAGE: Functional, Validation, Negative, UI, Accessibility, Integration
 */

test.describe('FEAT-001: Question Bank Authoring Portal', () => {
  
  test.beforeEach(async ({ page }) => {
    // Precondition: User logged in with Examiner privileges
    await page.goto('/login');
    await page.fill('#username', 'examiner_test');
    await page.fill('#password', 'SecurePass123!');
    await page.click('button[type="submit"]');
    await page.goto('/examiner/questions/new');
  });

  /**
   * TC-FE-001-01: Functional - Create MCQ Question successfully
   * Requirement Mapping: FR-1.1, FR-1.2
   * Acceptance Criteria: AC-101
   * Priority: P0
   */
  test('TC-FE-001-01: Create MCQ question successfully with valid values', async ({ page }) => {
    await page.selectOption('#question-type-select', 'mcq');
    await page.fill('#question-body-editor', 'Solve for $x$: $2x + 5 = 15$.');
    
    // Add options
    await page.fill('[data-testid="option-input-0"]', '5');
    await page.fill('[data-testid="option-input-1"]', '10');
    
    // Mark option 1 as correct
    await page.click('[data-testid="option-correct-radio-0"]');
    
    // Tags and Difficulty
    await page.fill('#question-tags', 'Math, Algebra');
    await page.selectOption('#question-difficulty', 'Easy');
    
    // Click Save
    await page.click('[data-testid="save-question-btn"]');
    
    // Validate redirect and success message
    await expect(page).toHaveURL(/\/examiner\/questions/);
    await expect(page.locator('.toast-success')).toBeVisible();
  });

  /**
   * TC-FE-001-02: Validation - Block MCQ question without a correct answer
   * Requirement Mapping: VAL-1.1, VAL-1.2
   * Acceptance Criteria: AC-102
   * Priority: P0
   */
  test('TC-FE-001-02: Prevent saving MCQ without checking correct answer option', async ({ page }) => {
    await page.selectOption('#question-type-select', 'mcq');
    await page.fill('#question-body-editor', 'Determine the value of the derivative of $x^3$.');
    
    await page.fill('[data-testid="option-input-0"]', '3x^2');
    await page.fill('[data-testid="option-input-1"]', 'x^2');
    
    // Do NOT check the radio button (correct option)
    await page.click('[data-testid="save-question-btn"]');
    
    // Check validation error modal / tooltip
    await expect(page.locator('.validation-error-message')).toBeVisible();
    await expect(page.locator('.validation-error-message')).toContainText('At least one correct answer must be chosen');
  });

  /**
   * TC-FE-001-03: Negative - Block question creation with empty body text
   * Requirement Mapping: VAL-1.3
   * Priority: P1
   */
  test('TC-FE-001-03: Prevent saving question when body text is empty', async ({ page }) => {
    await page.selectOption('#question-type-select', 'essay');
    await page.fill('#question-body-editor', ''); // Empty
    
    await page.click('[data-testid="save-question-btn"]');
    
    const bodyInput = page.locator('#question-body-editor');
    await expect(bodyInput).toHaveAttribute('aria-invalid', 'true');
  });

  /**
   * TC-FE-001-04: UI/Accessibility - Verify MathJax preview compiles Markdown/LaTeX formulas
   * Requirement Mapping: FR-1.3
   * Priority: P1
   */
  test('TC-FE-001-04: MathJax dynamic compilation previews math formulas correctly', async ({ page }) => {
    await page.fill('#question-body-editor', 'Given $f(x) = \\int x \\, dx$');
    
    // Wait for debounce rendering
    await page.waitForTimeout(500);
    
    const previewArea = page.locator('[data-testid="mathjax-preview"]');
    await expect(previewArea).toContainText('Given');
    await expect(previewArea.locator('.mjx-chtml')).toBeVisible(); // Check MathJax tag
  });

  /**
   * TC-FE-001-05: Accessibility - Keyboard navigation focus checks
   * Requirement Mapping: NFR-004
   * Priority: P2
   */
  test('TC-FE-001-05: Keyboard tab flow focus works across fields sequentially', async ({ page }) => {
    await page.focus('#question-type-select');
    await page.keyboard.press('Tab');
    
    // Check focus moved to body editor
    await expect(page.locator('#question-body-editor')).toBeFocused();
    await page.keyboard.press('Tab');
    
    // Check focus moved to first option input
    await expect(page.locator('[data-testid="option-input-0"]')).toBeFocused();
  });
});
