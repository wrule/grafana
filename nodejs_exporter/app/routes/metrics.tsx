import { ActionFunctionArgs } from "@remix-run/node";
import client from "prom-client";
import Logger from "~/utils/logger";

client.register.clear();
client.register.registerMetric(new client.Gauge({
  name: 'sin',
  help: 'sin function',
  collect() {
    this.set((Math.sin(Math.floor(Date.now() / 2000) / 10) + 1) * 50);
  },
}));
client.collectDefaultMetrics();

export
async function loader({ request }: ActionFunctionArgs) {
  Logger.info(request.url);
  return new Response(await client.register.metrics(), { headers: { 'Content-Type': client.register.contentType } });
}
