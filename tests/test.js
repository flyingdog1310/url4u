import { hashPassword, verifyPassword } from "../utils/password.js";
import { shortUrlGenerator } from "../utils/shortUrlGenerator.js";
import { emailValidator } from "../utils/validator.js";

//password.js
it("hashedPassword verify should be true", async () => {
  const hashedPassword = await hashPassword("abc");
  expect(verifyPassword(hashedPassword, "abc")).toBeTruthy();
});

it("hashedPassword verify should be false", async () => {
  const hashedPassword = await hashPassword("abc");
  expect(await verifyPassword(hashedPassword, "cba")).toBeFalsy();
});

//shortUrlGenerator.js
it("should generate 7 letter base62 string", () => {
  const shortUrl = shortUrlGenerator();
  expect(shortUrl).toMatch(/^[0-9A-Za-z]{7}$/);
});

//validator.js
describe("emailValidator", () => {
  it("should return true for a valid email", async () => {
    const validEmail = "test@example.com";
    const isValid = await emailValidator(validEmail);
    expect(isValid).toBeTruthy();
  });

  it("should return false for an invalid email", async () => {
    const invalidEmail = "invalid_email";
    const isValid = await emailValidator(invalidEmail);
    expect(isValid).toBeFalsy();
  });
});
