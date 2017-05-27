var aneObj = function() {
	//定义曲线坐标 start control end(sin())
	this.rootx = [];
	
	this.headx=[];
	
	this.heady=[];
	//振幅
	this.amp=[];
	
	this.alpha=0;
}

aneObj.prototype.num = 50;
aneObj.prototype.init = function() {
	//	console.log("initAne");
	for(var i = 0; i < this.num; i++) {
		this.rootx[i] = i * 16 + Math.random() * 20; //[0,1)
		this.headx[i]=this.rootx[i];
		this.heady[i]=canHeight-250+Math.random()*50;
		this.amp[i]=Math.random()*50+10;
	}
}
aneObj.prototype.draw = function() {
	this.alpha+=deltaTime*0.002;
	var l=Math.sin(this.alpha);//[-1,1]
	ctx2.save();
	ctx2.globalAlpha = 0.6;
	ctx2.strokeStyle = "#fb8ce5";
	ctx2.lineWidth = 20;
	//头部圆形
	ctx2.lineCap = "round";
	for(var i = 0; i < this.num; i++) {
		//beginPath ,moveTo,lineTo,stroke,strokeStyle,lineWidth,lineCap,globalAlpha
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i], canHeight);
		this.headx[i]=this.rootx[i]+l*this.amp[i];
		ctx2.quadraticCurveTo(this.rootx[i], canHeight -100,this.headx[i],this.heady[i]);

		ctx2.stroke();
	}
	ctx2.restore();
}