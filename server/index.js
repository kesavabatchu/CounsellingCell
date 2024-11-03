const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./Models/Student');
const Counselor = require('./Models/Counselor');
const Appointment = require('./Models/Appointment');
const User = require('./Models/users');
const appointmentRoutes = require('./routes/appointments'); 

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/appointments', appointmentRoutes);

// DATABASE CONNECTION
mongoose.connect(
  "mongodb+srv://sahilbharti259:Sahil_28722@counselingsystem.dak8p.mongodb.net/Counselling_System?retryWrites=true&w=majority&appName=CounselingSystem",  // Change to appropriate database name
)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

// POST: Add a new student
app.post('/students', async (req, res) => {
  const { name, email, age, department, year } = req.body;
  const student = new Student({ name, email, age, department, year });
  try {
    await student.save();
    res.send("Student added successfully");
  } catch (err) {
    res.status(500).send("Error adding student: " + err);
  }
});

// POST: Add a new student
// POST: Add a new user
app.post('/users', async (req, res) => {
  const { username, useremail, userimage } = req.body;
  const user = new User({ username, useremail, userimage });
  console.log(user);
  
  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(500).send("Error adding user: " + err);
  }
});

// PUT: Update a student's department
app.put('/students/:id', async (req, res) => {
  const { id } = req.params;
  const { newDepartment } = req.body;
  try {
    await Student.findByIdAndUpdate(id, { department: newDepartment });
    res.send("Student's department updated successfully");
  } catch (err) {
    res.status(500).send("Error updating student: " + err);
  }
});

// DELETE: Remove a student
app.delete('/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Student.findByIdAndDelete(id);
    res.send("Student deleted successfully");
  } catch (err) {
    res.status(500).send("Error deleting student: " + err);
  }
});

// GET: Read all students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.send(students);
  } catch (err) {
    res.status(500).send("Error fetching students: " + err);
  }
});

// POST: Add a new counselor
app.post('/counselors', async (req, res) => {
  const { name, specialization, email, availableSlots } = req.body;
  const counselor = new Counselor({ name, specialization, email, availableSlots });
  try {
    await counselor.save();
    res.send("Counselor added successfully");
  } catch (err) {
    res.status(500).send("Error adding counselor: " + err);
  }
});

// GET: Read all counselors
app.get("/counselors", async (req, res) => {
  try {
    const counselors = await Counselor.find();
    res.send(counselors);
  } catch (err) {
    res.status(500).send("Error fetching counselors: " + err);
  }
});

// POST: Book an appointment
app.post('/appointments', async (req, res) => {
  const { studentId, counselorId, appointmentDate } = req.body;
  const appointment = new Appointment({ studentId, counselorId, appointmentDate });
  try {
    await appointment.save();
    res.send("Appointment booked successfully");
  } catch (err) {
    res.status(500).send("Error booking appointment: " + err);
  }
});

// GET: Read all appointments
app.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('studentId').populate('counselorId');
    res.send(appointments);
  } catch (err) {
    res.status(500).send("Error fetching appointments: " + err);
  }
});

// Server setup
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
