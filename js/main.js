//listen for form submit 
document.getElementById('myForm').addEventListener('submit', saveBookmark);


/*
===============
SAVE BOOKMARK
===============
*/
function saveBookmark(e){
	
	//fetch the form data
	var siteName = document.getElementById('siteName').value.toLowerCase(); 
	var siteUrl = document.getElementById('siteUrl').value;

	var bookmark = {
		name: siteName,
		url: siteUrl
	}

	
	if(!formValidate(siteName, siteUrl)){
		return false;
	}

	//save to localStorage
	if(localStorage.getItem('bookmarks') === null) {
		//init arrray 
			var bookmarks = [];
		//add to array
			bookmarks.push(bookmark);
		//set to local storage 
			localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
		} else {
		//fetch bookmarks from localStorage 
			var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//add to array
			bookmarks.push(bookmark);
		//set back to localStorage 
			localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	//fetch and display bookmarks
	fetchBookmarks();

	//reset the form input fields
	document.getElementById('myForm').reset();

	//prevent default action (form submitting)
	e.preventDefault();
}


/*
===============
DELETE BOOKMARK
===============
*/
function deleteBookmark(url) {
	//get bookmarks from the localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	//loop through the array of bookmarks
	for(var i = 0; i < bookmarks.length; i++){
		//check for a match of the passed url
		if(bookmarks[i].url == url){
			//remove the matched url
			bookmarks.splice(i, 1);
		}

	}
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	//fetch and display bookmarks
	fetchBookmarks();
}


/*
================
FETCH BOOKMARKS
================
*/
function fetchBookmarks() {
	//fetch existing bookmarks from local storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	//fetch the ouput div 
	var bookmarkResults = document.getElementById('bookmarkresults');
	//build the output 
	bookmarkResults.innerHTML = '';
	//display heading if bookmark(s) exist
	if(bookmarks != ""){
			bookmarkResults.innerHTML = '<span><h4 style="text-align: center" class="wow fadeInDown" data-wow-duration="3s" data-wow-delay="1s">Saved Bookmarks</h4></span><br>'
		}
	//loop through the array with bookmarks
	for(var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		//append to output 
		bookmarkResults.innerHTML += 
		'<div class="well wow fadeInDown" data-wow-duration="2s" data-wow-delay="1s">'+
		'<h5>'+name+
		'<div style="float: right">'+
		'<a class="btn btn-primary" target="_blank" href="'+url+'">Visit</a> '+
		'<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+
		'</div>'+
		'</h5'+
		'</div>';
	}
}

/*
var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);
*/

function formValidate(siteName, siteUrl){
	//regular expression for checking the url
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	//check if form is empty
	if(!siteName && !siteUrl){
		alert('Please fill out the form');
		return false;
	} else {
		//check if site name is included
		if(!siteName && siteUrl){
			alert('Please enter the site name');
			return false;
			} else {
				//check if site url is included
				if(!siteUrl && siteName){
					alert('Please enter the site URL');
					return false;
					} else {
						//check if url is valid
						if(!siteUrl.match(regex)){
							alert('Please use a valid URL');
							return false;
						}
					}
			}
	}

	return true;
}