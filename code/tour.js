(function () {
	'use strict';

	var viewer = null;
	var currentDot = null;

	var sceneIds = ['atrium', 'auditorium', 'aud_lib'];

	var tourConfig = {
		default: {
			firstScene: 'atrium',
			sceneFadeDuration: 400,
			autoLoad: true,
			showControls: true,
			compass: false,
			orientationOnByDefault: false
		},
		scenes: {
			atrium: {
				title: 'Atrium',
				type: 'equirectangular',
				panorama: 'pano/equirectangular/atrium.jpg',
				yaw: 45,
				pitch: 0,
				hfov: 100
			},
			auditorium: {
				title: 'Auditorium',
				type: 'equirectangular',
				panorama: 'pano/equirectangular/auditorium.jpg',
				yaw: 135,
				pitch: 0,
				hfov: 100
			},
			aud_lib: {
				title: 'Library and auditorium',
				type: 'equirectangular',
				panorama: 'pano/equirectangular/aud_lib.jpg',
				yaw: 0,
				pitch: 0,
				hfov: 100
			}
		}
	};

	function sceneIdForIndex(i) {
		return sceneIds[i];
	}

	function setDotHot(el) {
		if (currentDot && currentDot !== el) {
			currentDot.classList.remove('dotHot');
			currentDot.classList.add('dot');
			currentDot.setAttribute('aria-pressed', 'false');
		}
		el.classList.remove('dot');
		el.classList.add('dotHot');
		el.setAttribute('aria-pressed', 'true');
		currentDot = el;
	}

	function selectSceneFromDot(el, index) {
		if (currentDot === el) {
			return;
		}
		var id = sceneIdForIndex(index);
		if (!viewer || !id) {
			return;
		}
		viewer.loadScene(id);
		setDotHot(el);
	}

	function bindDots() {
		var dots = [
			document.getElementById('myAtriumDot'),
			document.getElementById('myAuditoriumDot'),
			document.getElementById('myAudLibDot')
		];
		dots.forEach(function (el, index) {
			if (!el) {
				return;
			}
			el.setAttribute('aria-pressed', 'false');
			el.addEventListener('click', function () {
				selectSceneFromDot(el, index);
			});
		});
	}

	function init() {
		var container = document.getElementById('panorama');
		if (!container || typeof pannellum === 'undefined' || !pannellum.viewer) {
			return;
		}
		viewer = pannellum.viewer('panorama', tourConfig);
		viewer.on('load', function () {
			viewer.startAutoRotate(0.5, 0);
		});
		if (viewer.isLoaded()) {
			viewer.startAutoRotate(0.5, 0);
		}
		bindDots();
		var atrium = document.getElementById('myAtriumDot');
		if (atrium) {
			setDotHot(atrium);
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
