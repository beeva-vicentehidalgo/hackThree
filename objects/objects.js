
//-------------CIELO-------------------------------

var SKYmaterial  = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('images/skyHD.jpg'),color: 0xFFFFFF, side: THREE.DoubleSide  } );

var SKYradius = 50000; //dimensiones del cielo
var SKYwidthSegments = 32;
var SKYheigthSegments = 32;
var SKYangleStart = 0;
var SKYangleLenght = 6.3;

var SKYgeometry = new THREE.SphereGeometry( SKYradius, SKYwidthSegments, SKYheigthSegments, SKYangleStart, SKYangleLenght );
var sky = new THREE.Mesh( SKYgeometry, SKYmaterial );
	sky.position.set(0,0,0);
	sky.rotation.set(0,0,0);
	sky.scale.set(1,1,1);
scene.add( sky );

//-----------------------------------------------
// ----------------CUBE-------------------------

var CUBEmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var xAxis = 1000;//dimensiones x
var yAxis = 1000;//dimensiones y
var zAxis = 1000;//dimensiones z

var cubegeometry = new THREE.BoxGeometry( xAxis, yAxis, zAxis );
var cube = new THREE.Mesh( cubegeometry, CUBEmaterial );
	cube.castShadow = true; //emitir sombras
	cube.receiveShadow = true; //recibir sombras
	cube.position.set(0,0,0); //position del objeto(x,y,z)
	cube.rotation.set(0,0,0); //rotacion del objeto(x,y,z)
	cube.scale.set(1,1,1); //escala del objeto(x,y,z)
scene.add( cube );

//-----------------------------------------------	
//-------------CIRCLE----------------------------

var CIRCLEmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var circleradius = 5; //radio del circulo
var circlesegments = 32;	//numero de segmentos que forman el circulo
var circleStartAngle = 0;	//angulo desde el que comienza a dibujarse el circulo
var circleAngle = 6.3; // angulo del circulo(360, solo 180..)

var circleGeometry = new THREE.CircleGeometry( circleradius, circlesegments, circleStartAngle, circleAngle );
var circle = new THREE.Mesh( circleGeometry, CIRCLEmaterial );
	circle.castShadow = true; //emitir sombras
	circle.receiveShadow = true;	//recibir sombras
	circle.position.set(0,0,0);	//posicion del objeto(x,y,z)
	circle.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	circle.scale.set(1,1,1);	//escala del objeto(x,y,z)
scene.add( circle );

//-----------------------------------------------
//----------------CIRCUNFERENCE------------------

var CIRCUNFERENCEmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var CIRCUNFERENCEinnerRadius = 100; //radio de la parte interna de la circunferencia
var CIRCUNFERENCEouterRadius = 550; //radio de la parte externa de la circunferencia, la diferencia entre ambos define el grosor
var CIRCUNFERENCESegments = 32; //segmentos utilizados para dibujar la circunferencia
var CIRCUNFERENCEangleStart = 0;	//angulo desde el que comienza a dibujar la circunferencia
var CIRCUNFERENCEangleLenght = 6.3; //angulos de la circunferencia(360, solo 180...)

var CIRCUNFERENCEgeometry = new THREE.RingGeometry( CIRCUNFERENCEinnerRadius, CIRCUNFERENCEouterRadius, CIRCUNFERENCESegments, 2,CIRCUNFERENCEangleStart, CIRCUNFERENCEangleLenght );
var circunference = new THREE.Mesh( CIRCUNFERENCEgeometry, CIRCUNFERENCEmaterial );
	circunference.castShadow = true;	//emitir sombras
	circunference.receiveShadow = true;	//recibir sombras
	circunference.position.set(0,0,0);	//position del objeto(x,y,z)
	circunference.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	circunference.scale.set(1,1,1);		//escala del objeto(x,y,z)
scene.add( circunference );

//------------------------------------------------
//--------------DONUT 3D--------------------------

var DONUTmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var DONUTradius = 100; //radio del anillo
var DONUTtubeWidth = 30;	//ancho del anillo
var DONUTradialSegments = 16;	//segmentos usados para dibujar el anillo
var DONUTtubularSegments = 100;	//segmentos utilizados para dibujar el tubo que forma el anillo
var DONUTarcLength = 6.3;	//grados que abarca el anillo(360, solo 180...)

var DONUTgeometry = new THREE.TorusGeometry(DONUTradius, DONUTtubeWidth, DONUTradialSegments, DONUTtubularSegments, DONUTarcLength );
var donut = new THREE.Mesh( DONUTgeometry, DONUTmaterial );
	donut.castShadow = true;	//emitir sombras
	donut.receiveShadow = true;	//recibir sombras
	donut.position.set(0,0,0);	//position del objeto(x,y,z)
	donut.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	donut.scale.set(1,1,1);		//escala del objeto(x,y,z)
scene.add( donut );

//-------------------------------------------------	
//--------------CYLINDER---------------------------

var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var CYLINDERradiusTop = 150; //radio de la parte superios del cilindro
var CYLINDERradiusBottom = 150;	//radio de la parte inferior del cilindro
var CYLINDERheigth = 700;	//altura del cilindro
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

//-----------------------------------------------
//-----------------PLANE-------------------------

var planexAxis = 300;//dimensiones x
var planeyAxis = 300;//dimensiones y
var planezAxis = 300;//dimensiones z

var PLANEmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var PLANEgeometry = new THREE.PlaneGeometry( planexAxis, planeyAxis, planezAxis );
var plane = new THREE.Mesh( PLANEgeometry, PLANEmaterial );
	plane.castShadow = true;	//emitir sombras
	plane.receiveShadow = true;	//recibir sombras
	plane.position.set(-1400,-1000,0);	//position del objeto(x,y,z)
	plane.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	plane.scale.set(1,1,1);		//escala del objeto(x,y,z)
scene.add( plane );

//-----------------------------------------------
//---------------SPHERE--------------------------

var SPHEREmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var SPHEREradius = 500; //dimensiones de la esfera
var SPHEREwidthSegments = 32;	//segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
var SPHEREheigthSegments = 32;	////segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
var SPHEREangleStart = 0; //grado desde el que empieza a dibujar la pared de la espera
var SPHEREangleLenght = 6.3; //grados que abarca la esfera (360, solo 180...)

var SPHEREgeometry = new THREE.SphereGeometry( SPHEREradius, SPHEREwidthSegments, SPHEREheigthSegments, SPHEREangleStart, SPHEREangleLenght );
var sphere = new THREE.Mesh( SPHEREgeometry, SPHEREmaterial );
	sphere.castShadow = true;	//emitir sombras
	sphere.receiveShadow = true;	//recibir sombras
	sphere.position.set(0,0,0);	//position del objeto(x,y,z)
	sphere.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	sphere.scale.set(1,1,1);	//escala del objeto(x,y,z)
scene.add( sphere );	

//-----------------------------------------------
//----------curve lines--------------------------------

var numPoints = 200;

var spline = new THREE.SplineCurve3([
			   new THREE.Vector3(0 ,200 ,0 ), //punto de inicio de la curva
			   new THREE.Vector3(200,100,0 ), //punto medio de la curva
			   new THREE.Vector3(400,200,0) //punto final de la curva
		]);

var geometryspline = new THREE.Geometry();

var materialspline = new THREE.LineBasicMaterial({
	    color: 0xff5500,
	    transparent:true,
		opacity: 0.8,
        linewidth: 1, //ancho de la linea
		sizeAttenuation: false,
		visible: true
	});

var splinePoints = spline.getPoints(numPoints);

for(var o = 0; o < splinePoints.length; o++){
	    geometryspline.vertices.push(splinePoints[o]);  
	}	

var linespline = new THREE.Line(geometryspline, materialspline);

scene.add(linespline)

//------------------------------------------------
//----------line----------------------------------

var lineMaterial = new THREE.LineBasicMaterial({
			color: 0x0000ff,
		    transparent:true,
			opacity: 1,
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
scene.add( line );

//-----------------------------------------------