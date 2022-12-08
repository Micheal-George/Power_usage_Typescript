const supertest = require("supertest");
import createServer from "../server";
import connection from "../db/config";

beforeAll(async () => {
  await connection.sync();
});

afterAll(async () => {
  await connection.close();
});
const curr = {
  fromTime: "2022-11-16T08:32:00.000Z",
  toTime: "2022-11-17T10:33:00.000Z",
  applianceType: "mid-power",
  UserId: 1,
};

const currres = {
  id: 0,
  fromTime: "2022-11-16T08:32:00.000Z",
  toTime: "2022-11-17T10:33:00.000Z",
  applianceType: "mid-power",
  unitConsumed: 78,
  duration: "26:01:00",
  userId: 1,
};

jest.setTimeout(7000);
describe("usage data", () => {
  it("should return the usage", async () => {
    const { statusCode, body } = await supertest(createServer)
      .post("/power/addusage")
      .send(curr);

    expect(statusCode).toBe(200);
    currres.id = body.data.id;
    expect(body.data).toStrictEqual(currres);
  });

  it("should return all usage", async () => {
    const { statusCode, body } = await supertest(createServer).get(
      "/power/usage"
    );

    currres.id = body.data[0].id;
    expect(body.data[0]).toStrictEqual(currres);
  });

 
});
