import test, { expect } from "@playwright/test";

test.describe("Toast offset option test", () => {
  const offsets: number[] = [12, 24, 32];

  offsets.forEach((offset) => {
    test(`toast should have offset ${offset}`, async ({ page }) => {
      await page.goto("/");
      const positionButton = page.getByRole("button", { name: "top-left" });
      const offsetButton = page.getByRole("button", {
        name: `${offset}px`,
        exact: true,
      });
      await positionButton.click();
      await offsetButton.click();
      const toastRunButton = page.getByRole("button", {
        name: "토스트 실행시키기",
      });
      await toastRunButton.click();

      // 토스트 컨테이너 요소 찾기
      const toast = page.locator("[data-ming-toast-toaster]");

      // 토스트가 보이는지 확인
      await expect(toast).toBeVisible();

      const box = await toast.boundingBox();
      if (!box) throw new Error("not found box");

      expect(box.x).toEqual(offset);
      expect(box.y).toEqual(offset);
    });
  });
});
