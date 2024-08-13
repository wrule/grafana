import { ActionFunctionArgs, json } from "@remix-run/node";
import { collectDefaultMetrics, register } from "prom-client";

collectDefaultMetrics();

export
async function loader({ request }: ActionFunctionArgs) {
  return json({ hello: request.url });
}
