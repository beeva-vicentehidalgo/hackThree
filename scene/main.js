
function createAudioMeter(audioContext,clipLevel,averaging,clipLag) {
	var processor = audioContext.createScriptProcessor(512);
	processor.onaudioprocess = volumeAudioProcess;
	processor.clipping = false;
	processor.lastClip = 0;
	processor.volume = 0;
	processor.clipLevel = clipLevel || 0.98;
	processor.averaging = averaging || 0.95;
	processor.clipLag = clipLag || 750;

	// this will have no effect, since we don't copy the input to the output,
	// but works around a current Chrome bug.
	processor.connect(audioContext.destination);

	processor.checkClipping =
		function(){
			if (!this.clipping)
				return false;
			if ((this.lastClip + this.clipLag) < window.performance.now())
				this.clipping = false;
			return this.clipping;
		};

	processor.shutdown =
		function(){
			this.disconnect();
			this.onaudioprocess = null;
		};

	return processor;
}

function volumeAudioProcess( event ) {
	var buf = event.inputBuffer.getChannelData(0);
    var bufLength = buf.length;
	var sum = 0;
    var x;

	// Do a root-mean-square on the samples: sum up the squares...
    for (var i=0; i<bufLength; i++) {
    	x = buf[i];
    	if (Math.abs(x)>=this.clipLevel) {
    		this.clipping = true;
    		this.lastClip = window.performance.now();
    	}
    	sum += x * x;
    }

    // ... then take the square root of the sum.
    var rms =  Math.sqrt(sum / bufLength);

    // Now smooth this out with the averaging factor applied
    // to the previous sample - take the max here because we
    // want "fast attack, slow release."
    this.volume = Math.max(rms, this.volume*this.averaging);
}





/////////////////-------------------

var audioContext = null;
var meter = null;
// var canvasContext = null;
var WIDTH=500;
var HEIGHT=50;
var rafID = null;

window.onload = function() {

    // grab our canvas
	// canvasContext = document.getElementById( "meter" ).getContext("2d");

    // monkeypatch Web Audio
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    // grab an audio context
    audioContext = new AudioContext();

    // Attempt to get audio input
    try {
        // monkeypatch getUserMedia
        navigator.getUserMedia =
        	navigator.getUserMedia ||
        	navigator.webkitGetUserMedia ||
        	navigator.mozGetUserMedia;

        // ask for an audio input
        navigator.getUserMedia(
        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, gotStream, didntGetStream);
    } catch (e) {
        alert('getUserMedia threw exception :' + e);
    }

}


function didntGetStream() {
    alert('Stream generation failed.');
}

var mediaStreamSource = null;

function gotStream(stream) {
    // Create an AudioNode from the stream.
    mediaStreamSource = audioContext.createMediaStreamSource(stream);

    // Create a new volume meter and connect it.
    meter = createAudioMeter(audioContext);
    mediaStreamSource.connect(meter);
// console.log(meter;
    // kick off the visual updating
    // drawLoop();
}

// function drawLoop( time ) {
//     // clear the background
//     canvasContext.clearRect(0,0,WIDTH,HEIGHT);
//
//     // check if we're currently clipping
//     if (meter.checkClipping())
//         canvasContext.fillStyle = "red";
//     else
//         canvasContext.fillStyle = "green";
//
//     // draw a bar based on the current volume
//     canvasContext.fillRect(0, 0, meter.volume*WIDTH*1.4, HEIGHT);
//
//     // set up the next visual callback
//     rafID = window.requestAnimationFrame( drawLoop );
// }




/////////////////-------------------



// var a = 0.01;
var brazo_i  = null;
var brazo_d = null;
var tiltDirection_i = 1;
var tiltDirection_d = -1;

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
	renderer.getMaxAnisotropy();

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
	// COPIA AQUI EL CODIGO DEL OBJETO PARA RENDERIZARLO EN ESCENA

	//TRONCO
	var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0x31b5ff, emissive: 0x000033, specular: 0x111111, shininess: 0, metal: true, side: THREE.DoubleSide} );

	var CYLINDERradiusTop = 175; //radio de la parte superios del cilindro
	var CYLINDERradiusBottom = 200;	//radio de la parte inferior del cilindro
	var CYLINDERheigth = 400;	//altura del cilindro
	var CYLINDERradioSegments = 32; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
	var CYLINDERheigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
	var CYLINDERopenEnded = false;	//en off el cilindro en hueco
	var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
	var circleCylinder = 6.3; //grados que abarca el cilindro (360, solo 180...)

	var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
	var cylinder = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
		cylinder.castShadow = true;	//emitir sombras
		cylinder.receiveShadow = true;	//recibir sombras
		cylinder.position.set(0,0,0);	//position del objeto(x,y,z)
		cylinder.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
		cylinder.scale.set(1,1,1);		//escala del objeto(x,y,z)
	scene.add( cylinder );


	//PIERNA D

	var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0x31b5ff, emissive: 0x000033, specular: 0x111111, shininess: 0, metal: true, side: THREE.DoubleSide} );

	var CYLINDERradiusTop = 75; //radio de la parte superios del cilindro
	var CYLINDERradiusBottom = 100;	//radio de la parte inferior del cilindro
	var CYLINDERheigth = 300;	//altura del cilindro
	var CYLINDERradioSegments = 32; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
	var CYLINDERheigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
	var CYLINDERopenEnded = false;	//en off el cilindro en hueco
	var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
	var circleCylinder = 6.3; //grados que abarca el cilindro (360, solo 180...)

	var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
	var cylinder = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
		cylinder.castShadow = true;	//emitir sombras
		cylinder.receiveShadow = true;	//recibir sombras
		cylinder.position.set(100,-350,0);	//position del objeto(x,y,z)
		cylinder.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
		cylinder.scale.set(1,1,1);		//escala del objeto(x,y,z)
	scene.add( cylinder );

	//PIERNA I

	var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0x31b5ff, emissive: 0x000033, specular: 0x111111, shininess: 0, metal: true, side: THREE.DoubleSide} );

	var CYLINDERradiusTop = 75; //radio de la parte superios del cilindro
	var CYLINDERradiusBottom = 100;	//radio de la parte inferior del cilindro
	var CYLINDERheigth = 300;	//altura del cilindro
	var CYLINDERradioSegments = 32; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
	var CYLINDERheigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
	var CYLINDERopenEnded = false;	//en off el cilindro en hueco
	var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
	var circleCylinder = 6.3; //grados que abarca el cilindro (360, solo 180...)

	var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
	var cylinder = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
		cylinder.castShadow = true;	//emitir sombras
		cylinder.receiveShadow = true;	//recibir sombras
		cylinder.position.set(-100,-350,0);	//position del objeto(x,y,z)
		cylinder.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
		cylinder.scale.set(1,1,1);		//escala del objeto(x,y,z)
	scene.add( cylinder );

	//CABEZA 1 cara

	//material con textura sin reflejos
	var Texture = THREE.ImageUtils.loadTexture( "images/pocoyo.jpg" );
		// Texture.wrapS = asphaltTexture.wrapT = THREE.RepeatWrapping;
		// Texture.repeat.set( 12, 2 );
	var material = new THREE.MeshBasicMaterial( { map: Texture,color: 0xFFFFFF, side: THREE.DoubleSide, transparent: true, opacity: 1  } );
	// var SPHEREmaterial = new THREE.MeshPhongMaterial( {color: 0xf4af6a, emissive: 0x000033, specular: 0x111111, shininess: 0, metal: true, side: THREE.DoubleSide} );

	var SPHEREradius = 220; //dimensiones de la esfera
	var SPHEREwidthSegments = 32;	//segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
	var SPHEREheigthSegments = 32;	////segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
	var SPHEREangleStart = 0; //grado desde el que empieza a dibujar la pared de la espera
	var SPHEREangleLenght = 6.3; //grados que abarca la esfera (360, solo 180...)

	var SPHEREgeometry = new THREE.SphereGeometry( SPHEREradius, SPHEREwidthSegments, SPHEREheigthSegments, SPHEREangleStart, SPHEREangleLenght );
	var sphere = new THREE.Mesh( SPHEREgeometry, material );
		sphere.castShadow = true;	//emitir sombras
		sphere.receiveShadow = true;	//recibir sombras
		sphere.position.set(0,300,0);	//position del objeto(x,y,z)
		sphere.rotation.set(0,-1.5707963268,0);	//rotacion del objeto(x,y,z)
		sphere.scale.set(1,1,1);	//escala del objeto(x,y,z)
	scene.add( sphere );

	//CABEZA 2
	var SPHEREmaterial = new THREE.MeshPhongMaterial( {color: 0x31b5ff, emissive: 0x000033, specular: 0x111111, shininess: 0, metal: true, side: THREE.DoubleSide} );

	var SPHEREradius = 200; //dimensiones de la esfera
	var SPHEREwidthSegments = 32;	//segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
	var SPHEREheigthSegments = 32;	////segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
	var SPHEREangleStart = 0; //grado desde el que empieza a dibujar la pared de la espera
	var SPHEREangleLenght = 6.3; //grados que abarca la esfera (360, solo 180...)

	var SPHEREgeometry = new THREE.SphereGeometry( SPHEREradius, SPHEREwidthSegments, SPHEREheigthSegments, SPHEREangleStart, SPHEREangleLenght );
	var sphere = new THREE.Mesh( SPHEREgeometry, SPHEREmaterial );
		sphere.castShadow = true;	//emitir sombras
		sphere.receiveShadow = true;	//recibir sombras
		sphere.position.set(0,400,0);	//position del objeto(x,y,z)
		sphere.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
		sphere.scale.set(1,1,1);	//escala del objeto(x,y,z)
	scene.add( sphere );

	//CABEZA 3
	var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0x31b5ff, emissive: 0x000033, specular: 0x111111, shininess: 0, metal: true, side: THREE.DoubleSide} );

	var CYLINDERradiusTop = 200; //radio de la parte superios del cilindro
	var CYLINDERradiusBottom = 220;	//radio de la parte inferior del cilindro
	var CYLINDERheigth = 100;	//altura del cilindro
	var CYLINDERradioSegments = 32; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
	var CYLINDERheigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
	var CYLINDERopenEnded = false;	//en off el cilindro en hueco
	var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
	var circleCylinder = 6.3; //grados que abarca el cilindro (360, solo 180...)

	var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
	var cylinder = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
		cylinder.castShadow = true;	//emitir sombras
		cylinder.receiveShadow = true;	//recibir sombras
		cylinder.position.set(0,400,0);	//position del objeto(x,y,z)
		cylinder.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
		cylinder.scale.set(1,1,1);		//escala del objeto(x,y,z)
	scene.add( cylinder );



	//BRAZO D
	var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0x31b5ff, emissive: 0x000033, specular: 0x111111, shininess: 0, metal: true, side: THREE.DoubleSide} );

	var CYLINDERradiusTop = 80; //radio de la parte superios del cilindro
	var CYLINDERradiusBottom = 80;	//radio de la parte inferior del cilindro
	var CYLINDERheigth = 400;	//altura del cilindro
	var CYLINDERradioSegments = 32; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
	var CYLINDERheigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
	var CYLINDERopenEnded = false;	//en off el cilindro en hueco
	var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
	var circleCylinder = 6.3; //grados que abarca el cilindro (360, solo 180...)

	var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
	brazo_d = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
		brazo_d.castShadow = true;	//emitir sombras
		brazo_d.receiveShadow = true;	//recibir sombras
		brazo_d.position.set(250,-75,0);	//position del objeto(x,y,z)
		//90ºx 90 ºy
		brazo_d.rotation.set(1.5707963268,0,1.5707963268);	//rotacion del objeto(x,y,z)
		brazo_d.scale.set(1,1,1);		//escala del objeto(x,y,z)
	scene.add( brazo_d );

	//BRAZO I
	var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0x31b5ff, emissive: 0x000033, specular: 0x111111, shininess: 0, metal: true, side: THREE.DoubleSide} );

	var CYLINDERradiusTop = 80; //radio de la parte superios del cilindro
	var CYLINDERradiusBottom = 80;	//radio de la parte inferior del cilindro
	var CYLINDERheigth = 400;	//altura del cilindro
	var CYLINDERradioSegments = 32; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
	var CYLINDERheigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
	var CYLINDERopenEnded = false;	//en off el cilindro en hueco
	var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
	var circleCylinder = 6.3; //grados que abarca el cilindro (360, solo 180...)

	var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
	brazo_i = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
		brazo_i.castShadow = true;	//emitir sombras
		brazo_i.receiveShadow = true;	//recibir sombras
		brazo_i.position.set(-250,-75,0);	//position del objeto(x,y,z)
		//90ºx 90 ºy
		brazo_i.rotation.set(1.5707963268,0,1.5707963268);	//rotacion del objeto(x,y,z)
		brazo_i.scale.set(1,1,1);		//escala del objeto(x,y,z)
	scene.add( brazo_i );



}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

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



		// brazo_i.rotation.y += tiltDirection_i * 0.5 * Math.PI/180;
		// if ( brazo_i.rotation.y > 30 * Math.PI/180 ) {
		// 	tiltDirection_i = -1;
		// 	brazo_i.rotation.y = 2*(30 * Math.PI/180) - brazo_i.rotation.y;
		// } else if ( brazo_i.rotation.y < -22 * Math.PI/180 ) {
		// 	tiltDirection_i = 1;
		// 	brazo_i.rotation.y = 2*(-22 * Math.PI/180) - brazo_i.rotation.y;
		// }
		//
		//
		// brazo_d.rotation.y += tiltDirection_d * 0.5 * Math.PI/180;
		// if ( brazo_d.rotation.y > 30 * Math.PI/180 ) {
		// 	tiltDirection_d = -1;
		// 	brazo_d.rotation.y = 2*(30 * Math.PI/180) - brazo_d.rotation.y;
		// } else if ( brazo_d.rotation.y < -22 * Math.PI/180 ) {
		// 	tiltDirection_d = 1;
		// 	brazo_d.rotation.y = 2*(-22 * Math.PI/180) - brazo_d.rotation.y;
		// }

		// brazo_i.rotate.y = a;
		// brazo_i.applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, a) );
		brazo_i.rotation.set(0,0,-1*(5)*meter.volume);	//rotacion del objeto(x,y,z)
		brazo_d.rotation.set(0,0,1*(5)*meter.volume);	//rotacion del objeto(x,y,z)

		// a+=0.01;

    TWEEN.update();

	render();

	//if(controls) controls.update( clock.getDelta() );
}

function render(){
	renderer.render(scene,camera);
}
