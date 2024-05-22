import mongoose, { Schema, Document } from "mongoose";

type Genre =
  | "Action"
  | "Comedy"
  | "Drama"
  | "Fantasy"
  | "Horror"
  | "Romance"
  | "SciFi";

interface IUser extends Document {
  username: string;
  preferences: {
    favoriteGenres: Genre[];
    dislikedGenres: Genre[];
  };
  watchHistory: Array<{
    contentId: string;
    watchedOn: Date;
    rating?: number;
  }>;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  preferences: {
    favoriteGenres: {
      type: [String],
      enum: [
        "Action",
        "Comedy",
        "Drama",
        "Fantasy",
        "Horror",
        "Romance",
        "SciFi",
      ],
      required: true,
    },
    dislikedGenres: {
      type: [String],
      enum: [
        "Action",
        "Comedy",
        "Drama",
        "Fantasy",
        "Horror",
        "Romance",
        "SciFi",
      ],
      required: true,
    },
  },
  watchHistory: [
    {
      contentId: { type: String, required: true },
      watchedOn: { type: Date, required: true },
      rating: Number,
    },
  ],
});

export const User = mongoose.model<IUser>("User", UserSchema);
