const request = require('supertest');

const factory = require('../factories');
const app = require('../../index');

describe("Item Services", () => {
    test("should save an item into the database", async () => {
      const { text, statusCode } = await request(app).post("/item").send({
        name: "salve",
        priceData: { price: 10, timestamp: 10055526, local: "mercado" }
      });

      const { message, item } = JSON.parse(text);

      expect(statusCode).toBe(201);
      expect(item.name).toBe("salve");
      expect(item.priceData.price).toBe(10);
      expect(message).toBe("Created");
    })

    test("should check if the find all route is returning status of 200", async () => {
      const { text, statusCode } = await request(app).get("/item").send()
      const { message, item } = JSON.parse(text);

      expect(statusCode).toBe(200);
      expect(message).toBe("OK");
      expect(typeof item).toBe("object");
    })

})