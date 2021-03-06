jQuery(document).ready(function($) {
	$(".scroll").click(function(event){		
		event.preventDefault();
		$('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
	});
});

//form validation script
var formatText = function(text){
	var tempText = text.toLowerCase().replace(' ', '');
	return tempText;
};

var validFiles = ['jpeg', 'png', 'jpg'];

function submitImages(){
	var url = document.URL;
	var selectedNext = $('input[type=radio]:checked').val();
	var unselected = false;
	if(selectedNext === undefined){
		unselected = true;
		alert('Please choose an option from the list to continue.');
	}
	var imageNum = url.substr(url.search("submitImages")+12, url.search('.html') - url.search("submitImages")-12);
	var nextImageNum = selectedNext.substr(selectedNext.search("submitImages")+12);
	var nextUrl = selectedNext + '.html';
	
	var sFileName1 = $('#ImageFile')[0].value;
	
	fileValid = validateFile(sFileName1, imageNum);
	
	if(!unselected & fileValid!==false){
		console.log("submitting " + fileValid);
		$('#ImageName')[0].value = fileValid;
		//window.alert("Submitting the first image, please click 'ok' to continue...");
		$('ImageForm').submit();
		
		//alert("Submitting for Artwork 1.  Click 'ok' to continue to Artwork number 2...");
		setTimeout(function() {window.location= nextUrl; },1000);
	}
	
}
var validateFile = function(sFileName, imageNum){
	console.log(sFileName);
	
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	
	if(dd<10) {dd='0'+dd;}
	if(mm<10) {mm='0'+mm;}
	today = yyyy+'_'+mm+'_'+dd+'_';
	
	var firstName = formatText($('#firstName')[0].value);
	var lastName = formatText($('#lastName')[0].value);
	if(firstName.length!==0 || lastName.length!==0){
	
		var validFile;
		for(i=0; i<validFiles.length; i++){
			var sCurExtension = validFiles[i];
			validFile = false;
			if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()){
				validFile = true;
				break;
			}
		}
		if (!validFile) {
			if(sFileName!==""){
				alert("Sorry, '" + sFileName + "' is invalid, allowed extensions are: " + validFiles.join(", "));
	        }
	        return false;
	    }
		else{
			return "uploads/" + today + lastName + firstName + imageNum + "." + sCurExtension;
			console.log("uploads/" + today + lastName + firstName + imageNum + "." + sCurExtension);
		}
	}
	else{
		alert('Please Enter a first and last name in the fields provided.');
		return false;
	}
};
var validateGoogleForm = function(){
	var valid = true;
	
	var requiredArray = [0,1,8,15,21,43,45];
	
	
	for(i=0; i<requiredArray.length; i++){
		console.log(requiredArray[i]);
		var currentEntry = $('#'+'entry_'+requiredArray[i])[0].value;
		
		if(currentEntry.length===0){
			var currentLabel = $("label[for='"+ 'entry_'+requiredArray[i] +"']").text();
			currentLabel = currentLabel.replace(/(\r\n|\n|\r|\t)/gm,"");
			if(currentLabel.length>20){
				currentLabel = currentLabel.substr(0,20) + '...';
			}
			alert('Please fill out "' + currentLabel + '" and ALL other required fields marked by an asterisk(*) before continuing.');
			valid=false;
			break;
		}
	}
	//If any of artWork #2 fields are filled out, make sure the rest are as well
	//Disables with the form disabled fields
	/*var artwork2 = false;
	var requiredArray2 = [25,29,53,55];
	for(i=0;i<requiredArray2.length;i++){
		var currentEntry = $('#'+'entry_'+requiredArray2[i])[0].value;
		if(currentEntry.length>0){
			artwork2 = true;
			console.log("artwork 2 is being submitted");
			break;
		}
	}
	if(artwork2){
		for(i=0;i<requiredArray2.length;i++){
			var currentEntry = $('#'+'entry_'+requiredArray2[i])[0].value;
			if(currentEntry.length===0){
				var currentLabel = $("label[for='"+ 'entry_'+requiredArray2[i] +"']").text();
				currentLabel = currentLabel.replace(/(\r\n|\n|\r|\t)/gm,"");
				if(currentLabel.length>20){
					currentLabel = currentLabel.substr(0,20) + '...';
				}
				alert('It looks like you are going to submit a second piece of artwork.  If so, please fill out "' + currentLabel + '" for Artwork 2 before continuing.  Otherwise, make sure ALL Artwork 2 fields are empty.');
				valid=false;
				break;
			}
		}
	}
	//same for Artwork #3
	var artwork3 = false;
	var requiredArray3 = [31,61,57,63];
	for(i=0;i<requiredArray3.length;i++){
		var currentEntry = $('#'+'entry_'+requiredArray3[i])[0].value;
		if(currentEntry.length>0){
			artwork3 = true;
			console.log("artwork 3 is being submitted");
			break;
		}
	}
	if(artwork3){
		for(i=0;i<requiredArray3.length;i++){
			var currentEntry = $('#'+'entry_'+requiredArray3[i])[0].value;
			if(currentEntry.length===0){
				var currentLabel = $("label[for='"+ 'entry_'+requiredArray3[i] +"']").text();
				currentLabel = currentLabel.replace(/(\r\n|\n|\r|\t)/gm,"");
				if(currentLabel.length>20){
					currentLabel = currentLabel.substr(0,20) + '...';
				}
				alert('It looks like you are going to submit a third piece of artwork.  If so, please fill out "' + currentLabel + '" for Artwork 3 before continuing.  Otherwise, make sure ALL Artwork 3 fields are empty.');
				valid=false;
				break;
			}
		}
	}
	*/
	//for checkbox
	var checkbox = $('#group_68_1')[0];
	if(valid & checkbox.checked!==true){
		alert('You must read and agree to the terms and conditions.');
		return false;
	}
	//see if all fields have content
	if(!valid){
		//alert('Please review the form and fill in ALL required fields marked by an asterisk (*) before continuing.');
		return false;
	}
	else{
		return true;
	}
};

//
//
//HTML5 file uploader JS
//
//
var holder = document.getElementById('holder'),
    tests = {
      filereader: typeof FileReader != 'undefined',
      dnd: 'draggable' in document.createElement('span'),
      formdata: !!window.FormData,
      progress: "upload" in new XMLHttpRequest
    }, 
    support = {
      filereader: document.getElementById('filereader'),
      formdata: document.getElementById('formdata'),
      progress: document.getElementById('progress')
    },
    acceptedTypes = {
      'image/png': true,
      'image/jpeg': true,
      'image/gif': true
    },
    progress = document.getElementById('uploadprogress'),
    fileupload = document.getElementById('upload');

"filereader formdata progress".split(' ').forEach(function (api) {
  if (tests[api] === false) {
    support[api].className = 'fail';
  } else {
    // FFS. I could have done el.hidden = true, but IE doesn't support
    // hidden, so I tried to create a polyfill that would extend the
    // Element.prototype, but then IE10 doesn't even give me access
    // to the Element object. Brilliant.
    support[api].className = 'hidden';
  }
});

function previewfile(file) {
  if (tests.filereader === true && acceptedTypes[file.type] === true) {
    var reader = new FileReader();
    reader.onload = function (event) {
      var image = new Image();
      image.src = event.target.result;
      image.width = 250; // a fake resize
      holder.appendChild(image);
    };

    reader.readAsDataURL(file);
  }  else {
    holder.innerHTML += '<p>Uploaded ' + file.name + ' ' + (file.size ? (file.size/1024|0) + 'K' : '');
    console.log(file);
  }
}

function readfiles(files) {
    //debugger;
    var formData = tests.formdata ? new FormData() : null;
    for (var i = 0; i < files.length; i++) {
      if (tests.formdata) formData.append('file', files[i]);
      previewfile(files[i]);
    }

    // now post a new XHR request
    if (tests.formdata) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/submit.php');
      xhr.onload = function() {
        progress.value = progress.innerHTML = 100;
      };

      if (tests.progress) {
        xhr.upload.onprogress = function (event) {
          if (event.lengthComputable) {
            var complete = (event.loaded / event.total * 100 | 0);
            progress.value = progress.innerHTML = complete;
          }
        }
      }

      xhr.send(formData);
    }
}

if (tests.dnd) { 
  holder.ondragover = function () { this.className = 'hover'; return false; };
  holder.ondragend = function () { this.className = ''; return false; };
  holder.ondrop = function (e) {
    this.className = '';
    e.preventDefault();
    readfiles(e.dataTransfer.files);
  }
} else {
  fileupload.className = 'hidden';
  fileupload.querySelector('input').onchange = function () {
    readfiles(this.files);
  };
}
//
//
//End HTML5 file uploader JS
//
//
