import { ActionFunctionArgs } from "@remix-run/node";
import { collectDefaultMetrics, register } from "prom-client";

register.clear();
collectDefaultMetrics();

export
async function loader({ request }: ActionFunctionArgs) {
  return new Response(await register.metrics(), { headers: { 'Content-Type': register.contentType } });
}
