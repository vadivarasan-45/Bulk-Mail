import axios from "axios"
import {useState} from "react"
import * as XLSX from "xlsx"
function Add()
{
  const [one,setone]=useState("")
  const [two,settwo]=useState(false)
  const [value,setvalue]=useState([])
  function o(event)
  {
   setone(event.target.value)
  }
  function s()
  {
   setone("")
   settwo(true)
   axios.post("https://backend-wine-pi.vercel.app/email", { msg:one,total:value }).then(function(iteam){
    console.log("yes")
    if(iteam.data==true)
    {
     alert("This message was send sucessfully...")
     settwo(false)
    }
    else{
     alert("This message was failed to send")
     settwo(false)
    }
   })}
   function b(event)
   {
    const t = event.target.files[0]
    const reader= new FileReader();
    reader.onload=function(event){
        const data=event.target.result;
        const workbook = XLSX.read(data, { type: 'binary' })
        const sheetName=workbook.SheetNames[0]
        const worksheet=workbook.Sheets[sheetName]
        const find=XLSX.utils.sheet_to_json(worksheet,{header:'A'})
        const last=find.map(function(iteam){
          return(
            iteam.A
          )
        })
        setvalue(last)
        console.log(last)
    }
    reader.readAsBinaryString(t)
   }
  return(
    <div>
   <div className="bg-blue-950 text-white text-center">
    <h1 className="text-4xl px-2 py-2">BulkMail</h1>
   </div>
   <div className="bg-blue-800 text-white text-center">
    <h1 className="font-medium text-2xl px-2 py-3">We can help your business with sending multiple emails at once</h1>
   </div>
   <div className="bg-blue-500 text-white text-center">
    <h1 className="text-lg px-5 py-2 font-semibold">Drag and Drop</h1>
   </div>
   <div className="bg-blue-400 text-black text-center font-semibold p-4">
   <textarea value={one} onChange={o} type="text" className="w-[80%] h-32 p-2 outline-none border rounded-md" placeholder="Enter the email text ..."></textarea>
   <div className="border-2 border-dashed p-3 m-5">
   <input onChange={b} type="file"></input>
   </div>
   <p>Total Emails in the file:{value.length}</p>
   <div className="bg-blue-400 text-black p-2">
   <button onClick={s} className="border rounded-md p-2 bg-blue-950 w-fit py-2 px-2 outline-none text-white">{two?"Sending...":"Send"}</button>
   </div>
   </div>
   <div className="bg-blue-300 text-white text-center p-9">

   </div>
   <div className="bg-blue-200 text-white text-center p-10">
  
   </div>
   </div>
  )
}
export default Add