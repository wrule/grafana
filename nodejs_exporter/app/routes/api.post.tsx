import { ActionFunctionArgs, json } from "@remix-run/node";

export
async function action({ request }: ActionFunctionArgs) {
  return json({ hello: request.url });
}
