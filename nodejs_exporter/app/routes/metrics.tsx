import { ActionFunctionArgs } from "@remix-run/node";
import { collectDefaultMetrics, register } from "prom-client";
import Logger from "~/utils/logger";

register.clear();
collectDefaultMetrics();

export
async function loader({ request }: ActionFunctionArgs) {
  Logger.info(request.url);
  return new Response(await register.metrics(), { headers: { 'Content-Type': register.contentType } });
}
