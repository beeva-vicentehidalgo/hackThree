//-----------------MATERIAL FOR OBJECTS --------

var material = new THREE.MeshPhongMaterial( { color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, transparent: true, opacity: 1, side: THREE.DoubleSide } ); //Material con reflejos y sombras

var material = new THREE.MeshLambertMaterial({ color: 0x0033ff, emissive: 0x000033, specular: 0x111111, transparent: true, opacity: 1 }); //material con sombras

var material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide, transparent: true, opacity: 1 } ); //material plano

//material con textura y reflejos
var Texture = THREE.ImageUtils.loadTexture( "images/moon.jpg" );
	Texture.wrapS = asphaltTexture.wrapT = THREE.RepeatWrapping; 
	Texture.repeat.set( 12, 2 );	
var material = new THREE.MeshPhongMaterial( { map: Texture,color: 0x888888, emissive: 0x888888, specular: 0x111111, shininess: 100, metal: true, transparent: true, opacity: 1, side: THREE.DoubleSide } );

//material con textura sin reflejos
var Texture = THREE.ImageUtils.loadTexture( "images/moon.jpg" );
	Texture.wrapS = asphaltTexture.wrapT = THREE.RepeatWrapping; 
	Texture.repeat.set( 12, 2 );
var material = new THREE.MeshBasicMaterial( { map: Texture,color: 0xFFFFFF, side: THREE.DoubleSide, transparent: true, opacity: 1  } );

//----------------------------------------------
//------------MULTIPLE TEXTURE------------------

//texturas o colores diferentes para cada una de las caras
var material1 = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/moon.jpg') } );
var material2 = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/ice.jpg') } );
var material3 = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/paint.jpg') } );
var material4 = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/sand.jpg') } );
var material5 = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/trees.jpg') } );
var material6 = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/wood.jpg') } );
 
var materials = [material1, material2, material3, material4, material5, material6];
  
var meshFaceMaterial = new THREE.MeshFaceMaterial( materials );

//----------------------------------------------