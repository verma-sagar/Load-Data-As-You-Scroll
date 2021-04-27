// api url
const api_url ="https://jsonplaceholder.typicode.com/albums";
	
const container = document.getElementById('container');
const loading = document.querySelector('.loading');
let post_offset = 11;
let isScrolled=false;
var postData=[];
var displayData=[];

  document.addEventListener('DOMContentLoaded', () => {

 async function getPost() {
	// Storing response
  const response = await fetch(api_url);
	  
  // Storing data in form of JSON
  postData = await response.json();
  displayData=postData.slice(0,10);

	  addDataToDOM(displayData);
	  if(post_offset < postData.length){
	  addDataToDOM([postData[post_offset]]);
	  post_offset++;
	}
	isScrolled = false;
  }


   getPost();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if(clientHeight + scrollTop >= scrollHeight - 5 && !isScrolled) {
    isScrolled = true;
    // show the loading animation
    showLoading();
  }
});

function showLoading() {
  if(post_offset < postData.length){
    loading.classList.add('show');

    // load more data
    setTimeout(getPost, 5000)
  }
  else{
    // end has been reached, no more posts available
    const postElement1 = document.createElement('div');
    postElement1.innerHTML = 
    `<div style="text-align:center;">You Have Reached End</div>`;
    container.appendChild(postElement1);
  }
}

function addDataToDOM(postData) {
 
  var table=document.getElementById('employees');
  table.classList.add('blog-post');
  for(let i=0;i<postData.length;i++)
  {
    var row=table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
  
    cell1.innerHTML = `${postData[i].id}`;
    cell2.innerHTML = `${postData[i].title}`;
  }
  container.appendChild(table);
  loading.classList.remove('show');
}
  });