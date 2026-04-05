var pano_loader	= new Array();
pano_loader[0] = { pan: 45, tilt:0, fov:100 };
pano_loader[1] = { pan:135, tilt:0, fov:100 };
pano_loader[2] = { pan:  0, tilt:0, fov:100 };


function SelectPanoramaFromIndex(p) {
	
	document.all.myPTViewer.newPanoFromList(p , pano_loader[ p ].pan, pano_loader[ p ].tilt, pano_loader[ p ].fov);	
	document.all.myPTViewer.startAutoPan( .5, 0.0, 1.0 );
	
	//document.all.panorama_text_div.innerHTML = pano_text[ p ];
	
}

var current = null;
function dotHandler(thing, i) {
	
	if (current == thing) {
		return;
	}
	
	if (current != null) {
		current.className = 'dot';
	}
	
	SelectPanoramaFromIndex(i);
	thing.className = 'dotHot';

	current = thing;
}
