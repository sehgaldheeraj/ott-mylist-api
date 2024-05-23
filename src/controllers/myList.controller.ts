import { Request, Response } from "express";
import { MyList } from "../models";
import { User } from "../models";
import { Movie } from "../models";
import { TVShow } from "../models";
import RedisClient from "../config/redis";
/**
 * Adds an item to the user's list.
 *
 * @param {Request} req - The request object containing the user ID, content ID, and content type.
 * @param {Response} res - The response object used to send the response.
 * @return {Promise<void>} - A promise that resolves when the item is added successfully or rejects with an error.
 */

const addToMyList = async (req: Request, res: Response) => {
  //#swagger.tags = ['MyList']

  const { userId, contentId, contentType } = req.body;
  if (!userId || !contentId || !contentType) {
    return res.status(400).json({
      message: "userId, contentId and contentType are required",
    });
  }
  try {
    const itemExists = await MyList.findOne({
      userId,
      contentId,
    });
    if (itemExists) {
      return res.status(409).json({
        message: "Item already exists",
      });
    }

    const newItem = new MyList({
      userId,
      contentId,
      contentType,
    });

    await newItem.save();

    RedisClient.del(`mylist:${userId}:*`);

    return res.status(201).json({
      message: "Item added successfully",
      newItem,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    res.status(500).json({ message: errorMessage });
  }
};

/**
 * Removes an item from the user's list.
 *
 * @param {Request} req - The request object containing the user ID and content ID.
 * @param {Response} res - The response object used to send the response.
 * @return {Promise<void>} A promise that resolves when the item is removed successfully or rejects with an error.
 */
const removeFromMyList = async (req: Request, res: Response) => {
  //#swagger.tags = ['MyList']

  const { userId, contentId } = req.params;

  try {
    const result = await MyList.findOneAndDelete({ userId, contentId });

    if (!result) {
      return res.status(404).json({
        message: "Item not found in the list.",
      });
    }

    const keys = await RedisClient.keys(`mylist:${userId}:*`);
    if (keys.length > 0) {
      await RedisClient.del(keys);
    }

    res.status(200).json({
      message: "Item removed successfully",
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    res.status(500).json({ message: errorMessage });
  }
};

/**
 * Retrieves the user's list of items from the database and sends it as a response.
 *
 * @param {Request} req - The request object containing the user ID and query parameters.
 * @param {Response} res - The response object used to send the list of items.
 * @return {Promise<void>} - A promise that resolves when the list is retrieved and sent successfully, or rejects with an error.
 */
const getMyList = async (req: Request, res: Response) => {
  //#swagger.tags = ['MyList']

  const { userId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const cacheKey = `mylist:${userId}:${page}:${limit}`;

  try {
    const cachedData = await RedisClient.get(cacheKey);

    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    const items = await MyList.find({ userId })
      .select("contentId contentType")
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .exec();

    await RedisClient.setEx(cacheKey, 3600, JSON.stringify({ items }));

    res.json({ items });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    res.status(500).json({ message: errorMessage });
  }
};

export { addToMyList, removeFromMyList, getMyList };
