const pool = require('../database/db')

class UsersController {
    getAllUsers(req, res) {
        try {
            const query = 'SELECT * FROM users';
            pool.query(query, (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
                res.status(200).json(results.rows);
            });
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    getAllUserByUsername(req, res) {
        try {
            const { username } = req.params;
            if (!username) {
                return res.status(400).json({ message: 'Username is required' });
            }
            const query = 'SELECT * FROM users WHERE username = $1';
            const values = [username];

            pool.query(query, values, (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
                if (results.rows.length === 0) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.status(200).json(results.rows[0]);
            });
        } catch (error) {
            console.error('Error fetching user by username:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    login(req, res) {
        try {
            const { user } = req.body;
            if (!user || !user.username || !user.password || !user.role) {
                return res.status(400).json({ message: 'Username, password, and role are required' });
            }
            if (user.role !== 'Admin' && user.role !== 'Employee') {
                return res.status(400).json({ message: 'Invalid role' });
            }

            const isAdmin = user.role === 'Admin';

            const query = 'SELECT * FROM users WHERE username = $1 AND password = $2 AND is_admin = $3';
            const values = [user.username, user.password, isAdmin];

            pool.query(query, values, (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
                if (results.rows.length === 0) {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }
                res.status(200).json({ message: 'Login successful', user: results.rows[0] });
            });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    register(req, res) {
        try {
            const { user } = req.body;
            if (!user || !user.username || !user.password || !user.role) {
                return res.status(400).json({ message: 'Username, password, and role are required' });
            }
            if (user.role !== 'Admin' && user.role !== 'Employee') {
                return res.status(400).json({ message: 'Invalid role' });
            }
            const isAdmin = user.role === 'Admin';
            const query = 'INSERT INTO users (username, password, is_admin) VALUES ($1, $2, $3) RETURNING *';
            const values = [user.username, user.password, isAdmin];

            pool.query(query, values, (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
                res.status(201).json({ message: 'User registered successfully', user: results.rows[0] });
            });
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = UsersController;