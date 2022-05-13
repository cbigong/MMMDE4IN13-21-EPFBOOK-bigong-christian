const express = require('express')
const app = express()
const port = 3000
const fs = require("fs") 
const path = require("path");
app.set('views', './views');
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
var binomialTest = require( '@stdlib/stats-binomial-test' );

const getStudentsFromCsvfile = (cb) => {
  const rowSeparator = "\n";
  const cellSeparator = ",";
  // example based on a CSV file
  fs.readFile("./students.csv", "utf8", (err, data) => {
    const rows = data.split(rowSeparator);
    // first row is an header I isolate it
    const [headerRow, ...contentRows] = rows;
    const header = headerRow.split(cellSeparator);

    const students = contentRows.map((row) => {
      const cells = row.split(cellSeparator);
      const student = {
        [header[0]]: cells[0],
        [header[1]]: cells[1],
        [header[2]]: cells[2],
        [header[3]]: cells[3],
        [header[4]]: cells[4],
        [header[5]]: cells[5],
      };
      return student;
    });
    return cb(null, students);
  });
};
const storeStudentInCsvFile = (student, cb) => {
  const csvLine = `\n${student.name},${student.email},${student.age}`;
  console.log(csvLine);
  fs.writeFile("./students.csv", csvLine, { flag: "a" }, (err) => {
    cb(err, "ok");
  });
};
const readcsv = (cb) => {
  const rowSeparator = "\n"
  const cellSeparator = ","
  fs.readFile("./students.csv", "utf8", (err, data) => {
  //console.log(data)
  const rows = data.split(rowSeparator)
  //console.log(rows)
  const [headerRow, ...contentRows] = rows
  const header = headerRow.split(cellSeparator)
  const students = contentRows.map((row) => {
  const cells = row.split(cellSeparator)
  const student = {
  [header[0]]: cells[0],
  [header[1]]: cells[1],
  [header[2]]: cells[2],
  [header[3]]: cells[3],
  [header[4]]: cells[4],
  [header[5]]: cells[5],
  }
  return student
  })
  //console.log(students)
  return cb(null, students)
  })
  }

app.get("/navbar", (req, res) => {
    res.render("navbar2.ejs");
  });
app.get("/home", (req, res) => {
    res.render("accueil.ejs");
  }); 
app.get("/formulaire", (req, res) => { 
    res.render("formulaire.ejs");
  }); 
  
  app.get("/liste", (req, res) => {
    getStudentsFromCsvfile((err, students) => {
      if (err) {
        console.error(err);
        res.send("ERROR");
      }
      console.log(students)
      res.render("liste.ejs", {
        students,
      });
    }); 
  });  

  app.post("/formulaire", (req, res) => {
    console.log(req.body);
    const student = req.body;
    storeStudentInCsvFile(student, (err, storeResult) => {
      if (err) {
        res.redirect("/formulaire?error=1");
      } else {
        res.redirect("/formulaire?created=1");
      }
    });
  }); 
  const parseCsvWithHeader = (filepath, cb) => {
    const rowSeparator = "\n";
    const cellSeparator = ",";
    // example based on a CSV file
    fs.readFile(filepath, "utf8", (err, data) => {
    const rows = data.split(rowSeparator);
    // first row is an header I isolate it
    const [headerRow, ...contentRows] = rows;
    const header = headerRow.split(cellSeparator);
    
    const items = contentRows.map((row) => {
    const cells = row.split(cellSeparator);
    const item = {
    [header[0]]: cells[0],
    [header[1]]: cells[1],
    [header[2]]: cells[2], 
    [header[3]]: cells[3],
    [header[4]]: cells[4],
    [header[5]]: cells[5]
    
    
     
    };
    return item; 
    
    });
    //console.log(items)
    return cb(err, items);
    });
    };
    
    app.get('/details/:id', (req, res) => {

      parseCsvWithHeader("students.csv", (err,students)=> {
      id = req.params
      //console.log(id["id"] )
      
      for( var i in students)
      {
      if (i == id["id"]-1 ){
      var student=students[i]
      console.log(student)
      }
      }
      //res.render("details.ejs",{student} )
      res.render(path.join(__dirname, "./views/details.ejs"),{student} )
      } )
      })
    app.post("/api/binomial-test", (req, res) => { 
      var binome=req.body
      var out = binomialTest( binome.nbSuccess, binome.nbTrials);
      console.log("pvalue: ", out.pValue);
      res.send({value:out.pValue})
      });
    app.get('/about', (req, res) => {
          res.render("about.ejs")
          } )
          const storeStudentInCsvFile3 = (tableau,cb) => {
            console.log(tableau.length)
            var csvTableau =['Firstname,Lastname,Email,Age,Degree,Option']
            //csvTableau.push('Firstname,Lastname,Email,Age,Degree,Option')
            for (i in tableau) {
            
            csvTableau.push(`\n${tableau[i].name},${tableau[i].email},${tableau[i].age},${tableau[i].phone},${tableau[i].address},${tableau[i].sexe}`);
            }
            console.log(csvTableau);
            fs.writeFile("./students.csv", csvTableau, { flag: "w" }, (err) => {
            cb(err, "ok");
            })
            }
            app.get("/update", (req, res) => {  
              res.render("update.ejs");
            }); 
            app.post("/update:/id", (req,res) =>{
            readcsv((err, students) => {
            i = req.params
            var student = req.body; 
            console.log(i)
            id=i["id"]-1 
            console.log(students[id])
            studentold=students[id]
            studentarr=Object.values(studentold)
            console.log(studentarr)
            studentarr.splice(0,1,student.name)
            studentarr.splice(1,1,student.email)
            studentarr.splice(2,1,student.age)
            studentarr.splice(3,1,student.phone)
            studentarr.splice(4,1,student.address)
            studentarr.splice(5,1,student.sexe)
            console.log(studentarr)
            console.log(students[id])
            students[id]["name"] =studentarr[0]
            students[id]["email"] =studentarr[1]
            students[id]["age"] =studentarr[2]
            students[id]["phone"] =studentarr[3]
            students[id]["address"] =studentarr[4]
            students[id]["sexe"] =studentarr[5]
            console.log(students)
            storeStudentInCsvFile3(students,(err, storeResult) => {
            if (err) {
            res.status(500).send("error");
            }else{
            res.send("ok"); 
            } 
            }); 
            })
            }) 
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })

