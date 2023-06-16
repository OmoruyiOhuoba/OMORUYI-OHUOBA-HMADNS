const express = require("express");
const enforce = require('express-sslify');
const path = require('path');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const getAllPatients = require("./routes/api/getAllPatients");
const getPatientByID = require("./routes/api/getPatientByID");
const createPatient = require("./routes/api/createPatient");
const editPatientByID = require("./routes/api/editPatientByID");
const deletePatientByID = require("./routes/api/deletePatientByID");
const LoginRegisterRoute = require("./routes/LoginRegisterRoute.js");
const UserRoute = require("./routes/UserRoute.js");
const DashboardRoute = require("./routes/DashboardRoute.js");
const PatientRoute = require("./routes/PatientRoute.js");
const DoctorRoute = require("./routes/DoctorRoute.js");
const DrugNotificationRoute = require("./routes/DrugNotificationRoute.js");
const AppointmentRoute = require("./routes/AppointmentRoute.js");
const MedicineRoute = require("./routes/MedicineRoute.js");
const PrescriptionRoute = require("./routes/PrescriptionRoute.js");
const InvoiceRoute = require("./routes/InvoiceRoute.js");
const ProfileRoute = require("./routes/ProfileRoute.js");

const port = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/omoruyiohuobahmadns", LoginRegisterRoute, DashboardRoute, 
UserRoute, PatientRoute,DoctorRoute, AppointmentRoute, MedicineRoute, PrescriptionRoute,
InvoiceRoute, ProfileRoute, DrugNotificationRoute);

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://omoruyiohuobahmadns:omoruyiohuobahmadns@hospitalmanagementanddr.4c4mp3o.mongodb.net/?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Database Connected Successfully"))
.catch(err => console.log(err));


/*Always put this after the app.use(s) so that get requests will work and the enforce https is to push it to https url*/
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(enforce.HTTPS({ trustProtoHeader: true }))
    app.use(express.static('client/build'));
    
    app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
    }); 
  };  

  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use((err, req, res) => { 
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });

  app.use((err, req, res) => {
    res.status(err.status || 500);
  
    res.json({
      errors: {
        message: err.message,
        error: {},
      },
    });
  });


app.listen(port, () => {
    console.log("App listening on port " + port);
})
/*uyi hashed this
app.use(LoginRegisterRoute);
app.use(DashboardRoute);
app.use(UserRoute);
app.use(PatientRoute);
app.use(DoctorRoute);
app.use(AppointmentRoute);
app.use(MedicineRoute);
app.use(PrescriptionRoute);
app.use(InvoiceRoute);
app.use(ProfileRoute);
*/





// // API that get all patients
// app.get('/patients', getAllPatients);

// //API that gets a patient by ID
// app.get('/patients/:id', getPatientByID);

// //API for adding a patient
// app.post('/patients', createPatient);

// //API for editting a details of the patient by ID 
// app.put('/patients/:id', editPatientByID);

// //API for deleting a  patient by ID
// app.delete('/patients/:id', deletePatientByID);
// app.use('/api/paypal', require('./routes/api/paypal'));


// app.get("/", (req, res) => {
//     res.send("hello world");
// });

