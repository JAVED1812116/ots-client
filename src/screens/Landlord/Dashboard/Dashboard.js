import { useState } from "react";
import Wrapper from "../../../components/Wrapper";
import "./dashboard.css";
import { useLocation } from "react-router";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [mylocation, setMyLocation] = useState(location.pathname);

  return (
    <>
      <Wrapper open={open} setOpen={setOpen} mylocation= {mylocation}/>
      <div className={`${open ? "sidebar-open" : "sidebar-closed"} `}>
        This is dashboard
      </div>
    </>
  );
}
