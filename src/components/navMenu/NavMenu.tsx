import { Menu } from 'antd';
import { Link, useLocation } from 'react-router';

export const NavMenu = () => {
    const location = useLocation();
    return (
        <Menu theme="dark" selectedKeys={[location.pathname]}>
            <Menu.Item key="/">
                <Link to="/">Profile</Link>
            </Menu.Item>
            <Menu.Item key="/todo">
                <Link to="/todo">Todo List</Link>
            </Menu.Item>
        </Menu>
    );
};