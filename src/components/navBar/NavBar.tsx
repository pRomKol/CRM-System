import { Menu } from 'antd';
import { Link, useLocation } from 'react-router';

export const NavBar = () => {
    const location = useLocation();
    return (
        <Menu theme="dark" selectedKeys={[location.pathname]}>
            <Menu.Item key="/profile">
                <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="/">
                <Link to="/">Todo List</Link>
            </Menu.Item>
        </Menu>
    );
};