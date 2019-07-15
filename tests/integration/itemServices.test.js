const request = require('supertest');

const factory = require('../factories');
const app = require('../../index');

describe("Item Services", () => {

    it("should check if the root route returns a status code of 200", async () => {
      const response = await request(app).get("/").send();
      expect(response.status).toBe(200);
    });

    it("should save an item into the database", async () => {
      const response = await request(app).post("/save").send({
        name: 20,
        price: 10
      });

      expect(response.status).toBe(201);
    })

})