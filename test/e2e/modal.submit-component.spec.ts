import test, { expect } from "@playwright/test";

test.describe("Modal.Submit Component test", () => {
  test("promise props 비동기 요청 성공시 onFulfuiled 핸들러 호출되고 모달 닫힘.", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "비동기 요청 성공" }).click();
    await page.getByRole("button", { name: "모달 열기" }).click();
    await page.getByRole("button", { name: "확인" }).click();
    const modal = page.locator("[data-modal-container]");

    await page.waitForTimeout(600);
    expect(modal).not.toBeInViewport();

    const successToast = page.locator(
      '[data-wemeet-toast-item][data-type="success"]'
    );
    expect(successToast).toBeInViewport();
  });
  test("promise props 비동기 요청 실패시 onReject 햄들러 호출되고 모달 안 닫힘.", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "비동기 요청 실패" }).click();
    await page.getByRole("button", { name: "모달 열기" }).click();
    await page.getByRole("button", { name: "확인" }).click();
    const modal = page.locator("[data-modal-container]");

    await page.waitForTimeout(600);
    expect(modal).toBeInViewport();

    const errorToast = page.locator(
      '[data-wemeet-toast-item][data-type="error"]'
    );
    expect(errorToast).toBeInViewport();
  });
});
