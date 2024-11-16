import test, { expect } from "@playwright/test";

test.describe("Modal.Content Component test", () => {
  test("title props를 입력하면 모달에 헤더와 닫기 아이콘이 생성된다.", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "모달 타이틀 추가" }).click();
    await page.getByRole("button", { name: "모달 열기" }).click();

    await expect(page.locator("[data-modal-header]")).toBeInViewport();
    const modal = page.locator("[data-modal-container]");
    const headerCloseButton = page.locator("[data-modal-header-close]");
    await headerCloseButton.click();
    await page.waitForTimeout(200);
    expect(modal).not.toBeInViewport();
  });
  test("title props를 입력하지 않으면 모달에 헤더가 없다..", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "모달 타이틀 제거" }).click();
    await page.getByRole("button", { name: "모달 열기" }).click();

    await expect(page.locator("[data-modal-header]")).not.toBeInViewport();
  });
});
