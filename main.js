const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./config/webpack.dev.js');



const fs= require("fs")
const puppeteer=require("puppeteer")



//console.log(main("D:/github/Topp-Clinic/frontend/src","js/Pateintreg.js"))


async function main(srcpath, filepath           ){

    try{

fs.writeFileSync(`${srcpath}/ai.js`,


`import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './${filepath}';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
function Main() {

    return (
      <Router>
        <Routes>
        <Route  path="/" element={<App/>} />
       </Routes>
       </Router>
    )
}  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
`










)

config.entry=[`${srcpath}/ai.js`]
const compiler = webpack(config);
const server = new WebpackDevServer(compiler, config.devServer);

// Start the server











server.listen(config.devServer.port, config.devServer.host, (err) => {
  if (err) {
    console.error(err);
  }
  console.log('Server is running');
});







const browser = await puppeteer.launch({headless:true});
const page = await browser.newPage();

// Get the full path to the HTML file
// Load an HTML file that includes your bundle.js
await page.goto(`http://localhost:8080`);

// Perform actions or extract information from the loaded page
const pageTitle = await page.title();
console.log('Page title:', pageTitle);

const bodyContent = await page.evaluate(() => document.body.innerHTML);
console.log(bodyContent)
// Close the browser
await browser.close();
stopServer(server)
return bodyContent;




    }
    catch (err){


        return err;
    }








}
// To stop the server programmatically (call this whenever you want to stop the server)
function stopServer(server) {
  server.close(() => {
    console.log('Server stopped');
  });
}

// Call stopServer when you want to stop the server
// For example, after a certain condition is met or upon receiving a specific signal
// stopServer();
module.exports={main}