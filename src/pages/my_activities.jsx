import React, { useEffect, useState } from "react";
import ProtectedRoute from "../components/protected_route";
import API from "../api";
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

function Activities(){
  const [user, setUser] = useState(null);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, (u)=> {
      setUser(u);
      if(u) load(u);
      else { setList([]); setLoading(false); }
    });
    return unsub;
  },[]);

  const load = async (u) => {
    try{
      setLoading(true);
      const res = await API.get(`/api/user-challenges/user/${u.uid || u.email}`);
      setList(res.data);
    }catch(err){
      toast.error("Failed to load activities");
    }finally{ setLoading(false); }
  }

  const updateProgress = async (id, progress) => {
    try{
      const res = await API.patch(`/api/user-challenges/${id}`, { progress });
      setList(prev => prev.map(x => x._id === id ? res.data : x));
      toast.success("Progress updated");
    }catch(err){ toast.error("Failed to update"); }
  }

  return (
    <div>
      <h2>My Activities</h2>
      {loading ? <div className="skeleton" style={{height:100}}/> : (
        <div>
          {list.length===0 ? <div>No joined challenges</div> : list.map(item=>(
            <div key={item._id} className="card" style={{display:"flex",flexDirection:"column"}}>
              <h4>{item.challengeId?.title}</h4>
              <div>Progress: {item.progress}%</div>
              <input type="range" min="0" max="100" value={item.progress} onChange={(e)=> updateProgress(item._id, +e.target.value)} />
              <div style={{color:"var(--muted)"}}>Status: {item.status}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function MyActivitiesPage(){ return <ProtectedRoute><Activities/></ProtectedRoute> }
