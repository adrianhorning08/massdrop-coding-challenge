var kue = require('kue');
var queue = kue.createQueue();
const axios = require("axios");

function create() {

  // it doesnt like when i try to fetch the data here. why?

  var job  = queue.create( 'url', {
    title: 'Doing this google thing',
    url: 'https://www.google.com/',
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

  job.save();
}

queue.process('url', function(job, done){
  fetchHTML(job);
  done();
});


create();

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
console.log( 'UI started on port 3000' );
