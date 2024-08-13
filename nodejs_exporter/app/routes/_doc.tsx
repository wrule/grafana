import { MetaFunction, Outlet } from "@remix-run/react";
import Content from "~/components/Content";
import Header from "~/components/Header";
import Menu from "~/components/Menu";
import Sider from "~/components/Sider";

export const meta: MetaFunction = () => {
  return [{ title: "DEMO Page" }];
};

export default
function Doc() {
  return <>
    <Header />
    <Sider>
      <Menu />
    </Sider>
    <Content>
      <Outlet />
    </Content>
  </>;
}
