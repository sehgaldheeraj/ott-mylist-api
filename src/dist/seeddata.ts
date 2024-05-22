import mongoose from "mongoose";
import { User } from "../models/user.model";
import { MyList } from "../models/myList.model";
import { Movie } from "../models/movie.model";
import { TVShow } from "../models/tvShow.model";

const uri =
  "mongodb+srv://sehgalBase:tcRyVvxEDQk6zbTr@qkart-node.gfd7l7k.mongodb.net/ott-platform";
/**
 * Seeds the database with initial user data.
 *
 * @return {Promise<void>} A promise that resolves when the seeding is completed successfully.
 */
const seedUsers = async (): Promise<void> => {
  try {
    const usersData = [
      {
        username: "user1",
        preferences: {
          favoriteGenres: ["Action", "Drama"],
          dislikedGenres: ["Horror"],
        },
        watchHistory: [],
      },
      {
        username: "user2",
        preferences: {
          favoriteGenres: ["Comedy", "Romance"],
          dislikedGenres: ["SciFi"],
        },
        watchHistory: [],
      },
    ];

    await User.insertMany(usersData);

    console.log("Users seeding completed successfully");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};

/**
 * Seeds the database with initial movie data.
 *
 * @return {Promise<void>} A promise that resolves when the seeding is completed successfully.
 */
const seedMovies = async (): Promise<void> => {
  try {
    const moviesData = [
      {
        title: "The Shawshank Redemption",
        description: "Two imprisoned men bond over a number of years...",
        genres: ["Drama"],
        releaseDate: new Date("1994-10-14"),
        director: "Frank Darabont",
        actors: ["Tim Robbins", "Morgan Freeman"],
      },
      {
        title: "The Godfather",
        description: "The aging patriarch of an organized crime dynasty...",
        genres: ["Crime", "Drama"],
        releaseDate: new Date("1972-03-24"),
        director: "Francis Ford Coppola",
        actors: ["Marlon Brando", "Al Pacino"],
      },
    ];

    await Movie.insertMany(moviesData);

    console.log("Movies seeding completed successfully");
  } catch (error) {
    console.error("Error seeding movies:", error);
  }
};

/**
 * Seeds the database with initial TV show data.
 *
 * @return {Promise<void>} A promise that resolves when the seeding is completed successfully.
 */
const seedTVShows = async (): Promise<void> => {
  try {
    const tvShowsData = [
      {
        title: "Breaking Bad",
        description:
          "A high school chemistry teacher turned methamphetamine manufacturer...",
        genres: ["Crime", "Drama", "Thriller"],
        episodes: [
          {
            episodeNumber: 1,
            seasonNumber: 1,
            releaseDate: new Date("2008-01-20"),
            director: "Vince Gilligan",
            actors: ["Bryan Cranston", "Aaron Paul"],
          },
        ],
      },
      {
        title: "Friends",
        description:
          "Follows the personal and professional lives of six twenty to thirty-something-year-old friends...",
        genres: ["Comedy", "Romance"],
        episodes: [
          {
            episodeNumber: 1,
            seasonNumber: 1,
            releaseDate: new Date("1994-09-22"),
            director: "Kevin S. Bright",
            actors: ["Jennifer Aniston", "Courteney Cox"],
          },
        ],
      },
    ];

    await TVShow.insertMany(tvShowsData);

    console.log("TV shows seeding completed successfully");
  } catch (error) {
    console.error("Error seeding TV shows:", error);
  }
};

/**
 * Seeds the database with initial MyList data.
 *
 * @return {Promise<void>} A promise that resolves when the seeding is completed successfully.
 */
const seedMyList = async (): Promise<void> => {
  try {
    const myListData = [
      {
        userId: "user1",
        contentId: "movie1",
        contentType: "Movie",
      },
      {
        userId: "user1",
        contentId: "show1",
        contentType: "TVShow",
      },
      {
        userId: "user2",
        contentId: "movie2",
        contentType: "Movie",
      },
      {
        userId: "user2",
        contentId: "show2",
        contentType: "TVShow",
      },
    ];

    await MyList.insertMany(myListData);

    console.log("MyList seeding completed successfully");
  } catch (error) {
    console.error("Error seeding MyList:", error);
  }
};

/**
 * Seeds the database with initial data for users, movies, TV shows, and MyList.
 *
 * @return {Promise<void>} A promise that resolves when the seeding is completed successfully.
 */
const seedData = async (): Promise<void> => {
  await seedUsers();
  await seedMovies();
  await seedTVShows();
  await seedMyList();
};

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
    seedData().then(() => {
      console.log("Data seeding completed successfully");
      mongoose.disconnect();
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
