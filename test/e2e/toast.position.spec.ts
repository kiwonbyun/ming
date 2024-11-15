import { Position } from "@/packages/toast/src";
import test, { expect } from "@playwright/test";

test.describe("Toast Position option test", () => {
  const positions: Position[] = [
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
    "top-center",
    "bottom-center",
  ];

  positions.forEach((position) => {
    test(`should be toast at ${position}`, async ({ page }) => {
      await page.goto("/");
      const positionButton = page.getByRole("button", {
        name: position,
        exact: true,
      });
      await positionButton.click();
      const toastRunButton = page.getByRole("button", {
        name: "토스트 실행시키기",
      });
      await toastRunButton.click();

      // 토스트 컨테이너 요소 찾기
      const toast = page.locator("[data-wemeet-toast-toaster]");
      const offset = 24;

      // 토스트가 보이는지 확인
      await expect(toast).toBeVisible();

      const box = await toast.boundingBox();
      if (!box) throw new Error("not found box");
      const viewport = page.viewportSize();
      if (!viewport) throw new Error("not found viewport");
      console.log({ box, viewport });

      switch (position) {
        case "top-left":
          expect(box.x).toEqual(offset);
          expect(box.y).toEqual(offset);
          break;
        case "top-center":
          expect(box.y).toEqual(offset);
          break;
        case "top-right":
          expect(box.x).toEqual(viewport.width - box.width - offset);
          expect(box.y).toEqual(offset);
          break;
        case "bottom-left":
          expect(box.x).toEqual(offset);
          expect(box.y).toEqual(viewport.height - box.height - offset);
          break;
        case "bottom-center":
          expect(box.y).toEqual(viewport.height - box.height - offset);
          break;
        case "bottom-right":
          expect(box.x).toEqual(viewport.width - box.width - offset);
          expect(box.y).toEqual(viewport.height - box.height - offset);
      }
    });
  });
});
