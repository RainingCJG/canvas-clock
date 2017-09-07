//文档加载完后执行
$(document).ready(function(){
	var clock = document.getElementById("clock"),
	    timer = null;  //设置定时器
	type = clock.getContext("2d");
	
	//绘制时钟
	DrawClock(clock);
	timer = setInterval(function(){
		//绘制钟表
		DrawClock(clock);
	},1000);
	
})

function DrawClock(clock){
	width = clock.width,
	heigth = clock.height;
	type.clearRect(0,0,width,heigth);
	r = clock.width/2;
	//绘制钟外表
	type.save();
	type.translate(r,r);
	type.beginPath();
	type.lineWidth = 10*width/200;
	type.arc(0,0,r-type.lineWidth/2,0,2*Math.PI,false);
	type.stroke();
	
	//绘制小时数
	var hours = [3,4,5,6,7,8,9,10,11,12,1,2];
	type.font = 18*width/200 + "px Arial";
	type.textAlign = "center";
	type.textBaseline = "middle";
	hours.forEach(function(hour,i){
		var rad = 2*Math.PI/12 * i,
		      x = Math.cos(rad) * (r-27*width/200),
		      y = Math.sin(rad) * (r-27*width/200);
		type.fillText(hour,x,y);
	});
	
	//绘制秒数
	for(var i=0; i<60; i++){
		var rad = 2*Math.PI/60 * i,
		      x = Math.cos(rad) * (r-15*width/200),
		      y = Math.sin(rad) * (r-15*width/200);
		type.beginPath();
		if(i%5 === 0){
			type.fillStyle = "#000";
		}else{
			type.fillStyle = "#ccc";
		}
		type.arc(x,y,2*width/200,0,2*Math.PI,false);
		type.fill();
	}
	
	//获取时间
	var date = new Date(),
	    hour  = date.getHours();
	    minute  = date.getMinutes();
	    second  = date.getSeconds();
	    
	//绘制时针、分针和秒针
	DrawTime(hour,minute,second);
	
	//绘制原点
	(function(){
		type.beginPath();
		type.lineWidth = 2*width/200;
		type.fillStyle = "#fff";
        type.arc(0,0,3*width/200,0,Math.PI*2,false);
		type.fill();	
		type.restore();
		
	})();
}

function DrawTime(hour,minute,second){
	//绘制时针
	(function(){
		var pad = (2*Math.PI/12)*(hour+1/60 * minute);
		type.save();
		type.beginPath();
		type.lineWidth = 4*width/200;
		type.lineCap = "round";
		type.rotate(pad);
		type.moveTo(0,10*width/200);
		type.lineTo(0,-r/2);
		type.stroke();	
		type.restore();
	})();
	
	//绘制分针
	(function(){
		var pad = (2*Math.PI/60)*minute;
		type.save();
		type.beginPath();
		type.lineWidth = 3*width/200;
		type.lineCap = "round";
		type.rotate(pad);
		type.moveTo(0,10*width/200);
		type.lineTo(0,-r+38*width/200);
		type.stroke();	
		type.restore();
	})();
	
	//绘制秒针
	(function(){
		var pad = (2*Math.PI/60)*second;
		type.save();
		type.beginPath();
		type.fillStyle = "#c14543";
		type.lineCap = "round";
		type.rotate(pad);
		type.moveTo(-2*width/200,15*width/200);
		type.lineTo(2*width/200,15*width/200);
		type.lineTo(1*width/200,-r+25*width/200);
		type.lineTo(-1*width/200,-r+25*width/200);
		type.fill();	
		type.restore();
	})();
}
