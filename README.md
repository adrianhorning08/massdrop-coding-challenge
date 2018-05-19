# massdrop-coding-challenge

Create a job queue whose workers fetch data from a URL and store the results in a database. The job queue should expose a REST API for adding jobs and checking their status / results.

Example:

User submits www.google.com to your endpoint. The user gets back a job id. Your system fetches www.google.com (the result of which would be HTML) and stores the result. The user asks for the status of the job id and if the job is complete, he gets a response that includes the HTML for www.google.com.

QUESTIONS
* How do I get the job to run?
* How do I see the jobs in the redis DB?


Database - Redis i think
  * Do I need like a schema and stuff?

Server - Redis Server
 * Put the api stuff here

Task Queue - Kue
  * Add job (how do I tell the job what it needs to do?)
  * Check status of job

Index.html
 * I think some UI would be helpful (Maybe get rid of when done?)

Main file - index.js?
