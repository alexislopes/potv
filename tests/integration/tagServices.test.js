const request = require('supertest');

const factory = require('../factories');
const app = require('../../app');

describe("Item Services", () => {
    test("should save a tag into the database", async () => {
        const { status, tag, statusCode } = await request(app).post("/tag").send({
            name: "Higiene",
            color: "#decade"
          });
        
          expect(statusCode).toBe(201);
        })

        test("should check if the find all route is returning status of 200", async () => {
          const { statusCode } = await request(app).get("/tag").send()
    
          expect(statusCode).toBe(200);
        })
})