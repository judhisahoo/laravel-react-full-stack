import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout(){

    const {user,token, setUser, setToken, notification} = useStateContext();
    if(!token){
        return (<Navigate  to="/login" />);
    }

    const onLogout = () =>{

    }
    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/Dashboard">Dashboard</Link>
                <Link to="/users">User List</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}
                        <a href="#" className="btn-logout" onClick={onLogout}>Logout</a>
                    </div>
                </header>
                <main>
                <Outlet />
                </main>
                {notification &&
          <div className="notification">
            {notification}
          </div>
        }
            </div>
        </div>
    )
};