import { test, expect } from '@playwright/test';

/**
 * FEATURE: Live Proctor Dashboard & WebRTC Streaming (FEAT-010)
 * COVERAGE: Functional, UI, Integration, Edge Cases
 */

test.describe('FEAT-010: Live Proctor Console Dashboard', () => {

  test.beforeEach(async ({ page }) => {
    // Precondition: User logged in as Proctor
    await page.goto('/login');
    await page.fill('#username', 'proctor_david');
    await page.fill('#password', 'SecurePass123!');
    await page.click('button[type="submit"]');
    await page.goto('/proctor/dashboard');
  });

  /**
   * TC-FE-010-01: UI - Live Candidate Video Grid
   * Requirement Mapping: FR-10.1, FR-10.2
   * Priority: P0
   */
  test('TC-FE-010-01: Render candidate streaming grid and update warning highlight on socket event', async ({ page }) => {
    const candidateGrid = page.locator('[data-testid="candidate-video-grid"]');
    await expect(candidateGrid).toBeVisible();
    
    // Grid cells check
    const cells = candidateGrid.locator('.candidate-stream-cell');
    await expect(cells).toHaveCount(1); // At least 1 active test cell
    
    // Simulate incoming WebSocket anomaly warning for candidate Sarah
    await page.evaluate(() => {
      (window as any).mockSocketPushEvent({
        session_id: 'sess_882a-bc923',
        anomaly_type: 'MULTIPLE_FACES_DETECTED',
        suspicion_score: 80
      });
    });
    
    // Verify cell border turns red and suspicion label rises to High
    const sarahCell = candidateGrid.locator('[data-session-id="sess_882a-bc923"]');
    await expect(sarahCell).toHaveClass(/border-danger-red/);
    await expect(sarahCell.locator('.suspicion-badge')).toContainText('High (80)');
  });

  /**
   * TC-FE-010-02: Functional/Integration - Send warning to candidate
   * Requirement Mapping: FR-10.3
   * Priority: P0
   */
  test('TC-FE-010-02: Send direct chat warning to candidate lock screen', async ({ page }) => {
    const candidateCell = page.locator('[data-session-id="sess_882a-bc923"]');
    await candidateCell.click(); // Open detail side panel
    
    const chatInput = page.locator('[data-testid="proctor-chat-input"]');
    const sendBtn = page.locator('[data-testid="proctor-chat-send-btn"]');
    
    await chatInput.fill('Please look directly at the screen.');
    await sendBtn.click();
    
    // Check message registers in list
    await expect(page.locator('.chat-messages-timeline')).toContainText('Please look directly');
  });

  /**
   * TC-FE-010-03: Edge Case - Remote exam session termination
   * Requirement Mapping: FR-10.4
   * Priority: P0
   */
  test('TC-FE-010-03: Proctor clicks terminate exam triggers confirm dialog and updates status to invalidated', async ({ page }) => {
    const candidateCell = page.locator('[data-session-id="sess_882a-bc923"]');
    await candidateCell.click();
    
    await page.click('[data-testid="remote-terminate-btn"]');
    
    // Fill reason modal
    const reasonModal = page.locator('.terminate-reason-modal');
    await expect(reasonModal).toBeVisible();
    await reasonModal.selectOption('#terminate-reason-select', 'SECONDARY_DEVICE_USE');
    await reasonModal.fill('#terminate-notes', 'Cheating confirmed visually');
    
    await reasonModal.locator('[data-testid="confirm-terminate-btn"]').click();
    
    // Video stream cell changes to status indicator "Invalidated"
    await expect(candidateCell.locator('.session-status-badge')).toContainText('Invalidated');
  });
});
