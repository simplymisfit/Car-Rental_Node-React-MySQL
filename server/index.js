const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')
const app = express()
const mysql = require("mysql")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cookieParser = require('cookie-parser');
const session = require('express-session');

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"filip123",
    database:"projekt"
});

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET","POST","DELETE","PUT"],
    credentials: true,
    optionSuccessStatus:200
}));

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    key: "userId",
    secret: "filip",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    },
}));

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM movie_reviews WHERE movieReservation = 'notreserved' GROUP BY movieName";
    db.query(sqlSelect, (err,result) => {
        res.send(result);
    });
});

app.get('/api/getlog', (req, res) => {
    const sqlSelect = "SELECT * FROM carreserve ORDER BY date DESC";
    db.query(sqlSelect, (err,result) => {
        res.send(result);
    });
});

app.get('/api/userreservations', (req, res) => {
    const id_user = req.query.id_user;
    console.log(id_user);
    const sqlReservation = "SELECT * FROM movie_reviews m INNER JOIN carreserve c ON m.id = c.id_car WHERE m.movieReservation = 'reserved' AND c.active='1' AND c.id_user = " + id_user + " ORDER BY c.date DESC";

    db.query(sqlReservation, (err, result) => {
        res.send(result);
    });
});

app.get('/api/userreservationsss', (req, res) => {
    const id_user = req.query.id_user;
    console.log(id_user);
    const sqlReservation = "SELECT * FROM movie_reviews m INNER JOIN carreserve c ON m.id = c.id_car WHERE c.id_user = " + id_user + " ORDER BY c.date DESC";

    db.query(sqlReservation, (err, result) => {
        res.send(result);
    });
});

app.get('/api/getall', (req, res) => {
    const sqlSelect = "SELECT * FROM movie_reviews GROUP BY movieName";
    db.query(sqlSelect, (err,result) => {
        res.send(result);
    });
});

app.get('/api/getreserved', (req, res) => {
    const sqlSelect = "SELECT * FROM movie_reviews WHERE movieReservation = 'reserved' GROUP BY movieName";
    db.query(sqlSelect, (err,result) => {
        res.send(result);
    });
});

app.get('/api/getdetails', (req, res) => {
    const id = req.query.id;
    console.log(id);
    const sqlReservation = "SELECT * FROM movie_reviews WHERE id = " + id;

    db.query(sqlReservation, (err, result) => {
        res.send(result);
    });
});

app.get('/api/getbalanceinfo', (req, res) => {
    const id_user = req.query.id_user;
    console.log(id_user);
    const sqlReservation = "SELECT * FROM users WHERE id = " + id_user;

    db.query(sqlReservation, (err, result) => {
        res.send(result);
    });
});

app.post('/api/reserve', (req, res) => {

    const id_user = req.body.id_user
    const id_car = req.body.id_car

    const sqlReserve = "INSERT INTO carreserve (id_user, id_car, date, active) VALUES (?, ?, NOW(), 1)";
    db.query(sqlReserve, [id_user, id_car], (err,result) => {
        console.log(result);
    })
});

app.put('/api/reservation', (req, res) => {
    const name = req.body.movieName;
    const sqlReservation = "UPDATE movie_reviews SET movieReservation = 'reserved' WHERE movieName = ?";

    db.query(sqlReservation, name, (err, result) => {
        if (err) console.log(err);
    });
});

app.put('/api/reservationGetMoney', (req, res) => {
    const id_user = req.body.id_user;
    const cost = req.body.cost;
    console.log("ID_USER:" + id_user);
    console.log("ID_MOVIE:" + cost);
    const sqlReservation = "UPDATE users SET balance = balance - " + cost + " WHERE users.id = " + id_user;
    console.log(sqlReservation);
    db.query(sqlReservation, (err, result) => {
        if (err) console.log(err);
    });
});

app.put('/api/dereservation', (req, res) => {
    const name = req.body.movieName;
    const id = req.body.id;
    const sqlReservation = "UPDATE movie_reviews SET movieReservation = 'notreserved' WHERE movieName = ?";
    const sqlReservationDwa = "UPDATE carreserve SET active = 0 WHERE id = ?";

    db.query(sqlReservation, name, (err, result) => {
        if (err) console.log(err);
    });

    db.query(sqlReservationDwa, id, (err, result) => {
        if (err) console.log(err);
    });
});

app.delete('/api/unreserve/:movieName', (req, res) => {
    const name = req.params.movieName;
    const sqlDelete = "DELETE FROM carreserve WHERE movieName = ?";

    db.query(sqlDelete, name, (err, result) => {
        if (err) console.log(err);
    });
});

app.post('/api/insert', (req, res) => {

    const movieName = req.body.movieName
    const movieReview = req.body.movieReview
    const cost = req.body.cost

    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview, movieReservation, cost) VALUES (?, ?, 'notreserved', ?)";
    db.query(sqlInsert, [movieName, movieReview, cost], (err,result) => {
        console.log(result);
    })
});

app.delete('/api/delete/:movieName', (req, res) => {
    const name = req.params.movieName;
    const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?";

    db.query(sqlDelete, name, (err, result) => {
        if (err) console.log(err);
    });
});

app.put('/api/update', (req, res) => {
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";

    db.query(sqlUpdate, [review, name], (err, result) => {
        if (err) console.log(err);
    });
});

app.post('/register', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password,saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }
        db.query("INSERT INTO users (username, password, role, balance) VALUES (?, ?, 'user', 0)", [username, hash], (err, result) => {
            console.log(err);
        });
    }) 
});

app.put('/api/updatebalance', (req, res) => {
    const id_user = req.body.id_user;
    const sqlUpdate = "UPDATE users SET balance = 50 WHERE id = ?";
    console.log("Current user id " + id_user);
    db.query(sqlUpdate, id_user, (err, result) => {
        if (err) console.log(err);
    });
});

// app.put('/api/update', (req, res) => {
//     const name = req.body.movieName;
//     const review = req.body.movieReview;
//     const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";

//     db.query(sqlUpdate, [review, name], (err, result) => {
//         if (err) console.log(err);
//     });
// });


app.post('/login', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM users WHERE username = ?;", username, (err, result) => {
        if (err) {
            res.send({err: err});
        }

        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
                if (response) {
                    req.session.user = result;
                    console.log(req.session.user);
                    res.send(result)
                } else {
                    res.send({ message: "Wrong username/password combination!"});
                }
            });
        } else {
            res.send({ message: "User doesn't exist!" });
        }
    });
});

app.listen(3001, () => {
    console.log("Działa na porcie 3001");
});