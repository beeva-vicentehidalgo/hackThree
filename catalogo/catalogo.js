
var camera, scene, renderer, mesh, mouse, controls,
	width = window.innerWidth, 
	height = window.innerHeight;

var clock = new THREE.Clock();
var mouse = new THREE.Vector2();

var current = new THREE.Object3D();
	
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

	var container = document.getElementById('muestra');
	container.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera( 50, (width/height), 0.1, 10000000 );
	camera.position.set( 1500, 1500, 1500 );

	mouse = new THREE.Vector2();

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.enableDamping = true;
	controls.dampingFactor = 0.25;
	controls.enableZoom = true;
	controls.target.set( 0,0,0 );

	buildObjects();

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

function buildMaterials(){

		var letters = [
				{'text': 'Basic', 'x': -1800, 'y': 300,'z': 0},
				{'text': 'Lambert', 'x': -800, 'y': 300,'z': 0},
				{'text': 'Phong', 'x': 200, 'y': 300,'z': 0}
			]

		for(var o = 0; o<letters.length; o++){
			var spritey = makeTextSprite( letters[o].text, 
				{ 
					fontsize: 40, 
					borderColor: {r:255, g:0, b:0, a:0}, 
					backgroundColor: {r:255, g:255, b:255, a:0}, 
					color: '#ffffff',
					scale: { x: 600, y: 500 } 
				});
			spritey.position.set(letters[o].x,letters[o].y,letters[o].z);
			current.add( spritey );			
		}

		//-----------------------------------------------
		// ----------------CUBE-------------------------

		var DONUTmaterial = new THREE.MeshBasicMaterial( {color: 0x0033ff, transparent: true, opacity: 1, side: THREE.DoubleSide} );

		var DONUTradius = 250; //radio del anillo
		var DONUTtubeWidth = 60;	//ancho del anillo
		var DONUTradialSegments = 16;	//segmentos usados para dibujar el anillo
		var DONUTtubularSegments = 100;	//segmentos utilizados para dibujar el tubo que forma el anillo
		var DONUTarcLength = 6.3;	//grados que abarca el anillo(360, solo 180...)

		var DONUTgeometry = new THREE.TorusGeometry(DONUTradius, DONUTtubeWidth, DONUTradialSegments, DONUTtubularSegments, DONUTarcLength );
		var donut = new THREE.Mesh( DONUTgeometry, DONUTmaterial );
			donut.position.set(-2000,0,0);	//position del objeto(x,y,z)
			donut.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
			donut.scale.set(1,1,1);		//escala del objeto(x,y,z)
		current.add( donut );

		var DONUTmaterial = new THREE.MeshLambertMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, transparent: true, opacity: 1, side: THREE.DoubleSide} );

		var DONUTradius = 250; //radio del anillo
		var DONUTtubeWidth = 60;	//ancho del anillo
		var DONUTradialSegments = 16;	//segmentos usados para dibujar el anillo
		var DONUTtubularSegments = 100;	//segmentos utilizados para dibujar el tubo que forma el anillo
		var DONUTarcLength = 6.3;	//grados que abarca el anillo(360, solo 180...)

		var DONUTgeometry = new THREE.TorusGeometry(DONUTradius, DONUTtubeWidth, DONUTradialSegments, DONUTtubularSegments, DONUTarcLength );
		var donut = new THREE.Mesh( DONUTgeometry, DONUTmaterial );
			donut.position.set(-1000,0,0);	//position del objeto(x,y,z)
			donut.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
			donut.scale.set(1,1,1);		//escala del objeto(x,y,z)
		current.add( donut );

		var DONUTmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

		var DONUTradius = 250; //radio del anillo
		var DONUTtubeWidth = 60;	//ancho del anillo
		var DONUTradialSegments = 16;	//segmentos usados para dibujar el anillo
		var DONUTtubularSegments = 100;	//segmentos utilizados para dibujar el tubo que forma el anillo
		var DONUTarcLength = 6.3;	//grados que abarca el anillo(360, solo 180...)

		var DONUTgeometry = new THREE.TorusGeometry(DONUTradius, DONUTtubeWidth, DONUTradialSegments, DONUTtubularSegments, DONUTarcLength );
		var donut = new THREE.Mesh( DONUTgeometry, DONUTmaterial );
			donut.position.set(0,0,0);	//position del objeto(x,y,z)
			donut.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
			donut.scale.set(1,1,1);		//escala del objeto(x,y,z)
		current.add( donut );

		current.name = 'materialGroup';
		scene.add(current);

}


function buildObjects(){
		var letters = [
				{'text': 'Cube', 'x': -1800, 'y': 300,'z': 0},
				{'text': 'Circle', 'x': -1300, 'y': 300,'z': 0},
				{'text': 'Circunference', 'x': -700, 'y': 300,'z': 0},
				{'text': 'Donut', 'x': 200, 'y': 300,'z': 0},
				{'text': 'Spline', 'x': 900, 'y': 300,'z': 0},
				{'text': 'Cylinder', 'x': -1900, 'y': -700,'z': 0},
				{'text': 'Plane', 'x': -1200, 'y': -700,'z': 0},
				{'text': 'sphere', 'x': -500, 'y': -700,'z': 0},
				{'text': 'Line', 'x': 500, 'y': -700,'z': 0}
			]

		for(var o = 0; o<letters.length; o++){
			var spritey = makeTextSprite( letters[o].text, 
				{ 
					fontsize: 40, 
					borderColor: {r:255, g:0, b:0, a:0}, 
					backgroundColor: {r:255, g:255, b:255, a:0}, 
					color: '#ffffff',
					scale: { x: 600, y: 500 } 
				});
			spritey.position.set(letters[o].x,letters[o].y,letters[o].z);
			current.add( spritey );			
		}

		//-----------------------------------------------
		// ----------------CUBE-------------------------

		var CUBEmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

		var xAxis = 300;//dimensiones x
		var yAxis = 300;//dimensiones y
		var zAxis = 300;//dimensiones z

		var cubegeometry = new THREE.BoxGeometry( xAxis, yAxis, zAxis );
		var cube = new THREE.Mesh( cubegeometry, CUBEmaterial );
			cube.castShadow = true; //emitir sombras
			cube.receiveShadow = true; //recibir sombras
			cube.position.set(-2000,0,0); //position del objeto(x,y,z)
			cube.rotation.set(0,0,0); //rotacion del objeto(x,y,z)
			cube.scale.set(1,1,1); //escala del objeto(x,y,z)
		current.add( cube );

		//-----------------------------------------------	
		//-------------CIRCLE----------------------------

		var CIRCLEmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

		var circleradius = 300; //radio del circulo
		var circlesegments = 32;	//numero de segmentos que forman el circulo
		var circleStartAngle = 0;	//angulo desde el que comienza a dibujarse el circulo
		var circleAngle = 6.3; // angulo del circulo(360, solo 180..)

		var circleGeometry = new THREE.CircleGeometry( circleradius, circlesegments, circleStartAngle, circleAngle );
		var circle = new THREE.Mesh( circleGeometry, CIRCLEmaterial );
			circle.castShadow = true; //emitir sombras
			circle.receiveShadow = true;	//recibir sombras
			circle.position.set(-1400,0,0);	//posicion del objeto(x,y,z)
			circle.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
			circle.scale.set(1,1,1);	//escala del objeto(x,y,z)
		current.add( circle );

		//-----------------------------------------------
		//----------------CIRCUNFERENCE------------------

		var CIRCUNFERENCEmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

		var CIRCUNFERENCEinnerRadius = 100; //radio de la parte interna de la circunferencia
		var CIRCUNFERENCEouterRadius = 300; //radio de la parte externa de la circunferencia, la diferencia entre ambos define el grosor
		var CIRCUNFERENCESegments = 32; //segmentos utilizados para dibujar la circunferencia
		var CIRCUNFERENCEangleStart = 0;	//angulo desde el que comienza a dibujar la circunferencia
		var CIRCUNFERENCEangleLenght = 6.3; //angulos de la circunferencia(360, solo 180...)

		var CIRCUNFERENCEgeometry = new THREE.RingGeometry( CIRCUNFERENCEinnerRadius, CIRCUNFERENCEouterRadius, CIRCUNFERENCESegments, 2,CIRCUNFERENCEangleStart, CIRCUNFERENCEangleLenght );
		var circunference = new THREE.Mesh( CIRCUNFERENCEgeometry, CIRCUNFERENCEmaterial );
			circunference.castShadow = true;	//emitir sombras
			circunference.receiveShadow = true;	//recibir sombras
			circunference.position.set(-700,0,0);	//position del objeto(x,y,z)
			circunference.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
			circunference.scale.set(1,1,1);		//escala del objeto(x,y,z)
		current.add( circunference );

		//------------------------------------------------
		//--------------DONUT 3D--------------------------

		var DONUTmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

		var DONUTradius = 250; //radio del anillo
		var DONUTtubeWidth = 60;	//ancho del anillo
		var DONUTradialSegments = 16;	//segmentos usados para dibujar el anillo
		var DONUTtubularSegments = 100;	//segmentos utilizados para dibujar el tubo que forma el anillo
		var DONUTarcLength = 6.3;	//grados que abarca el anillo(360, solo 180...)

		var DONUTgeometry = new THREE.TorusGeometry(DONUTradius, DONUTtubeWidth, DONUTradialSegments, DONUTtubularSegments, DONUTarcLength );
		var donut = new THREE.Mesh( DONUTgeometry, DONUTmaterial );
			donut.castShadow = true;	//emitir sombras
			donut.receiveShadow = true;	//recibir sombras
			donut.position.set(-0,0,0);	//position del objeto(x,y,z)
			donut.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
			donut.scale.set(1,1,1);		//escala del objeto(x,y,z)
		current.add( donut );

		//-------------------------------------------------	
		//--------------CYLINDER---------------------------

		var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

		var CYLINDERradiusTop = 150; //radio de la parte superios del cilindro
		var CYLINDERradiusBottom = 150;	//radio de la parte inferior del cilindro
		var CYLINDERheigth = 500;	//altura del cilindro
		var CYLINDERradioSegments = 32; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
		var CYLINDERheigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
		var CYLINDERopenEnded = false;	//en off el cilindro en hueco
		var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
		var circleCylinder = 6.3; //grados que abarca el cilindro (360, solo 180...)

		var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
		var cylinder = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
			cylinder.castShadow = true;	//emitir sombras
			cylinder.receiveShadow = true;	//recibir sombras
			cylinder.position.set(-2000,-1000,0);	//position del objeto(x,y,z)
			cylinder.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
			cylinder.scale.set(1,1,1);		//escala del objeto(x,y,z)
		current.add( cylinder );

		//-----------------------------------------------
		//-----------------PLANE-------------------------


		var planexAxis = 500;//dimensiones x
		var planeyAxis = 500;//dimensiones y
		var planezAxis = 500;//dimensiones z

		var PLANEmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

		var PLANEgeometry = new THREE.PlaneGeometry( planexAxis, planeyAxis, planezAxis );
		var plane = new THREE.Mesh( PLANEgeometry, PLANEmaterial );
			plane.castShadow = true;	//emitir sombras
			plane.receiveShadow = true;	//recibir sombras
			plane.position.set(-1400,-1000,0);	//position del objeto(x,y,z)
			plane.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
			plane.scale.set(1,1,1);		//escala del objeto(x,y,z)
		current.add( plane );

		//-----------------------------------------------
		//---------------SPHERE--------------------------

		var SPHEREmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

		var SPHEREradius = 300; //dimensiones de la esfera
		var SPHEREwidthSegments = 32;	//segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
		var SPHEREheigthSegments = 32;	////segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
		var SPHEREangleStart = 0; //grado desde el que empieza a dibujar la pared de la espera
		var SPHEREangleLenght = 6.3; //grados que abarca la esfera (360, solo 180...)

		var SPHEREgeometry = new THREE.SphereGeometry( SPHEREradius, SPHEREwidthSegments, SPHEREheigthSegments, SPHEREangleStart, SPHEREangleLenght );
		var sphere = new THREE.Mesh( SPHEREgeometry, SPHEREmaterial );
			sphere.castShadow = true;	//emitir sombras
			sphere.receiveShadow = true;	//recibir sombras
			sphere.position.set(-700,-1000,0);	//position del objeto(x,y,z)
			sphere.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
			sphere.scale.set(1,1,1);	//escala del objeto(x,y,z)
		current.add( sphere );	

		//-----------------------------------------------
		//----------curve lines--------------------------------

		var numPoints = 200;

		var spline = new THREE.SplineCurve3([
					   new THREE.Vector3(500 ,300 ,0 ), //punto de inicio de la curva
					   new THREE.Vector3(800,-200,0 ), //punto medio de la curva
					   new THREE.Vector3(1100,300,0) //punto final de la curva
				]);

		var geometryspline = new THREE.Geometry();

		var materialspline = new THREE.LineBasicMaterial({
			    color: 0xff5500,
			    transparent:true,
				opacity: 0.8,
		        linewidth: 2, //ancho de la linea
				sizeAttenuation: false,
				visible: true
			});

		var splinePoints = spline.getPoints(numPoints);

		for(var o = 0; o < splinePoints.length; o++){
			    geometryspline.vertices.push(splinePoints[o]);  
			}	

		var linespline = new THREE.Line(geometryspline, materialspline);

		current.add(linespline)

		//------------------------------------------------
		//----------line----------------------------------

		var lineMaterial = new THREE.LineBasicMaterial({
			color: 0x0000ff,
			    transparent:true,
				opacity: 0.8,
		        linewidth: 2, //ancho de la linea
				sizeAttenuation: false,
				visible: true
		});

		var lineGeometry = new THREE.Geometry();
			lineGeometry.vertices.push(
				new THREE.Vector3( 0, -1200, 0 ), //punto inicial de la linea
				new THREE.Vector3( 1000, -700, 0 ) //punto final de la linea
			);

		var line = new THREE.Line( lineGeometry, lineMaterial );
		current.add( line );

		//-----------------------------------------------
		current.name = 'muestrasGroup';
		scene.add(current)

}

function makeTextSprite( message, parameters )
{
    console.log('make text sprite: ', message, parameters);
	if ( parameters === undefined ) parameters = {};
	
	var fontface = parameters.hasOwnProperty("fontface") ? 
		parameters["fontface"] : "Arial";
	
	var fontsize = parameters.hasOwnProperty("fontsize") ? 
		parameters["fontsize"] : 18;
	
	var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
		parameters["borderThickness"] : 4;
	
	var borderColor = parameters.hasOwnProperty("borderColor") ?
		parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
	
	var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
		parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };

    var color = parameters.color;    

	/*var Color = parameters.hasOwnProperty("color") ?
		parameters["color"] : { r:255, g:255, b:255, a:1.0 };*/	

	var spriteAlignment = THREE.SpriteAlignment;
		
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	context.font = "Bold " + fontsize + "px " + fontface;
    
	// get size data (height depends only on font size)
	var metrics = context.measureText( message );
	var textWidth = metrics.width;
	
	// background color
	context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
								  + backgroundColor.b + "," + backgroundColor.a + ")";
	// border color
	context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
								  + borderColor.b + "," + borderColor.a + ")";

	context.lineWidth = borderThickness;
	roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
	// 1.4 is extra height factor for text below baseline: g,j,p,q.
	
	// text color
	context.fillStyle = parameters.color;

	context.fillText( message, borderThickness, fontsize + borderThickness);
	
	// canvas contents will be used for a texture
	var texture = new THREE.Texture(canvas) 
	texture.needsUpdate = true;

	var spriteMaterial = new THREE.SpriteMaterial( 
		{ map: texture, useScreenCoordinates: false, alignment: spriteAlignment } );
	var sprite = new THREE.Sprite( spriteMaterial );
	sprite.scale.set(parameters.scale.x,parameters.scale.y,4.0);
	return sprite;	
}

// function for drawing rounded rectangles
function roundRect(ctx, x, y, w, h, r) 
{
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    ctx.fill();
	ctx.stroke();   
}

function legendSystem(spriteDatas){
	var length = spriteDatas.length;

	for(var a = 0; a<length; a++){
		var spritey = makeTextSprite( spriteDatas[a].text, 
			{ 
				fontsize: spriteDatas[a].fontSize, 
				borderColor: {r:255, g:0, b:0, a:0}, 
				backgroundColor: {r:spriteDatas[a].bgColor.r, g:spriteDatas[a].bgColor.g, b:spriteDatas[a].bgColor.b, a:spriteDatas[a].bgColor.a}, 
				color: spriteDatas[a].color,
				scale: spriteDatas[a].scale 
			});
		spritey.position.set(spriteDatas[a].x,spriteDatas[a].y,spriteDatas[a].z);
		legendGroup.add( spritey );
		}
	scene.add(legendGroup);	    
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

function removeObject(){
	if(current.children.length > 0){
		for( var i = current.children.length - 1; i >= 0; i--) { 
			current.remove(current.children[i]);
		}
		scene.remove(current);
	}
}

$('#objects').click(function(){
	removeObject();
	buildObjects();

})
$('#materials').click(function(){
	removeObject();
	buildMaterials();
})

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
