import { ActionFunctionArgs, json } from "@remix-run/node";

export
async function action({ request }: ActionFunctionArgs) {
  return json({ hello: request.url }, 404);
}

export
async function loader({ request }: ActionFunctionArgs) {
  return json({ hello: request.url }, 404);
}
