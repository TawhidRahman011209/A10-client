import React, { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";
import SkeletonCard from "../components/SkeletonCard";

export default function Challenges(){
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    (async()=>{
      try{
        const res = await API.get("/api/challenges");
        setChallenges(res.data);
      }catch(err){
        toast.error("Failed to load challenges");
      }finally{ setLoading(false); }
    })();
  },[]);

  return (
    <div>
      <h2>All Challenges</h2>
      {loading ? <div className="grid">{[1,2,3,4].map(i=> <SkeletonCard key={i} />)}</div> : (
        <div className="grid">
          {challenges.map(c=>(
            <article className="card" key={c._id}>
              <img src={c.imageUrl || "/placeholder.jpg"} alt={c.title}/>
              <h4>{c.title}</h4>
              <div style={{color:"var(--muted)"}}>{c.category} • {c.duration} days • {c.participants} participants</div>
              <p>{c.description?.slice(0,120)}</p>
              <a className="btn" href={`/challenges/${c._id}`}>View</a>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
