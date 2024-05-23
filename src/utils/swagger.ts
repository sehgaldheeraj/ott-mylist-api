import swaggerAutogen from "swagger-autogen";

const config = {
  info: {
    version: "1.0.0",
    title: "OTT My List",
    description: "Api for OTT My List",
  },
  servers: [
    { url: "http://localhost:3000", description: "Local server" },
    {
      url: "https://ott-mylist-api.onrender.com",
      description: "Deployed server",
    },
  ],
  schemes: ["http", "https"],
  tags: [],
};

const outputfile = "./src/json/swagger_output.json";

const routes = ["./src/server.ts"];

const options = {
  openapi: "3.0.0",
  language: "en-US",
  autoHeaders: true,
  autoBody: true,
  autoQuery: true,
};

swaggerAutogen(options)(outputfile, routes, config);
