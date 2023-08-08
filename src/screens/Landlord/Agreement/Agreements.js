import React from 'react'
import Wrapper from '../../../components/Wrapper'
import { useState } from 'react';
export default function Agreements() {
  const [open, setOpen] = useState(false);
  return (
    <>
    <Wrapper open={open} setOpen={setOpen} />
      <div className={`${open ? "sidebar-open" : "sidebar-closed"} `}>
      
      </div>
    </>
  )
}
