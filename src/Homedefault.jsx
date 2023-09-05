import {useNavigate} from 'react-router-dom';
import './all.css';


function Homedefault(){

    const navigate = useNavigate();

return(              
    <div className='d-flex flex-column align-items-end'>
        <img className='mb-4 w_100per' src="logo_lg.png" alt="" />
        <h2 className='fs-4 mb-4 fw-bold align-self-center text-center'>最實用的線上待辦事項服務</h2>
        <div className='d-flex flex-column align-self-center'>
            <button className="btn_128_w border-0 rounded-3 py_12 px-4 btn_bg text-light fw-bold fs-6 mb-4" onClick={()=>navigate("/login")}>前往登入</button>
            <button className="btn_128_w border-0 rounded-3 py_12 px-4 btn_bg text-light fw-bold fs-6 " onClick={()=>navigate("/register")}>前往註冊</button>
        </div>
    </div>
    )
}

export default  Homedefault
