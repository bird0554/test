// JScript 文件
var ReturnSelectedOBJ;
function OnChanageMenuOne(obj)
{
    var oncolors="#A2B5CD";
    var offcolors="";
    if(obj==1)
    {
        $("#divjcsz").css("backgroundColor",oncolors);
        $("#divjcszchild").show();
        $("#divcbhs").css("backgroundColor",offcolors);
        $("#divcbhschild").hide();
        $("#divxtgl").css("backgroundColor",offcolors);
        $("#divxtglchild").hide();
        $("#divbz").css("backgroundColor",offcolors);
        $("#divbzchild").hide();
    }
    else if(obj==2)
    {
        $("#divjcsz").css("backgroundColor",offcolors);
        $("#divjcszchild").hide();
        $("#divcbhs").css("backgroundColor",oncolors);
        $("#divcbhschild").show();
        $("#divxtgl").css("backgroundColor",offcolors);
        $("#divxtglchild").hide();
        $("#divbz").css("backgroundColor",offcolors);
        $("#divbzchild").hide();
    }
     else if(obj==3)
    {
        $("#divjcsz").css("backgroundColor",offcolors);
        $("#divjcszchild").hide();
        $("#divcbhs").css("backgroundColor",offcolors);
        $("#divcbhschild").hide();
        $("#divxtgl").css("backgroundColor",oncolors);
        $("#divxtglchild").show();
        $("#divbz").css("backgroundColor",offcolors);
        $("#divbzchild").hide();
    }
     else if(obj==4)
    {
        $("#divjcsz").css("backgroundColor",offcolors);
        $("#divjcszchild").hide();
        $("#divcbhs").css("backgroundColor",offcolors);
        $("#divcbhschild").hide();
        $("#divxtgl").css("backgroundColor",offcolors);
        $("#divxtglchild").hide();
        $("#divbz").css("backgroundColor",oncolors);
        $("#divbzchild").show();
    }
}

function onmouseups(obj)
{
    obj.style.backgroundColor="#A2B5CD";
}
function onmouseouts(obj)
{
     obj.style.backgroundColor="";
}
function toOut()
{
    window.location.href="login.aspx?rnd="+Math.random();
}
function changePwd()
{
    window.showModalDialog("SYS/ChanagePwd.aspx?rnd="+Math.random());
}
//function leftchange()
//{
//    $("#tdleft").toggle();
//    if($("#ImgArrow").attr("src").indexOf("separator1.gif")>0)
//      $("#ImgArrow").attr("src","images/separator2.gif");
//    else
//      $("#ImgArrow").attr("src","images/separator1.gif");       
//}
function loadURL(url)
{
if(url!='')
    //$("#tdMain").load(url); 
    $("#ifr")[0].src=url+"?rnd="+Math.random();
    
}
function loadParURL(url)
{
    window.parent.document.getElementById("ifr").src=url+"?rnd="+Math.random();
}
function SetValues() {
    var objnulls = $("[ISNULLS=N]");
    var strnullmessage = "";
    for (i = 0; i < objnulls.length; i++) {
        if (objnulls[i].value == "") {
            strnullmessage = '"' + objnulls[i].getAttribute("ISNULLMESSAGE") + '"不能为空';
            break;
        }
    }
    obj = document.getElementsByName("readimage");
    var delid = "";
    var edtid = new Array();
    var edtobjfileds = "";
    var edtobjvalues = new Array();
    objss = $("img[name=readimage][src$='delete.gif']").parent().parent(); //删除
    for (var i = 0; i < objss.length; i++) {

        delid = delid + ',' + $("#" + objss[i].id + " td[name$=td" + $("#hidindexid").val() + "]").html();
    }
    objss = $("img[src$='edit.jpg'],img[src$='new.jpg']").parent().parent(); //新增和修改
    for (var i = 0; i < objss.length; i++) 
    {
        if (strnullmessage != "") 
        {
            alert(strnullmessage);
            return false;
        }
        var objtd = $("tr[id=" + objss[i].id + "] td");
        var objfileds = "";
        var objvalues = "";
        for (var j = 2; j < objtd.length; j++) {
            if (objtd[j].getAttribute("name") == "td" + $("#hidindexid").val())
                edtid[edtid.length] = objtd[j].innerHTML;
            else {
                var objinput = objtd[j].getElementsByTagName("input");
                if (objinput.length > 0) {
                    if (objinput[0].name.substring(0, 3) == "txt") {
                        objvalues += "|" + objinput[0].value;
                        objfileds += "," + objinput[0].name.substring(3);
                    }
                    else if (objinput[0].name.substring(0, 3) == "sel") {
                        objvalues += "|" + objinput[0].value;
                        objfileds += "," + objinput[0].name.substring(3);
                    }
                    else if (objinput[0].name.substring(0, 3) == "chk") {
                        if (objinput[0].checked)
                            objvalues += "|1";
                        else
                            objvalues += "|0";
                        objfileds += "," + objinput[0].name.substring(3);
                    } else if (objinput[0].name.substring(0, 4) == "tsel") {
//                        objvalues += "|" + objinput[0].value.split('.')[0];
                        objvalues += "|" + objinput[0].value;
                        objfileds += "," + objinput[0].name.substring(4);
                    }
                }
                else {
                    objinput = objtd[j].getElementsByTagName("select");
                    if (objinput.length > 0) {
                        objvalues += "|" + objinput[0].value;
                        objfileds += "," + objinput[0].name.substring(3);
                    }
                }
            }
        }
        if (objfileds != "") {
            edtobjfileds = objfileds.substring(1);
            edtobjvalues[edtobjvalues.length] = objvalues.substring(1);
        }
    }
    if (edtobjfileds.length > 0)
        jsUpdateData(edtid, edtobjfileds, edtobjvalues);
    if (delid != "")
        jsDeleteData(delid.substring(1));
    $("#hidcheckid").val("");
    getlist('', '', '');
    return true;
}
function SetValueHang()
{
    var obj=$("img[name='readimage'][src$='edit.jpg']");
    var objvalues="";    
    for(var i=0;i<obj.length;i++)
    {
        //var objtxt = $("tr[id='" + obj[i].parentNode.parentNode.id + "'] input");
        var objtxt = document.getElementById(obj[i].parentNode.parentNode.id).getElementsByTagName("input");
        for (var j = 1; j < objtxt.length; j++) {
            document.getElementById(obj[i].parentNode.parentNode.id)
            if(objtxt[j].value!="")
               objvalues+=","+objtxt[j].id.split('_')[1]+"|"+objtxt[j].id.split('_')[2]+"|"+objtxt[j].value;            
        }            
    }
    if(objvalues!="")
    {
        jsUpdateData(objvalues.substring(1));
    }           
    getlist('','','');
}
function onselects(obj) {
    $("tr[name^='trdata']").css("backgroundColor","");
    var trid=obj.parentNode.parentNode.id;
    $("tr[id="+trid+"]").css("backgroundColor","#33CCCC");
    $("#hidcheckid").val($("tr[id="+trid+"] td[name$=td"+$("#hidindexid").val()+"]").html());
}
//加载列表底色
function loadbgcolor() {
    $("#matable tr:odd").removeClass("trbgcolor");
    $("#matable tr:odd").addClass("trbgcolor");
}
function ToExpandAll(objlistdivid)
{
   while(true)
   {
       objexpand= $("#"+objlistdivid+" img[src$=tplus.gif]");
       if(objexpand.length==0)
          break;
       for(var i=0;i<objexpand.length;i++)
       {
           objexpand[i].onclick();
       }
   }
}
function ToExpand(obj,id)
{
    var trs;
    if(obj.src.indexOf("tminus.gif")>-1)
    {
        obj.src="../Images/Tree/tplus.gif";
        trs=$("tr");
        for(var i=0;i<trs.length;i++)
        {
            if(trs[i].id.indexOf(id)>-1&&trs[i].id!=id)
            {
               trs[i].style.display="none"; 
               var objimg=trs[i].childNodes[1].getElementsByTagName("img");
               if(objimg[objimg.length-2].src.indexOf("tminus.gif")>-1)
               {
                   objimg[objimg.length-2].src="../Images/Tree/tplus.gif";
               }
               else if(objimg[objimg.length-2].src.indexOf("lminus.gif")>-1)
               {
                   objimg[objimg.length-2].src="../Images/Tree/lplus.gif";
               }
            }
        }
    }
    else if(obj.src.indexOf("lminus.gif")>-1)
    {
        obj.src="../Images/Tree/lplus.gif";
        trs=$("tr");
        for(var i=0;i<trs.length;i++)
        {
            if(trs[i].id.indexOf(id)>-1&&trs[i].id!=id)
            {
               trs[i].style.display="none"; 
               var objimg=trs[i].childNodes[1].getElementsByTagName("img");
               if(objimg[objimg.length-2].src.indexOf("tminus.gif")>-1)
               {
                   objimg[objimg.length-2].src="../Images/Tree/tplus.gif";
               }
               else if(objimg[objimg.length-2].src.indexOf("lminus.gif")>-1)
               {
                   objimg[objimg.length-2].src="../Images/Tree/lplus.gif";
               }
            }
        } 
    }
    else if(obj.src.indexOf("lplus.gif")>-1)
    {
        obj.src="../Images/Tree/lminus.gif";
        trs=$("tr");        
        for(var i=0;i<trs.length;i++)
        {
            if(trs[i].id.indexOf(id)>-1&&trs[i].id!=id&&(trs[i].id.length-id.length)<50)
            {
               trs[i].style.display="";                
            }
        }        
    }
    else if(obj.src.indexOf("tplus.gif")>-1)
    {
    
        obj.src="../Images/Tree/tminus.gif";
        trs=$("tr");
        var istoload=true;
        for(var i=0;i<trs.length;i++)
        {
            if(trs[i].id.indexOf(id)>-1&&trs[i].id!=id&&(trs[i].id.length-id.length)<50)
            {
               trs[i].style.display=""; 
               istoload=false;
            }   
        }
        if(istoload==true)
        {
            getlist(id,$("tr[id="+id+"] td[name$=td"+$("#hidindexid").val()+"]").html(),$("tr[id="+id+"] img[src$=white.gif]").length.toString());
            trs=$("tr");
            for(var i=0;i<trs.length;i++)
            {
                if(trs[i].id.indexOf(id)>-1&&trs[i].id!=id&&(trs[i].id.length-id.length)<50)
                {
                   trs[i].style.display=""; 
                }
            } 
        }
    }
}
function Del()
{
    if($("#hidcheckid").val()!="") 
       $("tr td[name^=td"+$("#hidindexid").val()+"]").each(function(){if($(this).html()==$("#hidcheckid").val()){$("#"+ $(this).parent()[0].id+" img[name=readimage]").attr("src","../Images/Tree/delete.gif");} });
}
function Cdel()
{
   if($("#hidcheckid").val()!="") 
       $("tr td[name^=td"+$("#hidindexid").val()+"]").each(function(){if($(this).html()==$("#hidcheckid").val()){$("#"+ $(this).parent()[0].id+" img[name=readimage][src$='delete.gif']").attr("src","../Images/Tree/noexpand.gif");} });      
}
function EditDataNum(obj)
{
    obj.value=parseInt(obj.value);
    if(obj.value=='0'||isNaN(obj.value))
    obj.value=1;
    
}
function EditData(obj,flag)
{
    if(flag=="0")
    {
        if(obj.parentNode.parentNode.getElementsByTagName("img")[obj.parentNode.parentNode.getElementsByTagName("img").length-1].src.indexOf("noexpand.gif")>-1)
            obj.parentNode.parentNode.getElementsByTagName("img")[obj.parentNode.parentNode.getElementsByTagName("img").length-1].src="../Images/Tree/edit.jpg";
     }
     else if(flag=="1")
     {
        if(isNaN(obj.value))
        {
            alert("请输入数字类型数据");
            obj.value="";
            obj.focus();
        }
        else
        {
            if(obj.parentNode.parentNode.getElementsByTagName("img")[obj.parentNode.parentNode.getElementsByTagName("img").length-1].src.indexOf("noexpand.gif")>-1)
                obj.parentNode.parentNode.getElementsByTagName("img")[obj.parentNode.parentNode.getElementsByTagName("img").length-1].src="../Images/Tree/edit.jpg";
        }     
     }
     else if(flag=="2")
     {
        if(obj.value=="")
           return;
        var isdates=false;
        var d=obj.value.split('-');
        if(1<d.length&&d.length<4)
        {
            m1= parseInt(d[0]);
            m2=parseInt(d[1])
            if((!isNaN(m1))&&1000<m1<9999&&(!isNaN(m2))&&1<m1<12&&d[1].length==2)//判断年月
            {
                if(d.length==3)//判断是否带天
                {
                    m3=parseInt(d[1])
                    if(1<m3<31&&d[2].length==2)
                    {
                       isdates=true; 
                    }
                }
                else
                {
                   isdates=true;
                }
            }        
        }
        if(!isdates)
        {
            alert("请输入正确的时间格式");
            obj.value="";
            obj.focus();
        }
        else
        {
             if(obj.parentNode.parentNode.getElementsByTagName("img")[obj.parentNode.parentNode.getElementsByTagName("img").length-1].src.indexOf("noexpand.gif")>-1)
             obj.parentNode.parentNode.getElementsByTagName("img")[obj.parentNode.parentNode.getElementsByTagName("img").length-1].src="../Images/Tree/edit.jpg";
           
        } 
     }
}
function checkischecked()
{
    if($("#hidcheckid").val()=="")
    {
        alert("请选择父结点！");
        return false;
    }
    else
        return true;
}
function dy()
{
     temp=window.document.body.innerHTML;
     window.document.body.innerHTML=$("#divTreeListView table")[0].outerHTML;
     window.print();
     window.document.body.innerHTML = temp;
 }
 function selectvalues(obj, id) {
     ReturnSelectedOBJ = obj;
     window.open("ContentList.aspx?ID=" + id + "&rnd=" + Math.random(), "", "dialogWidth=675px,dialogHeight=600px,scrollbars=yes,toolbar=no,resizable=yes");
 }
 function SetObjValue(value) {
     ReturnSelectedOBJ.parentNode.childNodes[0].value = value;
     EditData(ReturnSelectedOBJ, '0');
 }
//function selectvalues(obj,id) {
//    var rtn = window.showModalDialog("ContentList.aspx?ID=" + id + "&rnd=" + Math.random(), "", "dialogWidth=675px;dialogHeight=600px");
//    if(rtn!=undefined)
//    {
//       if(rtn!="-1.空值")
//          obj.parentNode.childNodes[0].value=rtn;
//       else
//          obj.parentNode.childNodes[0].value="";
//       EditData(obj,'0');
//    }
//    $("#Win").window('open');
//    EditData(obj, '0');
//}
//function selectvalues(obj, id) {
//    var rtn = window.showModalDialog("ContentList.aspx?ID=" + id + "&rnd=" + Math.random(), "", "dialogWidth=675px;dialogHeight=600px");
//    if (rtn != undefined) {
//        if (rtn != "-1.空值")
//            obj.parentNode.childNodes[0].value = rtn;
//        else
//            obj.parentNode.childNodes[0].value = "";
//        EditData(obj, '0');
//    }
//}
//关闭TABLE页窗体
function PageClose(obj)
{
     var id = window.frameElement.id.substring(7);
     parent.closetalkbox(id);
}
////参数含义(传递的数组，图表的宽度，图表的高度,最大值，单位)
function table1(rr,all_width,all_height,max,danwei){
//纯JAVASCRIPT代码生成图表函数1——柱状图
//运行环境为IE 6.0
//***************************************************************************************
//图像距离左上角x距离
var table_x=0;
//图像距离左上角y距离
 var table_y=30;
 all_width=all_width-(max.toString().length)*8-25;
 all_height=all_height-60;
//柱子的厚度
var thickness =all_height/10;
//柱子的宽度
var table_width=all_width/14;
//柱子上方显示数据距离左端的距离
var wh=(table_width-(max.toString().length)*8+10)/2;
//定义各种颜色
var tmdColor1 = new Array();
tmdColor1[0] = "#d1ffd1";
tmdColor1[1] = "#ffbbbb";
tmdColor1[2] = "#ffe3bb";
tmdColor1[3] = "#cff4f3";
tmdColor1[4] = "#d9d9e5"; 
tmdColor1[5] = "#ffc7ab";
tmdColor1[6] = "#ecffb7"; 
tmdColor1[7] = "green";
tmdColor1[8] ="yellow";
tmdColor1[9] ="blue";
tmdColor1[10]="red";
tmdColor1[11]="gary";
tmdColor1[12]="#002545";
var tmdColor2= new Array();
tmdColor2[0] = "#00ff00";
tmdColor2[1] = "#ff0000";
tmdColor2[2] = "#ff9900";
tmdColor2[3] = "#33cccc"; 
tmdColor2[4] = "#666699";
tmdColor2[5] = "#993300";
tmdColor2[6] = "#99cc00"; 
tmdColor2[7] = "yellow";

var list=rr.split('|');
var date=new Array();
var name=new Array();
for(var i=0;i<list.length;i++)
{
if(list[i]!="")
{
 //y轴标签
 date[i]=list[i].split(',')[1];
 //x轴标签
 name[i]=list[i].split(',')[0];
} 
}    
var total= new Array(date,name); 

var tb_color = new Array(tmdColor1,tmdColor2);
//线的颜色
var line_color = "#69f";
//图像距离左端的距离
var left_width =max.toString().length*8;
//控制图像立体程度
var length = thickness/2;
//有多少组数据
var total_no = total[0].length;

var temp1 = 0;
//纵坐标最大值
var temp4;
temp3 =max;
 temp4=temp3
 //控制背景色
 document.write("<!--[if gte vml 1]><v:rect id='_x0000_s1027' alt='' style='position:absolute;left:" + (table_x+left_width) + "px;top:" + table_y + "px;width:" + (all_width) + "px;height:" + all_height + "px;z-index:-1' fillcolor='#9cf' stroked='f'><v:fill rotate='t' angle='-45' focus='100%' type='gradient'/></v:rect><![endif]-->");
 //画横坐标线
 document.write("<!--[if gte vml 1]><v:line id='_x0000_s1027' alt='' style='position:absolute;left:0;text-align:left;top:0;flip:y;z-index:-1' from='" + (table_x+left_width) + "px," + (table_y+all_height) + "px' to='" + (table_x+all_width+left_width) + "px," + (table_y+all_height) + "px'/><![endif]-->");
 //画纵坐标线
  document.write("<!--[if gte vml 1]><v:line id='_x0000_s1027' alt='' style='position:absolute;left:0;text-align:left;top:0;flip:y;z-index:-1' from='" + (table_x+left_width) + "px," + table_y + "px' to='" + (table_x+left_width) + "px," + (table_y+all_height) + "px'/><![endif]-->");
 //柱子间间隔的宽度
 var table_space = (all_width-table_width*total_no)/total_no;
 //画单位
 
  document.write("<v:shape   alt='' style='position:absolute;left:0px;top:" + 5 + "px;height:18px;'>");
  document.write("<v:textbox inset='0px,0px,0px,0px'><table  height='100%'><tr><td align='right'>" + danwei + "</td></tr></table></v:textbox></v:shape>");
 //document.write("<table ><tr><td >"+danwei+"</td></tr></table>");
 //document.write("<P >"+danwei+"</P>");
 
 //document.write("<v:textbox inset='0px,0px,0px,0px'><table cellspacing='3' cellpadding='0' width='100%' height='100%'><tr><td style ='padding-top :0px'>" + danwei + "</td></tr></table></v:textbox></v:shape>");
 //document.write("<table ><tr><td ></td></tr></table>");
 //画转折点竖线
 document.write("<!--[if gte vml 1]><v:line id='_x0000_s1027' alt='' style='position:absolute;left:0;text-align:left;top:0;flip:y;z-index:-1' from='" + (table_x+left_width+length) + "px,"+ table_y + "px' to='" + (table_x+left_width+length) + "px," + (table_y+all_height-length) + "px' strokecolor='" + line_color + "'/><![endif]-->");
 for(var i=0;i<=all_height-1;i+= all_height/5) {
 //图表中的横线竖线
    //边上横线
    document.write("<!--[if gte vml 1]><v:line id='_x0000_s1027' alt='' style='position:absolute;left:0;text-align:left;top:0;flip:y;z-index:-1' from='" + (table_x+left_width)+ "px," + (table_y+all_height-length-i) + "px' to='" + (table_x+left_width+length) + "px," + (table_y+all_height-i) +"px' strokecolor='" + line_color + "'/><![endif]-->");
    //中间横线
    document.write("<!--[if gte vml 1]><v:line id='_x0000_s1027' alt='' style='position:absolute;left:0;text-align:left;top:0;flip:y;z-index:-1' from='" + (table_x+left_width+length) + "px," + (table_y+all_height-length-i) + "px' to='" + (table_x+all_width+left_width) + "px," + (table_y+all_height-length-i) + "px' strokecolor='" + line_color + "'/><![endif]-->");
    document.write("<!--[if gte vml 1]><v:line id='_x0000_s1027' alt='' style='position:absolute;left:0;text-align:left;top:0;flip:y;z-index:-1' from='" + (table_x+(left_width-15)) + "px," + (table_y+i) + "px' to='" + (table_x+left_width) + "px," + (table_y+i) + "px'/><![endif]-->");
    //y轴坐标标记
     document.write("<!--[if gte vml 1]>");
     document.write("<v:shape id='_x0000_s1025' type='#_x0000_t202' alt='' style='position:absolute;left:" +(table_x)+ "px;top:" + (table_y+i) + "px;width:" + left_width + "px;height:18px;z-index:1'>");
     document.write("<v:textbox inset='0px,0px,0px,0px'><table cellspacing='3' cellpadding='0' width='100%' height='100%'><tr><td align='right'>" + temp4 + "</td></tr></table></v:textbox></v:shape><![endif]-->");
     temp4 =(temp4-temp3/5);
 }
 for(var i=0;i<total_no;i++) {
  //柱子距离左端柱子的距离
  var temp_space = table_x + left_width + table_space / 2 + table_space * i + table_width * i;  
  //画柱子
  document.write("<v:rect id='_x0000_s1025' alt='' style='position:absolute;left:");
  document.write(temp_space);
  document.write("px;top:");
  document.write(table_y + all_height * (1 - (total[0][i]/temp3)));
  document.write("px;width:" + table_width + "px;height:" + all_height * (total[0][i] / temp3) + "px;z-index:1' fillcolor='" + tb_color[1][i] + "'>");
  //控制图像柱子立体效果
  document.write("<v:fill color2='" + tb_color[0][i] + "' rotate='t' type='gradient'/>")
  document.write("<o:extrusion v:ext='view' backdepth='" + thickness + "pt' color='" + tb_color[1][i] + "' on='t'/>");
  document.write("</v:rect>");
  //图上数字位置
   document.write("<v:shape id='_x0000_s1025' type='#_x0000_t202' alt='' style='position:absolute;left:" + (temp_space+wh)+ "px;top:" + (table_y+all_height*(1-(total[0][i]/temp3))-30)+ "px;width:" + ((total[0][i].toString().length)*8) + "px;height:18px;z-index:1'>");
   document.write("<v:textbox inset='0px,0px,0px,0px'><table cellspacing='3' cellpadding='0' width='100%' height='100%'><tr><td align='center'>" + total[0][i] + "</td></tr></table></v:textbox></v:shape>");
   document.write("<v:shape id='_x0000_s1025' type='#_x0000_t202' alt='' style='position:absolute;left:" + (temp_space-table_space/2) + "px;top:" + (table_y+all_height+1) + "px;width:" + (table_space+table_width) + "px;height:18px;z-index:1'>");
  //x轴坐标标记
 document.write("<v:textbox inset='0px,0px,0px,0px'><table cellspacing='3' cellpadding='0' width='100%' height='100%'><tr><td align='center'>" + total[1][i] + "</td></tr></table></v:textbox></v:shape>");
 }
}
    //画饼图
     function bing(chuanzhi,sh,id1,id2)
     {
		 //当前要用的图片宽
         var h=parseInt(sh);
         //当前变量id1与所对应div的id相同，二者必须保持相同
         var myChartpie1 = new FusionCharts("../Images/Pie/Pie3D.swf", id1,  parseInt(h),  (parseInt(h))*3/5);
         var cf=chuanzhi.split('|');
         var ss;
         ss=" <chart  bgColor='CCE5E1' palette='4' showNames='0' showValues='0' decimalPrecision='2' enableSmartLabels='0' chartLeftMargin='1' chartRightMargin='1' rotateNames='0'  showBorder='0' >";
         for(var i=0;i<cf.length;i++)
         {
            ss+=" <set label='"+cf[i].split(',')[0]+"' value='"+cf[i].split(',')[1]+"' color='"+color(i)+"'/>"
         }
         ss+="</chart>";
         myChartpie1.setDataXML(ss);
         myChartpie1.addParam("wmode","Opaque");
         myChartpie1.render(id1);
         t(sh,chuanzhi,id2);
    }
    //画饼图图例
    function t(h,chuanzhi,id2)
      {
         $("#"+id2+"").css("width",parseInt(h)); 
         $("#"+id2+"").css("background-color","CCE5E1"); 
         var cf=chuanzhi.split('|');
     　  var tt;
         tt="<table  cellpadding='0' cellspacing='0' border='0' width='"+(parseInt(h))+"'>";
         for(var j=0;j<cf.length;j++)
         { 
           if(j%2==0)
           {
            tt+="<tr>"
           }
           tt+="<td width='10' height='15' valign='middle'>";
           tt+="<span  style='background-color:"+color(j)+"; font-size:6px'>";
           tt+="<font color='"+color(j)+"'>□</font></span></td><td width='77' valign='middle' align='left'>";
           tt+=" <span style='font-size:13px' >"+cf[j].split(',')[0]+"</span>";
           tt+="</td>";
           if(j%2!=0)
           {
            tt+="</tr>";
           }
         }
         tt+="</table>";  
         document.getElementById(id2).innerHTML=tt;
     }
    //颜色控制 
 function color(itemIndex)
 {
    var  selectedColor ;
    switch (itemIndex)
    {
        case 0:
        selectedColor ="#96B8D3";
        break;
        case 1:
        selectedColor = "#D8AC25";
        break;
        case 2:
        selectedColor = "#779D00";
        break;
        case 3:
        selectedColor = "#E57E3B";
        break;
        case 4:
        selectedColor = "#197A5B";
        break;
        case 5:
        selectedColor = "#5f3c23";
        break;
        case 6:
        selectedColor = "#d71345";
        break;
        case 7:
        selectedColor = "#fdb933";
        break;
        case 8:
        selectedColor = "#7d5886";
        break;
        case 9:
        selectedColor = "#1b315e";
        break;
    }
    return selectedColor;
}
///////////////////////////////////////////////////////////////////////////////////////////
//画刻度表
 function banyuan(m,mins,v,hs,id1)
 {
    var max=parseInt(m);
    var min=parseInt(mins);
    var val=parseInt(v);
    //图片高度
    var h=parseInt(hs)-30; 
    //var ws=(((h/100)*60*2)+60);
    //图片宽度
    //var w=ws-25;
    //刻度盘外围半径
    // var s=(h/100)*60;
    var s=h-50;
    var w=s*2+80;
    //指针长度
    //var zz=(h/100)*56;
    var zz=s-5;
    var dd;
    //当前变量zb1与所对应div的id相同，二者必须保持相同
    var myChartzb1 = new FusionCharts("../Images/Pie/AngularGauge.swf","zb2",w,h);
    //upperLimit --刻度值上限
    //lowerLimit --刻度值下限
    //Limits='0/1'--是否显示极限值
    //baseFontColor='#FF3333' --刻度值字体颜色
    //majorTMNumber='12'  --需要将仪表盘分成的等份值
    //majorTMColor='#FF3333'  --刻度线的颜色
    //majorTMHeight='8'   --刻度线的长度
    //minorTMNumber='5'  --仪表盘刻度线间小刻度线的数量
    //minorTMColor='#FF3333' --仪表盘刻度线间小刻度线颜色
    //minorTMHeight='5' --仪表盘刻度线间小刻度线长度
    //pivotRadius='20' --针心圆半径
    //showGaugeBorder='1' --是否显示刻度盘边框
    //gaugeOuterRadius='130' --刻度盘外围半径
    //gaugeInnerRadius='110' --刻度盘内围半径
    //gaugeOriginX='170'  --刻度盘圆心X坐标
    //gaugeOriginY='170'  --刻度盘圆心Y坐标
    //gaugeScaleAngle='200' --刻度盘比例（度数）
    //displayValueDistance='20' --显示值与刻度线的距离
    //placeValuesInside='1' --显示值是否位于刻度盘的内部
    //gaugeFillMix='' --刻度盘颜色是否混合
    //pivotFillMix='{F0EFEA}, {BEBCB0}' --仪表盘轴心是否混合
    //pivotBorderColor='BEBCB0' --轴心边框颜色
    //pivotfillRatio='80,50' --轴心比率
    //showShadow='0' --是否显示阴影
    //showValue='0'--是否显示指针指向所显示的值
    dd ="<Chart  bgColor='CCE5E1'  upperLimit='"+max+"' lowerLimit='"+min+"' majorTMNumber='5' majorTMHeight='10'  showGaugeBorder='1' gaugeOuterRadius='"+s+"' gaugeOriginX='"+(s+40)+"' gaugeOriginY='"+(s+30)+"' gaugeInnerRadius='2'   displayValueDistance='10' pivotRadius='7'  pivotBorderColor='000000'  pivotFillMix='FFFFFF,000000' showValue='0' > ";
    dd+="<colorRange><color minValue='"+(min)+"' maxValue='"+(min+(max-min)/3)+"' code='399E38'/> ";
    dd+="<color minValue='"+(min+(max-min)/3)+"' maxValue='"+(min+(max-min)/3*2)+"' code='E48739'/>";
    dd+=" <color minValue='"+(min+(max-min)/3*2)+"' maxValue='"+max+"' code='B41527'/>  </colorRange>";
    dd+="<dials> <dial value='"+val+"' borderAlpha='0' bgColor='000000' baseWidth='11' topWidth='1' radius='"+zz+"'/>  </dials> ";
    dd+="</Chart>";
    myChartzb1.setDataXML(dd);
    myChartzb1.render(id1);
 }