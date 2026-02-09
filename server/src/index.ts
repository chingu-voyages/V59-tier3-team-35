import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import { API_OBJECTS, APP_NAME } from "./constants/app";
import { questionsRoutes } from "./routes/questions";
import { rolesRoutes } from "./routes/roles";
import { baseResponseSchema } from "./schemas/builders";
import { constructResponse } from "./utilities/common";
// import pkg from "../../package.json";

const port = Number(process.env.PORT || 0) || 4000;
const host = "RENDER" in process.env ? `0.0.0.0` : `localhost`;

const setup = async () => {
  const server = fastify();

  // CORS
  await server.register(cors, {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  });

  // Swagger (OpenAPI)
  await server.register(swagger, {
    openapi: {
      info: {
        title: "Interview Flashcards API",
        version: "1.0.0",
      },
    },
  });

  // Swagger UI
  await server.register(swaggerUi, {
    routePrefix: "/docs",
  });

  // Router: register route modules (use a prefix if you want)
  await server.register(rolesRoutes, { prefix: "/api/roles" });
  await server.register(questionsRoutes, { prefix: "/api/questions" });

  server.get(
    "/",
    {
      schema: {
        tags: ["Base"],
        summary: "Health check",
        description: "Returns a welcome message for the API.",
        response: {
          200: baseResponseSchema,
        },
      },
    },
    (req, reply) =>
      constructResponse({
        reply,
        code: 200,
        apiObject: API_OBJECTS.Base,
        message: `Welcome to ${APP_NAME} API`,
      }),
  );

  server.get(
    "/openapi.json",
    {
      schema: {
        tags: ["Docs"],
        summary: "OpenAPI JSON",
        description: "Returns the OpenAPI specification as JSON.",
        response: {
          200: {
            type: "object",
            additionalProperties: true,
          },
        },
      },
    },
    async () => server.swagger(),
  );

  server.listen({ host, port }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    // http://[::1]:8080
    const url = address.includes("::1") ? `http://localhost:${port}` : address;
    console.log(`[server]: Listening at ${url}`);
  });

  return server;
};

setup();
