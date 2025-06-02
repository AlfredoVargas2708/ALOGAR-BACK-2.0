const pool = require('../database/db');

class SalesController {
    async getAllSales(req, res) {
        try {
            const query = 'SELECT * FROM sales';
            pool.query(query, (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
                res.status(200).json(results.rows);
            });
        } catch (error) {
            console.error('Error fetching sales:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = SalesController;