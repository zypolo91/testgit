/*
 * @Author: zypolo
 * @Date: 2021-04-27 17:08:50
 * @FilePath: \miniprogramc:\Users\polo\Desktop\jxmap\basic-lib\tests\e.test.ts
 */
import add from "../src/index";

test("1 + 1 = 2", () => {
  const res = add(1, 2);
  expect(res).toBe(3);
});
