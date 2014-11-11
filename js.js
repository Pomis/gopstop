document.getElementById("st_money").innerHTML=3000;
document.getElementById("st_hp").innerHTML=100;





function tmpl(str){
    var fn = new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +

            // Introduce the data as local variables using with(){}
            "with(obj){p.push('" + document.getElementById(str).innerHTML
            .replace(/[\r\t\n]/g, " ")
            .split("<%").join(    "\t")
            .replace(/((^|%>)[^\t]*)'/g, "$1\r")
            .replace(/\t=(.*?)%>/g, "',$1,'")
            .split("\t").join("');")
            .split("%>").join(" p.push('")
            .split("\r").join("\\'") + "');} return p.join('');");
    return fn
}

audiojs.events.ready(function() {
    var as = audiojs.createAll();
});


function teleport(elem){
    var money = parseFloat(document.getElementById("st_money").innerHTML);
    if (money>=150){
        var top = parseFloat(elem.offsetTop)
        var left = parseFloat(elem.offsetLeft)
        document.getElementById("car").style.top=top-50+'px';
        document.getElementById("car").style.left=left+'px';
        document.getElementById("actions").style.bottom='-100px';
        setTimeout('document.getElementById("actions").style.bottom="0px"',2000);
        setTimeout('clearActionList()',2000)
        addMoney(-150);
        if (elem.id=="shop")
        {
            setTimeout('getInShop()',2000);
        }
        else if (elem.id=="hospital")
        {
            setTimeout('getInHospital()',2000);
        }
        else if (elem.id=="home")
        {
            setTimeout('getInHome()',2000);
        }

    }
}
function HealBy(heal, cost){
    var money = parseFloat(document.getElementById("st_money").innerHTML);
    heal = parseFloat(heal);
    if (money>=cost){
        addMoney(-cost)
        var hp = document.getElementById("st_hp").innerHTML;
        if (hp+heal>100){document.getElementById("st_hp").innerHTML=100;}else{
            addHP(heal);
        }
    }
}


function clearActionList(){
    document.getElementById('actions').innerHTML = "";
}
function getInShop(){
    document.getElementById('actions').innerHTML +=tmpl('arrLi')({
        arrLi:"Купить выпивки",
        cli:"addMoney(-50)",
        cost:"50₽"})
    document.getElementById('actions').innerHTML +=tmpl('arrLi')({
        arrLi:"Купить яблоки",
        cli:"addMoney(-80)",
        cost:"80₽"})
    document.getElementById('actions').innerHTML +=tmpl('arrLi')({
        arrLi:"Купить стол из Икеи",
        cli:"addMoney(-4000)",
        cost:"4000₽"})
    document.getElementById('actions').innerHTML +=tmpl('arrLi')({
        arrLi:"Поработать чуток",
        cli:"addMoney(100)",
        cost:"+100₽"})
}
function getInHome(){
    document.getElementById('actions').innerHTML +=tmpl('arrLi')({
        arrLi:"Поиграть с котом",
        cli:"",
        cost:""})
    document.getElementById('actions').innerHTML +=tmpl('arrLi')({
        arrLi:"Принять душ",
        cli:"",
        cost:""})
    document.getElementById('actions').innerHTML +=tmpl('arrLi')({
        arrLi:"Позвонить в Америку",
        cli:"addMoney(-100)",
        cost:"100₽"})
    document.getElementById('actions').innerHTML +=tmpl('arrLi')({
        arrLi:"Позвонить в Казахстан",
        cli:"addMoney(-30)",
        cost:"30₽"})
    document.getElementById('actions').innerHTML +=tmpl('arrLi')({
        arrLi:"Покушать",
        cli:"",
        cost:""})
}
function getInHospital(){
    document.getElementById('actions').innerHTML +=tmpl('arrLi')({
        arrLi:"Пройти курс уринотерапии",
        cli:"HealBy(5,500)",
        cost:"500₽"})
    document.getElementById('actions').innerHTML +=tmpl('arrLi')({
        arrLi:"Сделать ненужную операцию",
        cli:"HealBy(-50,3500)",
        cost:"3500₽"})
}

function createGop(){
    var money = parseFloat(document.getElementById("st_money").innerHTML);
    if (money>=1000)
    {
        document.getElementById("st_money").innerHTML = money - 1000;
        var Gop = new Audio("gop.mp3");
        Gop.play();
        document.getElementById('gop-container').innerHTML+='<img src="gop.png" width="70" height="100"/>';
    }
}

function addMoney(amount){
    var money = parseFloat(document.getElementById("st_money").innerHTML);
    document.getElementById("st_money").innerHTML=money+amount;
}
function addHP(amount){
    var hp = parseFloat(document.getElementById("st_hp").innerHTML);
    document.getElementById("st_hp").innerHTML=hp+amount;
}

function startTime(){
    var tm=new Date();
    var h=tm.getHours();
    var m=tm.getMinutes();
    var s=tm.getSeconds();
    m=checkTime(m);
    s=checkTime(s);
    document.getElementById('st_time').innerHTML=h+":"+m+":"+s;
    t=setTimeout('startTime()',500);
}
function TimingMoney(){
    addMoney(9);
    setTimeout('TimingMoney()',800);
}
function TimingHP(){
    addHP(-1);
    setTimeout('TimingHP()',1800);
}

function checkTime(i)
{
    if (i<10)
    {
        i="0" + i;
    }
    return i;
}
startTime()
TimingMoney()
TimingHP()
getInHome()

document.getElementById('home').innerHTML +=tmpl('arrLi')({
    arrLi:"Заказать такси домой",
    cli:"teleport(document.getElementById('home'))",
    cost:"150₽"})
document.getElementById('home').innerHTML +=tmpl('arrLi')({arrLi:"Отправить СМСку маме", cli:"z(this)", cost:"1₽"})

document.getElementById('shop').innerHTML +=tmpl('arrLi')({
    arrLi:"Заказать такси в магазин «Урожай»",
    cli:"teleport(document.getElementById('shop'))",
    cost:"150₽"})
document.getElementById('shop').innerHTML +=tmpl('arrLi')({arrLi:"Натравить гопоту на магазин",cli:"createGop()", cost:"1000₽"})
document.getElementById('shop').innerHTML +=tmpl('arrLi')({arrLi:"Сообщить о нарушении санитарных норм",cli:"z(this)", cost:"5000₽"})

document.getElementById('hospital').innerHTML +=tmpl('arrLi')({
    arrLi:"Заказать такси в больничный корабль",
    cli:"teleport(document.getElementById('hospital'))",
    cost:"150₽"})