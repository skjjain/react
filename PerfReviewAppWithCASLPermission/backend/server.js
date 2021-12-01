var express = require("express");
var app = express();
var mysql = require("mysql");
var cors = require("cors");
var session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const helmet = require("helmet");

app.use(express.json());
app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

var secretKey = "thisisasecretkey";
app.use(
  session({
    secret: secretKey,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser(secretKey));
app.use(passport.initialize());
app.use(passport.session());

function passportConfig(passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      connection.query(
        "SELECT * From employees where emp_id=?",
        [username],
        function (error, results, fields) {
          if (error) throw error;
          if (!results) return done(null, false);
          if (results[0] && results[0].emp_id > 0) {
            return done(null, results[0]);
          } else {
            return done(null, user);
          }
        }
      );
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.emp_id);
  });
  passport.deserializeUser((id, cb) => {
    connection.query(
      "SELECT * From employees where emp_id=?",
      [id],
      function (error, results, fields) {
        let user = false;
        if (results[0] && results[0].emp_id > 0) {
          user = results[0];
        }
        const userInformation = {
          success: true,
          message: "Successfully Authenticated",
          role: user.role,
          emp_id: user.emp_id,
          name: user.name,
        };
        cb(error, userInformation);
      }
    );
  });
}

passportConfig(passport);

var mysqlConfig = {
  host: "localhost",
  user: "root",
  password: "password",
  database: "perfreview",
};
var connection = mysql.createConnection(mysqlConfig);

app.post("/login", function (req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (!user)
      res.send(
        JSON.stringify({
          success: false,
          message: "No User Exists",
        })
      );
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send(
          JSON.stringify({
            success: true,
            message: "Successfully Authenticated",
            role: user.role,
            emp_id: user.emp_id,
            name: user.name,
          })
        );
      });
    }
  })(req, res, next);
});

app.get("/login", function (req, res) {
  res.send(req.user);
});

app.get("/logout", function (req, res) {
  req.logout();
  res.send(
    JSON.stringify({
      success: false,
      message: "User logged out",
    })
  );
});

//rest api to get all employees
app.get("/emp", function (req, res) {
  connection.query(
    "select * from employees where role=2",
    function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  );
});

//rest api to get all employees
app.get("/users", function (req, res) {
  connection.query(
    "select * from employees",
    function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  );
});

//rest api to get a single  data
app.get("/emp/:id", function (req, res) {
  connection.query(
    "select * from employees where emp_id=?",
    [req.params.id],
    function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  );
});

//rest api to create a new employee record into mysql database
app.post("/emp", function (req, res) {
  var params = req.body;
  connection.query(
    "INSERT INTO employees SET ?",
    params,
    function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  );
});

//rest api to update record into mysql database
app.put("/emp", function (req, res) {
  connection.query(
    "UPDATE `employees` SET `name`=?,`email`=?,`role`=? where `emp_id`=?",
    [req.body.name, req.body.email, req.body.role, req.body.emp_id],
    function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  );
});

//rest api to delete record from mysql database
app.delete("/emp/:emp_id", function (req, res) {
  connection.query(
    "DELETE FROM `employees` WHERE `emp_id`=? and role!=3",
    [req.params.emp_id],
    function (error, results, fields) {
      if (error) throw error;
      res.end("Record has been deleted!");
    }
  );
});

//rest api to get all reviews
app.get("/review", function (req, res) {
  let query = `SELECT r.*, e_from.name name_from, e_to.name name_to
    from reviews r 
    join employees e_from on (r.from_emp = e_from.emp_id) 
    join employees e_to on (r.to_emp = e_to.emp_id)`;
  if (req.user.role == 2) {
    query += "where from_emp=?";
    connection.query(
      query,
      [req.user.emp_id],
      function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
      }
    );
  } else {
    connection.query(query, function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    });
  }
});

//rest api to get a single  data
app.get("/review/:id", function (req, res) {
  let query = `SELECT r.*, e_from.name name_from, e_to.name name_to
    from reviews r 
    join employees e_from on (r.from_emp = e_from.emp_id) 
    join employees e_to on (r.to_emp = e_to.emp_id) where review_id=?`;

  connection.query(query, [req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

//rest api to create a new review record into mysql database
app.post("/review", function (req, res) {
  var params = req.body;
  console.log(params);
  connection.query(
    "INSERT INTO reviews SET ?",
    params,
    function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  );
});

//rest api to update record into mysql database
app.put("/review", function (req, res) {
  connection.query(
    "UPDATE `reviews` SET `from_emp`=?,`to_emp`=?,`year`=?,`quarter`=? where `review_id`=? and status != 2",
    [
      req.body.from_emp,
      req.body.to_emp,
      req.body.year,
      req.body.quarter,
      req.body.review_id,
    ],
    function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  );
});

app.put("/submit-review", function (req, res) {
  connection.query(
    "UPDATE `reviews` SET `rating`=?,`remarks`=?,`status`=2 where from_emp=? and `review_id`=? and status = 1",
    [req.body.rating, req.body.remarks, req.user.emp_id, req.body.review_id],
    function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  );
});

//rest api to delete record from mysql database
// app.delete('/review', function (req, res) {
//     console.log(req.body);
//     connection.query('DELETE FROM `reviews` WHERE `review_id`=?', [req.body.review_id], function (error, results, fields) {
//         if (error) throw error;
//         res.end('Record has been deleted!');
//     });
// });

var server = app.listen(8080, "127.0.0.1", function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Performance Review app listening at http://%s:%s", host, port);
});
