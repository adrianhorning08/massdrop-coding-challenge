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

  // so the main save gets done before the other one gets called
  console.log('main save:' + job.id);

  // so.... queue.process doesn't get called until its all done?
  // that seems dumb, cause the job I want it to do (fetch the html)
  // is what will take a while
  job.save();
}

queue.process('url', function(job, done){
  fetchSomething(job)
  done();
});

const updateTitle = (job) => {
  job.data.title = 'hey there';
  job.update();
  // changes right here!!!!
  // why doesn't it get saved??
  // it looks wrong in my terminal, but...it looks like it worked online...

  // maybe it updates it, but doesn't update it in the database


  console.log('updateTitle save:' + job.id);

}

create();

const fetchSomething = async (job) => {
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
