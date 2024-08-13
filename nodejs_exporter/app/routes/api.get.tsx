import { ActionFunctionArgs, json } from "@remix-run/node";

export
async function loader({ request }: ActionFunctionArgs) {
  return json({ hello: request.url });
}
