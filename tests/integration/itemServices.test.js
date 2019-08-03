const request = require('supertest');

const factory = require('../factories');
const app = require('../../app');

describe("Item Services", () => {
    test("should save an item into the database", async () => {
      const { statusCode } = await request(app).post("/item").send({
        name: "auuu",
        tags: ["dasdasdasd", "dasdedfsrf"],
        priceData: [
            {
              price: "2,50",
              brand: "auau",
              timestamp: 6516516518162,
              local: "yamyam"
            }
        ]
      });

      expect(statusCode).toBe(201);
    })

    test("should check if the find all route is returning status of 200", async () => {
      const { text, statusCode } = await request(app).get("/item").send()
      const { message, item } = JSON.parse(text);

      expect(statusCode).toBe(200);
    })

    //204
    test("should update an item", async () => {
      const { statusCode } = await request(app).put("/item").send({
          id: "5d45a83ff40b433c68e126b9",
          item : {
          name: "Leitão",
          tags: ["dasdasdasd", "dasdedfsrf"],
          priceData: [
              {
                price: "2,50",
                brand: "auau",
                timestamp: 6516516518162,
                local: "yamyam"
              }
          ]
        }
      });

      expect(statusCode).toBe(204);
    })

    test("should update a specific attribute of an item", async () => {
      const { statusCode } = await request(app).patch("/item").send({
        id: "5d45a83ff40b433c68e126b9",
        priceData: {
          price: "3,00",
          brand: "wolfwolf",
          timestamp: 6516516545666,
          local: "esquina do clebinho"
        }
      })
      
      expect(statusCode).toBe(204);
    })

    test("should delete an item by id", async () => {
      const { statusCode } = await request(app).delete("/item").send({
        id: "5d45a83ff40b433c68e126b9"
      });

      expect(statusCode).toBe(204);
    })

})