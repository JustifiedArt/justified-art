//form validation script
var formatText = function(text){
	var tempText = text.toLowerCase().replace(' ', '');
	return tempText;
};

var validFiles = ['jpeg', 'png', 'jpg'];

function submitImages(){
	var url = document.URL;
	var imageNum = url.substr(url.search("submitImages")+12, 1);
	var nextImageNum = parseInt(imageNum) + 1;
	var nextUrl = 'submitImages' + nextImageNum + '.html';
	
	var sFileName1 = $('#ImageFile')[0].value;
	
	fileValid = validateFile(sFileName1, imageNum);
	
	if(fileValid!==false){
		console.log("submitting " + fileValid);
		$('#ImageName')[0].value = fileValid;
		//window.alert("Submitting the first image, please click 'ok' to continue...");
		$('ImageForm').submit();
		
		if(parseInt(imageNum)<3){
			console.log(nextUrl);
			//alert("Submitting for Artwork 1.  Click 'ok' to continue to Artwork number 2...");
			setTimeout(function() {window.location= nextUrl; },1000);
		}else{
			console.log('thanks for your submission!');
			setTimeout(function() {window.location.href="thankYou.html";});
		}
	}
}
var validateFile = function(sFileName, imageNum){
	console.log(sFileName);
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
			return "uploads/" + lastName + firstName + imageNum + "." + sCurExtension;
			console.log("uploads/" + lastName + firstName + "." + sCurExtension);
		}
	}
	else{
		alert('Please Enter a first and last name in the fields provided.');
		return false;
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
    debugger;
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
