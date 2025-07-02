const express = require('express');
const promClient = require('prom-client');

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Create Prometheus metrics registry
const register = new promClient.Registry();

// Define 2 types of Prometheus metrics (as required)
const httpRequestsTotal = new promClient.Counter({
    name: 'finance_api_requests_total',
    help: 'Total HTTP requests to finance API',
    labelNames: ['method', 'endpoint'],
    registers: [register]
});

const responseTimeHistogram = new promClient.Histogram({
    name: 'finance_api_response_time_seconds',
    help: 'Response time for API requests',
    buckets: [0.1, 0.5, 1, 2, 5],
    registers: [register]
});

// Add default metrics (CPU, memory, etc.)
promClient.collectDefaultMetrics({ register });

// In-memory storage (replace with database in production)
const transactions = [];
let nextId = 1;

/**
 * Middleware to track metrics for all requests
 * Records request count and response time for monitoring
 */
app.use((req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = (Date.now() - start) / 1000;

        // Record metrics
        httpRequestsTotal.inc({
            method: req.method,
            endpoint: req.path
        });

        responseTimeHistogram.observe(duration);
    });

    next();
});

/**
 * Health check endpoint - verifies the application is running
 * Returns basic server status information
 */
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

/**
 * Prometheus metrics endpoint - exposes metrics for monitoring
 * Used by Prometheus to scrape application performance data
 */
app.get('/metrics', async (req, res) => {
    try {
        const metrics = await register.metrics();
        res.set('Content-Type', register.contentType);
        res.send(metrics);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get metrics' });
    }
});

/**
 * API Endpoint 1: Add a new financial transaction
 * Accepts transaction data and stores it in memory
 */
app.post('/api/transactions', (req, res) => {
    const { description, amount, type } = req.body;

    // Validate required fields
    if (!description || !amount || !type) {
        return res.status(400).json({
            error: 'Missing required fields: description, amount, type'
        });
    }

    // Validate transaction type
    if (!['income', 'expense'].includes(type)) {
        return res.status(400).json({
            error: 'Type must be "income" or "expense"'
        });
    }

    // Create new transaction
    const transaction = {
        id: nextId++,
        description: description.trim(),
        amount: parseFloat(amount),
        type: type,
        date: new Date().toISOString()
    };

    transactions.push(transaction);

    res.status(201).json({
        message: 'Transaction added successfully',
        transaction: transaction
    });
});

/**
 * API Endpoint 2: Get all transactions with financial summary
 * Returns all stored transactions plus calculated totals
 */
app.get('/api/transactions', (req, res) => {
    // Calculate financial summary
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    res.status(200).json({
        transactions: transactions,
        summary: {
            total_income: income,
            total_expenses: expenses,
            balance: balance,
            transaction_count: transactions.length
        }
    });
});

/**
 * API Endpoint 3: Get financial dashboard overview
 * Provides key metrics and recent activity summary
 */
app.get('/api/dashboard', (req, res) => {
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    // Get last 3 transactions
    const recentTransactions = transactions
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

    res.status(200).json({
        overview: {
            total_income: totalIncome,
            total_expenses: totalExpenses,
            net_balance: totalIncome - totalExpenses,
            transaction_count: transactions.length
        },
        recent_transactions: recentTransactions,
        timestamp: new Date().toISOString()
    });
});

// Commented endpoint for CI/CD demonstration
 app.get('/cicd-test', (req, res) => {
     res.status(200).json({
         message: 'CI/CD Pipeline Working Successfully!',
         timestamp: new Date().toISOString(),
         version: '1.0.0'
     });
 });

/**
 * Handle 404 errors for undefined routes
 */
app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        available_endpoints: [
            'GET /health',
            'GET /metrics',
            'POST /api/transactions',
            'GET /api/transactions',
            'GET /api/dashboard'
        ]
    });
});

/**
 * Start the server and begin listening for requests
 */
app.listen(PORT, () => {
    console.log(`🚀 Finance Tracker API running on port ${PORT}`);
    console.log(`📊 Health: http://localhost:${PORT}/health`);
    console.log(`📈 Metrics: http://localhost:${PORT}/metrics`);
    console.log('💰 API ready for transactions!');
});

module.exports = app;