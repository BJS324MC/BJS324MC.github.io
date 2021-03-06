class BQuery {
    constructor(a) {
        if (typeof a === "function") return window.addEventListener('load', a);
        this.element = (typeof a === "string") ? document.querySelectorAll(a).length > 1 ? document.querySelectorAll(a) : document.querySelector(a) : a;
        try{this.type = this.element.nodeType === 1 ? "element" : "collection"}catch(err){this.type = "error"};
    }
    attr(attr, val) {
        if (val != null){if(this.type === "collection" )for (let ele of this.element) ele.setAttribute(attr, val);if(this.type === "element" )this.element.setAttribute(attr, val);};
        val = [];
        if(this.type === "element" )return this.element.getAttribute(attr);
        if(this.type === "collection" )for (let ele of this.element) val.push(ele.getAttribute(attr));
        return val;
    }
    html(val) {
        if (val != null){if(this.type === "collection" )for (let ele of this.element) ele.innerHTML = val;if(this.type === "element" )this.element.innerHTML = val;};
        val = [];
        if(this.type === "element" )return this.element.innerHTML;
        if(this.type === "collection" )for (let ele of this.element) val.push(ele.innerHTML);
        return val;
    }
    text(val) {
        if (val != null){if(this.type === "collection" )for (let ele of this.element) ele.textContent = val;if(this.type === "element" )this.element.textContent = val;};
        val = [];
        if(this.type === "element" )return this.element.textContent;
        if(this.type === "collection" )for (let ele of this.element) val.push(ele.textContent);
        return val;
    }
    children() {
        let children = [], arr = [];
        if(this.type === "collection" )for (let ele of this.element) for (let E of ele.children) children.push(S(E));
        if(this.type === "element" )for(let E of this.element.children)children.push(S(E));
        return children;
    }
    append(html) {
        if(this.type === "collection" )for (let ele of this.element) ele.innerHTML += html;
        if(this.type === "element" )this.element.innerHTML += html;
        return html;
    }
    prepend(html) {
        if(this.type === "collection" )for (let ele of this.element) ele.innerHTML = html + ele.innerHTML;
        if(this.type === "element" )this.element.innerHTML = html + this.element.innerHTML;
        return html;
    }
    remove(filter = e => true) {
        if(this.type === "collection" )for (let ele of this.element) if (filter(ele)) ele.remove();
        if(this.type === "element" )if (filter(this.element)) this.element.remove();
    }
    on(e, f) {
        if(this.type === "element" )this.element.addEventListener(e, f);
        if(this.type === "collection" )for (let ele of this.element) ele.addEventListener(e, f);
        return S(this.element);
    }
    click(f) {
        if(this.type === "element" )this.element.addEventListener('click', f);
        if(this.type === "collection" )for (let ele of this.element) ele.addEventListener('click', f);
        return S(this.element);
    }
    hover(f, g) {
        if(this.type === "element" )this.element.addEventListener('mouseenter', f);
        if(this.type === "element" )this.element.addEventListener('mouseout', g);
        if(this.type === "collection" )for (let ele of this.element) ele.addEventListener('mouseenter', f);
        if(this.type === "collection" )for (let ele of this.element) ele.addEventListener('mouseout', g);
        return S(this.element);
    }
    off(f) {
        if(this.type === "element" )this.element.removeEventListener('mouseout', f);
        if(this.type === "collection" )for (let ele of this.element) ele.addEventListener('mouseout', f);
        return S(this.element);
    }
    hide() {
        if(this.type === "element" )this.element.style.display = 'none';
        if(this.type === "collection" )for (let ele of this.element) ele.style.display = 'none';
    }
    show() {
        if(this.type === "element" )this.element.style.display = 'block';
        if(this.type === "collection" )for (let ele of this.element) ele.style.display = 'block';
    }
    toggle() {
        if(this.type === "element" )this.element.style.display = this.element.style.display == 'none' ? 'block' : 'none';
        if(this.type === "collection" )for (let ele of this.element) ele.style.display = ele.style.display == 'none' ? 'block' : 'none';
        return S(this.element);
    }
    css(sel, v) {
        if (typeof sel === "object") {
            if(this.type === "element" )for (let i in sel)this.element.style[i] = sel[i];
            if(this.type === "collection" )for (let ele of this.element) for (let i in sel) ele.style[i] = sel[i];
        } else if (sel && v) {
            if(this.type === "element" )this.element.style[sel] = v;
            if(this.type === "collection" )for (let ele of this.element) ele.style[sel] = v;
        };
        v = [];
        if(this.type === "element" )return getComputedStyle(this.element);
        if(this.type === "collection" )for (let ele of this.element) v.push(getComputedStyle(ele));
        return v;
    }
    filter(f) {
        let fill = [];
        for (let ele of this.element) if (f(ele)) fill.push(S(ele));
        return fill;
    }
};
const S=(a)=>new BQuery(a);
class Graph{
    constructor(f=x=>x,start=-100,end=100,step=1,ctx,x=window.innerWidth/2,y=window.innerHeight/2){
        this.xVals=range(start,end,step);
        this.yVals=[];
        this.f=f;
        this.centerX=x;
        this.centerY=y;
        this.ctx=ctx;
        for(let x in this.xVals)this.yVals.push(f(x));
    }
    static map(ctx,xpos=window.innerWidth/2,ypos=window.innerHeight/2,size=20){
        ctx.beginPath();
        ctx.moveTo(0,ypos);
        ctx.lineTo(window.innerWidth,ypos);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(xpos,0);
        ctx.lineTo(xpos,window.innerHeight);
        ctx.stroke();
        ctx.strokeStyle='grey';
        for(let i=xpos;i<=window.innerWidth;i+=size){
            ctx.beginPath();
            ctx.moveTo(i,0);
            ctx.lineTo(i,window.innerHeight);
            ctx.stroke();
        };
        for(let j=ypos;j<=window.innerHeight;j+=size){
            ctx.beginPath();
            ctx.moveTo(0,j);
            ctx.lineTo(window.innerWidth,j);
            ctx.stroke();
        };
        for(let k=xpos;k>=0;k-=size){
            ctx.beginPath();
            ctx.moveTo(k,0);
            ctx.lineTo(k,window.innerHeight);
            ctx.stroke();
        };
        for(let l=ypos;l>=0;l-=size){
            ctx.beginPath();
            ctx.moveTo(0,l);
            ctx.lineTo(window.innerWidth,l);
            ctx.stroke();
        };
    }
    map(ctx=this.ctx,xpos=this.centerX,ypos=this.centerY,size=20){
        ctx.beginPath();
        ctx.moveTo(0,ypos);
        ctx.lineTo(window.innerWidth,ypos);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(xpos,0);
        ctx.lineTo(xpos,window.innerHeight);
        ctx.stroke();
        ctx.strokeStyle='green';
        for(let i=xpos;i<=window.innerWidth;i+=size){
            ctx.beginPath();
            ctx.moveTo(i,0);
            ctx.lineTo(i,window.innerHeight);
            ctx.stroke();
        };
        for(let j=ypos;j<=window.innerHeight;j+=size){
            ctx.beginPath();
            ctx.moveTo(0,j);
            ctx.lineTo(window.innerWidth,j);
            ctx.stroke();
        };
        for(let k=xpos;k>=0;k-=size){
            ctx.beginPath();
            ctx.moveTo(k,0);
            ctx.lineTo(k,window.innerHeight);
            ctx.stroke();
        };
        for(let l=ypos;l>=0;l-=size){
            ctx.beginPath();
            ctx.moveTo(0,l);
            ctx.lineTo(window.innerWidth,l);
            ctx.stroke();
        };
    }
    display(color='black',size=20,ctx=this.ctx){
        ctx.beginPath();
        let pev=ctx.strokeStyle;
        ctx.strokeStyle=color;
        ctx.moveTo(this.centerX + this.yVals[0]*size,this.centerY - this.f(this.yVals[0]) * size);
        for(let y in this.xVals)ctx.lineTo(this.centerX + y * size,this.centerY - this.f(y) * size);
        ctx.stroke();
        ctx.strokeStyle=pev;
        ctx.beginPath();
    }
    static draw(ctx,s=-100,e=100,p=n=>n,t=1,color='black',wd=20,xpos=window.innerWidth/2,ypos=window.innerHeight/2){
        ctx.beginPath();
        let pev=ctx.strokeStyle;
        ctx.strokeStyle=color;
        ctx.moveTo(s*wd+xpos,ypos-p(s)*wd);
        for(;s<e;s+=t)ctx.lineTo(xpos+s*wd,ypos-p(s)*wd);
        ctx.stroke();
        ctx.strokeStyle=pev;
    };
    regraph(f=x=>x,x=window.innerWidth/2,y=window.innerHeight/2,start=-100,end=100,step=1){
        this.xVals=range(start,end,step);
        this.yVals=[];
        this.f=f;
        this.centerX=x;
        this.centerY=y;
        for(let x of this.xVals)this.yVals.push(f(x));
    }
};
var range = (s=0,e=null,p=1) => {
	let list={};
	if(e === null){e=s;s=0;};
	for(;s<e;s+=p){
		list[s]=s;
	};
	return list;
};
var map = (f,...l) => {
	let lens=[],arr=[];
	for(let s of l)lens.push(s.length);
	for(let a=0;a<Math.min(...lens);a++){
		let arrl=[];
		for(let i of l)arrl.push(i[a]);
		arr.push(f(...arrl));
	};
	return arr;
};
var zip = (...l) => {
	let lens=[],arr=[];
	for(let s of l)lens.push(s.length);
	for(let a=0;a<Math.min(...lens);a++){
		let arrl=[];
		for(let i of l)arrl.push(i[a]);
		arr.push(arrl);
	};
	return arr;
};
var filter = (f,a) => {
	let arr=[];
	for(let i of a){
		if(f(i))arr.push(i);
	};
	return arr;
};
var enumerate = l => {
	let arr=[];
	for(let a in l)arr.push([a,l[a]]);
	return arr;
};
var bin = n => {
	let a="",b=true;
	while(b){
		if(n==1)b=false;
		a=n%2+a;
		n=(n-(n%2))/2;
	};
	return "0b"+a;
};
var hex = n => {
	let a="",b=true,t={10:"a",11:"b",12:"c",13:"d",14:"e",15:"f"};
	while(b){
		a=(n%16>9) ? t[n%16]+a : n%16+a;
		n=(n-(n%16))/16;
		if(n==0)b=false;
	};
	return "0x"+a;
};
var oct = n => {
	let a="",b=true;
	while(b){
		a=n%8+a;
		n=(n-(n%8))/8;
		if(n==0)b=false;
	};
	return "0o"+a;
};
var all = l => {
	for(let i of l) if(!i)return false;
	return true;
};
var any = l => {
	for(let i of l) if(i)return true;
	return false;
};
Number.prototype.qot=function(d){return (this.valueOf()-(this.valueOf()%d))/d;};
var rad=d=>d*(Math.PI/180);
var deg=r=>r*(180/Math.PI);
var divmod = (a,b) => [(a-(a%b))/b,a%b];
var sum = a => {let c=0;for(let i of a)c+=i;return c;};
var input=prompt;
var print=p=>console.log(p);
var len=p=>p.length;
var chr=String.fromCharCode;
var ord=p=>p.charCodeAt(0);
var str=String;
var int=parseInt;
var float=parseFloat;
var type=p=>typeof p;
var math=Math;
var {max,min,abs,pow,round,sqrt,sin,cos,acos,asin,tan,atan,atan2,random}=Math;
const intRandom=(s,e)=>Math.floor(Math.random()*e)+s;
const uniform=(s,e)=>Math.random()*e+s;
const calculate=(func=x=>x*x,number=randint(1,1000),min=0,max=null,iter=10000)=>{
    max = number==0 ? 100 : max==null ? number : max;
    for ( let _ in range(iter) ){
        if (min <-10 && iter>3)return 'Unable to solve without complex numbers...';
        if (func(max)<number) max+=10;
        if (func(min)>number) min-=10;
        ran=uniform(min,max);
        if (func(ran)==number) return ran;
        if (func(ran)<number) min=ran;
        if (func(ran)>number) max=ran;
        print(min,max,ran);
    };
    return ran;
};
const summation=(p1,p2,p=n=>n,t=1,obj=false)=>{
    lis=[];
    while (p1<=p2){
        obj ? lis.push({p1:p(p1)}) : lis.push(p(p1));
        p1+=t;
    };
    return lis;
};
const addOnCtx=ctx=>{
    ctx.fillArc=(x=0,y=0,color="black",diameter=10,startAngle=0,endAngle=Math.PI*2)=>{
        ctx.beginPath();
        ctx.fillStyle=color;
        ctx.arc(x,y,diameter,startAngle,endAngle);
        ctx.fill();
    };
    ctx.strokeArc=(x=0,y=0,color="black",diameter=10,startAngle=0,endAngle=Math.PI*2)=>{
        ctx.beginPath();
        ctx.fillStyle=color;
        ctx.arc(x,y,diameter,startAngle,endAngle);
        ctx.stroke();
    };
};
const hasCollided=(obj1,obj2)=>{if(obj1.x<(obj2.x+obj2.width) && (obj1.x+obj1.width)>obj2.x && obj1.y < (obj2.y+obj2.height) && (obj1.y+obj1.height)>obj2.y){return true}else{return false}};
const blockIn = (n,box) => {if(n.x >= (box.x+box.width-n.width)){n.x = (box.x+box.width-n.width)}else if(n.y >= (box.y+box.height-n.height)){n.y = (box.y+box.height-n.height)}else if(n.x <= box.x){n.x = box.x}else if(n.y <= box.y){n.y = box.y}};
const getDeviceType = () => {const ua = navigator.userAgent;if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {return "tablet";}if (/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {return "mobile";}return "desktop";};
const angleOff=(ia,sa)=>(sa*2-ia)>=360 ? (sa*2-ia)-360:(sa*2-ia)<0 ? (sa*2-ia)+360:(sa*2-ia);
Array.prototype.random=function(){let arr=this.valueOf();return arr[Math.floor(Math.random()*(arr.length-1))];};
const arrRandom=arr=>arr[Math.floor(Math.random()*(arr.length-1))];
const hexRandom=()=>{let h=hex(intRandom(0,254))+hex(intRandom(0,254))+hex(intRandom(0,254));h=h.replace(/0x/g,'');return "#"+h;};
const getArr=iter=>{let arr=[];for(let i of iter)arr.push(i);return arr;};
Object.values=obj=>{let arr=[];for(let i of Object.keys(obj))arr.push(i);return arr;};
S(()=>{
    for(let C of S('dropdown').children())C.remove(e=>e.tagName!='ITEM'&&e.tagName!='DROPDOWN');
    if(S('dropdown').type === "collection" )for(let c of S('dropdown').element)for(let v of c.childNodes)v.nodeValue='';
    if(S('dropdown').type === "element" )for(let v of S('dropdown').element.childNodes)v.nodeValue='';
    S('dropdown').prepend(S('dropdown').attr('value'));
    S('dropdown').css({background:'grey',display:'block',textAlign:'center'});
    S('item').css({background:'lightgrey',border:'none',display:'none'});
    S('dropdown').click(()=>S('item',true).toggle());
});
