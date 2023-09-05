import {useNavigate} from 'react-router-dom';
import './all.css';

function Pagenotfound(){

    const navigate = useNavigate();

    return(
    <div className='d-flex w_1024 justify-content-center align-items-center mt-3 flex-wrap mx_auto gap_x_20'>
        <div className='d-flex flex-column align-items-center'>
            <h2 className="fw-bolder fs_120 mb-4">4 0 4</h2>
            <h3 className='mb-4 fw-bold fs_36 text-center'>Oops！Page Not Found！</h3>
            <button className='border-0 rounded-3 py_12 px-2 btn_bg text-light fw-bold fs_36' onClick={()=>navigate("/")}>
                Back to Homepage
            </button>
        </div>
        <div className='w_240'>
            <img className='w_100per' src="public\empty 1.png" alt="" />
        </div>
    </div>
    )
}

export default Pagenotfound