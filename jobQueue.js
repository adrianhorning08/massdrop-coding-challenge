const kue = require('kue');
const jobs = kue.createQueue();


function newJob (name){
 const job = jobs.create('new_job', {
   name: name
 });

 job
  .on('complete', function (){
    console.log('Job', job.id, 'with name', job.data.name, 'is done');
  })
  .on('failed', function (){
    console.log('Job', job.id, 'with name', job.data.name, 'has failed');
  })

job.save();
}


jobs.process('new_job', function (job, done){
 console.log('Job', job.id, 'is done');
 done && done();
})


setInterval(newJob, 3000);
