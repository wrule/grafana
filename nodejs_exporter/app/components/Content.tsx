import { PropsWithChildren } from "react";

export default
function Content(props: PropsWithChildren) {
  return <div className="pt-16 pl-52">
    {props.children}
  </div>;
}
