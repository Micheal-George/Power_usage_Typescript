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
  password: "callme1",
  
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


jest.setTimeout(7000);
describe("given the username and password are valid", () => {
  it("should return the user payload", async () => {
    const { statusCode, body } = await supertest(createServer)
      .post("/power/login")
      .send(curr);

     
    expect(statusCode).toBe(200);
    expect(body.message).toStrictEqual("logged in  successfully");
  });

  it("should return all users", async () => {
    const { statusCode, body } = await supertest(createServer).get(
      "/power/currentuser"
    );

    expect(statusCode).toBe(200);
    expect(body.message).toStrictEqual(" fetched successfully");
  });

//   it("should return uesr by id", async () => {
//     const { statusCode, body } = await supertest(createServer).get(
//       "/power/user/1"
//     );

//     expect(statusCode).toBe(200);
//     expect(body.message).toStrictEqual(" fetched successfully");
//   });
});
