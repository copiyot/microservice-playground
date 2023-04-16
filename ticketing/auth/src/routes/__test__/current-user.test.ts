import request from "supertest";
import { app } from "../../app";

it("responds with details about the curent user", async () => {
  const cookie = await signin();

  const response = await request(app)
    .get("/api/users/curentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("responds with null if not authenticated", async () => {
  const response = await request(app)
    .get("/api/users/curentuser")
    .send()
    .expect(401);

  expect(response.body.currentUser).toEqual(undefined);
});
