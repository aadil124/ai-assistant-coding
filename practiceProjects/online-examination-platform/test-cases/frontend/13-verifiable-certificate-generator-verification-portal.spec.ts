import { test, expect } from '@playwright/test';

/**
 * FEATURE: Verifiable Certificate Generator & Verification Portal (FEAT-013)
 * COVERAGE: Functional, UI, Accessibility, Integration
 */

test.describe('FEAT-013: Certificate Viewer and Verification Portal', () => {

  /**
   * TC-FE-013-01: UI - Certificate PDF rendering
   * Requirement Mapping: FR-13.1, FR-13.3
   * Acceptance Criteria: AC-701
   * Priority: P0
   */
  test('TC-FE-013-01: Verify dashboard certificate viewer renders PDF canvas and QR code image', async ({ page }) => {
    // Login as candidate Sarah
    await page.goto('/login');
    await page.fill('#username', 'candidate_sarah');
    await page.fill('#password', 'SecurePass123!');
    await page.click('button[type="submit"]');
    await page.goto('/dashboard/certificates');
    
    // Open Certificate Viewer modal
    await page.click('[data-testid="view-certificate-cert_772a-99cd3"]');
    
    // PDF container canvas must be visible
    const pdfCanvas = page.locator('.pdf-viewer-canvas');
    await expect(pdfCanvas).toBeVisible();
    
    // QR code image is rendered inside template
    const qrCode = page.locator('.certificate-qr-code-img');
    await expect(qrCode).toBeVisible();
  });

  /**
   * TC-FE-013-02: Functional/Integration - Public Portal Lookup
   * Requirement Mapping: FR-13.4
   * Acceptance Criteria: AC-702
   * Priority: P0
   */
  test('TC-FE-013-02: Public lookup portal yields authentic record details for valid certificate ID', async ({ page }) => {
    // Go to unauthenticated public verification page
    await page.goto('/verify/cert_772a-99cd3');
    
    // Check results status displays verified green checks
    const statusHeader = page.locator('.verification-status-header');
    await expect(statusHeader).toBeVisible();
    await expect(statusHeader).toContainText('Verified Certificate');
    await expect(statusHeader).toHaveClass(/badge-success-green/);
    
    // Verify candidate details are printed
    await expect(page.locator('.verified-recipient')).toContainText('Sarah Jenkins');
    await expect(page.locator('.verified-exam')).toContainText('Biology Final');
  });

  /**
   * TC-FE-013-03: Edge Case - Revoked Certificate Alert
   * Requirement Mapping: FR-13.4
   * Priority: P1
   */
  test('TC-FE-013-03: Public lookup returns red revoked alert badge for revoked credential ID', async ({ page }) => {
    // Go to unauthenticated public verification page for a revoked UUID
    await page.goto('/verify/cert_revoked_test_uuid');
    
    const statusHeader = page.locator('.verification-status-header');
    await expect(statusHeader).toBeVisible();
    await expect(statusHeader).toContainText('Credential Revoked');
    await expect(statusHeader).toHaveClass(/badge-error-red/);
    
    // Verify alert message displays revocation date
    await expect(page.locator('.revocation-details-notice')).toContainText('This credential was revoked on');
  });
});
