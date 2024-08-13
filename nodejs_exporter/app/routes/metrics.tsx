import { ActionFunctionArgs } from "@remix-run/node";
import { collectDefaultMetrics, register } from "prom-client";

// collectDefaultMetrics();

export
async function loader({ request }: ActionFunctionArgs) {
  return new Response('hello world', { headers: { 'content-type': 'text/plain' } });
}
