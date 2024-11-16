import test, { expect } from "@playwright/test";

test.describe("Modal dim auto close option test", () => {
  test("dimAutoClose={true} 모달 Dim영역 자동 닫힘 활성화.", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Dim 영역 닫기 활성화" }).click();
    await page.getByRole("button", { name: "모달 열기" }).click();

    const dim = page.locator("[data-modal-dim]");
    expect(dim).toBeInViewport();
    await dim.click({ position: { x: 10, y: 10 } });
    await page.waitForTimeout(200);
    expect(dim).not.toBeInViewport();
  });
  test("dimAutoClose={false} 모달 Dim영역 자동 닫힘 비활성화.", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Dim 영역 닫기 비활성화" }).click();
    await page.getByRole("button", { name: "모달 열기" }).click();
    const dim = page.locator("[data-modal-dim]");
    expect(dim).toBeInViewport();
    await dim.click({ position: { x: 10, y: 10 } });
    await page.waitForTimeout(200);
    expect(dim).toBeInViewport();
  });
});
