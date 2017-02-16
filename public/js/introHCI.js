'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	console.log("User clicked on project " + idNumber);

	var url = "/project/" + idNumber;
	console.log("The following url is being called: " + url);
	$.get(url, projectCallback);
}

function projectCallback(projectObject) {
	console.log(projectObject);
	var projectGet = '<img src="' + projectObject['image'] + 
				'" class ="detailsImage">' + '<p>' + projectObject['title'] + '</p>' +
				'<p><small>' + projectObject['date'] + '</small></p>' +
				projectObject['summary'];
	var projectid = '#project' + projectObject['id'];
	$(projectid + " .details").html(projectGet);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	e.preventDefault();
	console.log("User clicked on color button");
	$.get("/palette/", changeColor);
}

function changeColor(result) {
	var hex = result['colors'];
	var colors = hex['hex'];
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}