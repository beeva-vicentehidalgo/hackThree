//-----------------MATERIAL FOR OBJECTS --------

var material = new THREE.MeshPhongMaterial( { color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide } );
var material = new THREE.MeshLambertMaterial({ color: 0x0033ff, emissive: 0x000033, specular: 0x111111 });
var material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );

var Texture = THREE.ImageUtils.loadTexture( "images/moon.jpg" );
	Texture.wrapS = asphaltTexture.wrapT = THREE.RepeatWrapping; 
	Texture.repeat.set( 12, 2 );	
var material = new THREE.MeshPhongMaterial( { map: Texture,color: 0x888888, emissive: 0x888888, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide } );

var Texture = THREE.ImageUtils.loadTexture( "images/moon.jpg" );
	Texture.wrapS = asphaltTexture.wrapT = THREE.RepeatWrapping; 
	Texture.repeat.set( 12, 2 );
var material = new THREE.MeshBasicMaterial( { map: Texture,color: 0xFFFFFF, side: THREE.DoubleSide  } );

//----------------------------------------------
//------------MULTIPLE TEXTURE------------------

var material1 = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/moon.jpg') } );
var material2 = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/ice.jpg') } );
var material3 = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/paint.jpg') } );
var material4 = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/sand.jpg') } );
var material5 = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/trees.jpg') } );
var material6 = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/wood.jpg') } );
 
var materials = [material1, material2, material3, material4, material5, material6];
  
var meshFaceMaterial = new THREE.MeshFaceMaterial( materials );

//----------------------------------------------
//-------------SKY-------------------------------

var SKYmaterial  = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('images/skyHD.jpg'),color: 0xFFFFFF, side: THREE.DoubleSide  } );

var SKYradius = 50000;
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

var xAxis = 1000;
var yAxis = 1000;
var zAxis = 1000;

var cubegeometry = new THREE.BoxGeometry( xAxis, yAxis, zAxis );
var cube = new THREE.Mesh( cubegeometry, CUBEmaterial );
	cube.castShadow = true;
	cube.receiveShadow = true;
	cube.position.set(0,0,0);
	cube.rotation.set(0,0,0);
	cube.scale.set(1,1,1);
scene.add( cube );

//-----------------------------------------------	
//-------------CIRCLE----------------------------

var CIRCLEmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var circleradius = 5;
var circlesegments = 32;
var circleStartAngle = 0;
var circleAngle = 6.3;

var circleGeometry = new THREE.CircleGeometry( circleradius, circlesegments, circleStartAngle, circleAngle );
var circle = new THREE.Mesh( circleGeometry, CIRCLEmaterial );
	circle.castShadow = true;
	circle.receiveShadow = true;
	circle.position.set(0,0,0);
	circle.rotation.set(0,0,0);
	circle.scale.set(1,1,1);
scene.add( circle );

//-----------------------------------------------
//----------------CIRCUNFERENCE------------------

var CIRCUNFERENCEmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var CIRCUNFERENCEinnerRadius = 100;
var CIRCUNFERENCEouterRadius = 550;
var CIRCUNFERENCESegments = 32;
var CIRCUNFERENCEangleStart = 0;
var CIRCUNFERENCEangleLenght = 6.3;

var CIRCUNFERENCEgeometry = new THREE.RingGeometry( CIRCUNFERENCEinnerRadius, CIRCUNFERENCEouterRadius, CIRCUNFERENCESegments, 2,CIRCUNFERENCEangleStart, CIRCUNFERENCEangleLenght );
var circunference = new THREE.Mesh( CIRCUNFERENCEgeometry, CIRCUNFERENCEmaterial );
	circunference.castShadow = true;
	circunference.receiveShadow = true;
	circunference.position.set(0,0,0);
	circunference.rotation.set(0,0,0);
	circunference.scale.set(1,1,1);
scene.add( circunference );

//------------------------------------------------
//--------------DONUT 3D--------------------------

var DONUTmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var DONUTradius = 100;
var DONUTtubeWidth = 30;
var DONUTradialSegments = 16;
var DONUTtubularSegments = 100;
var DONUTarcLength = 6.3;

var DONUTgeometry = new THREE.TorusGeometry(DONUTradius, DONUTtubeWidth, DONUTradialSegments, DONUTtubularSegments, DONUTarcLength );
var donut = new THREE.Mesh( DONUTgeometry, DONUTmaterial );
	donut.castShadow = true;
	donut.receiveShadow = true;
	donut.position.set(0,0,0);
	donut.rotation.set(0,0,0);
	donut.scale.set(1,1,1);
scene.add( donut );

//-------------------------------------------------	
//--------------CYLINDER---------------------------

var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var CYLINDERradiusTop = 150;
var CYLINDERradiusBottom = 150;
var CYLINDERheigth = 700;
var CYLINDERradioSegments = 32;
var CYLINDERheigthSegments = 1;
var CYLINDERopenEnded = false;
var circleStartCylinder = 0;
var circleCylinder = 6.3;

var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
var cylinder = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
	cylinder.castShadow = true;
	cylinder.receiveShadow = true;
	cylinder.position.set(0,0,0);
	cylinder.rotation.set(0,0,0);
	cylinder.scale.set(1,1,1);
scene.add( cylinder );

//-----------------------------------------------
//-----------------PLANE-------------------------

var PLANEmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var PLANEgeometry = new THREE.PlaneGeometry( 1000, 1000, 1400 );
var plane = new THREE.Mesh( PLANEgeometry, PLANEmaterial );
	plane.castShadow = true;
	plane.receiveShadow = true;
	plane.position.set(0,0,0);
	plane.rotation.set(0,0,0);
	plane.scale.set(1,1,1);
scene.add( plane );

//-----------------------------------------------
//---------------SPHERE--------------------------

var SPHEREmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var SPHEREradius = 500;
var SPHEREwidthSegments = 32;
var SPHEREheigthSegments = 32;
var SPHEREangleStart = 0;
var SPHEREangleLenght = 6.3;

var SPHEREgeometry = new THREE.SphereGeometry( SPHEREradius, SPHEREwidthSegments, SPHEREheigthSegments, SPHEREangleStart, SPHEREangleLenght );
var sphere = new THREE.Mesh( SPHEREgeometry, SPHEREmaterial );
	sphere.castShadow = true;
	sphere.receiveShadow = true;
	sphere.position.set(0,0,0);
	sphere.rotation.set(0,0,0);
	sphere.scale.set(1,1,1);
scene.add( sphere );

//-----------------------------------------------