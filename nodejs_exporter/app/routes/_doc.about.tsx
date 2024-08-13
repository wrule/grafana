import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "DEMO About" }];
};

export default
function DocAbout() {
  return <div>关于</div>;
}
