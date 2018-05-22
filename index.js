const create = require('./jobQueue.js');

// let form = document.getElementById('form');
// form.onsubmit = function(e) {
//   e.preventDefault();
//   let url = form.url.value;
//   let finalUrl = `https://${url}`;
//   fetch(`/jobs/${finalUrl}`);
// };

let address = process.argv[2];
let finalUrl = `https://${address}`;

create(finalUrl);
