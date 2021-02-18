const express = require('express');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser')
const axios = require('axios')
var nodegit = require('nodegit')
const del = require('del')
const fs = require('fs')

require('dotenv').config()

const app = express();
app.use(compression());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../", "client/build")));

// Put all API endpoints under '/api'
app.get(`${process.env.BASE_URL}/api/health`, (req, res) => {
  res.status(200).send("<h1>Up and Running !!!! </h1>");
});

// fetch the parent repository
app.get(`${process.env.BASE_URL}/api/v1/clone-parent`, (req, res) => {
  console.log(req.query)
  var repoUrl = req.query.repoUrl
  var repoPath = path.join(__dirname, "../", "client/build/contribution-ui")
  console.log(repoPath)
  if (!fs.existsSync(repoPath)) {
    console.log('dir does not exist .. creating it')
    fs.mkdirSync(repoPath);
  }

  var localPath = path.join(__dirname, "../", "client/build/contribution-ui/" + req.query.repoName)



  fs.access(localPath, function (error) {
    if (error) { // repo is not preset so just try to clone it
      cloneParentRepo(repoUrl, localPath, res)
    } else {
      // console.log("Directory exists. so just deleting it to clone the new one")
      (async () => {
        try {
          await del(localPath)
          res.status(200).json(
            { 'status': 200, 'response': 'deleted' },
          );
        } catch (err) {
          res.status(200).json(
            { 'status': 200, 'response': 'delete failed' },
          );
        }
      })();
      // cloneParentRepo(repoUrl,localPath)
      // removeDir(pathT)
    }
  })
});

const cloneParentRepo = function (repoUrl, localPath, res) {
  nodegit.Clone(repoUrl, localPath)
    // Look up this known commit.
    .then(function (repo) {
      // Use a known commit sha from this repository.
      // repo.getCommit("65d433157f89fb9b871f7a611012fb94855300ce");
      res.status(200).json(
        { 'status': 200, 'response': 'cloned successfully' },
      );
    })
    .catch(function (err) {
      console.log(err);
      res.status(200).json(
        { 'status': 500, 'response': 'clone failed' },
      );
    });
}


const removeDir = function (path) {
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path)

    if (files.length > 0) {
      files.forEach(function (filename) {
        if (fs.statSync(path + "/" + filename).isDirectory()) {
          removeDir(path + "/" + filename)
        } else {
          fs.unlinkSync(path + "/" + filename)
        }
      })
      fs.rmdirSync(path)
    } else {
      fs.rmdirSync(path)
    }
  } else {
    console.log("Directory path not found.")
  }
}

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../", '/client/build/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log(`Up and listening on ${port}`);
