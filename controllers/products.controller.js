const pool = require('../database/db');

class ProductsController {
    async getAllProducts(req, res) {
        try {
            const query = 'SELECT * FROM unique_products ORDER BY id DESC';
            pool.query(query, (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
                res.status(200).json(results.rows);
            });
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getProductByCode(req, res) {
        try {
            const { code } = req.params;
            const query = `SELECT * FROM unique_products WHERE product_code LIKE '%${code}%' ORDER BY product_id DESC`;

            pool.query(query, (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
                if (results.rows.length === 0) {
                    return res.status(404).json({ message: 'Product not found' });
                }
                res.status(200).json(results.rows);
            });
        } catch (error) {
            console.error('Error fetching product by code:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = ProductsController;