const request = require("supertest");
// we also need our app for the correct routes!
const app = require("./app");

describe("GET / ", () => {
  test("blank", async () => {
    expect(1).toBe(1);
  });
});
