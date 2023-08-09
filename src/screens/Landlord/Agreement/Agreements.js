import React from "react";
import Wrapper from "../../../components/Wrapper";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export default function Agreements() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Wrapper open={open} setOpen={setOpen} />
      <div className={`${open ? "sidebar-open" : "sidebar-closed"} `}>
      <Box width={700} ml={70}>
        <Typography variant="h2" align="center" gutterBottom>
          AGREEMENT OF RENT
        </Typography>

        <Typography variant="body1" gutterBottom>
         <b> Name ______________ Father’s Name: ___________</b>landlord holding<b> CNIC NO
          # ___________ </b>Resident House<b>
          #_________________________________________ Karachi </b>(Here in after
          called the landlord) of the one part.
        </Typography>
        <Typography variant="h4" align="center" gutterBottom>
          AND
        </Typography>
        <Typography variant="body1" gutterBottom>
          <b>Name _____________________________________ CNIC
          NO#______________________ </b>(here in after called the Tenant) of the
          other part. Whereas the landlord is owner a residential flat of
          __________________________________. They are agreed to rent out the
          above said flat for a period of <b>11 months</b> commencing <b>from _________ To
          ______________ </b>at the monthly rent of Rs.____________
          (_______________________________) per month will be paid on or before
          5th of every month on following terms and conditions.
        </Typography>

        <Typography variant="body1" gutterBottom mt={3}>
          <b>
          1. Advance Amount Rs. ________ (_______________________) </b>will be paid
          to landlord by tenant as security deposit 
          </Typography>
          <Typography variant="body1" gutterBottom>
          2. That the electricity bill
          / Sui gas bill shall pay by the tenant. 
          </Typography>
          <Typography variant="body1" gutterBottom>
          3. That the tenant shall not
          challenge the ownership of the above said flat. 
          </Typography>
          <Typography variant="body1" gutterBottom>
          4. That the tenant
          shall keep the said flat in the same condition, which he has taken
          possession. 
          </Typography>
          <Typography variant="body1" gutterBottom>
          5. That after expiring of the tenancy period he will
          restore back the possession in the same condition and shall not sublet
          the flat or any portion to anybody else. 
          </Typography>
          <Typography variant="body1" gutterBottom>
          6. That either party shall
          serve one month’s prior notice in advance the rent shall be recovered
          for the notice period also. 
          </Typography>
          <Typography variant="body1" gutterBottom>
          7. That if anybody else or any legal heir
          raised any objection over the lease/rent of the said flat then the
          same shall be got cleared by the landlord. 
          </Typography>
          <Typography variant="body1" gutterBottom>
          8. If either party wants to
          continue this agreement, rent will be increased by 15%, and make a new
          agreement.
        </Typography>
        </Box>
      </div>
    </>
  );
}
