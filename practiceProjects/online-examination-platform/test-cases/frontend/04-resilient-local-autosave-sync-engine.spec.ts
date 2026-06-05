import { test, expect } from '@playwright/test';

/**
 * FEATURE: Resilient Local Autosave & Sync Engine (FEAT-004)
 * COVERAGE: Functional, Validation, Edge Cases, Integration
 */

test.describe('FEAT-004: Workspace Resiliency & Sync Engine', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('#username', 'candidate_sarah');
    await page.fill('#password', 'SecurePass123!');
    await page.click('button[type="submit"]');
    await page.goto('/exams/sess_882a-bc923/workspace');
  });

  /**
   * TC-FE-004-01: Functional - Save to IndexedDB on Input change
   * Requirement Mapping: FR-4.1, FR-4.2
   * Priority: P0
   */
  test('TC-FE-004-01: Writing response values stores encrypted record inside client IndexedDB', async ({ page }) => {
    // Fill in essay answer
    const essayTextarea = page.locator('[data-testid="essay-input"]');
    await essayTextarea.fill('Cellular respiration converts biochemical energy from nutrients into ATP.');
    
    // Wait for 5 second debounce autosave trigger or simulate blur
    await essayTextarea.blur();
    
    // Query IndexedDB inside client browser context to verify encrypted data
    const localStoreVal = await page.evaluate(async () => {
      const dbRequest = window.indexedDB.open('SecureExamCache');
      return new Promise<string>((resolve) => {
        dbRequest.onsuccess = (event: any) => {
          const db = event.target.result;
          const transaction = db.transaction(['answers'], 'readonly');
          const store = transaction.objectStore('answers');
          const getReq = store.get('q_essay_respiration');
          getReq.onsuccess = () => {
            resolve(getReq.result.encrypted_value);
          };
        };
      });
    });
    
    expect(localStoreVal).not.toBeNull();
    // Verify it is encrypted (should not contain plaintext essay words)
    expect(localStoreVal).not.toContain('respiration');
  });

  /**
   * TC-FE-004-02: Integration - Sync offline changes on reconnect
   * Requirement Mapping: FR-4.3, FR-4.4, SM-003
   * Priority: P0
   */
  test('TC-FE-004-02: Network drop saves locally, reconnect triggers sync queue and updates status banner', async ({ page, context }) => {
    const essayTextarea = page.locator('[data-testid="essay-input"]');
    const statusBanner = page.locator('[data-testid="sync-status-banner"]');
    
    // 1. Simulate Offline State
    await context.setOffline(true);
    
    await essayTextarea.fill('Additional details while offline.');
    await essayTextarea.blur();
    
    // Check banner changes to Orange "Offline mode"
    await expect(statusBanner).toHaveClass(/banner-offline-orange/);
    
    // 2. Simulate Online Reconnect
    await context.setOffline(false);
    
    // Verify sync completes and banner returns to Green
    await expect(statusBanner).toHaveClass(/banner-synced-green/);
  });

  /**
   * TC-FE-004-03: Edge Case - Block tab duplication
   * Priority: P1
   */
  test('TC-FE-004-03: Block opening exam session in multiple browser tabs concurrently', async ({ page, context }) => {
    // Attempt to open the exact same exam session in a second tab
    const newPage = await context.newPage();
    await newPage.goto('/exams/sess_882a-bc923/workspace');
    
    // Verify second tab displays block warning modal
    await expect(newPage.locator('.duplicate-tab-modal')).toBeVisible();
    await expect(newPage.locator('.duplicate-tab-modal')).toContainText('Session active in another window');
  });
});
