import { Link, useLocation } from "@remix-run/react";
import { useMemo } from "react";

export
interface MenuItem {
  name: string;
  path: string;
}

export default
function Menu(props: { items?: MenuItem[] }) {
  const rLocation = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return rLocation.pathname === path;
    return rLocation.pathname.startsWith(path);
  };

  const items = useMemo(() => {
    const result: MenuItem[] = [];
    result.push({ name: '首页', path: '/' });
    result.push(...(props.items ?? []));
    result.push({ name: '关于', path: '/about' });
    return result;
  }, [props.items]);

  return <ul>
    {items.map((item) => <li key={item.path}>
      <Link
        className={`flex items-center h-8 px-4 duration-200 whitespace-nowrap overflow-hidden ${
          isActive(item.path) ? 'bg-main-200' : 'hover:bg-main-100 hover:text-main-500'
        }`}
        to={item.path}>
        {item.name}
      </Link>
    </li>)}
  </ul>;
}
