// Stores form data in cookies

function getFormAsJSON() {
	const form = document.getElementById("selectionWizard");
	const data = new FormData(form);
	
	var formDict = {};
	data.forEach( function (val, key) {
		formDict [key] = val;
	});
	
	return JSON.stringify(formDict);
}

function populateFormFromObject(JSONData) {
	const form = document.getElementById("selectionWizard");
	const data = new FormData();
	
	const jdata = JSON.parse(JSONData);
	console.log(jdata)
	
	for ( var [key, val] of Object.entries(jdata) ) {
		const input = form.elements[key];
		
        switch(input.type) {
            case 'checkbox': input.checked = !!val; break;
            default:         input.value = val;     break;
        }
	}
}


function writeCookie(data) {
	document.cookie = "formData=" + data;
}

function readCookie() {
	const cookieOn = document.cookie.split("; formData=")[1];
	return cookieOn.split(";")[0]
}





function fillCookieFromForm() {
	const dataToWrite = getFormAsJSON();
	console.log(dataToWrite);
	writeCookie(dataToWrite);
}

function fillFormFromCookie() {
	populateFormFromObject(readCookie());
}