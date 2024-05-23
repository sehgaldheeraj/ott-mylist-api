import request from "supertest";
import mongoose from "mongoose";
import { app } from "../server";
import { MyList, User, Movie, TVShow } from "../models";
import RedisClient from "../config/redis";

describe("MyList API", () => {
  beforeAll(async () => {
    // Connect to the in-memory MongoDB server
    await mongoose.connect(process.env.MONGO_URI!);
  });

  afterAll(async () => {
    // Close the connection after tests
    await mongoose.connection.close();
    await RedisClient.quit();
  });

  const mockUserId = new mongoose.Types.ObjectId().toHexString();
  const mockContentId = new mongoose.Types.ObjectId().toHexString();

  beforeEach(async () => {
    await MyList.deleteMany({});
    await User.deleteMany({});
    await Movie.deleteMany({});
    await TVShow.deleteMany({});
  });

  describe("MyList API", () => {
    describe("POST /api/mylist", () => {
      it("should add an item to the user's list", async () => {
        const response = await request(app)
          .post("/api/mylist")
          .send({
            userId: mockUserId,
            contentId: mockContentId,
            contentType: "Movie",
          })
          .expect(201);

        expect(response.body.message).toBe("Item added successfully");
        expect(response.body.newItem.userId).toBe(mockUserId);
        expect(response.body.newItem.contentId).toBe(mockContentId);
        expect(response.body.newItem.contentType).toBe("Movie");
      });

      it("should return 400 if userId, contentId, or contentType is missing", async () => {
        await request(app)
          .post("/api/mylist")
          .send({ userId: mockUserId, contentId: mockContentId })
          .expect(400);
      });

      it("should return 409 if the item already exists", async () => {
        const newItem = new MyList({
          userId: mockUserId,
          contentId: mockContentId,
          contentType: "Movie",
        });
        await newItem.save();

        await request(app)
          .post("/api/mylist")
          .send({
            userId: mockUserId,
            contentId: mockContentId,
            contentType: "Movie",
          })
          .expect(409);
      });
    });

    describe("DELETE /api/mylist/:userId/:contentId", () => {
      it("should remove an item from the user's list", async () => {
        const newItem = new MyList({
          userId: mockUserId,
          contentId: mockContentId,
          contentType: "Movie",
        });
        await newItem.save();

        await request(app)
          .delete(`/api/mylist/${mockUserId}/${mockContentId}`)
          .expect(200);

        const item = await MyList.findOne({
          userId: mockUserId,
          contentId: mockContentId,
        });
        expect(item).toBeNull();
      });

      it("should return 404 if the item does not exist", async () => {
        await request(app)
          .delete(`/api/mylist/${mockUserId}/${mockContentId}`)
          .expect(404);
      });
    });

    describe("GET /api/mylist/:userId", () => {
      it("should retrieve the user's list of items", async () => {
        const newItem = new MyList({
          userId: mockUserId,
          contentId: mockContentId,
          contentType: "Movie",
        });
        await newItem.save();

        const response = await request(app)
          .get(`/api/mylist/${mockUserId}`)
          .expect(200);

        expect(response.body.items.length).toBe(1);
        expect(response.body.items[0].contentId).toBe(mockContentId);
        expect(response.body.items[0].contentType).toBe("Movie");
      });
    });
  });
});
