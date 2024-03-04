import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, css } from '@mui/system';
// import { Modal as BaseModal } from '@mui/base/Modal';
import {Modal as BaseModal, FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography} from '@mui/material';
import Fade from '@mui/material/Fade';
// import { Button } from '@mui/base/Button';
import { Button } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import { UpdateElectricBill } from '../../../Redux/Reducer/UpdateElectricReading';
import {GetTenantCurrentBill} from "../../../Redux/Reducer/GetTenantCurrentBill";
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { ElectricPhoto } from '../../../Redux/Reducer/KElectricImg';
export default function TransitionsModal({modalValue, setIsModalVisible,ssgcModal,setSsgcModal,waterModal,setWaterModal,maintainanceModal,setMaintainanceModal,trashModal,setTrashModal}) {
//   const handleOpen = () => setOpen(true);
  const handleClose = () => setIsModalVisible(false);
  const handleSSgcClose = () => setSsgcModal(false);
  const handleWaterClose = () => setWaterModal(false);
  const handleMaintainanceClose = () => setMaintainanceModal(false);
  const handleTrashClose = () => setTrashModal(false);
  const getId=window.location.pathname.replace("/current-Bill/", "");
  const [billData, setBillData] = React.useState([]);
  const [url, setUrl] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState('');
  const dispatch = useDispatch();
  const [inputs, setInputs] = React.useState({});
  const currentDate = moment().format('DD-MM-YYYY');
  React.useEffect(() => {
    dispatch(GetTenantCurrentBill({ id:getId })).then((res) => {
      setBillData(res?.payload?.data?.data);
    });
  }, []);

const handleInputs = (e) => {
  const { value, name } = e.target;
  const maxBillAmount = billData?.electricity_data[0]?.kElectricTotalBill;

  if (parseFloat(value) < 0) {
    setInputs({ ...inputs, [name]: 0 });
    setErrorMessage('Please enter a non-negative number');
  } else if (parseFloat(value) > maxBillAmount) {
    setErrorMessage(`Value cannot exceed ${maxBillAmount}`);
  } else {
    setInputs({ ...inputs, [name]: value });
    setErrorMessage('');
  }
};
  const imgUpload = (e) => {
    dispatch(ElectricPhoto(e.target.files[0])).then((res) => {
      setUrl(res?.payload?.data?.url);
    });
  };

  const handleBillKELECReading = (e) => {
    console.log(url?.length,"javedURL")
    if(url?.length>0){
      let values = {
        tenantMessage: inputs?.tenantMessageKElectric,
        tenantAmount: inputs?.tenantAmountKElectric,
        tenantBillImage:url,
        currentDate:currentDate
        // tenantBillDate: moment(billDate).format("DD-MM-YYYY"),
        // userId: localStorage.getItem("user_id"),
        // userName: localStorage.getItem("name"),
        // tenantId: paramsID,
      };
      if (
        values.tenantMessage &&
        values.tenantAmount 
      ) {
        dispatch(UpdateElectricBill({id:getId,values})).then((res)=>{
          console.log(res)
        })
 
      } else {
        toast.error("Fill All Fields", {
          position: "top-center",
        });
      }
    }else{
      let values = {
        tenantMessage: inputs?.tenantMessageKElectric,
        tenantAmount: inputs?.tenantAmountKElectric,
        currentDate:currentDate
        // tenantBillDate: moment(billDate).format("DD-MM-YYYY"),
        // userId: localStorage.getItem("user_id"),
        // userName: localStorage.getItem("name"),
        // tenantId: paramsID,
      };
      if (
        values.tenantMessage &&
        values.tenantAmount 
      ) {
        dispatch(UpdateElectricBill({id:getId,values})).then((res)=>{
          console.log(res)
        })
 
      } else {
        toast.error("Fill All Fields", {
          position: "top-center",
        });
      }
    }
    
  };
  
  return (
      <>
      {/* ////////////////////////////////////////////////////////////////////////////////K-ELECTRIC ////////////////////////////////////////////////////////*/}
    <div>
      {/* <TriggerButton onClick={handleOpen}>Open modal</TriggerButton> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalValue}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: StyledBackdrop }}
      >
        <Fade in={modalValue}>
          <ModalContent sx={style}>
          <div id="transition-modal-title" className="modal-title flex justifybetween">
                <h2>
              Choose Payment Method K-Electric
                </h2>
              <p style={{fontWeight:'bold'}}>Date: <span>{currentDate}</span></p>
            </div>
                        <div>
                          <Table size="small" aria-label="purchases">
                            <TableHead>
                              <TableRow>
                                <TableCell>Message</TableCell>
                                <TableCell>Due Date</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Total Bill</TableCell>
                                <TableCell>Remaining Bill</TableCell>
                                <TableCell>Upload Image</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  <TextField
                                    id="outlined-number"
                                    label="Enter Message"
                                    //
                                    size="small"
                                    // onChange={(e) => {
                                    //   setKElectricBillEntry(e.target.value);
                                    // }}
                                    name="tenantMessageKElectric"
                                    onChange={handleInputs}
                                  />
                                </TableCell>
                                <TableCell>
                                {billData?.electricity_data?.length >0 ? billData?.electricity_data[0]?.kElectricDueDate:''}
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    id="outlined-number"
                                    label="Amount"
                                    type="number"
                                    size="small"
                                    name="tenantAmountKElectric"
                                    value={inputs.tenantAmountKElectric || ''}
                                    onChange={handleInputs}
                                  />
                                   {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
                                </TableCell>
                               
                                <TableCell>
                                  {billData?.electricity_data?.length >0 ? billData?.electricity_data[0]?.kElectricTotalBill:''}
                                </TableCell>
                                <TableCell>
                                  {/* {inputs.kElectricEnterBill || 0} */}
                                </TableCell>
                                <TableCell>
                                <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Button variant="contained" component="label">
                              Upload
                              <input
                                hidden
                                accept="image/*"
                                type="file"
                                onChange={(e) => imgUpload(e)}
                              />
                            </Button>

                            {/* {url?.length > 0 ? (
                              <Button
                                variant="contained"
                                sx={{
                                  marginTop: 2,
                                  marginRight: 1,
                                  background: "black",
                                }}
                                // onClick={handleBillKELECReading}
                              >
                                Post
                              </Button>
                            ) 
                            : (
                              ""
                            )} */}
                          </Stack>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                          <Button
                            variant="contained"
                            sx={{
                              marginTop: 2,
                              marginRight: 1,
                              background: "black",
                            }}
                            onClick={handleBillKELECReading}
                          >
                            SUBMIT
                          </Button>
                        </div>
                  
          
          </ModalContent>
        </Fade>
      </Modal>

    </div>
     {/* ////////////////////////////////////////////////////////////////////////////////SSGC ////////////////////////////////////////////////////////*/}
     <div>
      {/* <TriggerButton onClick={handleOpen}>Open modal</TriggerButton> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={ssgcModal}
        onClose={handleSSgcClose}
        closeAfterTransition
        slots={{ backdrop: StyledBackdrop }}
      >
        <Fade in={ssgcModal}>
          <ModalContent sx={style}>
          <div id="transition-modal-title" className="modal-title flex justifybetween">
                <h2>
              Choose Payment Method SSGC
                </h2>
              <p style={{fontWeight:'bold'}}>Date: <span>{currentDate}</span></p>
            </div>

          
                        <div>
                          <Table size="small" aria-label="purchases">
                            <TableHead>
                              <TableRow>
                                <TableCell>Message</TableCell>
                                <TableCell>Due Date</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Total Bill</TableCell>
                                <TableCell>Remaining Bill</TableCell>
                                <TableCell>Image Upload</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  <TextField
                                    id="outlined-number"
                                    label="Enter Message"
                                    //
                                    size="small"
                                    // onChange={(e) => {
                                    //   setKElectricBillEntry(e.target.value);
                                    // }}
                                    name="tenantMessageSSGC"
                                    onChange={handleInputs}
                                  />
                                </TableCell>
                                <TableCell>
                               due DATE 
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    id="outlined-number"
                                    label="Amount"
                                    type="number"
                                    size="small"
                                    // onChange={(e) => {
                                    //   setKElectricBillEntry(e.target.value);
                                    // }}
                                    name="tenantAmountSSGC"
                                    onChange={handleInputs}
                                  />
                                </TableCell>
                                <TableCell>
                                  {/* {billData?.electricity_data[0]?.kElectricTotalBill} */}
                                </TableCell>
                                <TableCell>
                                  {/* {inputs.kElectricEnterBill || 0} */}
                                </TableCell>
                                <TableCell>
                                <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Button variant="contained" component="label">
                              Upload
                              <input
                                hidden
                                accept="image/*"
                                type="file"
                                onChange={(e) => imgUpload(e)}
                              />
                            </Button>

                            {/* {url?.length > 0 ? (
                              <Button
                                variant="contained"
                                sx={{
                                  marginTop: 2,
                                  marginRight: 1,
                                  background: "black",
                                }}
                                // onClick={handleBillKELECReading}
                              >
                                Post
                              </Button>
                            ) 
                            : (
                              ""
                            )} */}
                          </Stack>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                          <Button
                            variant="contained"
                            sx={{
                              marginTop: 2,
                              marginRight: 1,
                              background: "black",
                            }}
                            // onClick={handleBillKELECReading}
                          >
                            SUBMIT
                          </Button>
                        </div>
          
          
          </ModalContent>
        </Fade>
      </Modal>

    </div>
    {/* ////////////////////////////////////////////////////////////////////////////////WATER//////////////////////////////////////////////////////////////// */}
    <div>
      {/* <TriggerButton onClick={handleOpen}>Open modal</TriggerButton> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={waterModal}
        onClose={handleWaterClose}
        closeAfterTransition
        slots={{ backdrop: StyledBackdrop }}
      >
        <Fade in={waterModal}>
          <ModalContent sx={style}>
          <div id="transition-modal-title" className="modal-title flex justifybetween">
                <h2>
              Choose Payment Method Water
                </h2>
              <p style={{fontWeight:'bold'}}>Date: <span>{currentDate}</span></p>
            </div>

                       
                        <div>
                          <Table size="small" aria-label="purchases">
                            <TableHead>
                              <TableRow>
                                <TableCell>Message</TableCell>
                                <TableCell>Due Date</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Total Bill</TableCell>
                                <TableCell>Remaining Bill</TableCell>
                                <TableCell>Image Upload</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  <TextField
                                    id="outlined-number"
                                    label="Enter Message"
                                    //
                                    size="small"
                                    // onChange={(e) => {
                                    //   setKElectricBillEntry(e.target.value);
                                    // }}
                                    name="tenantMessageWater"
                                    onChange={handleInputs}
                                  />
                                </TableCell>
                                <TableCell>
                               due DATE 
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    id="outlined-number"
                                    label="Amount"
                                    type="number"
                                    size="small"
                                    // onChange={(e) => {
                                    //   setKElectricBillEntry(e.target.value);
                                    // }}
                                    name="tenantAmountWater"
                                    onChange={handleInputs}
                                  />
                                </TableCell>
                                <TableCell>
                                  {/* {billData?.electricity_data[0]?.kElectricTotalBill} */}
                                </TableCell>
                                <TableCell>
                                  {/* {inputs.kElectricEnterBill || 0} */}
                                </TableCell>
                                <TableCell>
                                <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Button variant="contained" component="label">
                              Upload
                              <input
                                hidden
                                accept="image/*"
                                type="file"
                                onChange={(e) => imgUpload(e)}
                              />
                            </Button>

                            {/* {url?.length > 0 ? (
                              <Button
                                variant="contained"
                                sx={{
                                  marginTop: 2,
                                  marginRight: 1,
                                  background: "black",
                                }}
                                // onClick={handleBillKELECReading}
                              >
                                Post
                              </Button>
                            ) 
                            : (
                              ""
                            )} */}
                          </Stack>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                          <Button
                            variant="contained"
                            sx={{
                              marginTop: 2,
                              marginRight: 1,
                              background: "black",
                            }}
                            // onClick={handleBillKELECReading}
                          >
                            SUBMIT
                          </Button>
                        </div>
                   
          </ModalContent>
        </Fade>
      </Modal>

    </div>
    {/* ////////////////////////////////////////////////////////////////////////////////MAINTAINANCE///////////////////////////////////////////////////////// */}
    <div>
      {/* <TriggerButton onClick={handleOpen}>Open modal</TriggerButton> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={maintainanceModal}
        onClose={handleMaintainanceClose}
        closeAfterTransition
        slots={{ backdrop: StyledBackdrop }}
      >
        <Fade in={maintainanceModal}>
          <ModalContent sx={style}>
           <div id="transition-modal-title" className="modal-title flex justifybetween">
                <h2>
              Choose Payment Method MAINTAINANCE
                </h2>
              <p style={{fontWeight:'bold'}}>Date: <span>{currentDate}</span></p>
            </div>
                        <div>
                          <Table size="small" aria-label="purchases">
                            <TableHead>
                              <TableRow>
                                <TableCell>Message</TableCell>
                                <TableCell>Due Date</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Total Bill</TableCell>
                                <TableCell>Remaining Bill</TableCell>
                                <TableCell>Image Upload</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  <TextField
                                    id="outlined-number"
                                    label="Enter Message"
                                    //
                                    size="small"
                                    // onChange={(e) => {
                                    //   setKElectricBillEntry(e.target.value);
                                    // }}
                                    name="tenantMessageMaintainance"
                                    onChange={handleInputs}
                                  />
                                </TableCell>
                                <TableCell>
                               due DATE 
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    id="outlined-number"
                                    label="Amount"
                                    type="number"
                                    size="small"
                                    // onChange={(e) => {
                                    //   setKElectricBillEntry(e.target.value);
                                    // }}
                                    name="tenantAmountMaintainance"
                                    onChange={handleInputs}
                                  />
                                </TableCell>
                                <TableCell>
                                  {/* {billData?.electricity_data[0]?.kElectricTotalBill} */}
                                </TableCell>
                                <TableCell>
                                  {/* {inputs.kElectricEnterBill || 0} */}
                                </TableCell>
                                <TableCell>
                                <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Button variant="contained" component="label">
                              Upload
                              <input
                                hidden
                                accept="image/*"
                                type="file"
                                onChange={(e) => imgUpload(e)}
                              />
                            </Button>

                            {/* {url?.length > 0 ? (
                              <Button
                                variant="contained"
                                sx={{
                                  marginTop: 2,
                                  marginRight: 1,
                                  background: "black",
                                }}
                                // onClick={handleBillKELECReading}
                              >
                                Post
                              </Button>
                            ) 
                            : (
                              ""
                            )} */}
                          </Stack>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                          <Button
                            variant="contained"
                            sx={{
                              marginTop: 2,
                              marginRight: 1,
                              background: "black",
                            }}
                            // onClick={handleBillKELECReading}
                          >
                            SUBMIT
                          </Button>
                        </div>
                     
          </ModalContent>
        </Fade>
      </Modal>

    </div>
    {/* ///////////////////////////////////////////////////////////////////////////////////TRASH///////////////////////////////////////////////////////////// */}
    <div>
      {/* <TriggerButton onClick={handleOpen}>Open modal</TriggerButton> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={trashModal}
        onClose={handleTrashClose}
        closeAfterTransition
        slots={{ backdrop: StyledBackdrop }}
      >
        <Fade in={trashModal}>
          <ModalContent sx={style}>
            <div id="transition-modal-title" className="modal-title flex justifybetween">
                <h2>
              Choose Payment Method TRASH
                </h2>
              <p style={{fontWeight:'bold'}}>Date: <span>{currentDate}</span></p>
            </div>
            {/* <div style={{textAlign:'right'}}>
                            
                         
                        </div> */}
                        <div>
                          <Table size="small" aria-label="purchases">
                            <TableHead>
                              <TableRow>
                                <TableCell>Message</TableCell>
                                <TableCell>Due Date</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Total Bill</TableCell>
                                <TableCell>Remaining Bill</TableCell>
                                <TableCell>Image Upload</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  <TextField
                                    id="outlined-number"
                                    label="Enter Message"
                                    //
                                    size="small"
                                    // onChange={(e) => {
                                    //   setKElectricBillEntry(e.target.value);
                                    // }}
                                    name="tenantMessageTrash"
                                    onChange={handleInputs}
                                  />
                                </TableCell>
                               
                                <TableCell>
                               due DATE 
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    id="outlined-number"
                                    label="Amount"
                                    type="number"
                                    size="small"
                                    // onChange={(e) => {
                                    //   setKElectricBillEntry(e.target.value);
                                    // }}
                                    name="tenantAmountTrash"
                                    onChange={handleInputs}
                                  />
                                </TableCell>
                                <TableCell>
                                  {/* {billData?.electricity_data[0]?.kElectricTotalBill} */}
                                </TableCell>
                                <TableCell>
                                  {/* {inputs.kElectricEnterBill || 0} */}
                                </TableCell>
                                <TableCell>
                                <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Button variant="contained" component="label">
                              Upload
                              <input
                                hidden
                                accept="image/*"
                                type="file"
                                onChange={(e) => imgUpload(e)}
                              />
                            </Button>

                            {/* {url?.length > 0 ? (
                              <Button
                                variant="contained"
                                sx={{
                                  marginTop: 2,
                                  marginRight: 1,
                                  background: "black",
                                }}
                                // onClick={handleBillKELECReading}
                              >
                                Post
                              </Button>
                            ) 
                            : (
                              ""
                            )} */}
                          </Stack>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                          <Button
                            variant="contained"
                            sx={{
                              marginTop: 2,
                              marginRight: 1,
                              background: "black",
                            }}
                            // onClick={handleBillKELECReading}
                          >
                            SUBMIT
                          </Button>
                        </div>
                     
          </ModalContent>
        </Fade>
      </Modal>
      <ToastContainer />
    </div>
    </>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, ...other } = props;
  return (
    <Fade in={open}>
      <div ref={ref} {...other} />
    </Fade>
  );
});

Backdrop.propTypes = {
  open: PropTypes.bool,
};

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "53%",
  height:"50%"
};

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `,
);

const TriggerButton = styled(Button)(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }

    &:active {
      background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
    }

    &:focus-visible {
      box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
      outline: none;
    }
  `,
);