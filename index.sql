CREATE TABLE currency_names1(
    names CHARACTER VARYING(10) 
);

CREATE TABLE ex_rate1(
    exrate FLOAT
);

CREATE TABLE ex_date1(
    exdate CHARACTER VARYING(50)
);

CREATE TABLE concatination1(
    id SERIAL,
    name_ex CHARACTER VARYING(10),
    rate_ex FLOAT,
    date_ex CHARACTER VARYING(50)
);

INSERT INTO currency_names1(names)
VALUES
('GEL'),
('USD'),
('EUR');

INSERT INTO ex_rate1(exrate)
VALUES
(1.0000),
(3.2385),
(3.5630);

INSERT INTO ex_date1(exdate)
VALUES
('23.03.2022'),
('23.03.2022'),
('23.03.2022');

INSERT INTO concatination1(name_ex, rate_ex, date_ex)
VALUES
('GEL', 1.0000, '23.03.2022'),
('USD', 3.2385, '23.03.2022'),
('EUR', 3.5630, '23.03.2022');