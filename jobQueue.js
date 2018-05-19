var kue = require('kue');

// create our job queue

var queue = kue.createQueue();
const axios = require("axios");


function create() {
  var job  = queue.create( 'url', {
    title: 'Doing this google thang',
    url: 'https://www.google.com/',
    html: null
  } );


  // I wonder if i update it with the data here......
  job.on( 'complete', function () {
    console.log( " Job complete" );
  } ).on( 'failed', function () {
    console.log( " Job failed" );
  } ).on( 'progress', function ( progress ) {
    console.log('in progress');
  } );

  job.save(() => console.log(job.id));
}

create();

queue.process('url', function(job, done){
  fetchSomething(job.data.url, done);
});

const fetchSomething = async (url,done) => {
  try {
      const response = await axios.get(url);
      const data = await response.data;
      // do I return something here?
      // I think it got here, now I just have to figure out how to store
      // what I get back!
      done();
  } catch(error) {
      return done(error);
  }
}

// start the UI
kue.app.listen( 3002 );
console.log( 'UI started on port 3000' );
