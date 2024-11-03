const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointments'); 
const app = express();
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes); // This maps /api/appointments to your router
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
