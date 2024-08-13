import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "DEMO" },
    { name: "description", content: "This is a demo." },
  ];
};

export default
function DocIndex() {
  return (
    <div>
      你好，世界
    </div>
  );
}
