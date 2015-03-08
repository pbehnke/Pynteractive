function mapElement() {
	this.markers = [];
	this.lines = [];
};

mapElement.prototype = new element();
mapElement.prototype.constructor = mapElement;


/**
 * 
 */
/*mapElement.prototype.nameFunction = function (){


};*/

/**
 * Load graph on layout div html page
 */
mapElement.prototype.load = function () {

	//create a layout

	var maplink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
	var mmm = '<a href=https://github.com/coelias/Pynteractive>Pynteractive</a>'

	osm = new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	    	attribution: ' &copy; '+maplink+" | "+mmm,
	});

	this.layout = L.map('layout', {
	    center: [ 51.7504163, -1.2475879 ],
	    zoom: 12,
	    maxZoom: 18,
	    minZoom: 3,
	    zoomControl: false,
	    layers: [osm]
	});

	var node1 = {id: "id1", location: {lat:51.5, lng:-0.09}};
	var node2 = {id: "id2", location: {lat:51.8, lng:-0.09}};
	this.addNode(node1);
	this.addNode(node2);



	var edge1 = {id: "id1"};
	this.addEdge(edge1);

	console.log(this.markers);
	//this.removeNode("id1");
	//this.removeEdge("id1");

	//add events listener
	//this.layout.on('select', this.selectElement);
	//this.layout.on('doubleClick', this.doubleClickElement);
};

/**
 * Load html page
 */
mapElement.prototype.loadHtml = function () {
	
	//create tools
	var tag = {};

	tag = {tag:'div', to:'#sidebar', id:'containerNetwork'};
	this.loadHtmlTag(tag);
	
	tag = {tag:'div', to:'#containerNetwork', id:'optionsNetwork'};
	this.loadHtmlTag(tag);

	tag = {tag:'label', to:'#optionsNetwork', id: 'labelAction1', text: 'Action 1'};
	this.loadHtmlTag(tag);
	tag = {tag:'button', to:'#optionsNetwork', id: 'Action1', type: 'button', onclick: 'element.action(id);'};
	this.loadHtmlTag(tag);
	tag = {tag:'br', to:'#optionsNetwork'};
	this.loadHtmlTag(tag);

	tag = {tag:'label', to:'#optionsNetwork', id: 'labelAction2', text: 'Action 2'};
	this.loadHtmlTag(tag);
	tag = {tag:'button', to:'#optionsNetwork', id: 'Action2', type: 'button', onclick: 'element.action(id);'};
	this.loadHtmlTag(tag);
	tag = {tag:'br', to:'#optionsNetwork'};
	this.loadHtmlTag(tag);

	tag = {tag:'label', to:'#optionsNetwork', id: 'labelAction3', text: 'Action 3'};
	this.loadHtmlTag(tag);
	tag = {tag:'button', to:'#optionsNetwork', id: 'Action3', type: 'button', onclick: 'element.action(id);'};
	this.loadHtmlTag(tag);
	tag = {tag:'br', to:'#optionsNetwork'};
	this.loadHtmlTag(tag);

	tag = {tag:'hr', to:'#optionsNetwork'};
	this.loadHtmlTag(tag);

};

/**
 * Get lat and lng given the id of a node
 */
mapElement.prototype.getLatLngNode = function (node){
	return this.markers[node]._latlng;
};

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//////////////////    UIC WRAPPER    ///////////////////////
////////////////////////////////////////////////////////////

/**
 * add Node
 */
mapElement.prototype.addNode = function (node){
	var markerAux = new L.CircleMarker(new L.LatLng(node.location.lat,  node.location.lng), {
		    radius: 5,
		    fillColor: "red",
		    color: 'black',
		    weight: 1,
		    opacity: 1,
		    fillOpacity: 0.7,
		});

	markerAux.options.id = node.id;
	markerAux.on('click', this.clickNode);

	this.markers[node.id] = markerAux;
	this.layout.addLayer(this.markers[node.id]);
}

/**
 * add Edge
 */
mapElement.prototype.addEdge = function (edge){
	//id, id1, id2, label, title, threshold, style, length



	p1 = this.getLatLngNode("id1");
	p2 = this.getLatLngNode("id2");

	var pointA = new L.LatLng(p1.lat, p1.lng);
	var pointB = new L.LatLng(p2.lat, p2.lng);
	var pointList = [pointA, pointB];

	// create a red polyline from an array of LatLng points
	var polyline = L.polyline(pointList, {color: 'red'});

	polyline.options.id = edge.id;
	polyline.on('click', this.clickEdge);

	this.lines[edge.id] = polyline;
	this.layout.addLayer(this.lines[edge.id]);

	// zoom the map to the polyline
	//this.layout.fitBounds(polyline.getBounds());

}

/**
 * remove Node
 */
mapElement.prototype.removeNode = function (node){
	this.layout.removeLayer(this.markers[node]);
}


/**
 * remove Edge
 */
mapElement.prototype.removeEdge = function (edge){
	this.layout.removeLayer(this.lines[edge]);
}

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
/////////////////////    EVENTS   //////////////////////////
////////////////////////////////////////////////////////////

/**
 * click node
 */
mapElement.prototype.clickNode = function (node){
	console.log(markers);
	console.log(node.target.options.id);
	console.log(this.markers[node.target.options.id]);
}

/**
 * click Edge
 */
mapElement.prototype.clickEdge = function (edge){
	console.log(this.lines);
	console.log(edge.target.options.id);
	console.log(this.lines[edge.target.options.id]);
}
