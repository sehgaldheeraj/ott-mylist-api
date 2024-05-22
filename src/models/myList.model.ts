import mongoose, { Schema, Document } from "mongoose";

interface IMyList extends Document {
  userId: string;
  contentId: string;
  contentType: "Movie" | "TVShow";
}

const MyListSchema: Schema = new Schema({
  userId: { type: String, ref: "User", required: true, index: true },
  contentId: { type: String, required: true },
  contentType: { type: String, enum: ["Movie", "TVShow"], required: true },
});

MyListSchema.index({ userId: 1, contentId: 1 }, { unique: true });

export const MyList = mongoose.model<IMyList>("MyList", MyListSchema);
