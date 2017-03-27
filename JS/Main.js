
window.onresize = function () { windowResize(); };
$(document).ready(function () {
    windowResize();
    tabClose();
});
function createContent(url) {
    var s ="<iframe name=\"mainFrame\" frameborder=\"0\"  src=\""+url+"\" style=\"boder:0;width:100%;height:100%;\"></iframe>";
    return s;
}

function refreshTab(title) {
    if ($("#DivContent").length > 0) {
        var tab = $("#DivContent").tabs("getTab", title);
        if (tab != null) {
            $("#DivContent").tabs("update", {
                tab: tab,
                options: tab.panel("options")
            });
        }
    }
}

function addTab(node) 
{
    if ($("#DivContent").tabs("exists", node.text)) 
    {
        $("#DivContent").tabs("select", node.text);
    }
    else {
        if (node.attributes != undefined) {
            if (node.attributes.url && node.attributes.url.length > 0 && node.attributes.url != "" && node.attributes.url!=" ") {
                $("#DivContent").tabs("add", {
                    title: node.text,  //标题
                    closable: true,    //创建的Tab面板有关闭按钮
                    content: '<iframe name="mainFrame" frameborder="0"  src="' + node.attributes.url + '" style="boder:0;width:100%;height:100%;"></iframe>',
                    tools: [{
                        iconCls: 'icon-mini-refresh',
                        handler: function () {
                            refreshTab(node.text);
                        }
                    }]
                });
            }
            else 
            {
                $("#DivContent").tabs("add", {
                    title: node.text,  //标题
                    closable: true,    //创建的Tab面板有关闭按钮
                    content: '<iframe name="mainFrame" frameborder="0"  src="Error.aspx" style="boder:0;width:100%;height:100%;"></iframe>',
                    tools: [{
                        iconCls: 'icon-mini-refresh',
                        handler: function () {
                            refreshTab(node.text);
                        }
                    }]
                });
            }
        }
    }
    tabClose();
}


function addTab2(objtitle, url) {
    if (!$("#DivContent").tabs("exists", objtitle)) {
        $("#DivContent").tabs("add", {
            title: objtitle,                //标题
            content: createContent(url),
            closable: true,                  //创建的Tab面板有关闭按钮。
            tools: [{
                iconCls: 'icon-mini-refresh',
                handler: function () {
                    refreshTab(objtitle);
                }
            }]
        });
    } 
    else {
        $("#DivContent").tabs("select", objtitle);
    }
    tabClose();
}
// 增加一个新的 tab panel
function addDiv() {
    $("#DivContent").tabs("add", {
        title: "New Tab",
        content:"Tab Body",
        closable: true
    });
}
function tabClose() {
    /* 双击关闭TAB选项卡 */
    $(".tabs-inner").dblclick(function () {
        var subtitle = $(this).children(".tabs-closable").text();
        $("#DivContent").tabs("close", subtitle);
    });
}
function windowResize() {
    var iwidth = $(window).width() - 10;     //减去10与body中margin:5px共同作用:为body留的边距  
    var iheight = $(window).height() - 10;
    $("#Fr1").layout({ width: iwidth, height: iheight });                      //相当于<form id='form1' class='easyui-layout' runat="server">  
//    refreshTab("待处理任务");
}
/*
fn: 回调函数
msg:需要提示的信息
title: 提示框上面的文字
icon："error"、"info"、"question"、"warning"
*/
function EasyAlert(title, msg, icon) {
    $.messager.alert(title, msg, icon);
}
//function EasyPrompt(title, msg, fn) {
//    $.messager.prompt(title, msg, fn);
//}
//function EasyConfirm(title, msg, fn) {
//    $.messager.confirm(title,msg,fn);
//}
//function EasyShow(title, msg,width,height) {
//    var options = {
//        width:width,
//        height:height,
//        title: title,
//        msg: msg,
//        showType: 'slide',
//        timeout: 5000
//    };
//    $.messager.show(options);
//}