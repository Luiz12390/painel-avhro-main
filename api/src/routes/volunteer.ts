import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function volunteerRoutes(app: FastifyInstance) {
  const paramsSchema = z.object({
    id: z.coerce.number(),
  });

  const bodySchema = z.object({
    name: z.string(),
    cpf: z.string(),
    phone: z.string().optional(),
    dateRegistration: z.coerce.date(),
  });

  app.get("/volunteer", async () => {
    const volunteers = await prisma.volunteer.findMany();
    return volunteers;
  });

  app.get("/volunteer/:id", async (req, rep) => {
    const { id } = paramsSchema.parse(req.params);
    const volunteer = await prisma.volunteer.findUniqueOrThrow({
      where: { id },
    });
    return volunteer;
  });

  app.post("/volunteer", async (req, rep) => {
    const { name, cpf, phone, dateRegistration } = bodySchema.parse(req.body);
    const volunteer = await prisma.volunteer.create({
      data: { name, cpf, phone, dateRegistration },
    });
    return rep.code(201).send(volunteer);
  });

  app.delete("/volunteer/:id", async (req, rep) => {
    const { id } = paramsSchema.parse(req.params);
    const volunteer = await prisma.volunteer.delete({
      where: { id },
    });
    return volunteer;
  });

  app.put("/volunteer/:id", async (req, rep) => {
    const { id } = paramsSchema.parse(req.params);
    const { name, cpf, phone, dateRegistration } = bodySchema.parse(req.body);
    const updatedVolunteer = await prisma.volunteer.update({
      where: { id },
      data: { name, cpf, phone, dateRegistration },
    });
    return rep.send(updatedVolunteer);
  });
}
