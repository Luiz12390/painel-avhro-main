import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import { donataryRoutes } from "./routes/donatary";
import { donationDeliveredRoutes } from "./routes/donationDelivered";
import { donationReceivedRoutes } from "./routes/donationReceived";
import { familyRoutes } from "./routes/family";
import { donorRoutes } from "./routes/donor";
import { volunteerRoutes } from "./routes/volunteer";
import { eventRoutes } from "./routes/event";
import { volunteerEventRoutes } from "./routes/volunteerEvent";

const app = fastify({
  logger: true
});

app.register(fastifyCors, {
  origin: true
});

app.register(donataryRoutes);
app.register(donationDeliveredRoutes);
app.register(donationReceivedRoutes);
app.register(familyRoutes);
app.register(donorRoutes);
app.register(volunteerRoutes);
app.register(eventRoutes);
app.register(volunteerEventRoutes);

export default app;