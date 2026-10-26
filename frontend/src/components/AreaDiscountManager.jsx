import {useState,useEffect} from 'react';
import API from '../services/api';
export default function AreaDiscountManager(){
  const [list,setList] = useState([]);
  const [form,setForm] = useState({pincode:''});
  const load =async () => API.get('/area-discounts').then(r => setList(r.data));
  useEffect(() => {load();},[]);

  const add =async () =>{
    try{ await API.post('/area-discounts',{pincode: form.pincode,percent:Number(form.percent)});load();}
    catch (e) {alert(e.response?.data?.message);}
  };
  return (
    <div className="bg-white p-4 rounded">
      <input placeholder="pincode" onChange={e =>setForm({ ... form,pincode:e.target.value})} className="border p-2" />
      <input placeholder="percent" onChange={e =>setForm({ ... form,percent:e.target.value})} className="border p-2" />
      <button onClick={add} className="bg-green-600 text-white px-3 py-2">Add</button>
      {list.map(d =>(
        <p key={d._id}>{d.pincode} - {d.percent}% <button onClick={() => API.delete(`/area-discounts/${d._id}`).then(load)} className="text-red-600">Delete</button></p>
      
      ))}
      </div>
  );
  
}