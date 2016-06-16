var dialog;
var reply1;
var reply2;
var reply3;
var s;
var background;
var interval = null;
var count = 0;
var temp;
var dnum=0;
var roleimg;
var em=0;
var user = localStorage.getItem("UserName");

//宿舍劇情
var dom = {  s1: [
        { dia: [ {d: "身為大一新生的你，立刻體驗到了第一次住宿舍，你的室友都很友善。"},
            {d: "室友：欸，我們班上要打籃球新生盃，你要不要參加啊？聽說班上的女生都會來看喔～"}],
         r1: "走啊！打球啊～有妹當然要去啊！", r2: "不要，我要打ＬＯＬ！", r3: "" },
         {r1:"baseket", r2:"loser", r3: ""},
         {img: "desktop.jpg",role: "li.png"},
         {name: "dom"}   
    ]   
};

//籃球場劇情
var baseket = { s1: [
    {dia: [ {d: "你參加了籃球新生盃，和室友組隊打贏了一場比賽。這時，女生加油群中，走來了一位清純可愛的妹子，幫你們遞水。你會怎麼做？"}],
         r1: "跟他聊天", r2: "沈默以對", r3: "道謝，默默記下對方名字" },
         {r1:"bchat", r2:"loser", r3: "hchat"},
         {img: "baseketball.jpg"},
         {name: "baseket"} 
  
    ]};

//籃球場聊天劇情
var bchat = { s1: [
    {dia: [{d: "你以籃球為話題，開啟了你們的第一次對話，你們天南地北的聊著天，愈聊愈感覺到你跟這個女生很合得來，跟他聊天你覺得很開心，這時你們的話題剛好聊到明天早八的必修課。"},
           {d: "可愛妹子：蛤～我很會賴床，好怕我明天睡過頭遲到喔"}],
         r1: "我可以叫你起床，順便一起吃早餐啊 哈哈", r2: "我覺得我也起不來耶！ 應該會蹺課吧！", r3: "" },
         {r1:"brakfast", r2:"loser", r3: ""},
         {img: "baseketball.jpg",role: "chen1.png"}, 
         {name: "bchat"} 
    ]
};

//家中聊天劇情
var hchat = {s1:[
    {dia: [{d:"回到家，你加了對方好友，並且開始聊天，你們天南地北的聊著天，愈聊愈感覺到你跟這個女生很合得來，跟他聊天你覺得很開心，這時你們的話題剛好聊到明天早八的必修課。"},
            {d:"可愛妹子：蛤～我很會賴床，好怕我明天睡過頭遲到喔"}],
         r1: "我可以叫你起床順便一起吃早餐啊 哈哈", r2: "我覺得我也起不來耶！ 一起蹺課吧！ 哈哈", r3: "" },
         {r1:"brakfast", r2:"loser", r3: ""},
         {img: "desktop.jpg", role: "chen1.png"},
         {name: "hchat"}   
    ]
};

//早餐店劇情
var brakfast = {s1:[
     {dia: [{d:"今天早上，你很難得的沒有賴床，並且打電話給可愛妹子，約了早餐約會，之後你們一起享用了美好的早餐，結帳的時候，你會"}],
         r1: "各付各的", r2: "幫他付", r3: "說你沒錢" },
         {r1:"emergency", r2:"movie", r3: "loser"},
         {img: "breakfast.jpg"},
         {name: "brakfast"} 
]};

//電影劇情
var movie = {s1:[
    {dia: [{d:"經過上次美好得早餐約會後，你和可愛妹子幾乎每晚都在聊ＦＢ，並且感情越來愈曖昧，於是你鼓起勇氣約了他出來看電影，妹子害羞地答應了。電影當天，你在家裡準備出門，這時你會："}],
    r1: "精心打扮，並約好去載他", r2: "穿的跟平常一樣，並約在電影院見", r3: "你根本忘記這場約會了" },
    {r1:"love1", r2:"love2", r3: "loser"},
    {img: "desktop.jpg"},
    {name: "movie"}
]};

//緊急事件
var emergency = {s1:[
    {dia: [{d:"緊急狀況！！！"},{d:"室友情敵出現了！！"}],
    r1: "打敗室友", r2: "讓給室友", r3: "" },
    {r1:"play", r2:"loser", r3: ""},
    {img: "breakfast.jpg", role: "li.png"},
    {name: "emergency"}

]};
var play = { name: "play"};
//剛開始初始畫面
var drama1 = { 
    con: [{c: "你是今年剛入學的海大一年級新生"},
           {c: "對著大學生活有著非常美好的嚮往"},
           {c: "尤其還是個戀愛經驗為0的肥宅"},
           {c: "於是你立下了目標"},
           {c: "在大學這四年裡"},
           {c: "我"},{c: "要"},{c: "交"},{c: "女"},{c: "朋"},{c: "友!!!"}],
    point: "1"
};

//告白1
var love1 = {
    con: [{c:"看過電影之後"},
          {c:"你們的感情愈來愈曖昧了"},
          {c:"每次約她出去"},
          {c:"你們的感情就愈來愈好"},
          {c:"這時你覺得時機差不多了"},
          {c:"決定約她到海提對他告白"},
          {c:"當你說出“我喜歡你”的瞬間"},
          {c:"你感覺到你的心臟劇烈地跳動"},
          {c:"單身20年來，從沒這麼緊張過"},
          {c:"這時，她開口了..."}],
    point: "2",
    img: "seawall.jpg"
};

//告白2
var love2 = {
    con: [{c:"看過電影之後"},
          {c:"你們的感情愈來愈曖昧了"},
          {c:"每次約她出去"},
          {c:"你們的感情就愈來愈好"},
          {c:"這時你覺得時機差不多了"},
          {c:"決定約她到海提對他告白"},
          {c:"當你說出“我喜歡你”的瞬間"},
          {c:"你感覺到你的心臟劇烈地跳動"},
          {c:"單身20年來，從沒這麼緊張過"},
          {c:"這時，她開口了..."}],
    point: "3",
    img: "seawall.jpg"

};

//魯蛇結局
var loser = {
    con: [{c:"你只是個肥宅"},
          {c:"當你按下這個選項的時候，就註定你還是個魯蛇"},
          {c:"你到底會不會追女生啊？"},
          {c:"你的人生不要跟你的程式作業一樣失敗"},
          {c:"加油！"},
          {c:"好嗎？"}],
    point: "0",
    img: "black.jpg"
};

function changeSence(scene){
    interval = window.clearInterval(interval);
    //dialog.innerHTML = scene.s1[0].dia[0].d;
    
    dialog.innerHTML = "";
    count = 0;

    $( "#r1" ).hide( "fade" );
    $( "#r2" ).hide( "fade" );
    $( "#r3" ).hide( "fade" );
    $( "#s" ).hide( "fade" );
    $( "#dialog" ).show( "fade" );
    $( "#role" ).hide( "fade" );
    $( "#em" ).hide( "fade" );
    $("#play").hide("fade");
    $("#down").hide("fade");
    
    if(scene.name == "play"){
        $("#down").show("fade");
        $( "#dialog" ).hide( "fade" );
        $("#play").show("fade");
    }else{
        if(scene.s1[3].name == "emergency"){$( "#em" ).show( "shake" );}
        if(scene.s1[1].r1 == "loser"){
            reply1.setAttribute("onclick", "ending(loser)");
        }else if(scene.s1[1].r1 == "love1"){
            reply1.setAttribute("onclick", "ending(love1)");
        }else{
            reply1.setAttribute("onclick", "changeSence("+scene.s1[1].r1+")");
        }

        if(scene.s1[1].r2 == "loser"){
            reply2.setAttribute("onclick", "ending(loser)");
        }else if(scene.s1[1].r2 == "love2"){
            reply2.setAttribute("onclick", "ending(love2)");
        }else{
            reply2.setAttribute("onclick", "changeSence("+scene.s1[1].r2+")");
        }

        if(scene.s1[1].r3 == "loser"){
            reply3.setAttribute("onclick", "ending(loser)");
        }else{
            reply3.setAttribute("onclick", "changeSence("+scene.s1[1].r3+")");
        }
        


        //$("body").css("background","url(pic/"+scene.s1[2].img+")").css("background-size","cover");
        background.setAttribute("style","background: url(pic/"+scene.s1[2].img+"); background-size:cover; background-repeat:no-repeat;");
        //background.style.background-size = "cover";
        temp = scene;
        interval = window.setInterval( "runWord(temp,1)", 100 );
    }
    
}

//結局選項
function ending(scene){
    interval = window.clearInterval(interval);
    $( "#r1" ).hide( "fade" );
    $( "#r2" ).hide( "fade" );
    $( "#r3" ).hide( "fade" );
    $( "#s" ).hide( "fade" );
    $( "#dialog" ).hide( "fade" );
    $( "#role" ).hide( "fade" );

    
    background.setAttribute("style","background: url(pic/"+scene.img+"); background-size:cover; background-repeat:no-repeat;");

    dialog.innerHTML = "";
    s.innerHTML = "";
    count = 0;
    temp = scene;
    if(scene.point == "0"){
        interval = window.setInterval( "loserRun()", 800 );
    }else{
        interval = window.setInterval( "runWord(temp,0)", 1000 );
    }
    
}

//loser劇情
function loserRun(){
    if(count == temp.con.length){
        count = 0;
        background.setAttribute("style","background: url(pic/loser.jpg); background-position:50% 50%;");
        $( "#home" ).show( "fade" );
        interval = window.clearInterval(interval);
    }else{
        newNode = document.createElement( "div" );
        var rx = Math.floor((Math.random() * 50) + 20);
        var ry = Math.floor((Math.random() * 50) + 20);
        var nodeID = "node" + count;
        newNode.setAttribute("id", nodeID);
        newNode.setAttribute("style","position: absolute; bottom:"+rx+"%; right:"+ry+"%; font-size: "+count*20+"px; color: Red;");
        newNode.appendChild( document.createTextNode( temp.con[count].c ) );
        document.body.appendChild(newNode);
        count++;
    }
    
}

function runWord(scene,chioce){
    if(chioce == 0){
        //中間面板
        
        s.setAttribute("style", "");
        if(count==scene.con.length){
            count=0;
            interval = window.clearInterval(interval);
            if(scene.point!="1"){
                $( "#s" ).hide( "fade" );
                $( "#dialog" ).hide( "fade" );
                $( "#ans" ).show( "fade" );
                roleimg.setAttribute("src","pic/chen.png");
                $( "#role" ).show( "fade" );
                if(scene.point == "2"){
                    $( "#ans" )[0].innerHTML = "好啊~（害羞）";
                    $( "#ans" ).show( "fade" );
                    $("#ans").bind("click",function(){
                        alert(user+"獲得女朋友！");
                        $( "#role" ).hide( "fade" );
                        $( "#ans" ).hide( "fade" );
                        $( "#home" ).show( "fade" );

                    });
                    
                }else if(scene.point== "3"){
                    $( "#ans" )[0].innerHTML = "我們還是當朋友吧～";
                    $( "#ans" ).show( "fade" );
                    $("#ans").bind("click",function(){
                        document.getElementById("em").setAttribute("src","pic/fail.jpg");
                        $( "#em" ).show( "shake" );
                        $( "#role" ).hide( "fade" );
                        $( "#ans" ).hide( "fade" );
                        $( "#home" ).show( "fade" );

                    });
                   
                }
            }
            
        }else{
            s.innerHTML += scene.con[count].c+"<br><br>";
            count++;
        }
    }else{
        //選擇題
        if(count == scene.s1[0].dia[dnum].d.length){
            //只有一個劇情或劇情跑完
            if(scene.s1[0].dia.length == 1 || dnum == 1){
                dnum = 0;
                count = 0;
                interval = window.clearInterval(interval);
                reply1.value = scene.s1[0].r1;
                reply2.value = scene.s1[0].r2;
                reply3.value = scene.s1[0].r3;

                $( "#em" ).hide( "fade" );
                $( "#r1" ).show( "fade" );
                $( "#r2" ).show( "fade" );
                if(scene.s1[1].r3==""){
                    $( "#r3" ).hide( "fade" );
                }else{
                     $( "#r3" ).show( "fade" );
                }
            }else{ //跳出角色圖片對話
                dialog.setAttribute("onclick","rolecome()");
            }
        }else{
            dialog.innerHTML += scene.s1[0].dia[dnum].d[count];
            count++;
        }
    }
    
}

function rolecome()
{
    count=0;
    dnum++;
    dialog.innerHTML = "";
    roleimg.setAttribute("src","pic/"+temp.s1[2].role);
    $( "#role" ).show( "fade" );
    dialog.setAttribute("onclick","");
}

function s(){
  	dialog = document.getElementById("dialog");
    s = document.getElementById("s");
    reply1 = document.getElementById("r1");
    reply2 = document.getElementById("r2");
    reply3 = document.getElementById("r3");
    roleimg = document.getElementById("role");
    background = document.body;
    
    interval = window.setInterval( "runWord(drama1,0)", 1000 );
}


window.addEventListener( "load", s, false );