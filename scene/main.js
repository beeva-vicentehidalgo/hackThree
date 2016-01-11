
var camera, scene, renderer, mesh, mouse, controls,
	width = window.innerWidth, 
	height = window.innerHeight;

var clock = new THREE.Clock();
var mouse = new THREE.Vector2();
	
init();
animate();

function init() {

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer( { antialias: true, preserveDrawingBuffer: true, alpha: true } );
	renderer.setSize( width, height );
	renderer.shadowMapEnabled = true;
	renderer.shadowMapType = THREE.PCFSoftShadowMap;
	renderer.setViewport( 0,0,width, height );

	var container = document.getElementById('container');
	container.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera( 50, (width/height), 0.1, 10000000 );
	camera.position.set( 1500, 1500, 1500 );

	mouse = new THREE.Vector2();

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.enableDamping = true;
	controls.dampingFactor = 0.25;
	controls.enableZoom = true;
	controls.target.set( 0,0,0 );

	buildShape();

	var directionalLight = new THREE.SpotLight(0xeeeeee, 1.5);
		directionalLight.position.set(2000, 3500,2500);
		//directionalLight.target.position.set( 0, 0, 0 );
		//directionalLight.shadowCameraVisible = true;
		directionalLight.castShadow = true;
		directionalLight.shadowCameraFar = 10000;
		directionalLight.shadowDarkness = 0.5;
		directionalLight.shadowMapWidth = 2048;
		directionalLight.shadowMapHeight = 2048;
		directionalLight.name = 'luzDireccional'

	scene.add( directionalLight );
	//
	window.addEventListener( 'resize', onWindowResize, false );

}

function buildShape(){
	
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

function addLinesRed(){
	
	var lineRedGroup = new THREE.Object3D();
	var reScaleGroup = 1;

	var firstPoint = {'x': 1000, 'y': 1000, 'z': 0};
	var endPoint = {'x': 0, 'y': 1000, 'z': 0};
	var count = 0;

	var numPoints = 200;

	var spline = new THREE.SplineCurve3([
				   new THREE.Vector3(firstPoint.x ,firstPoint.y ,2 ),
				   new THREE.Vector3(((firstPoint.x+endPoint.x)/2), (firstPoint.y+endPoint.y)/2, 30 ),
				   new THREE.Vector3(endPoint.x ,endPoint.y ,2 )
				]);

	var geometry3 = new THREE.Geometry();

	var material3 = new THREE.LineBasicMaterial({
		    color: 0xff5500,
		    transparent:true,
			opacity: 0.8,
		    //linewidth: Math.floor((Math.random() * 30) + 1)*10*e,
            linewidth: 1,
			sizeAttenuation: false,
			visible: true
		});

	var splinePoints = spline.getPoints(numPoints);

	for(var o = 0; o < splinePoints.length; o++){
		    geometry3.vertices.push(splinePoints[o]);  
		}	

	var line2 = new THREE.Line(geometry3, material3);

	lineRedGroup.add(line2);

	lineRedGroup.scale.set(1,1,1);	

	lineRedGroup.rotation.x = Math.PI / 2;
	lineRedGroup.rotation.y = Math.PI;

	scene.add(lineRedGroup);
}

function removeLines(){
	if(lineRedGroup.children.length > 0){
		for( var i = lineRedGroup.children.length - 1; i >= 0; i--) { 
			lineRedGroup.remove(lineRedGroup.children[i]);
		}
		scene.remove(lineRedGroup);
	}
}

function movement(value, object, delay, duration){
          var tween = new TWEEN.Tween(object).to(
          	value
          	,duration).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function () {
          	/*camera.position.x = valueX;
          	camera.position.y = valueY;
          	camera.position.z = valueZ;*/
          }).delay(delay).start();
}

function animate() {

	setTimeout( function() {
		requestAnimationFrame( animate );
	}, 1000/30 );

    TWEEN.update();

	render();

	//if(controls) controls.update( clock.getDelta() );
}

function render(){
	renderer.render(scene,camera);
}
