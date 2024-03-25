const pg = require('pg');

class Pool {
    _pool = null;

    connect(options){
        this._pool = new pg.Pool(options);
        // for first touch checking to connect database
        return this._pool.query('SELECT 1 + 1;');
    }

    // close the pool
    close(){
        return this._pool.end();
    }

    // REALLY BIG SECURITY ISSUE HERE!
    // query(sql){
    //     return this._pool.query(sql);
    // }
    query(sql, params){
        return this._pool.query(sql, params);
    }
}

module.exports = new Pool();