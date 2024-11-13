import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function userRoutes(app: FastifyInstance) {
  const paramsSchema = z.object({
    id: z.coerce.number(),
  });

  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    dateRegistration: z.coerce.date(),
  });

  app.get("/users", async () => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        dateRegistration: true,
      },
    });

    return users;
  });

  app.get("/users/:id", async (req, rep) => {
    const { id } = paramsSchema.parse(req.params);

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return user;
  });

  app.post("/users", async (req, rep) => {
    const { name, email, dateRegistration } = bodySchema.parse(req.body);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        dateRegistration,
      },
    });

    return rep.code(201).send(user);
  });

  app.delete("/users/:id", async (req, rep) => {
    const { id } = paramsSchema.parse(req.params);

    const user = await prisma.user.delete({
      where: {
        id,
      },
    });

    return user;
  });

  app.put("/users/:id", async (req, rep) => {
    const { id } = paramsSchema.parse(req.params);
    const { name, email, dateRegistration } = bodySchema.parse(req.body);

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        dateRegistration,
      },
    });

    return rep.send(updatedUser);
  });
}
