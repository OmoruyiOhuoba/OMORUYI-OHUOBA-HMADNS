import React, { useContext, useEffect, useState } from 'react';
import styles from './Appointment.module.css';
import { useNavigate } from "react-router-dom";
import ErrorDialogueBox from '../MUIDialogueBox/ErrorDialogueBox';
import { UserContext } from '../../Context/UserContext'
import Box from '@mui/material/Box';
// import DatePicker from '../Datepicker/DatePicker';
import dayjs from 'dayjs';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import MyCalendar from '../Datepicker/MyCalendar';
import moment from "moment"
import axios from "axios";
import { BootstrapDialog, BootstrapDialogTitle } from "../MUIDialogueBox/BoostrapDialogueBox"
import DialogContent from '@mui/material/DialogContent';
import AppointmentForm from '../Forms/AppointmentForm'
import DoctorAppointmentTable from '../MUITable/DoctorAppointmentTable'

function DoctorAppointment() {
    const navigate = useNavigate();

    //this tells you which slot was clicked among the "available slots"
    const [clickedTimeSlot, setClickedTimeSlot] = useState('');

    // const [dateClicked,setDateClicked] = useState(dayjs());
    const [date, setDate] = useState(new Date());
    const [availableSlots, setAvailableSlots] = useState([])
    const [bookedSlots, setBookedSlots] = useState([])
    const [bookedAppointments, setBookedAppointments] = useState([])


    const [departmentList, setDepartmentList] = useState([]);
    const [doctorList, setDoctorList] = useState([]);
    const [patientList, setPatientList] = useState([]);


    const [departmentSelected, setDepartmentSelected] = useState("");
    const [doctorSelected, setDoctorSelected] = useState("");

    const handleDepartmentChange = (event) => {
        setDepartmentSelected(event.target.value);
        setDoctorSelected("");
    };
    const handleDoctorChange = (event) => {
        setDoctorSelected(event.target.value);
    };


    const [errorDialogueBoxOpen, setErrorDialogueBoxOpen] = useState(false);
    const [errorList, setErrorList] = useState([]);
    const handleErrorDialogueOpen = () => {
        setErrorDialogueBoxOpen(true)
    };
    const handleErrorDialogueClose = () => {
        setErrorList([]);
        setErrorDialogueBoxOpen(false)
    };

    const [openDialgueBox, setOpenDialgueBox] = React.useState(false);

    //fhandler function for bootstrap dialogue box 
    const handleClickOpen = () => {
        setOpenDialgueBox(true);
    };
    const handleClose = () => {
        setOpenDialgueBox(false);
    };

    const addAppointmentFormSubmitted = async (event) => {
        event.preventDefault();
        const form = document.forms.addAppointment;
        let reqObj = {
            "appDate": form.appDate.value,
            "appTime": form.appTime.value,
            "doctorId": form.doctor.value,
            "patientId": form.patient.value
        }
        // console.log("reqObj",reqObj);

        let response = await axios.put(`/api/omoruyiohuobahmadns/appointments/`,
            reqObj,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );
        if (response.data.message == "success") {
            // getAvailableSlot();
            // window.alert("success add")
            getAvailableSlots();
            getBookedSlots();
        }

        handleClose();


    }

    const getformDate = (mydate) => {
        const parts = mydate.split('-');
        const d = new Date(+parts[0], parts[1] - 1, +parts[2], 12);
        return d;
    }

    const formatDateForDateInput = (dateOfJoining) => {
        dateOfJoining = moment(new Date(dateOfJoining)).format('YYYY-MM-DD');
        // console.log("dateOfJoining",dateOfJoining);
        return dateOfJoining;
    }

    const slotClicked = (slot) => {
        // console.log(slot)
        setClickedTimeSlot(slot)
        handleClickOpen()
    }

    const getAvailableSlots = async () => {
        // let newSlotList = availableSlots;
        // newSlotList[newSlotList.length] = "hello"
        // setAvailableSlots(newSlotList);
        // if (doctorSelected) {
        let response = await axios.post(`/api/omoruyiohuobahmadns/appointments`,
            {
                'isTimeSlotAvailable': true,
                'appDate': formatDateForDateInput(date),
                // 'doctorID': doctorSelected
            },
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );
        if (response.data.message == "success") {
            // getAvailableSlot();
            //window.alert("success")
            // setAvailableSlot(response.data.appointments)
            let aptms = response.data.appointments;

            let slots = aptms.map(apt =>
                apt.appointmentTime
            )
            slots.sort((a, b) => {
                const timeA = new Date(`01/01/2000 ${a}`);
                const timeB = new Date(`01/01/2000 ${b}`);
                return timeA - timeB;
            });

            setAvailableSlots(slots);
        }
        else {
            // window.alert("error add")
        }


    }

    const getBookedSlots = async () => {
        // let newSlotList = availableSlots;
        // newSlotList[newSlotList.length] = "hello"
        // setAvailableSlots(newSlotList);

        let response = await axios.post(`/api/omoruyiohuobahmadns/appointments`,
            {
                'isTimeSlotAvailable': false,
                'appDate': formatDateForDateInput(date)
            },
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );
        if (response.data.message == "success") {
            // getAvailableSlot();
            // window.alert("success add")
            // setAvailableSlot(response.data.appointments)
            let aptms = response.data.appointments;
            let sortedAptms = aptms.sort((a, b) => {
                const timeA = new Date(`01/01/2000 ${a['appointmentTime']}`);
                const timeB = new Date(`01/01/2000 ${b["appointmentTime"]}`);
                return timeA - timeB;
            });
            console.log("aptms", sortedAptms);

            setBookedAppointments(aptms);
            console.log(aptms)
            let slots = aptms.map(apt =>
                apt.appointmentTime
            )
            slots.sort((a, b) => {
                const timeA = new Date(`01/01/2000 ${a}`);
                const timeB = new Date(`01/01/2000 ${b}`);
                return timeA - timeB;
            });

            setBookedSlots(slots);
        }
        else {
            // window.alert("error add")
        }


    }

    const deleteBookedSlots = async (appId) => {
        console.log("delete slot with id", appId);
        let response = await axios.delete(`/api/omoruyiohuobahmadns/appointments/`,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                data: {
                    appointmentId: appId,
                },
            }
        );
        if (response.data.message == "success") {
            // getAvailableSlot();
            // window.alert("success add")
            getAvailableSlots();
            getBookedSlots();
        }
    }

    const getDoctorList = async () => {
        let response = await axios.get(`/api/omoruyiohuobahmadns/doctors`,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );
        let doctors = response.data;
        if (doctors.length > 0) {
            // getAvailableSlot();
            // window.alert("success add")
            // setAvailableSlot(response.data.appointments)
            // console.log("++++",doctors);
            // doctors.sort(function(a, b){
            //     return a.zzz - b.id;
            // });
            if (!departmentSelected) {
                setDoctorList(doctors);
            }
            else {
                // setDoctorList([]);
                let filterdDocs = doctors.filter((doc) => {
                    return doc.department == departmentSelected;
                })
                setDoctorList(filterdDocs);
            }

        }
        else {
            // window.alert("error add")
        }

    }

    const getDepartmentList = async () => {
        let response = await axios.get(`/api/omoruyiohuobahmadns/departments`,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );
        let departments = response.data.departments;
        if (departments.length > 0) {

            setDepartmentList(departments);
        }
        else {
            // window.alert("error add")
        }

    }

    const getPatients = async () => {
        const response = await axios.get("/api/omoruyiohuobahmadns/patients");
        setPatientList(response.data);
    };

    useEffect(() => {
        getDepartmentList()
        getDoctorList()
        getAvailableSlots()
        getBookedSlots()
        getPatients()

    }, [date, departmentSelected, doctorSelected])



    return (
        <Box id={styles.appointmentMain} component="main" sx={{ flexGrow: 1, p: 3 }}>
            <div>
                <h3 className={styles.pageTitle}> Appointments</h3>
            </div>

            <div id={styles.slotGrid}>
                <div id={styles.calendarDiv}>
                    <MyCalendar date={date} setDate={setDate} />
                </div>
                <div id={styles.slotCreationDiv}>
                    <h4>Select Date </h4>
                    <div className='mt-4 row'>
                        <div className="col-12">
                            <label for="appDate" className="col-sm-3 col-form-label ">Date: </label>
                            <input id="appDate" name="appDate" type="date" className="col-form-control col-sm-7"
                                value={formatDateForDateInput(date)}
                                onChange={(e) => setDate(getformDate(e.target.value))}
                            />
                        </div>

                    </div>
                    <div className=' row'>
                        {/* <div className="col-12"> */}

                        {/* </div> */}
                        {availableSlots.length > 0 ? <div className={styles.availableSlotsHeader}> <h4 className="mt-5">Available Slots</h4></div> : <div></div>}

                        <div className='d-flex flex-wrap'>
                            {
                                availableSlots.map(slot => {
                                    return <div className={styles.slotCard}>{slot}</div>
                                })
                            }
                        </div>
                    </div>



                </div>

            </div>



            {bookedAppointments.length > 0 ?
                <div className={styles.availableSlotsHeader}>
                    <h4 className="mt-5">
                        Booked Appointments
                    </h4>
                    <DoctorAppointmentTable
                        bookedAppointments={bookedAppointments}
                        deleteBookedSlots={deleteBookedSlots}
                        doctorList={doctorList}
                        patientList={patientList}
                        availableSlots={availableSlots}
                        getAvailableSlots={getAvailableSlots}
                        getBookedSlots={getBookedSlots}
                    />
                </div> : <div></div>}




            <ErrorDialogueBox
                open={errorDialogueBoxOpen}
                handleToClose={handleErrorDialogueClose}
                ErrorTitle="Error"
                ErrorList={errorList}
            />
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={openDialgueBox}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Book Appointment
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <AppointmentForm
                        formName="addAppointment"
                        formOnSubmit={addAppointmentFormSubmitted}
                        appDate={formatDateForDateInput(date)}
                        appTime={clickedTimeSlot}
                        doctorList={doctorList}
                        doctorSelected={doctorSelected}
                        patientList={patientList}
                        availableSlots={availableSlots} />
                </DialogContent>
            </BootstrapDialog>
        </Box>
    );
}

export default DoctorAppointment;
