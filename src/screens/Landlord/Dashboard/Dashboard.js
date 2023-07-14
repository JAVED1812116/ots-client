import React from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import { Button } from '@mui/material';
import "./dashboard.css"
const Dashboard = () => {
  return (
    <div style={{flex:1}}>
    
     <div className='addNewTenant'>
<PersonAddIcon style={{width:111,height:200,alignItems:'center',justifyContent:'center',marginLeft:85}}/>
<text style={{marginLeft:-130,fontSize:22,fontWeight:'bold'}}>Add New Tenant</text>
     </div>

     <div className='newRequest'>
<AddCircleIcon style={{width:111,height:200,alignItems:'center',justifyContent:'center',marginLeft:85}}/>
<text style={{marginLeft:-130,fontSize:22,fontWeight:'bold'}}>New Request</text>
     </div>

     <div className='allTenant'>
<GroupsRoundedIcon style={{width:111,height:200,alignItems:'center',justifyContent:'center',marginLeft:100}}/>
<text style={{marginLeft:-110,fontSize:22,fontWeight:'bold'}}>All Tenant</text>
     </div>

     <div className='rentSetting'>
<SettingsRoundedIcon style={{width:111,height:200,alignItems:'center',justifyContent:'center',marginLeft:100}}/>
<text style={{marginLeft:-110,fontSize:22,fontWeight:'bold'}}>Rent Setting</text>
     </div>

     <div className='accountDetail'>
<AccountBalanceOutlinedIcon style={{width:111,height:200,alignItems:'center',justifyContent:'center',marginLeft:100}}/>
<text style={{marginLeft:-110,fontSize:22,fontWeight:'bold'}}>Account Detail</text>
     </div>
   
    </div>
  )
}

export default Dashboard
