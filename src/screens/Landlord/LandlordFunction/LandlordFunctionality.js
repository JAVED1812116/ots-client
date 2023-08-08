import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import agreement from "../../../assets/agreement.png"
import uploadBill from "../../../assets/UploadBill.jpg"
import previousBill from "../../../assets/previousBill.jpg"
import unRegister from "../../../assets/unRigister.png"
import Wrapper from '../../../components/Wrapper';
import { useState } from 'react';
import { Grid } from '@mui/material';
export default function LandlordFunctionality() {
  const [open, setOpen] = useState(false);
  return (
    <>
    <Wrapper open={open} setOpen={setOpen} />
      <div className={`${open ? "sidebar-open" : "sidebar-closed"} `} style={{flex:1}}>

     <div>
        <Grid container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            mt={10}
      >
      <Button size="small">
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt=""
        height="140"
        image={agreement}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Agreement
        </Typography>
      </CardContent>
    </Card>
    </Button>
    
      <Button size="small">
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt=""
        height="140"
        image={uploadBill}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Upload Bill
        </Typography>
      </CardContent>
    </Card>
    </Button>
    </Grid>
</div>
<div >
     <Grid container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
           mt={10}
      >
      <Button size="small">
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt=""
        height="140"
        image={previousBill}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Previous Bill
        </Typography>
      </CardContent>
    </Card>
    </Button>

      <Button size="small">
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt=""
        height="140"
        image={unRegister}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          UnRegister
        </Typography>
      </CardContent>
    </Card>
    </Button>
    </Grid>
     </div>
      
      </div>
      </>
      
  );
}