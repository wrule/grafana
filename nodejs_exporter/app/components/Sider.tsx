import { PropsWithChildren } from "react";

export default
function Sider(props: PropsWithChildren) {
  return <div className="fixed top-16 left-0 bottom-0 w-52 border-r bg-white z-20 overflow-auto">
    {props.children}
  </div>;
}
