// COPIA AQUI EL CODIGO DEL OBJETO PARA RENDERIZARLO EN ESCENA
	var SKYmaterial  = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('images/skyHD.jpg'),color: 0xFFFFFF, side: THREE.DoubleSide  } );

	var asphaltTexture = THREE.ImageUtils.loadTexture( "images/asphalt2.jpg" );
		asphaltTexture.wrapS = asphaltTexture.wrapT = THREE.RepeatWrapping; 
		asphaltTexture.repeat.set( 12, 2 );	
	var roadMaterial = new THREE.MeshPhongMaterial( { map: asphaltTexture, color: 0x888888, emissive: 0x888888, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide } );

	var brickTexture = THREE.ImageUtils.loadTexture( "images/brick.jpg" );
		brickTexture.wrapS = brickTexture.wrapT = THREE.RepeatWrapping; 
		brickTexture.repeat.set( 1, 14 );
	var wallMaterial = new THREE.MeshPhongMaterial( { map: brickTexture, color: 0x888888, emissive: 0x888888, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide } );

	var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0xff0033, emissive: 0xff0000, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

	var SKYradius = 20000;
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

	var CYLINDERradiusTop = 10;
	var CYLINDERradiusBottom = 10;
	var CYLINDERheigth = 200;
	var CYLINDERradioSegments = 5;
	var CYLINDERheigthSegments = 1;
	var CYLINDERopenEnded = false;
	var circleStartCylinder = 0;
	var circleCylinder = 6.3;

	for(var a = 0; a < 8; a++){	

		var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
		var cylinder = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
			cylinder.castShadow = true;
			cylinder.receiveShadow = true;
			cylinder.position.set((400*a)-1500,100,0);
			cylinder.rotation.set(0,0,0);
			cylinder.scale.set(1,1,1);
		if(a!=3)scene.add( cylinder );

		var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
		var cylinder = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
			cylinder.castShadow = true;
			cylinder.receiveShadow = true;
			cylinder.position.set((400*a)-1500,100,-300);
			cylinder.rotation.set(0,0,0);
			cylinder.scale.set(1,1,1);
		if(a!=3)scene.add( cylinder );
	}

	for(var a = 0; a < 3; a++){	

		var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, 700, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
		var cylinder = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
			cylinder.castShadow = true;
			cylinder.receiveShadow = true;
			cylinder.position.set((1200*a)-1500,350,0);
			cylinder.rotation.set(0,0,0);
			cylinder.scale.set(1,1,1);
		if(a!=1)scene.add( cylinder );

		var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, 700, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
		var cylinder = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
			cylinder.castShadow = true;
			cylinder.receiveShadow = true;
			cylinder.position.set((1200*a)-1500,350,-300);
			cylinder.rotation.set(0,0,0);
			cylinder.scale.set(1,1,1);
		if(a!=1)scene.add( cylinder );
	}

	var PLANEmaterial = new THREE.MeshLambertMaterial( {color: 0x007700, emissive: 0x004400, specular: 0x111111 } );

	var PLANEgeometry = new THREE.PlaneGeometry( 10000, 10000, 10000 );
	var plane = new THREE.Mesh( PLANEgeometry, PLANEmaterial );
		plane.castShadow = true;
		plane.receiveShadow = true;
		plane.position.set(0,0,0);
		plane.rotation.set((3*Math.PI)/2,0,0);
		plane.scale.set(1,1,1);
	scene.add( plane );

	var xAxis = 3000;
	var yAxis = 20;
	var zAxis = 300;

	//Plane bridge

	var cubegeometry = new THREE.BoxGeometry( xAxis, yAxis, zAxis );
	var cube = new THREE.Mesh( cubegeometry, CYLINDERmaterial );
		cube.castShadow = true;
		cube.receiveShadow = true;
		cube.position.set(-100,200,-150);
		cube.rotation.set(0,0,0);
		cube.scale.set(1,1,1);
	scene.add( cube );

	//Road

	var cubegeometry = new THREE.BoxGeometry( 3000, 5, 270 );
	var cube = new THREE.Mesh( cubegeometry, roadMaterial );
		cube.castShadow = true;
		cube.receiveShadow = true;
		cube.position.set(-100,215,-150);
		cube.rotation.set(0,0,0);
		cube.scale.set(1,1,1);
	scene.add( cube );

	//portal------------------

	var cubegeometry = new THREE.BoxGeometry( 100, 1000, 100 );
	var cube = new THREE.Mesh( cubegeometry, wallMaterial );
		cube.castShadow = true;
		cube.receiveShadow = true;
		cube.position.set(-300,500,50);
		cube.rotation.set(0,0,0);
		cube.scale.set(1,1,1);
	scene.add( cube );

	var cubegeometry = new THREE.BoxGeometry( 100, 1000, 100 );
	var cube = new THREE.Mesh( cubegeometry, wallMaterial );
		cube.castShadow = true;
		cube.receiveShadow = true;
		cube.position.set(-300,500,-350);
		cube.rotation.set(0,0,0);
		cube.scale.set(1,1,1);
	scene.add( cube );

	//portal-------------------------