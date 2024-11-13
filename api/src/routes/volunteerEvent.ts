import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function volunteerEventRoutes(app: FastifyInstance) {
  const paramsSchema = z.object({
    volunteerId: z.coerce.number(),
    eventId: z.coerce.number(),
  });

  const bodySchema = z.object({
    role: z.string().optional(),
  });

  app.get("/volunteer-event", async () => {
    const volunteerEvents = await prisma.volunteerEvent.findMany({
      include: {
        volunteer: true,
        event: true,
      },
    });
    return volunteerEvents;
  });

  app.get("/volunteer-event/:volunteerId/:eventId", async (req, rep) => {
    const { volunteerId, eventId } = paramsSchema.parse(req.params);
    const volunteerEvent = await prisma.volunteerEvent.findUniqueOrThrow({
      where: {
        volunteerId_eventId: {
          volunteerId,
          eventId,
        },
      },
      include: {
        volunteer: true,
        event: true,
      },
    });
    return volunteerEvent;
  });

  app.post("/volunteer-event", async (req, rep) => {
    const { volunteerId, eventId } = paramsSchema.parse(req.body);
    const { role } = bodySchema.parse(req.body);
    const volunteerEvent = await prisma.volunteerEvent.create({
      data: {
        volunteerId,
        eventId,
        role,
      },
    });
    return rep.code(201).send(volunteerEvent);
  });

  app.delete("/volunteer-event/:volunteerId/:eventId", async (req, rep) => {
    const { volunteerId, eventId } = paramsSchema.parse(req.params);
    const volunteerEvent = await prisma.volunteerEvent.delete({
      where: {
        volunteerId_eventId: {
          volunteerId,
          eventId,
        },
      },
    });
    return volunteerEvent;
  });

  app.put("/volunteer-event/:volunteerId/:eventId", async (req, rep) => {
    const { volunteerId, eventId } = paramsSchema.parse(req.params);
    const { role } = bodySchema.parse(req.body);
    const updatedVolunteerEvent = await prisma.volunteerEvent.update({
      where: {
        volunteerId_eventId: {
          volunteerId,
          eventId,
        },
      },
      data: {
        role,
      },
    });
    return rep.send(updatedVolunteerEvent);
  });
}
