const request = require('supertest');
const app = require('../app');

// Test suite for Finance Tracker API
describe('Finance Tracker API Tests', () => {

    /**
     * Test health check endpoint
     */
    describe('GET /health', () => {
        test('should return healthy status', async () => {
            const response = await request(app)
                .get('/health')
                .expect(200);

            expect(response.body.status).toBe('healthy');
            expect(response.body).toHaveProperty('uptime');
        });
    });

    /**
     * Test Prometheus metrics endpoint
     */
    describe('GET /metrics', () => {
        test('should return metrics data', async () => {
            const response = await request(app)
                .get('/metrics')
                .expect(200);

            expect(response.text).toContain('finance_api_requests_total');
            expect(response.text).toContain('finance_api_response_time_seconds');
        });
    });

    /**
     * Test adding transactions (POST method)
     */
    describe('POST /api/transactions', () => {
        test('should create new income transaction', async () => {
            const transaction = {
                description: 'Salary',
                amount: 3000,
                type: 'income'
            };

            const response = await request(app)
                .post('/api/transactions')
                .send(transaction)
                .expect(201);

            expect(response.body.message).toBe('Transaction added successfully');
            expect(response.body.transaction.amount).toBe(3000);
            expect(response.body.transaction.type).toBe('income');
        });

        test('should create new expense transaction', async () => {
            const transaction = {
                description: 'Groceries',
                amount: 150,
                type: 'expense'
            };

            const response = await request(app)
                .post('/api/transactions')
                .send(transaction)
                .expect(201);

            expect(response.body.transaction.type).toBe('expense');
            expect(response.body.transaction.amount).toBe(150);
        });

        test('should reject invalid transaction', async () => {
            const invalidTransaction = {
                description: 'Test'
                // Missing amount and type
            };

            const response = await request(app)
                .post('/api/transactions')
                .send(invalidTransaction)
                .expect(400);

            expect(response.body.error).toContain('Missing required fields');
        });
    });

    /**
     * Test getting transactions (GET method)
     */
    describe('GET /api/transactions', () => {
        test('should return transactions with summary', async () => {
            // First add a transaction
            await request(app)
                .post('/api/transactions')
                .send({
                    description: 'Test income',
                    amount: 1000,
                    type: 'income'
                });

            const response = await request(app)
                .get('/api/transactions')
                .expect(200);

            expect(response.body).toHaveProperty('transactions');
            expect(response.body).toHaveProperty('summary');
            expect(response.body.summary).toHaveProperty('total_income');
            expect(response.body.summary).toHaveProperty('balance');
        });
    });

    /**
     * Test dashboard endpoint (GET method)
     */
    describe('GET /api/dashboard', () => {
        test('should return dashboard overview', async () => {
            const response = await request(app)
                .get('/api/dashboard')
                .expect(200);

            expect(response.body).toHaveProperty('overview');
            expect(response.body).toHaveProperty('recent_transactions');
            expect(response.body.overview).toHaveProperty('total_income');
            expect(response.body.overview).toHaveProperty('net_balance');
        });
    });

    /**
     * Test error handling
     */
    describe('Error Handling', () => {
        test('should return 404 for unknown endpoints', async () => {
            const response = await request(app)
                .get('/api/unknown')
                .expect(404);

            expect(response.body.error).toBe('Endpoint not found');
        });
    });
});