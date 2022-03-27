const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./index');
const app = express();

app.use(bodyParser.json());

app.get('/info', (request, response) => {
    pool.query('SELECT * FROM concatination1', (err, res) => {
        if(err) throw console.log(err);

        response.json(res.rows);
    });
});

app.get('/info/:id', (request, response, next) => {
    const { id } = request.params;
    pool.query('SELECT * FROM concatination1 WHERE id =($1)', [id], (err, res) => {
        if(err) return next(err);

        response.json(res.rows);
    });
});

app.post('/info', (request, response, next) => {
    const { name_ex, rate_ex, date_ex } = request.body;
    pool.query('INSERT INTO concatination1 (name_ex, rate_ex, date_ex) VALUES($1, $2, $3)', 
    [name_ex, rate_ex, date_ex], (err, res) => {
        if(err) throw next(err);

        response.redirect('/info');
    });
});

app.put('/info/:id', (request, response, next) => {
    const { id } = request.params;
    const { name_ex, rate_ex, date_ex } = request.body;

    const keys = [ 'name_ex', 'rate_ex', 'date_ex' ];
    const values = [];

    keys.forEach(key => {
        if(request.body[key]) values.push(key);
    });

    values.forEach((value, index) => {
        pool.query(
        `UPDATE concatination1 SET ${value}=($1) WHERE id=($2)`,
        [request.body[value], id], (err, res) => {
            if(err) return next(err);
    
            if(index === value.length - 1) response.redirect('/info');
        });
    });  
});

app.delete('/info/:id', (request, response, next) => {
    const { id } = request.params;
    pool.query('DELETE FROM concatination1 WHERE id=($1)',[id], (err, res) => {
        if(err) return next(err);

        response.redirect('/info');
    });
});

////////////////////////////////////////////////////////////////////////
/* Host directory by names */
app.get('/names', (request, response, next) => {
    pool.query('SELECT * FROM currency_names1 ORDER BY names ASC', (err, res) => {
        if(err) throw next(err);

        response.json(res.rows);
    });
});

app.post('/names', (request, response, next) => {
    const { names } = request.body;

    pool.query('INSERT INTO currency_names1(names) VALUES($1)', [names], (err, res) => {
        if(err) throw next(err);

        response.redirect('/names');
    });
});

app.delete('/names', (request, response, next) => {
    const { names } = request.body;
    pool.query('DELETE FROM currency_names1 WHERE names=($1)',
    [names], (err, res) => {
        if(err) throw next(err);

        response.redirect('/names');
    });
});

module.exports = app;