// COPIA AQUI EL CODIGO DEL OBJETO PARA RENDERIZARLO EN ESCENA
	
	//MATERIALS ---------------------------------
	var SKYmaterial  = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('images/skyHD.jpg'),color: 0xFFFFFF, side: THREE.DoubleSide  } );

	var asphaltTexture = THREE.ImageUtils.loadTexture( "images/asphalt2.jpg" );
		asphaltTexture.wrapS = asphaltTexture.wrapT = THREE.RepeatWrapping; 
		asphaltTexture.repeat.set( 12, 2 );	
	var roadMaterial = new THREE.MeshPhongMaterial( { map: asphaltTexture, color: 0x888888, emissive: 0x888888, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide } );

	var brickTexture = THREE.ImageUtils.loadTexture( "images/brick.jpg" );
		brickTexture.wrapS = brickTexture.wrapT = THREE.RepeatWrapping; 
		brickTexture.repeat.set( 1, 14 );
	var wallMaterial = new THREE.MeshPhongMaterial( { map: brickTexture, color: 0x888888, emissive: 0x888888, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide } );

	var grassTexture = THREE.ImageUtils.loadTexture( "images/grassHD.jpg" );
		//grassTexture.minFilter = THREE.LinearFilter;
		grassTexture.wrapS = asphaltTexture.wrapT = THREE.RepeatWrapping; 
		grassTexture.repeat.set( 12, 1 );	
	var grassMaterial = new THREE.MeshLambertMaterial( { map: grassTexture, color: 0x888888, emissive: 0x888888, specular: 0x111111 } );

	var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0xff0033, emissive: 0xff0000, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

	var metalmaterial = new THREE.MeshPhongMaterial( {color: 0x666677, emissive: 0x555588, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

	var blackmaterial = new THREE.MeshPhongMaterial( {color: 0x000000, emissive: 0x000000, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

	var glassmaterial = new THREE.MeshPhongMaterial( {color: 0x333377, emissive: 0x555588, specular: 0x111111, shininess: 100, metal: true, transparent: true, opacity: 0.5, side: THREE.DoubleSide} );

	//---------------------------------------
	//SKY -----------------------------------

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

	//--------------------------------------
	//FLOOR --------------------------------

	var PLANEgeometry = new THREE.PlaneGeometry( 10000, 10000, 10000 );
	var plane = new THREE.Mesh( PLANEgeometry, grassMaterial );
		plane.castShadow = true;
		plane.receiveShadow = true;
		plane.position.set(0,0,0);
		plane.rotation.set((3*Math.PI)/2,0,0);
		plane.scale.set(1,1,1);
	scene.add( plane );

	//-------------------------------------
	//BRIDGE PILARS---------------------

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

	//-----------------------------------------------
	//PLANE BRIDGE----------------------------------

	var xAxis = 3000;
	var yAxis = 20;
	var zAxis = 300;

	var cubegeometry = new THREE.BoxGeometry( xAxis, yAxis, zAxis );
	var cube = new THREE.Mesh( cubegeometry, CYLINDERmaterial );
		cube.castShadow = true;
		cube.receiveShadow = true;
		cube.position.set(-100,200,-150);
		cube.rotation.set(0,0,0);
		cube.scale.set(1,1,1);
	scene.add( cube );


	//---------------------------------------------
	//ROAD-----------------------------------------

	var cubegeometry = new THREE.BoxGeometry( 3000, 5, 270 );
	var cube = new THREE.Mesh( cubegeometry, roadMaterial );
		cube.castShadow = true;
		cube.receiveShadow = true;
		cube.position.set(-100,215,-150);
		cube.rotation.set(0,0,0);
		cube.scale.set(1,1,1);
	scene.add( cube );

	//---------------------------------------------
	//PORTAL---------------------------------------

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

	var DONUTradius = 100;
	var DONUTtubeWidth = 30;
	var DONUTradialSegments = 5;
	var DONUTtubularSegments = 12;
	var DONUTarcLength = 0.9;

	var DONUTgeometry = new THREE.TorusGeometry(DONUTradius, DONUTtubeWidth, DONUTradialSegments, DONUTtubularSegments, DONUTarcLength );
	var donut = new THREE.Mesh( DONUTgeometry, metalmaterial );
		donut.castShadow = true;
		donut.receiveShadow = true;
		donut.position.set(-300,465,-150);
		donut.rotation.set(0,1.6,1.1);
		donut.scale.set(4.3,4.3,1.4);
	scene.add( donut );

	//-------------------------------
	//CABLES TENDIDO ----------------
	var tendidoPoints = [
			{'first':{'x': -1500,'y': 700,'z': 0},'med':{'x': -900,'y': 500,'z': 0},'last':{'x': -300,'y': 1000,'z': 0}},
			{'first':{'x': -300,'y': 1000,'z': 0},'med':{'x': 300,'y': 500,'z': 0},'last':{'x': 900,'y': 700,'z': 0}},
			{'first':{'x': -1500,'y': 700,'z': -300},'med':{'x': -900,'y': 500,'z': -300},'last':{'x': -300,'y': 1000,'z': -300}},
			{'first':{'x': -300,'y': 1000,'z': -300},'med':{'x': 300,'y': 500,'z': -300},'last':{'x': 900,'y': 700,'z': -300}}
		]

	var tendidoHeight = [[650,600,555,515,495,500,545,615,700,800,900,1000],[900,800,700,615,545,500,495,515,555,600,650,650],[650,600,555,515,495,500,545,615,700,800,900,1000],[900,800,700,615,545,500,495,515,555,600,650,650]]
		
	var len = tendidoPoints.length;
	var numPoints = 200;	

	for(var a = 0; a<len;a++){

		var spline = new THREE.SplineCurve3([
					   new THREE.Vector3(tendidoPoints[a].first.x ,tendidoPoints[a].first.y ,tendidoPoints[a].first.z ),
					   new THREE.Vector3(tendidoPoints[a].med.x, tendidoPoints[a].med.y, tendidoPoints[a].med.z ),
					   new THREE.Vector3(tendidoPoints[a].last.x ,tendidoPoints[a].last.y ,tendidoPoints[a].last.z )
					]);

		var geometry3 = new THREE.Geometry();

		var material3 = new THREE.LineBasicMaterial({
			    color: 0xff0000,
			    transparent:true,
				opacity: 1,
			    //linewidth: Math.floor((Math.random() * 30) + 1)*10*e,
	            linewidth: 3,
				sizeAttenuation: false,
				visible: true
			});

		var splinePoints = spline.getPoints(numPoints);

		for(var o = 0; o < splinePoints.length; o++){
			    geometry3.vertices.push(splinePoints[o]);  
			}	

		var line2 = new THREE.Line(geometry3, material3);
		scene.add(line2)
		for(var e = 0; e < 11; e++){

			var linematerial = new THREE.LineBasicMaterial({
				color: 0x444444
			});

			var linegeometry = new THREE.Geometry();
			linegeometry.vertices.push(
				new THREE.Vector3( (tendidoPoints[a].first.x+100)+(100*e), 200, tendidoPoints[a].first.z ),
				new THREE.Vector3( (tendidoPoints[a].first.x+100)+(100*e), tendidoHeight[a][e], tendidoPoints[a].first.z )
			);

			var line = new THREE.Line( linegeometry, linematerial );
			scene.add( line );
		}
	}
		
	//CABLES TENDIDO --------------------------------
	//BARANDILLAS -----------------------------------
		var cubegeometry = new THREE.BoxGeometry( 3000, 50, 3 );
		var cube = new THREE.Mesh( cubegeometry, glassmaterial );
			cube.castShadow = true;
			cube.receiveShadow = true;
			cube.position.set(-100,230,0);
			cube.rotation.set(0,0,0);
			cube.scale.set(1,1,1);
		scene.add( cube );

		var cubegeometry = new THREE.BoxGeometry( 3000, 50, 3 );
		var cube = new THREE.Mesh( cubegeometry, glassmaterial );
			cube.castShadow = true;
			cube.receiveShadow = true;
			cube.position.set(-100,230,-300);
			cube.rotation.set(0,0,0);
			cube.scale.set(1,1,1);
		scene.add( cube );

		var CYLINDERradiusTop = 4;
		var CYLINDERradiusBottom = 4;
		var CYLINDERheigth = 50;
		var CYLINDERradioSegments = 4;
		var CYLINDERheigthSegments = 1;
		var CYLINDERopenEnded = false;
		var circleStartCylinder = 0;
		var circleCylinder = 6.3;

		for(var i = 0; i<30; i++){
			var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
			var cylinder = new THREE.Mesh( CYLINDERgeometry, blackmaterial );
				cylinder.castShadow = true;
				cylinder.receiveShadow = true;
				cylinder.position.set((-1500+(100*i)),230,0);
				cylinder.rotation.set(0,0,0);
				cylinder.scale.set(1,1,1);
			scene.add( cylinder );
			var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
			var cylinder = new THREE.Mesh( CYLINDERgeometry, blackmaterial );
				cylinder.castShadow = true;
				cylinder.receiveShadow = true;
				cylinder.position.set((-1500+(100*i)),230,-300);
				cylinder.rotation.set(0,0,0);
				cylinder.scale.set(1,1,1);
			scene.add( cylinder );
		}


	//BARANDILLAS -----------------------------------