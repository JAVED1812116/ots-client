import React, {useState} from "react";
import Wrapper from "../../../components/Wrapper";

export default function RequestUserDetail() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Wrapper open={open} setOpen={setOpen} />
      <div className={`${open ? "sidebar-open" : "sidebar-closed"} `}>
        <div className="main">
          <div className="text">
            <text>
              My name is ------ we are total ------ family members. I visit your
              flat --Number--- on -----date.Deposit -----rupees.Monthly
              Rent------rupees.i will shift on -----date.
            </text>
          </div>
        </div>
      </div>
    </>
  );
}
