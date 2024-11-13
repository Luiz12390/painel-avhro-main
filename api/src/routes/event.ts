// Arquivo: eventRoutes.js
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function eventRoutes(app: FastifyInstance) {
  const paramsSchema = z.object({
    id: z.coerce.number(),
  });

  const bodySchema = z.object({
    name: z.string(),
    date: z.coerce.date(),
    location: z.string().optional(),
    description: z.string().optional(),
  });

  app.get("/event", async () => {
    const events = await prisma.event.findMany();
    return events;
  });

  app.get("/event/:id", async (req, rep) => {
    const { id } = paramsSchema.parse(req.params);
    const event = await prisma.event.findUniqueOrThrow({
      where: { id },
    });
    return event;
  });

  app.post("/event", async (req, rep) => {
    const { name, date, location, description } = bodySchema.parse(req.body);
    const event = await prisma.event.create({
      data: { name, date, location, description },
    });
    return rep.code(201).send(event);
  });

  app.delete("/event/:id", async (req, rep) => {
    const { id } = paramsSchema.parse(req.params);
    const event = await prisma.event.delete({
      where: { id },
    });
    return event;
  });

  app.put("/event/:id", async (req, rep) => {
    const { id } = paramsSchema.parse(req.params);
    const { name, date, location, description } = bodySchema.parse(req.body);
    const updatedEvent = await prisma.event.update({
      where: { id },
      data: { name, date, location, description },
    });
    return rep.send(updatedEvent);
  });
}
