const pool = require('../pool');
const toCamelCase = require('./utils/to-camel-case');

class UserRepo {
    static async find() {
        // Return an array of objects, each object representing a user
        const { rows } = await pool.query('SELECT * FROM users;')
        
        // According to database column name is in Snake Case
        // so it needs to convert  to Camel Case
       
        return toCamelCase(rows);
    }

    static async findById(id) {
        // WARNING: REALLY BIG SECURITY ISSUE!
        // Causing by SQL Injection Exploit,
        // directly operate to database is very dangerous,
        // const { rows } = await pool.query('
        //     SELECT * FROM users WHERE id = ${id};
        // ');

        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1;', [id]);

        return toCamelCase(rows)[0];
    }

    static async insert(username, bio) {
        // RETURNING * is for return the result
        const { rows } = await pool.query('INSERT INTO users (username, bio) VALUES ($1, $2) RETURNING *;',
        [username, bio]);

        return toCamelCase(rows)[0];
    }

    static async update(id, username, bio) {
        const { 
            rows, 
        } = await pool.query(
            'UPDATE users SET username=$1, bio=$2 WHERE id = $3 RETURNING *;',
            [username, bio, id]
        );
        
        return toCamelCase(rows)[0];
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM users WHERE id = $1 RETURNING *;',
            [id]
        );

        return toCamelCase(rows)[0];
    }

    static async count() {
        const { rows } = await pool.query('SELECT COUNT(*) FROM users;');
        
        return parseInt(rows[0].count);
    }
}

module.exports = UserRepo;