var fruitObj = function() {
	this.alive = [];
	this.x = [];
	this.y = [];
	this.aneNo=[];
	this.l = [];
	//成长和飘的速度
	this.spd = [];
	this.fruitType=[];
	this.orange = new Image();
	this.blue = new Image();
}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function() {
	for(var i = 0; i < this.num; i++) {
		this.alive[i] = true;
		this.x[i] = 0;
		this.y[i] = 0;
		this.aneNo[i]=0;
		this.spd[i] = Math.random() * 0.017 + 0.003; //[0.003,0.02)
//		this.born(i);
		this.fruitType[i]="";
		
		
	}
	this.orange.src = "./img/fruit.png";
	this.blue.src = "./img/blue.png";
}
fruitObj.prototype.draw = function() {
		for(var i = 0; i < this.num; i++) {
			//find grow flyup
			if(this.alive[i]) {
				
				if(this.fruitType[i]=="blue")
				{
					var pic=this.blue;
				}else{
					var pic=this.orange;
				}
				
				//grow
				if(this.l[i] <= 15) {
					var No=this.aneNo[i];
					this.x[i]=ane.headx[No];
					this.y[i]=ane.heady[No];
					this.l[i] += this.spd[i] * deltaTime;
				} else {
					this.y[i] -= this.spd[i] * 7 * deltaTime;
					
				}
				ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
				if(this.y[i] < 10) {
					this.alive[i] = false;
				}
			}

		}
	}
	//所有果实出生
fruitObj.prototype.born = function(i) {
	this.aneNo[i] = Math.floor(Math.random() * ane.num);
	this.l[i] = 0;
	this.alive[i]=true;
	var ran=Math.random();
	//控制蓝色果实
	if(ran<0.2){
	this.fruitType[i]="blue";
	}else{
		this.fruitType[i]="orange";
	}
}

fruitObj.prototype.dead=function(i){
	this.alive[i]=false;
}

fruitObj.prototype.update = function() {
	var num = 0;
	for(var i = 0; i < this.num; i++) {
		if(this.alive[i]) num++;
	}
}

function fruitMonitor(){
	var num=0;
	for (var i=0;i<fruit.num;i++) {
		if(fruit.alive[i]) num++;
	}
	if(num<15)
	{
		sendFruit();
		return;
	}
}
function sendFruit()
{
	for (var i=0;i<fruit.num;i++) {
		if(!fruit.alive[i])
		{
			fruit.born(i);
			return;
		}
	}
}
