import { HashRouter, useNavigate, NavLink, Routes, Route, Outlet, useParams} from 'react-router-dom';
import Loginpage from './Loginpage';
import Registpage from './Registpage';
function Homepage(){

    return(<>
        <div className="w_1024 px_116 py_86 mx_auto px_0_sm py_48_sm">
            <div className="d-flex justify-content-center align-items-center flex-wrap justify-content-lg-between">
                <img className='d-none d-sm-block' src="left.png" alt="" />
                <Outlet/>
            </div>
        </div>
    </>)     
}

export default Homepage