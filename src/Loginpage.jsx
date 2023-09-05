import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import apiweb from './website';
import './all.css';

function Loginpage(){
    const [email, setEmail]=useState(""); 
    const [password,setPassword]=useState("");
    const [token,setToken]=useState("");
    const navigate = useNavigate();
    // const [msg,setMSG]=useState("")

    const tmr=new Date();
    tmr.setDate(tmr.getDate()+1);
    const expiredata=tmr.toUTCString();

    async function btnsignin(){
        try{
            const response=await axios.post(apiweb.base+apiweb.signin,{
                email,
                password,
            });
            Swal.fire({
                title: '登入成功',
                text: 'TOKEN為:'+response.data.token,
                icon: 'success',
                confirmButtonColor:"green",
                showConfirmButton: true,
                confirmButtonText:"OK",
                showCloseButton: true,
                timer: 5000
            })
            // setMSG("登入成功 token為:"+ response.data.token)
            setToken(response.data.token)
            document.cookie=`TodoToken=${response.data.token}; expires=${expiredata}; SameSite=None; Secure`
            navigate("/todolist")
        }
        catch(error){
            Swal.fire({
                title: '登入失敗',
                text: error.response.data.message,
                icon: 'error',
                showConfirmButton: true,
                confirmButtonColor:'red',
                confirmButtonText:"重新登入",
                showCloseButton: true,
                timer: 5000,
            })
            // setMSG("登入失敗:"+error.response.data.message)
            setToken("")
        }
        setEmail("")
        setPassword("")
    }

    return(
    <div className='d-flex justify-content-end align-items-center '>
        <div className='d-flex flex-column'>
            <img className='mb-4 w_100per d-sm-none' src="logo_lg.png" alt="" />
            <h2 className='fs-4 mb_24 fw-bold text-center text-sm-start mb_32_sm'>最實用的線上待辦事項服務</h2>
            <div className="d-flex flex-column mb-3 input_304_w">
                <label htmlFor='signinemail' className="fs-6 fw-bold mb-1">Email</label>
                <input id="signinemail" name="signinemailname" className="border-0 rounded-3 py_12 px-3 fs-6 mb-1 w_100per" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='請輸入Email' type='email'/>
                <p style={{display: email==""?"block":"none"}} className='fs-6 fw-bold remark_c'>此欄位不得為空</p>
            </div>
            <div className='d-flex flex-column mb-4 input_304_w'>
                <label htmlFor='signinpassword' className="fs-6 fw-bold mb-1">密碼</label>
                <input id="signinpassword" name="signinpasswordname" className="border-0 rounded-3 py_12 px-3 fs-6 mb-1 w_100per"  value={password} onChange={(e) => setPassword(e.target.value)} placeholder='請輸入密碼' type='password'/>
                <p style={{display: password==""?"block":"none"}} className='fs-6 fw-bold remark_c'>此欄位不得為空</p>
            </div>
            <div className='d-flex flex-column align-self-center mb-4'>
                <button className=" border-0 rounded-3 py_12 px-5 btn_bg text-light fw-bold fs-6 " onClick={()=>btnsignin()}>登入</button>
                {/* <p className="mt-3 w_300 overflow-auto">{msg}</p> */}
            </div>
            <div className='d-flex flex-column align-self-center '>
                <button className=" border-0 rounded-3 py-0 px-0 bg-transparent fw-bold fs-6 " onClick={()=>navigate("/register")}>註冊帳號</button>
            </div>
        </div>
    </div>
    )
}
export default Loginpage