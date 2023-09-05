import { useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import apiweb from './website';
import './all.css';

function Registpage(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [nickname,setNicknnm]=useState("");
    const [repassword,setRepassword]=useState("");
    const navigate = useNavigate();
    // const [msg,setMSG]=useState("");

    async function submitsingup(){
      if(repassword==password){
        try{
        const response=await axios.post(apiweb.base+apiweb.signup,{
            email,
            password,
            nickname,
        })
        Swal.fire({
            title: '註冊成功',
            text: 'UID為:'+response.data.uid,
            icon: 'success',
            confirmButtonColor:"green",
            showConfirmButton: true,
            confirmButtonText:"OK",
            showCloseButton: true,
            timer: 5000
        })
        // setMSG("UserID為:"+response.data.uid);
        navigate("/login");
        }
        catch(error){
            Swal.fire({
                title: '註冊失敗',
                text: error.response.data.message,
                icon: 'error',
                showConfirmButton: true,
                confirmButtonColor:'red',
                confirmButtonText:"重新註冊",
                showCloseButton: true,
                timer: 5000
            })
            // setMSG("註冊失敗:"+error.response.data.message);
        }
        setEmail("");
        setPassword("");
        setNicknnm("");
        setRepassword("");
        }else{
            Swal.fire({
                title: '註冊失敗',
                text: '請檢查兩次密碼是否相同',
                icon: 'error',
                showConfirmButton: true,
                confirmButtonColor:'red',
                confirmButtonText:"重新註冊",
                showCloseButton: true,
                timer: 5000
            })
        }
    }

    return(
    <div className='d-flex justify-content-start align-items-center '>
        <div className='d-flex flex-column'>
            <img className='mb-4 w_100per d-sm-none' src="logo_lg.png" alt="" />
            <h2 className='fs-4 mb-4 fw-bold text-center text-sm-start'>註冊帳號</h2>
            <div className="d-flex flex-column mb-3 input_304_w">
                <label htmlFor='signupemail' className="fs-6 fw-bold mb-1">Email</label>
                <input id="signupemail" name="signupemailname" className="border-0 rounded-3 py_12 px-3 fs-6 mb-1 w_100per" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='請輸入Email' type='email'/>
                <p style={{display: email==""?"block":"none"}} className='fs-6 fw-bold remark_c'>此欄位不得為空</p>
            </div>
            <div className='d-flex flex-column mb-3 input_304_w'>
                <label htmlFor='signupnickname' className="fs-6 fw-bold mb-1">暱稱</label>
                <input id="signupnickname" name="signupnicknamename" className="border-0 rounded-3 py_12 px-3 fs-6 mb-1 w_100per"  value={nickname} onChange={(e) => setNicknnm(e.target.value)} placeholder='請輸入您的暱稱' type='text'/>
                <p style={{display: nickname==""?"block":"none"}} className='fs-6 fw-bold remark_c'>此欄位不得為空</p>
            </div>
            <div className="d-flex flex-column mb-3 input_304_w">
                <label htmlFor='signuppassword' className="fs-6 fw-bold mb-1">密碼</label>
                <input id="signuppassword" name="signuppasswordname" className="border-0 rounded-3 py_12 px-3 fs-6 mb-1 w_100per" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='請輸入密碼' type='password'/>
                <p style={{display: password==""?"block":"none"}} className='fs-6 fw-bold remark_c'>此欄位不得為空</p>
            </div>
            <div className="d-flex flex-column mb-4 input_304_w">
                <label htmlFor='signuprepassword' className="fs-6 fw-bold mb-1">再次輸入密碼</label>
                <input id="signuprepassword" name="signuprepasswordname" className="border-0 rounded-3 py_12 px-3 fs-6 mb-1 w_100per" value={repassword} onChange={(e) => setRepassword(e.target.value)} placeholder='請輸入密碼' type='password'/>
                <p style={{display: repassword==""?"block":"none"}} className='fs-6 fw-bold remark_c'>此欄位不得為空，請確認兩次密碼相同</p>
            </div>
            <div className='d-flex flex-column align-self-center mb-4 '>
                <button className=" border-0 rounded-3 py_12 px-5 btn_bg text-light fw-bold fs-6 " onClick={()=>{submitsingup();}}>註冊帳號</button>
                {/* <p className="mt-3 w_300 overflow-auto">{msg}</p> */}
            </div>
            <div className='d-flex flex-column align-self-center '>
                <button className=" border-0 rounded-3 py-0 px-0 bg-transparent fw-bold fs-6 " onClick={()=>navigate("/login")}>登入</button>
            </div>
        </div>
    </div>
    )
}

export default Registpage