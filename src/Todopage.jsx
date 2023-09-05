import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import apiweb from './website';
import './all.css';

function Todopage(){
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [todoEdit, setTodoEdit] = useState({});
    const [notyettodos, setNotYetTodos]=useState([]);
    const [donetodos, setDoneTodos]=useState([]);
    const [page,setPage]=useState("");
    const [editbtn,setEditbtn]=useState("");
    const [token,setToken]=useState("");
    const [nickname,setNicknnm]=useState("");
    // const [msg, setMSG] = useState('');

    const navigate = useNavigate();

    const usertoken=document.cookie.split("; ").find((row) => row.startsWith("TodoToken="))?.split("=")[1];
   
    useEffect(() => {
        if(usertoken){
            tokenverify();
            gettodolist();
            setPage("all");
        }
        else{
            navigate("/")
        }
    }, [])

    const header = {
        headers: {
            Authorization: usertoken,
        }
    }

    async function gettodolist() {
        try {
            const respon = await axios.get(apiweb.base + apiweb.todos, header)
            setTodos(respon.data.data)
            const divnotyet=respon.data.data.filter((item)=>item.status===false)
            setNotYetTodos(divnotyet)
            const divnotdone=respon.data.data.filter((item)=>item.status===true)
            setDoneTodos(divnotdone)
        }
        catch (error) {
            // setMSG(error.response.data.message)
        }
    }

    async function addtodolist() {
        if (!newTodo){
            alert("請於欄位中新增待辦事項！")
            return
        }
        const todoadd = {
            content: newTodo,
        };
        try {
            const respon = await axios.post(apiweb.base + apiweb.todos, todoadd, header)
            alert("新增待辦事項\"成功\"！")
        }
        catch (error) {
            alert("新增待辦事項\"失敗\"！")
        }
        setNewTodo("")
        gettodolist();
    }

    async function deletodolist(id) {
        try {
            const respon = await axios.delete(apiweb.base + apiweb.todos + id, header)
            alert("刪除成功")
        }
        catch (error) {
            // setMSG(error.response.data.message)
        }
        gettodolist();
    }

    async function updatodolist(id) {
        const finditem = todos.find((item) => item.id === id);
        finditem.content = todoEdit[id];
        try {
            const respon = await axios.put(apiweb.base + apiweb.todos + id, finditem, header)
            // setMSG(respon.data.data)
            alert("修改待辦事項\"成功\"！")
        }
        catch (error) {
            // setMSG(error.response.data.message)
        }
        gettodolist();
        setTodoEdit({
            ...todoEdit,
            [id]: ''
        })
    }

    async function ordertodolist(id) {
        try {
            const respon = await axios.patch(apiweb.base + apiweb.todos + id + apiweb.toggle, {}, header)
        }
        catch (error) {
            // setMSG(error.response.data.message)
        }
        gettodolist();
    }

    async function btnsignout(){
        try{
            const response=await axios.post(apiweb.base+apiweb.singout,{},header)
            // setMSG(`登出成功`)
            setToken("")
            Swal.fire({
                title: '登出成功',
                text: response.data.message+":"+response.data.status,
                icon: 'success',
                confirmButtonColor:"green",
                showConfirmButton: true,
                confirmButtonText:"OK",
                showCloseButton: true,
                timer: 5000
            })
            navigate("/")
        }
        catch(error){
            // setMSG("登出失敗:"+error.response.data.message)
            Swal.fire({
                title: '登出失敗',
                text: error.response.data.message,
                icon: 'error',
                showConfirmButton: true,
                confirmButtonColor:'red',
                confirmButtonText:"請重新登出",
                showCloseButton: true,
                timer: 5000
            })
        }
    }

    async function tokenverify(){
        try{
            const response= await axios.get(apiweb.base+apiweb.checkout,header)
            setNicknnm(response.data.nickname)
            setToken(usertoken)
            // setMsg(`驗證成功，uid為:${response.data.uid}，暱稱為:${response.data.nickname}`)
        }
        catch(error){
            // setMsg("失敗:"+error.response.data.message)
            setNicknnm("fail")
            setToken("")
            navigate("/") 
        }
    }

    const renderli=(todoitem,index)=>{
        return (
            <li key={index} className="d-flex mb-3 align-items-start justify-content-between">
            <div className="d-flex align-items-start border-bottom pb-3 edit_428_w me-3">
                <div style={{ display: todoitem.status ? "none" : "block" }}>
                    <button className='border-0 bg-light pe-3' onClick={() => ordertodolist(todoitem.id)}>
                        <img src="Rectangle 2.png" alt="" />
                    </button>
                </div>
                <div style={{ display: todoitem.status ? "block" : "none" }}>
                    <button className='border-0 bg-light pe-3' onClick={() => ordertodolist(todoitem.id)}>
                        <img src="check 1.png" alt="" />
                    </button>
                </div>
                    <input className="fs-6 p-0 m-0 border-0 bg-light updatetodo_frame w_100per" style={{textDecoration: todoitem.status ? "line-through" : "none"}} type="text" placeholder={todoitem.content} onChange={(e) => {
                        const newTodoEdit = { ...todoEdit}
                        newTodoEdit[todoitem.id] = e.target.value
                        setTodoEdit(newTodoEdit)
                        setEditbtn(todoitem.id)
                    }}/>
                    <button className="rounded-3 p-0 btn_bg text-light fs_12 w_70"  style={{display:editbtn===todoitem.id?"block":"none"}} onClick={() => {updatodolist(todoitem.id);setEditbtn("none")}}>確認編輯</button>
            </div>
            <button className='border-0 bg-light py-0 px-0' onClick={() => deletodolist(todoitem.id)}><img src="close (1) 1.png"/></button>
        </li>
    )}


    return(<div className="bg_todopage d-flex justify-content-center align-items-start ">
        <div className="w_1024 d-flex flex-column pt-3 px_32" >
            <div className='d-flex justify-content-between align-items-center mb_40 mb_16_sm'>
                <div className='w_242'>
                    <button className='border-0 py-0 px-0 bg-transparent' onClick={()=>navigate("/")}>
                        <img className='w_100per' src="logo_lg.png" alt="" />
                    </button>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                    <p className='pe-3 fs-6 fw-bold d-none d-sm-block'>{nickname}的待辦</p>
                    <button className='border-0 rounded-3 py-0 px-0 bg-transparent fs-6' onClick={()=>btnsignout()}>登出</button>
                </div>
            </div>

            <div className="d-flex flex-column align-items-center">
                <div className=" addframe todoframe_500_w">
                    <label htmlFor='todoinput' className="fs-6 fw-bold mb-1"></label>
                    <input id="todoinput" className="border-0 rounded-3 py_12 px-3 fs-6 mb-1 w_100per" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder='新增待辦事項' type='text' />
                    <button className='border-0 addbtn_icon' onClick={() => addtodolist()}><img src='plus 1.png'/></button>
                </div>
                <div className='w_240' style={{ display: todos.length==0 ? "block" : "none" }}>
                    <p className='fs-6 mt_60 mb-3 text-center'>目前尚無待辦事項</p>
                    <img className='w_100per' src="empty 1.png" alt="" />
                </div>
                <div className='mt-3 todoframe_500_w' style={{ display: todos.length==0 ? "none" : "block" }}>
                    <div className="w_100per d-flex">
                        <button className="py-3 text-center border-0 border_left_radius fs-6 fw-bold todostate_33pcer_w todohit" onClick={()=>setPage("all")}>全部({todos.length})</button>
                        <button className="py-3 text-center border-0 fs-6 fw-bold todostate_33pcer_w todohit" onClick={()=>setPage("notyet")}>待完成({notyettodos.length})</button>
                        <button className="py-3 text-center border-0 border_right_radius fs-6 fw-bold todostate_33pcer_w todohit" onClick={()=>setPage("done")}>已完成({donetodos.length})</button>
                    </div>
                    <div className="py-4 ps-4 pe-3 d-flex flex-column bg-light rounded-bottom-2">
                        <ul className="d-flex flex-column mb-2 justify-content-between">
                            <div style={{ display: page==="all" ? "block" : "none" }}>
                            {todos.map((todoitem,index) => (renderli(todoitem,index)))}
                            </div>
                            <div style={{ display: page==="notyet" ? "block" : "none" }}>
                            {notyettodos.map((todoitem,index) => (renderli(todoitem,index)))}
                            </div>
                            <div style={{ display: page==="done" ? "block" : "none" }}>
                            {donetodos.map((todoitem,index) => (renderli(todoitem,index)))}
                            </div>
                        </ul>
                        <div className="d-flex justify-content-between align-items-center">
                            <p>{notyettodos.length}個待完成事項</p>
                            <button className="bg-light text-black-50 border-0 bg-transparent" onClick={()=>{
                                const clsdone=()=>{ todos.map((item)=>{if(item.status===true){deletodolist(item.id)}})
                                    return todos.filter((item)=>item.status===false)}
                                setTodos(clsdone)
                                gettodolist()
                                alert("完成清除已完成事項！")
                            }}>清除已完成項目</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>)
}

export default Todopage