## Project Website: https://omoruyi-ohuoba-hmadns-production.up.railway.app/

# OMORUYI OHUOBA HOSPITAL MANAGEMENT AND DRUG NOTIFICATION SYSTEM

Online Hospital Management and Drug Notification System for Patients, Doctors and Admins used to manage medical data, book appointments, assign prescriptions and send drug notifications.

The system registration page allows users to sign up details such as First Name, Last Name, Email, Password and Role into the system’s database. With the System Login Page enables users to access the system by submitting the details, querying the database and granting access to the user based on the role in the database.

The system consists of three distinct roles: Admin, Doctor and Patient.

The Patient Dashboard allows the patient to be able to view past and upcoming appointments, view Doctor diagnosis and prescribed medication.

The Admin Dashboard has the most control in the system. The Admin can create appointment slots where doctors can schedule/ deny appointments with patients, add new medicine into the system
database and also have the overall ability to add, update or delete Doctors and Patients details.

The Doctors have access to the prescription page to assign medication and specific dosages to patients after appointments. This Prescription can be done at any time at the doctor’s convenience. After a prescription is made, the patient is automatically notified via email to take the medication



## Software Development Life Cycle Used
1. Waterfall MethOdology

## Actors /Users of the System
1. Admin
2. Doctor
3. Patient

### ADMIN
1. Login
2. Access to add/ view/ edit data for all doctors and patients
3. Create appointment slots for doctors
4. Add medicine to the inventory


### DOCTOR
1.	Register
2.	Login
3.	Access to add/ view/ edit data for all assigned patients
4.	Book appointment with patient in available slots created by admin
5.	Diagnose and Prescribe medicine for patients
6.	Send Drug Notifications

### PATIENT
1.	Register
2.	Login
3.	View prescribed medicine
4.	View scheduled appointments
5.	Receive Drug Notifications

## BRIEF OVERVIEW OF THE TECHNOLOGY

### Programming Language:
1. JavaScript

### Front-end: 
1. React
2. Redux
3. CSS
4. Webpack
5. Bootstrap

### Back-end: 
1. Node.js
2. Express
3. Custom APIs
4. Nodemailer Mail SMTP

### Database
1. MongoDB Atlas

### Testing:
1. Jest for unit and integration testing
2. Enzyme for unit and integration testing

### DEV OPS
1. Railway for staging
2. Heroku PAAS Platform for production
3. AWS Cloud Server 

## Software Requirements:
1. Git version 2.39.0 and above
2. npm version 8.19.3 and above
3. MongoDB version 5.0.5 and above



## Getting Started
1. In the terminal run

```$ git clone https://github.com/OmoruyiOhuoba/OMORUYI-OHUOBA-HMADNS/```

2. In the root directory of the file run:

```$ npm i```

3. Run:

```$ node index.js```

4. Move to the client directory and run

```$ npm react start```


