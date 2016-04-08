window.onload=function(){
	$("#tag").onkeypress=(function(){
		var queue=new Queue("tagContainer","data",10);
		return function(e){
			tagkeyPress(e,queue);
		};
	})();
	$("#tag").onblur=function(){
		$("#tag").value="";
	}
	$("#hobbyOk").onclick=(function(){
		var queue=new Queue("hobbyContainer","hobby",10);
		return function(){
			hobby(queue);
		};
	})();
}

function $(str){
	return document.querySelector(str);
}
//Tag输入框事件处理函数
function tagkeyPress(e,queue){
	if(e.keyCode==13||e.charCode==32||e.charCode==44){
		var text=$("#tag").value;
		var result=text.split(/[ ,]+/g).filter(function(d){return d != '';});
		result.forEach(function(value){
			if(queue.arr.indexOf(value)==-1){
				queue.push(value);
				queue.render();
			}
		});
	}
}
//hobby处理
function hobby(queue){
	var text=$("#hobby").value;
	var result=text.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/g).filter(function(d){return d != '';});
	result.forEach(function(value){
			if(queue.arr.indexOf(value)==-1){
				queue.push(value);
				queue.render();
			}
		});
}

function Queue(parentId,style,len){
	this.parentId=parentId;
	this.cssStyle=style;
	this.len=len;
	this.arr=[];
	this.push=function(str){
		this.arr.push(str);
		if(this.arr.length>10){
			this.arr.shift();
		}
	}
	this.remove=function(i){
		this.arr.splice(i,1);
		this.render();
	}
	this.render=function(){
		var result="";
		var parent=$("#"+this.parentId);
		cssStyle=this.cssStyle;
		this.arr.map(function(value){
			result+="<div title=\""+value+"\" class=\""+cssStyle+"\">"+value+"</div>";
		});
		parent.innerHTML=result;
		this.bind(this);
	}
	this.bind=function(queue){
		var block=document.querySelectorAll("."+queue.cssStyle);
		for (var i = block.length - 1; i >= 0; i--) {
			block[i].index=i;
			block[i].onmouseover=function(){
				block[this.index].style.background="red";
				block[this.index].innerHTML="点击删除:"+block[this.index].innerHTML;
			}
			block[i].onmouseout=function(){
				block[this.index].style=queue.cssStyle;
				block[this.index].innerHTML=block[this.index].innerHTML.slice(5);
			}
			block[i].onclick=function(){
				queue.remove(this.index);
			}
		};
	}
	
}
