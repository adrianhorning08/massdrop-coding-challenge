var kue = require('kue');
var queue = kue.createQueue();
const axios = require("axios");
const printId = require('./index.js')

function create(url) {
  var job  = queue.create( 'url', {
    title: 'Fetching HTML from: ' + url,
    url: url,
    html: null
  })

  job.on( 'complete', function () {
    console.log( " Job complete" );
    console.log(job.data);
  } ).on( 'failed', function () {
    console.log( " Job failed" );
  } ).on( 'progress', function ( progress ) {
    console.log('in progress');
  } );
  // something

  job.save();
}

queue.process('url', function(job, done){
  fetchHTML(job);
  // how to give them the id here.....
  printId(job.id)
  done();
});

const fetchHTML = async (job) => {
  try {
      const response = await axios.get(job.data.url);
      const data = await response.data;
      job.data.html = data;
      job.update();
  } catch(error) {
      return error;
  }
}

// start the UI
kue.app.listen( 3002 );
console.log( 'UI started on port 3002' );

module.exports = create;
