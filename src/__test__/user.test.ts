const supertest = require("supertest");
import createServer from "../server";
import connection from "../db/config";
import bcrypt from "bcrypt";

beforeAll(async () => {
  await connection.sync();
});

afterAll(async () => {
  await connection.close();
});

const curr = {
  username: "mike1",
  displayName: "mike11",
  password: "callme1",
  email: "mike@gmail.com1",
  mobileNum: "78945612301",
};

const saltRounds = 8;

const currres = {
  id: 1,
  username: "mike1",
  displayName: "mike11",
  password: "callme1",
  email: "mike@gmail.com1",
  mobileNum: "78945612301",
 
};

const currres1 = {
  id: 1,
  username: "mike1",
  displayName: "mike11",
  password: "callme1",
  email: "mike@gmail.com1",
  mobileNum: "78945612301",
  powers: [],
};

jest.setTimeout(7000);
describe("given the username and password are valid", () => {
  it("should return the user payload", async () => {
    const { statusCode, body } = await supertest(createServer)
      .post("/power/adduser")
      .send(curr);

     console.log("Created",body,body.data.id);
    expect(statusCode).toBe(200);
    expect(body.message).toStrictEqual("created successfully");
  });

  it("should return all users", async () => {
    const { statusCode, body } = await supertest(createServer).get(
      "/power/user"
    );

    expect(statusCode).toBe(200);
    expect(body.message).toStrictEqual(" fetched successfully");
  });

  it("should return uesr by id", async () => {
    const { statusCode, body } = await supertest(createServer).get(
      "/power/user/1"
    );

    expect(statusCode).toBe(200);
    expect(body.message).toStrictEqual(" fetched successfully");
  });
});
