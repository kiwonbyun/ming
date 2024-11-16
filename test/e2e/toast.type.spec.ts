import { ToastType } from "@/packages/toast/src/types";
import test, { expect } from "@playwright/test";

test.describe("Toast type test", () => {
  const types: ToastType[] = ["message", "error", "info", "success", "warning"];

  types.forEach((type) => {
    test(`${type} toast ui test`, async ({ page }) => {
      await page.goto("/");
      const targetButton = page.getByRole("button", {
        name: `${type === "message" ? "일반" : type} 토스트`,
      });
      await targetButton.click();
      const toastRunButton = page.getByRole("button", {
        name: "토스트 실행시키기",
      });
      await toastRunButton.click();

      const toast = page.locator("[data-wemeet-toast-item]");

      await expect(toast).toBeInViewport();
      await expect(toast).toHaveAttribute("data-type", type);

      switch (type) {
        case "warning":
          await page.waitForTimeout(1200);
          await expect(toast).not.toBeInViewport();
          break;
        default:
          await page.waitForTimeout(3200);
          await expect(toast).not.toBeInViewport();
          break;
      }
    });
  });
});
