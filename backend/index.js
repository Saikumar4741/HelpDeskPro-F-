const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const verifyToken=require('./middlewear/jwtmiddlewear')
const authRoutes = require('./routes/userAuth.route');
const knowledgeBaseRoutes = require('./routes/knowledgeBase.route');
const ticketRoutes=require('./routes/ticket.route')
const cors=require('cors')

const chatRoutes = require('./routes/chat.route');

const analyticsRoutes=require('./routes/analytics.route')
const app = express();
const PORT = 3001;

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/helpdesk', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
});

// Middleware to parse JSON requests
app.use(bodyParser.json());


app.use(cors())
// Routes

app.use('/api/chat', verifyToken);
app.use('/api/knowledge-base', verifyToken);
app.use('/api/analytics/chat', verifyToken);
app.use('/api/tickets',verifyToken)

app.use('/api/auth', authRoutes);

app.use('/api/chat',chatRoutes);

app.use('/api/knowledge-base', knowledgeBaseRoutes);

app.use('/api/analytics/chat',analyticsRoutes);

app.use('/api/tickets',ticketRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
