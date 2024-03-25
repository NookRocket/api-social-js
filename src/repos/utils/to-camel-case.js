module.exports = (rows) => {
    return rows.map(row => {
        const replaced = {};
    
        for (let key in row) {
            // Find words start with -_ follow a lower case charater
            // then change to upper case and remove _
            const camelCase = key.replace(/([-_][a-z])/gi, ($1) =>
                $1.toUpperCase().replace('_', '')
            );
            replaced[camelCase] = row[key];
        }
    
        return replaced
    });
};
