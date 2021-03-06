﻿/// <summary>针对excelVBA的封装，将对excel的操作统一</summary>
/// <summary>excel的常量部分：</summary>
var xlUp = -4162;
var xlToRight = -4161;
var xlToLeft = -4159;
var xlToDown = -4121;

var xlFormulas = -4123;
var xlValues = -4163;
var xlWhole = 1;
var xlPart = 2;
var xlByRows = 1;
var xlByColumns = 2;
var xlNext = 1;

/// <summary>手工计算与自动计算：</summary>
var xlManual = -4135;
var xlAutomatic = -4105;

/// <summary>默认模版的锁定色：</summary>
//var xcolor = "E0FFFF";
var xcolor = "C2F6A2";

// Excel.XlBordersIndex 的成员:
var xlEdgeBottom = 9;
var xlEdgeLeft = 7;
var xlEdgeRight = 10;
var xlEdgeTop = 8;
var xlInsideHorizontal = 12;
var xlInsideVertical = 11;
var xlDiagonalDown = 5;
var xlDiagonalUp = 6;

// Excel.XlCellType 的成员 
var xlCellTypeFormulas = -4123;
var xlCellTypeSameFormatConditions = -4173;

//Excel.XlSpecialCellsValue 的成员 
var xlErrors = 16;
var xlLogical = 4;
var xlNumbers = 1;
var xlTextValues = 2;

//Excel.XlLineStyle 的成员:
var xlContinuous = 1;

//Excel.Constants 的成员:
var xlAutomatic = -4105;
var xlNone = -4142;

//Excel.XlBorderWeight 的成员
var xlThin = 2;

//Excel保护模式下的默认密码：
var xlProtectPassword = 'boomlink';

var po = new JsPageOffice();

//window.console = window.console || (function () {
//    var c = {};
//    c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function () { };
//    return c;
//})();

///测试专用代码：
var test = '';
var sdt;

//开启测试：
function DebStart() {
    sdt = new Date();
    test = '';
};

//测试数据使用：获取两次间隔时间？毫秒
function CalSecond() {
    var edt = new Date();
    var ret = edt.getTime() - sdt.getTime();
    sdt = edt;
    return ret;
};

//测试点时间回写：
function DebPoint(_str) {
    if (test == '') {
        test = _str + '：' + CalSecond().toString();
    } else {
        test += '\n' + _str + '：' + CalSecond().toString();
    }
};

//测试点完成提示：
function DebEnd() {
    alert(test);
};

//判断对象是否为json：
function isJson(obj) {
    var isjson = typeof (obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
    return isjson;
};

//判断是否为json字符串：
function isJsonStr(_str) {
    try {
        JSON.parse(_str);
        return true;
    } catch (err) {
        return false;
    }
};

//添加或者修改json数据
function setJson(_json, _name, _value) {
    if (!isJson(_json)) return null;
    _json[_name] = _value;
    return _json;
};

//删除数据
function deleteJson(_json, _name) {
    if (!isJson(_json)) return null;
    delete _json[_name];
    return _json;
};

//添加或者修改json数据
function setJsonstr(_jsonStr, _name, _value) {
    if (!_jsonStr) _jsonStr = "{}";
    // 转换为json
    var jsonObj = JSON.parse(_jsonStr);
    jsonObj[_name] = _value;
    //返回json字符串：
    return JSON.stringify(jsonObj);
};

//在字符串指定位置插入回车换行符：
function insertFlag(_str, _flg, _sn) {
    var newstr = "";
    for (var i = 0; i < _str.length; i += _sn) {
        var tmp = _str.substring(i, i + _sn);
        newstr += tmp + _flg;
    }
    return newstr;
};

//删除数据
function deleteJsonstr(_jsonStr, _name) {
    if (!_jsonStr) return null;
    var jsonObj = JSON.parse(_jsonStr);
    delete jsonObj[_name];
    return JSON.stringify(jsonObj);
};

//字符串去掉前后空格：
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, '');
};

//查询服务器的url是否存在：
function fileexist(_url, _fnsucess, _fnerror) {
    var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.open("GET", _url, false);
    xmlhttp.send();
    if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
            _fnsucess();
        }
        else if (xmlhttp.status == 404) {
            _fnerror();
        }
    }
};

//获取当前路径：
function getRootPath() {
    //获取当前网址，如： http://localhost:8088/test/test.jsp  
    var curPath = window.document.location.href;
    //获取主机地址之后的目录，如： test/test.jsp  
    var pathName = window.document.location.pathname;
    var pos = curPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8088  
    var localhostPaht = curPath.substring(0, pos);
    //获取带"/"的项目名，如：/test  
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPaht + projectName);
};

/**
* 格式化月份，如果是10以下的月份，则添加0：
* 
*/
function formatmonth(_month) {
    if (_month) {
        if (_month.length == 1) {
            _month = "0" + _month;
        }
        return _month;
    }
    else {
        alert('月份为空！');
    }
};

/**
* 获取要保存的数据文件名：
* 
*/
function getsavefilename(_jhfadm, _mbwj) {
    if (_jhfadm && _mbwj) {
        return "Jhfadm~" + _jhfadm + "~Mb~" + _mbwj;
    }
};

/**
* URL参数中如果是中文参数的编码：
* 
*/
function getchineseurl(_param) {
    return encodeURIComponent(encodeURIComponent(_param));
};

/**
* 获取当前的urlpath路径
* 
*/
function geturlpath() {
    var href = document.location.href;
    var h = href.split("/");
    href = "";
    for (var i = 0; i < h.length - 1; i++) {
        href += h[i] + "/";
    }
    return href;
};

/**
* 字母转换为数字
* @param {String} str
*/
function col2num(str) {
    str = str.toUpperCase();
    var base = 'A'.charCodeAt(0); //找到A的码表大小
    var r = 0;
    for (var i = 0; i < str.length; i++) {//遍历每个位置
        r = r * 26 + str.charCodeAt(i) - base + 1;
    }
    return r;
};

/**
* 将数字索引转换为英文字母
* @param {Number} colIndex
*/

function num2col(colIndex) {
    //    colIndex += 1;
    if (colIndex < 1) {
        return "";
    }
    var str = "";
    var result = "";
    var A = 'A';
    while (colIndex != 0) {
        var num = colIndex % 26; // 取余
        var c = A.charCodeAt(0) + num - 1;
        colIndex = Math.floor(colIndex / 26); //返回值小于等于其数值参数的最大整数值。
        // 对于26的特殊处理
        if (num == 0) {
            //c = A.charCodeAt(0) + 26;
            str = 'Z';
            colIndex -= 1; //退位
        } else {
            str = String.fromCharCode(c);
        }
        // 3.插入
        result += str;
    }
    if (result.length > 1) {
        result = result.split('').reverse().join("");
    }
    return result;
};

/// <summary>是pageoffice调用excel操作的对象：</summary>
/// <param name="_poctrl" type="PageOfficeCtrl">xmltag po 标签ID</param>
function JsPageOffice(_poctrl) {
    this.poctrl = _poctrl == null ? document.getElementById("PageOfficeCtrl1") : _poctrl;
    /// <summary>私有方法：</summary>
    /// <summary>检验单元格录入的合法性：</summary>
    /// <returns type="boolean">boolean类型返回值</returns>
    /// <param name="_sheet" type="Sheet">excel的sheet页</param>
    /// <param name="_row" type="Int">excel的第?行</param>
    /// <param name="_col" type="Int">excel的第?列</param>
    function chkcell(_sheet, _row, _col) {
        //返回指定单元格：
        var cel = _sheet.Cells(_row, _col);
        //如果当前sheet页为空则提取当前活动页
        if (_sheet == null) {
            _sheet = po.activesheet();
            //如果当前sheet页不为空则调用excel允许呼叫函数否则会出现“呼叫被拒绝提示”
        } else {
            po.poctrl.EnableExcelCalling();
        }
        //如果当前网格值不为空并且是小于100000000000000的浮点数则返回true
        if (!isNaN(cel.Value2) && parseFloat(cel.Value2) < 100000000000000
        && cel.Value2.toString().trim() != "") {
            return true;
            //否则定位到非法单元格并提示同时返回false
        } else {
            if (cel.Value2.trim() != "") {
                _sheet.Activate;
                cel.Select;
                po.ScreenUpdating(true);
                po.setvisible(true);
                if (isNaN(cel.Value2)) {
                    alert('当前单元格【' + cel.Address + '】不是数值类型，请检验！');
                } else {
                    alert('当前单元格【' + cel.Address + '】数值越界，请检验！');
                }
            }
            return false;
        }
    }

    //为excel的range添加Hyperlink属性：
    this.addurl = function (_sheet, _row, _col, _text, _url) {
        if (_sheet != undefined && _row != undefined && _col != undefined) {
            _sheet.Hyperlinks.Add(_sheet.Cells(_row, _col), _url, '', _text, _text);
        }
    }

    //设置指定单元格：
    function getsumjson(_sheet, _json, _r) {
        if (_sheet && _json && _r) {
            var zydm = _json['ZYDM'];
            var zzbcpdm = _json['ZZBCPDM'];
            var zzcpdm = _json['ZZCPDM'];
            _r++;
            var bmjson = JSON.parse('{' + _sheet.Cells(_r, 1).Value + '}');
            var lx = bmjson['LX'];
            var trs = '', tre = '', ccs = '', cce = '', tr = '', cc = '', res = '';
            while ((lx == '1' || lx == '2' || lx == '3') && _sheet.Cells(_r, 1).Value != undefined) {
                bmjson = JSON.parse('{' + _sheet.Cells(_r, 1).Value + '}');
                //如果是投入：
                if (lx == bmjson['LX'] && lx == '1') {
                    if (trs == '') {
                        trs = _r.toString();
                    }
                    tre = _r.toString();
                    //如果是产出或者损失：
                } else if (bmjson['LX'] == '2' || bmjson['LX'] == '3') {
                    if (ccs == '') {
                        ccs = _r.toString();
                    }
                    cce = _r.toString();
                }
                lx = bmjson['LX'];
                _r++;
            }
        }
        if (trs != '' && tre != '') {
            tr = 'SUM(F' + trs + ':F' + tre + ')';
        }
        if (ccs != '' && cce != '') {
            cc = 'SUM(G' + ccs + ':G' + cce + ')';
        }
        res = '{"trl"\:"' + tr + '","ccl"\:"' + cc + '"}';
        return JSON.parse(res);
    }

    //替换年、月、季度等参数：
    function setparam(_val, _yy, _nn, _jd, _fabs, _bnyy, _bnnn, _ysyf) {
        if (!_fabs) {
            _fabs = '1';
        }
        if (!_bnyy) {
            _bnyy = _yy;
        }
        if (!_ysyf) {
            _ysyf = _nn;
        }
        if (_nn.indexOf('0') == 0 && _nn.length == 2) {
            _nn = _nn.substring(1);
        }
        if (_ysyf.indexOf('0') == 0 && _ysyf.length == 2) {
            _ysyf = _ysyf.substring(1);
        }
        if (_bnnn.indexOf('0') == 0 && _bnnn.length == 2) {
            _bnnn = _bnnn.substring(1);
        }
        _val = _val.toString().trim().replace(/~~bnyy/g, _bnyy + '年').replace(/~~BNYY/g, _bnyy + '年');
        //更改bnnn和snn替换：
        //        _val = _val.toString().replace(/~~BNNN/g, _ysyf + '月').replace(/~~bnnn/g, _ysyf + '月');
        //        _val = _val.toString().replace(/~~SNN/g, _ysyf + '月').replace(/~~snn/g, _ysyf + '月');

        switch (_fabs) {
            //月：                                                                                                     
            case '1':
                //其他
            case '4':
                _val = _val.toString().trim().replace(/~~yy/g, _yy + '年').replace(/~~nn/g, _nn + '月').replace(/~~jd/g, '');
                _val = _val.toString().trim().replace(/~~YY/g, _yy + '年').replace(/~~NN/g, _nn + '月').replace(/~~JD/g, '');
                var isnn = parseInt(_nn);
                isnn = (isnn == 1) ? isnn : isnn - 1;
                //                _val = _val.toString().trim().replace(/~~snn/g, isnn.toString() + '月').replace(/~~SNN/g, isnn.toString() + '月');
                _val = _val.toString().trim().replace(/~~bnnn/g, isnn.toString() + '月').replace(/~~BNNN/g, isnn.toString() + '月');
                var ixnn = parseInt(_nn);
                ixnn = (ixnn == 12) ? ixnn : ixnn + 1;
                _val = _val.toString().trim().replace(/~~xnn/g, ixnn.toString() + '月').replace(/~~XNN/g, ixnn.toString() + '月');
                //SNN改成，如果计划方案月份<=预算月份，那么这个SNN应该是方案的月份-1，如果计划方案月份>预算月份，那么SNN应该=预算月份
                var iysyf = parseInt(_nn) <= parseInt(_ysyf) ? parseInt(_nn) - 1 : parseInt(_ysyf);
                _val = _val.toString().replace(/~~SNN/g, iysyf.toString() + '月').replace(/~~snn/g, iysyf.toString() + '月');
                break;
            //季度：                                                                                                     
            case '2':
                _val = _val.toString().trim().replace(/~~yy/g, _yy + '年').replace(/~~nn/g, '').replace(/~~jd/g, _jd + '季度');
                _val = _val.toString().trim().replace(/~~YY/g, _yy + '年').replace(/~~NN/g, '').replace(/~~JD/g, _jd + '季度');
                break;
            //年：                                                                                                     
            case '3':
                _val = _val.toString().trim().replace(/~~yy/g, _yy + '年').replace(/~~nn/g, '').replace(/~~jd/g, '');
                _val = _val.toString().trim().replace(/~~YY/g, _yy + '年').replace(/~~NN/g, '').replace(/~~JD/g, '');
                var isnn = parseInt(_bnnn);
                isnn = (isnn == 1) ? isnn : isnn - 1;
                //                _val = _val.toString().trim().replace(/~~snn/g, isnn.toString() + '月').replace(/~~SNN/g, isnn.toString() + '月');
                _val = _val.toString().trim().replace(/~~bnnn/g, isnn.toString() + '月').replace(/~~BNNN/g, isnn.toString() + '月');
                var ixnn = parseInt(_bnnn);
                ixnn = (ixnn == 12) ? ixnn : ixnn + 1;
                _val = _val.toString().trim().replace(/~~xnn/g, ixnn.toString() + '月').replace(/~~XNN/g, ixnn.toString() + '月');
                break;
        }
        //更改bnnn和snn替换：
        _val = _val.toString().replace(/~~SNN/g, _ysyf + '月').replace(/~~snn/g, _ysyf + '月');
        return _val;
    }

    function replaceYYNNJD(_sheet, _yy, _nn, _jd, _fabs, _bnyy, _bnnn, _ysyf) {
        if (_sheet != undefined) {
            var usedrang = _sheet.UsedRange;
            po.application().FindFormat.Clear();
            var cel = usedrang.Find('*~~*', usedrang.Cells(1), xlValues, xlWhole, xlByRows, xlNext, false, true, false);
            if (cel != undefined) {
                var firstaddr = cel.Address;
                do {
                    cel = usedrang.FindNext(cel);
                    if (cel != undefined) {
                        cel.Value = setparam(cel.Value, _yy, _nn, _jd, _fabs, _bnyy, _bnnn, _ysyf);
                    } else {
                        break;
                    }
                } while (cel.Address != firstaddr)
            }
        }
    }

    //在excel上填写投入产出行：
    function writetrccrow(_sheet, _jsonrow, _ridx) {
        if (_sheet == null) {
            _sheet = po.activesheet();
        } else {
            po.poctrl.EnableExcelCalling();
        }
        var colidx = 1;
        for (var colkey in _jsonrow) {
            if (_sheet) {
                _sheet.Cells(_ridx, colidx).Value = _jsonrow[colkey];
                if (_ridx == 1) {
                    _sheet.Cells(_ridx, colidx).Font.FontStyle = "Bold";
                }
                else {
                    if (colkey == 'bm') {
                        var jsonbm = eval('({' + _jsonrow[colkey] + '})');
                        switch (jsonbm["LX"]) {
                            //合计                                                                    
                            case '0':
                                if (jsonbm["ZZBCPDM"] != undefined || jsonbm["ZZCPDM"] != undefined) {
                                    if (_sheet.Cells(_ridx, 7).MergeCells) {
                                        _sheet.Cells(_ridx, 7).MergeArea.Locked = "False";
                                    } else {
                                        _sheet.Cells(_ridx, 7).Locked = "False";
                                    }
                                    _sheet.Cells(_ridx, 7).Interior.Color = parseInt(xcolor, 16);

                                    if (_sheet.Cells(_ridx, 8).MergeCells) {
                                        _sheet.Cells(_ridx, 8).MergeArea.Locked = "False";
                                    } else {
                                        _sheet.Cells(_ridx, 8).Locked = "False";
                                    }
                                    _sheet.Cells(_ridx, 8).Interior.Color = parseInt(xcolor, 16);

                                    if (_sheet.Cells(_ridx, 9).MergeCells) {
                                        _sheet.Cells(_ridx, 9).MergeArea.Locked = "False";
                                    } else {
                                        _sheet.Cells(_ridx, 9).Locked = "False";
                                    }
                                    _sheet.Cells(_ridx, 9).Interior.Color = parseInt(xcolor, 16);

                                    if (_sheet.Cells(_ridx, 10).MergeCells) {
                                        _sheet.Cells(_ridx, 10).MergeArea.Locked = "False";
                                    } else {
                                        _sheet.Cells(_ridx, 10).Locked = "False";
                                    }
                                    _sheet.Cells(_ridx, 10).Interior.Color = parseInt(xcolor, 16);
                                }
                                break;
                            //投入：                                                                                                                                                               
                            case '1':
                                if (_sheet.Cells(_ridx, 6).MergeCells) {
                                    _sheet.Cells(_ridx, 6).MergeArea.Locked = "False";
                                } else {
                                    _sheet.Cells(_ridx, 6).Locked = "False";
                                }
                                _sheet.Cells(_ridx, 6).Interior.Color = parseInt(xcolor, 16);
                                break;
                            //产出：                                                                                                                                                               
                            case '2':
                                if (_sheet.Cells(_ridx, 7).MergeCells) {
                                    _sheet.Cells(_ridx, 7).MergeArea.Locked = "False";
                                } else {
                                    _sheet.Cells(_ridx, 7).Locked = "False";
                                }
                                _sheet.Cells(_ridx, 7).Interior.Color = parseInt(xcolor, 16);
                                break;
                            //损失：                                                                                                                                                              
                            case '3':
                                if (_sheet.Cells(_ridx, 7).MergeCells) {
                                    _sheet.Cells(_ridx, 7).MergeArea.Locked = "False";
                                } else {
                                    _sheet.Cells(_ridx, 7).Locked = "False";
                                }
                                _sheet.Cells(_ridx, 7).Interior.Color = parseInt(xcolor, 16);
                                break;
                        }
                    }
                }
            }
            colidx++;
        }
    }

    //在excel上填写投入产出样式：
    function writetrccstyle(_sheet, _scount) {
        if (_sheet == null) {
            _sheet = po.activesheet();
        } else {
            po.poctrl.EnableExcelCalling();
        }
        _sheet.Range("A1:J" + _scount).Borders(xlDiagonalDown).LineStyle = xlNone;
        _sheet.Range("A1:J" + _scount).Borders(xlDiagonalUp).LineStyle = xlNone;
        with (_sheet.Range("A1:J" + _scount).Borders(xlEdgeLeft)) {
            LineStyle = xlContinuous;
            ColorIndex = xlAutomatic;
            //            if (this.version() >= 12) {
            TintAndShade = 0;
            //            }
            Weight = xlThin;
        }

        with (_sheet.Range("A1:J" + _scount).Borders(xlEdgeTop)) {
            LineStyle = xlContinuous;
            ColorIndex = xlAutomatic;
            //            if (this.version() >= 12) {
            TintAndShade = 0;
            //            }
            Weight = xlThin;

        }

        with (_sheet.Range("A1:J" + _scount).Borders(xlEdgeBottom)) {
            LineStyle = xlContinuous;
            ColorIndex = xlAutomatic;
            //            if (this.version() >= 12) {
            TintAndShade = 0;
            //            }
            Weight = xlThin;

        }

        with (_sheet.Range("A1:J" + _scount).Borders(xlEdgeRight)) {
            LineStyle = xlContinuous;
            ColorIndex = xlAutomatic;
            //            if (this.version() >= 12) {
            TintAndShade = 0;
            //            }
            Weight = xlThin;

        }

        with (_sheet.Range("A1:J" + _scount).Borders(xlInsideVertical)) {
            LineStyle = xlContinuous;
            ColorIndex = xlAutomatic;
            //            if (this.version() >= 12) {
            TintAndShade = 0;
            //            }
            Weight = xlThin;

        }

        with (_sheet.Range("A1:J" + _scount).Borders(xlInsideHorizontal)) {
            LineStyle = xlContinuous;
            ColorIndex = xlAutomatic;
            //            if (this.version() >= 12) {
            TintAndShade = 0;
            //            }
            Weight = xlThin;

        }
        with (po.application().ActiveWindow) {
            SplitColumn = 0;
            SplitRow = 1;
            FreezePanes = "True";
        }
        _sheet.Columns("A:J").AutoFit;
        po.hidefirstcol();
    }

    //获取版本号：
    this.version = function () {
        return parseInt(this.application().Version);
    }

    //获取当前excel版本：
    this.excelversion = function () {
        switch (this.version()) {
            case 8:
                return 'Excel 97';
            case 9:
                return 'Excel 2000';
            case 10:
                return 'Excel 2002';
            case 11:
                return 'Excel 2003';
            case 12:
                return 'Excel 2007';
            case 14:
                return 'Excel 2010';
            case 15:
                return 'Excel 2013';
            default:
                return 'Excel 未知版本';
        }
    }

    //设置是否提示：
    this.displayalerts = function (_bool) {
        if (this.poctrl) {
            if (this.poctrl.Document.Application.DisplayAlerts != _bool)
                this.poctrl.Document.Application.DisplayAlerts = _bool;
        }
    }

    //excel是否刷新：
    this.ScreenUpdating = function (_bool) {
        if (this.poctrl) {
            if (this.poctrl.Document.Application.ScreenUpdating != _bool)
                this.poctrl.Document.Application.ScreenUpdating = _bool;
        }
    }

    //更新并显示：
    this.UpdateAndVis = function (_bool) {
        if (_bool == true) {
            this.ScreenUpdating(_bool);
            this.setvisible(_bool);
        } else if (_bool == false) {
            this.setvisible(_bool);
            this.ScreenUpdating(_bool);
        }
    }

    //保护工作表：
    //Protect(Password, DrawingObjects, Contents, Scenarios, UserInterfaceOnly, AllowFormattingCells, AllowFormattingColumns,
    // AllowFormattingRows, AllowInsertingColumns, AllowInsertingRows, AllowInsertingHyperlinks, AllowDeletingColumns, 
    //AllowDeletingRows, AllowSorting, AllowFiltering, AllowUsingPivotTables)
    this.protectsheet = function (_sheet, _pswd) {
        if (!_sheet) {
            _sheet = this.activesheet();
        } else {
            this.poctrl.EnableExcelCalling();
        }
        if (!_pswd) {
            _pswd = xlProtectPassword;
        }
        //临时：
        _sheet.Protect(_pswd, "True", "True", "True", "False", "True", "True", "True", "False", "True", "False", "False", "False", "False", "False", "False");
    }

    //取消保护工作表：
    this.unprotectsheet = function (_sheet, _pswd) {
        if (!_sheet) {
            _sheet = this.activesheet();
        } else {
            this.poctrl.EnableExcelCalling();
        }
        if (!_pswd) {
            _pswd = xlProtectPassword;
        }
        _sheet.Unprotect(_pswd);

    }

    //保护所有工作表：
    this.protectallsheet = function () {
        if (this.poctrl != null && this.poctrl.Document != null) {
            //            if (this.poctrl.Document.Sheets.Count >= 10)
            //                return;
            for (var i = 1; i <= this.poctrl.Document.Sheets.Count; i++) {
                var sheet = this.poctrl.Document.Sheets(i);
                this.protectsheet(sheet);
            }
        }
    }

    //取消保护所有工作表：
    this.unprotectallsheet = function () {
        if (this.poctrl != null && this.poctrl.Document != null) {
            this.poctrl.EnableExcelCalling();
            for (var i = 1; i <= this.poctrl.Document.Sheets.Count; i++) {
                var sheet = this.poctrl.Document.Sheets(i);
                this.unprotectsheet(sheet);
            }
        }
    }

    //设置隐藏显示
    this.setvisible = function (_vis) {
        if (this.poctrl) {
            if (_vis == null) { _vis = true }
            if (_vis == true && this.poctrl.style.visibility != "visible") {
                this.poctrl.style.visibility = "visible";
                if (this.application()) {
                    this.application().Calculation = xlAutomatic;
                }
            } else if (_vis == false && this.poctrl.style.visibility != "hidden") {
                this.poctrl.style.visibility = "hidden";
                //                if (this.application()) {
                //                    this.application().Calculation = xlManual;
                //                }
            }
        }
    }

    //获取标签页
    this.getsheets = function () {
        if (this.poctrl.Document != null) {
            if (this.poctrl != null && this.poctrl != undefined && this.poctrl) {
                var func = 'Function getsheets()\r\n'
            + 'For i = 1 To ActiveWorkbook.Sheets.Count\r\n'
            + 'getsheets = getsheets +Sheets(i).Name+","\r\n'
            + 'Next i\r\n'
            + 'End Function';
                var res = this.poctrl.RunMacro("getsheets", func);
                res = res.substr(0, res.length - 1);
                return res.split(",");
            }
            else {
                alert("对象初始化错误！");
            }
        }
        else {
            alert("未获取初始化对象！");
        }
    }

    //获取标签页名称按','分割：
    this.getsheetnames = function () {
        // debugger;
        var res = '';
        if (this.poctrl.Document != null) {
            if (this.poctrl != null && this.poctrl != undefined && this.poctrl) {
                for (var idx = 1; idx <= this.poctrl.Document.Sheets.Count; idx++) {
                    if (res == '') {
                        res = this.poctrl.Document.Sheets(idx).name;
                    } else {
                        res += ',' + this.poctrl.Document.Sheets(idx).name;
                    }
                }
            }
            else {
                alert("对象初始化错误！");
            }
        }
        else {
            alert("未获取初始化对象！");
        }
        return res.trim();
    }

    //解析json隐藏相关数据列：
    this.hidecolbyformula = function (_hidejson) {
        if (this.poctrl != null && this.poctrl.Document != null && _hidejson != null) {
            //            this.setvisible(false);
            this.poctrl.EnableExcelCalling();
            for (var i = 0; i < _hidejson['sheets'].length; i++) {
                var sheetname = _hidejson['sheets'][i]["name"];
                var cols = _hidejson['sheets'][i]["cols"];
                var sheet = this.getsheetbyname(sheetname);
                if (sheet != null) {
                    if (cols != '') {
                        var arycol = cols.split(',');
                        for (var j = 0; j < arycol.length; j++) {
                            sheet.Columns(col2num(arycol[j])).Hidden = "True";
                        }
                    }
                } else {
                    alert('标签页：【' + sheetname + '】不存在！');
                }
            }
            //            this.setvisible(true);
        }
        else {
            alert("未获取初始化对象！");
        }
    }

    //获取当前活动sheet页
    this.activesheet = function () {
        if (this.poctrl != null && this.poctrl.Document != null) {
            this.poctrl.EnableExcelCalling();
            return this.poctrl.Document.Application.ActiveSheet;
        }
        else {
            alert("未获取初始化对象！");
        }
    }

    //获取第一个sheet页
    this.firstsheet = function () {
        if (this.poctrl != null && this.poctrl.Document != null) {
            this.poctrl.EnableExcelCalling();
            return this.poctrl.Document.Sheets(1);
        }
        else {
            alert("未获取初始化对象！");
        }
    }

    //获取当前活动sheet页idx
    this.activesheetidx = function () {
        if (this.poctrl != null && this.poctrl.Document != null) {
            this.poctrl.EnableExcelCalling();
            return this.poctrl.Document.Application.ActiveSheet.Index;
        }
        else {
            alert("未获取初始化对象！");
        }
    }

    //获取当前application：
    this.application = function () {
        if (this.poctrl != null && this.poctrl.Document != null) {
            this.poctrl.EnableExcelCalling();
            return this.poctrl.Document.Application;
        }
        else {
            return null;
        }
    }

    //返回指定worksheet最大行：
    this.maxrows = function (_s) {
        if (_s == null) {
            return this.activesheet().Rows;
        } else {
            return _s.Rows;
        }
    }

    //返回指定worksheet最大列：
    this.maxcols = function (_s) {
        if (_s == null) {
            return this.activesheet().Columns;
        } else {
            return _s.Columns;
        }
    }

    //返回指定worksheet第一列有数据行号：
    this.rowscnt = function (_s) {
        var r = "A" + this.maxrows(_s).Count;
        if (_s == null) {
            return this.activesheet().Range(r).End(xlUp).Row;
        } else {
            return _s.Range(r).End(xlUp).Row;
        }
    }

    //返回指定worksheet第一行有数据列号：
    this.colscnt = function (_s) {
        var r = num2col(this.maxcols(_s).Count) + "1";
        if (_s == null) {
            return this.activesheet().Range(r).End(xlToLeft).Column;
        } else {
            return _s.Range(r).End(xlToLeft).Column;
        }
    }

    //返回sheet页中的UsedRange：
    this.UsedRange = function (_sheet) {
        if (!_sheet) {
            _sheet = this.activesheet();
        }
        return _sheet.UsedRange;
    }

    //返回sheet页中的已使用的行数：
    this.usedrowscnt = function (_sheet) {
        return _sheet.UsedRange().Rows.Count;
    }

    //返回sheet页中的已使用的列数：
    this.usedrcolscnt = function (_sheet) {
        return _sheet.UsedRange().Columns.Count;
    }

    //解锁指定区域range，其他地方锁定：
    this.unlockrange = function (_r, _s) {
        if (_s == null) {
            _s = this.activesheet();
        } else {
            this.poctrl.EnableExcelCalling();
        }
        if (!_s.ProtectContents) {
            _s.Range(_r).Locked = "False";
            this.protectsheet(_s);

        } else {
            this.unprotectsheet(_s);
            _s.Range(_r).Locked = "False";
            this.protectsheet(_s);
        }
    }

    //根据索引号获取sheet：
    this.getsheetbyidx = function (_idx) {
        if (!_idx) {
            _idx = 1;
        }
        if (this.poctrl != null && this.poctrl.Document != null) {
            if (_idx <= this.poctrl.Document.Sheets.Count && _idx > 0)
                return this.poctrl.Document.Sheets(_idx);
        }
    }

    //根据sheet页名称获取sheet：
    this.getsheetbyname = function (_name) {
        if (_name) {
            if (this.poctrl != null && this.poctrl.Document != null) {
                for (var idx = 1; idx <= this.poctrl.Document.Sheets.Count; idx++) {
                    var sheet = this.poctrl.Document.Sheets(idx);
                    if (sheet.Name.trim() == _name.trim()) {
                        return sheet;
                    }
                }
            }
        }
        return null;
    }

    //根据区域着色：
    this.setrangecolor = function (_range, _color, _sheet) {
        if (!_sheet) {
            _sheet = this.activesheet();
        } else {
            this.poctrl.EnableExcelCalling();
        }
        if (!_color) {
            _color = parseInt(xcolor, 16);
        }
        _sheet.Range(_range).Interior.Color = _color;
    }

    //清空指定区域颜色：
    this.clearrangcolor = function (_range, _sheet) {
        if (!_sheet) {
            _sheet = this.activesheet();
        } else {
            this.poctrl.EnableExcelCalling();
        }
        with (_sheet.Range(_range).Interior) {
            Pattern = xlNone;
            //            if (this.version() >= 12) {
            TintAndShade = 0;
            PatternTintAndShade = 0;
            //            }
        }
    }

    //清除第一行value值：
    this.clearfirstrow = function (_sheet) {
        if (!_sheet) {
            _sheet = this.activesheet();
        } else {
            this.poctrl.EnableExcelCalling();
        }
        if (_sheet.ProtectContents) {
            this.unprotectsheet(_sheet);
            _sheet.Rows(1).ClearContents();
            this.protectsheet(_sheet);
        } else {
            _sheet.Rows(1).ClearContents();
        }
    }

    //清除第一列value值：
    this.clearfirstcol = function (_sheet) {
        if (!_sheet) {
            _sheet = this.activesheet();
        } else {
            this.poctrl.EnableExcelCalling();
        }
        if (_sheet.ProtectContents) {
            this.unprotectsheet(_sheet);
            _sheet.Columns(1).ClearContents();
            this.protectsheet(_sheet);
        }
        else {
            _sheet.Columns(1).ClearContents();
        }
    }

    //选定区域着色：
    this.setselectcolor = function (_color) {
        var sheet = this.activesheet();
        if (!_color) {
            _color = parseInt(xcolor, 16);
        }
        if (sheet) {
            sheet.Application.Selection.Interior.Color = _color;
        }
    }

    //清除选定区域颜色：
    this.clearselectcolor = function () {
        var sheet = this.activesheet();
        if (sheet) {
            with (sheet.Application.Selection.Interior) {
                Pattern = xlNone;
                //                debugger;
                //                if (this.version() >= 12) {
                TintAndShade = 0;
                PatternTintAndShade = 0;
                //                }
            }
        }
    }

    //清除指定sheet页单元格：
    this.clearsheet = function (_sheet) {
        if (!_sheet) {
            _sheet = this.activesheet();
        } else {
            this.poctrl.EnableExcelCalling();
        }
        var endcell = num2col(parseInt(this.maxcols(_sheet).Count)) + this.maxrows(_sheet).Count;
        this.unprotectsheet(_sheet);
        _sheet.Range("A1:" + endcell + "").Clear;
    }

    //解锁指定颜色区域(提高解锁效率)：
    //    this.lockbycolor = function (_color, _sheet) {
    ////        debugger;
    //        if (!_color) {
    //            _color = parseInt(xcolor, 16);
    //        }
    //        if (!_sheet) {
    //            _sheet = this.activesheet();
    //        } else {
    //            this.poctrl.EnableExcelCalling();
    //        }
    //        var usedrag = _sheet.UsedRange;
    //        this.unprotectsheet(_sheet);
    //        //判断锁定标记：
    //        if (_sheet.Cells(1, 1).Value && _sheet.Cells(1, 1).Value == 'locked') {
    //            this.protectsheet(_sheet);
    //        } else {
    //            usedrag.Locked = "True";
    //            this.application().FindFormat.Clear();
    //            this.application().FindFormat.Interior.Color = 13434828;
    //            var cel = usedrag.Find('', usedrag.Cells(1), xlFormulas, xlWhole, xlByRows, xlNext, false, false, true);
    //            if (cel != undefined) {
    //                var firstaddr = cel.Address;
    //                do {
    //                    cel = usedrag.Find('', cel, xlFormulas, xlWhole, xlByRows, xlNext, false, false, true);
    //                    if (cel != undefined) {
    //                        if (cel.MergeCells) {
    //                            cel.MergeArea.Locked = "False";
    //                        } else {
    //                            cel.Locked = "False";
    //                        }
    //                    } else {
    //                        break;
    //                    }
    //                } while (cel.Address != firstaddr)
    //            }
    //            this.application().FindFormat.Clear();
    //            this.application().FindFormat.Interior.Color = _color;
    //            var cel = usedrag.Find('', usedrag.Cells(1), xlFormulas, xlWhole, xlByRows, xlNext, false, false, true);
    //            if (cel != undefined) {
    //                var firstaddr = cel.Address;
    //                do {
    //                    cel = usedrag.Find('', cel, xlFormulas, xlWhole, xlByRows, xlNext, false, false, true);
    //                    if (cel != undefined) {
    //                        if (cel.MergeCells) {
    //                            cel.MergeArea.Locked = "False";
    //                        } else {
    //                            cel.Locked = "False";
    //                        }
    //                    } else {
    //                        break;
    //                    }
    //                } while (cel.Address != firstaddr)
    //            }
    //            this.application().FindFormat.Clear();
    //            this.protectsheet(_sheet);
    //        }
    //    }

    this.lockbycolor = function (_color, _sheet) {
        if (!_color) {
            _color = parseInt(xcolor, 16);
        }
        if (!_sheet) {
            _sheet = this.activesheet();
        } else {
            this.poctrl.EnableExcelCalling();
        }
        var usedrag = _sheet.UsedRange;
        this.unprotectsheet(_sheet);
        //判断锁定标记：
        //                debugger;
        if (this.getcustpro(_sheet, 'locked') == 'true') {
            this.protectsheet(_sheet);
        } else {
            usedrag.Locked = "True";
            this.application().FindFormat.Clear();
            this.application().FindFormat.Interior.ColorIndex = 35;
            this.application().FindFormat.Interior.PatternColorIndex = xlAutomatic;
            if (this.version() >= 12) {
                this.application().FindFormat.Interior.TintAndShade = 0;
                this.application().FindFormat.Interior.PatternTintAndShade = 0;
            }
            var cel = usedrag.Find('', usedrag.Cells(1), xlValues, xlPart, xlByRows, xlNext, false, false, true);
            if (cel != undefined) {
                var firstaddr = cel.Address;
                do {
                    cel = usedrag.Find('', cel, xlFormulas, xlPart, xlByRows, xlNext, false, false, true);
                    if (cel != undefined) {
                        if (cel.MergeCells) {
                            cel.MergeArea.Locked = "False";
                        } else {
                            cel.Locked = "False";
                        }
                    } else {
                        break;
                    }
                } while (cel.Address != firstaddr)
            }
            this.application().FindFormat.Clear();
            this.application().FindFormat.Interior.Color = _color;
            this.application().FindFormat.Interior.PatternColorIndex = xlAutomatic;
            if (this.version() >= 12) {
                this.application().FindFormat.Interior.TintAndShade = 0;
                this.application().FindFormat.Interior.PatternTintAndShade = 0;
            }
            var cel = usedrag.Find('', usedrag.Cells(1), xlValues, xlPart, xlByRows, xlNext, false, false, true);
            if (cel != undefined) {
                var firstaddr = cel.Address;
                do {
                    cel = usedrag.Find('', cel, xlFormulas, xlPart, xlByRows, xlNext, false, false, true);
                    if (cel != undefined) {
                        if (cel.MergeCells) {
                            cel.MergeArea.Locked = "False";
                        } else {
                            cel.Locked = "False";
                        }
                    } else {
                        break;
                    }
                } while (cel.Address != firstaddr)
            }
            this.application().FindFormat.Clear();
            this.application().FindFormat.Interior.Color = 13434828;
            this.application().FindFormat.Interior.PatternColorIndex = xlAutomatic
            if (this.version() >= 12) {
                this.application().FindFormat.Interior.TintAndShade = 0;
                this.application().FindFormat.Interior.PatternTintAndShade = 0;
            }
            var cel = usedrag.Find('', usedrag.Cells(1), xlValues, xlPart, xlByRows, xlNext, false, false, true);
            if (cel != undefined) {
                var firstaddr = cel.Address;
                do {
                    cel = usedrag.Find('', cel, xlFormulas, xlPart, xlByRows, xlNext, false, false, true);
                    if (cel != undefined) {
                        if (cel.MergeCells) {
                            cel.MergeArea.Locked = "False";
                        } else {
                            cel.Locked = "False";
                        }
                    } else {
                        break;
                    }
                } while (cel.Address != firstaddr)
            }
            this.application().FindFormat.Clear();
            this.protectsheet(_sheet);
        }
    }

    //解锁所有标签页指定颜色区域：
    this.lockallsheet = function (_color) {
        if (this.poctrl != null && this.poctrl.Document != null) {
            this.poctrl.EnableExcelCalling();
            var scount = this.poctrl.Document.Sheets.Count;
            for (var idx = 1; idx <= scount; idx++) {
                var sheet = this.poctrl.Document.Sheets(idx);
                dialogshow('锁定第' + idx.toString() + '标签页：【' + sheet.Name + '】数据......');
                this.lockbycolor(_color, sheet);
            }
        }
    }

    /// <summary>锁定当前所有标签页</summary>
    this.lockworkbook = function () {
        if (this.poctrl != null && this.poctrl.Document != null) {
            this.poctrl.EnableExcelCalling();
            var scount = this.poctrl.Document.Sheets.Count;
            for (var idx = 1; idx <= scount; idx++) {
                var sheet = this.poctrl.Document.Sheets(idx);
                var usedrag = sheet.UsedRange;
                dialogshow('完全锁定第' + idx.toString() + '标签页：【' + sheet.Name + '】数据......');
                this.unprotectsheet(sheet);
                usedrag.Locked = "True";
                this.protectsheet(sheet);
            }
        }
    }

    this.protectworkbook = function () {
        if (this.poctrl != null && this.poctrl.Document != null) {
            this.poctrl.EnableExcelCalling();
            this.poctrl.Document.Protect(xlProtectPassword, true, false);
        }
    }

    //解锁第一个标签页指定颜色区域：
    this.lockfirstsheet = function (_color) {
        this.poctrl.EnableExcelCalling();
        if (this.poctrl != null && this.poctrl.Document != null) {
            var sheet = this.poctrl.Document.Sheets(1);
            if (sheet) {
                this.lockbycolor(_color, sheet);
            }
        }
    }

    //获取当前活动单元格的值：
    this.getactcellval = function (_type, _sheet) {
        var res = '';
        if (!_sheet) {
            _sheet = this.activesheet();
        } else {
            this.poctrl.EnableExcelCalling();
        }
        if (!_type) {
            _type = 'f';
        }
        if (_type == 'v') {
            res = this.poctrl.Document.Application.ActiveCell.Value;
        }
        else if (_type == 'f') {
            res = this.poctrl.Document.Application.ActiveCell.Formula;
        }
        return res;
    }

    //根据json格式回写excel:
    this.writezone = function (_json, _yy, _nn, _jd, _fabs, _bnyy, _bnnn, _ysyf) {
        this.poctrl.EnableExcelCalling();
        if (this.poctrl != null && this.poctrl.Document != null) {
            this.unprotectallsheet();
            var icount = _json["count"];
            var idx = -1;
            for (var i = 0; i < icount; i++) {
                var jsonrow = _json["grids"][i];
                var sheet = this.getsheetbyname(jsonrow["name"]);
                if (sheet) {
                    var cel = sheet.Cells(parseInt(jsonrow["row"]), parseInt(jsonrow["col"]));
                    //设置区域计算单元格格式：
                    cel.NumberFormatLocal = jsonrow["nfl"];
                    if (jsonrow["gs"].indexOf('~~') >= 0)
                        cel.Value = setparam(jsonrow["gs"], _yy, _nn, _jd, _fabs, _bnyy, _bnnn, _ysyf);
                    else
                        cel.Formula = jsonrow["gs"];
                    cel.ClearComments();
                    if (cel.Formula.toString().indexOf('=') == 0) {
                        var comm = cel.AddComment('公式：\n' + insertFlag(jsonrow["gs"], '\n', 20));
                        if (!comm.Shape.TextFrame.AutoMargins) {
                            comm.Shape.TextFrame.AutoSize = 'True';
                        }
                    }
                }
            }
            this.protectallsheet();
        }
        return true;
    }

    //根据json格式回写excel行列属性:
    this.writerowcol = function (_json) {
        this.poctrl.EnableExcelCalling();
        if (this.poctrl != null && this.poctrl.Document != null) {
            var icount = _json["count"];
            this.unprotectallsheet();
            for (var i = 1; i <= this.poctrl.Document.Sheets.Count; i++) {
                var _s = this.getsheetbyidx(parseInt(i));
                this.clearfirstcol(_s);
                this.clearfirstrow(_s);
            }
            for (var i = 0; i < icount; i++) {
                var jsonrow = _json["grids"][i];
                var r = jsonrow["row"];
                var c = jsonrow["col"];
                var idx = jsonrow["idx"];
                var sheet = this.getsheetbyidx(parseInt(idx));
                if (sheet) {
                    sheet.Cells(parseInt(r), parseInt(c)).Formula = jsonrow["gs"];
                }
            }
            this.protectallsheet();
        }
        return true;
    }

    //在指定区域查找合适的单元格返回到数组中：
    this.getfindary = function (_rag, _findstr, _ary, _byroworcol) {
        _ary.clear();
        this.application().FindFormat.Clear();
        var cel = _rag.Find(_findstr, _rag.Cells(1), xlFormulas, xlWhole, _byroworcol, xlNext, false, false, false);
        if (cel != undefined) {
            var firstaddr = cel.Address;
            do {
                if (this.application().Intersect(_rag, cel) != null) {
                    cel = _rag.FindNext(cel);
                } else {
                    break;
                }
                if (cel != undefined) {
                    _ary.push(cel);
                } else {
                    break;
                }
            } while (cel.Address != firstaddr)
        }
    }

    //按行列属性存储：
    this.savedata = function (_mbdm, _fadm, _istrcc) {
        if (this.poctrl != null && this.poctrl.Document != null) {
            this.poctrl.EnableExcelCalling();
            var scount = this.poctrl.Document.Sheets.Count;
            //默认遍历所有标签页：
            var firstsheetidx = 1;
            var resjson = "grids:[";
            var icount = 0;
            //如果是投入产出模版填报则遍历除第一个标签页以后的所有标签页：
            if (_istrcc != undefined && _istrcc) {
                firstsheetidx = 2;
            }
            for (var idx = firstsheetidx; idx <= scount; idx++) {
                var sheet = this.poctrl.Document.Sheets(idx);
                dialogshow('获取第' + idx.toString() + '填报页：【' + sheet.Name + '】数据......');
                if (sheet) {
                    if (_mbdm) {
                        var colnum = this.colscnt(sheet);
                        var rownum = this.rowscnt(sheet);
                        var aryr = new Array();
                        var aryc = new Array();
                        this.getfindary(sheet.Range('A1:' + num2col(colnum) + '1'), '*', aryr, xlByColumns);
                        this.getfindary(sheet.Range('A1:A' + rownum.toString()), '*', aryc, xlByRows);
                        var totel = aryr.length * aryc.length;
                        try {
                            for (var i = 0; i < aryc.length; i++) {
                                for (var j = 0; j < aryr.length; j++) {
                                    var irow = parseInt(aryc[i].Row);
                                    var icol = parseInt(aryr[j].Column);
                                    var tempcel = sheet.Cells(irow, icol);
                                    if (tempcel.Value) {
                                        var grdjsonstr = aryc[i].Value.toString() + "," + aryr[j].Value.toString();
                                        var grdjson = grdjsonstr.replace(/:/g, "\":\"").replace(/,/g, "\",\"");
                                        grdjson = "{\"" + grdjson + "\"}";

                                        //此处判断是否为json字符串，如果不是则跳过：
                                        //                                        if (isJsonStr(grdjson)) {
                                        var json = JSON.parse(grdjson);
                                        if (json['JSDX'] != undefined && json['JSDX'].trim() != '' && json['ZYDM'] != undefined && json['ZYDM'].trim() != ''
                                        && json['CPDM'] != undefined && json['CPDM'].trim() != '' && json['SJDX'] != undefined && json['SJDX'].trim() != ''
                                        && json['XMFL'] != undefined && json['XMFL'].trim() != '') {
                                            dialogshow('', false, (parseInt(i + 1) * aryr.length + parseInt(j + 1)) * 100 / totel);
                                            var jsdx = json['JSDX'];
                                            //如果计算对象是保存字符型数据：
                                            if (jsdx.indexOf('|') >= 0) {
                                                icount++;
                                                if (resjson != "grids:[") {
                                                    resjson = resjson + ",";
                                                }
                                                var rowcolval = grdjsonstr + ",ZFVAL:" + tempcel.Value2 + ",SHEETNAME:" + sheet.Name;
                                                rowcolval = rowcolval.replace(/:/g, "\":\"").replace(/,/g, "\",\"").replace(/\|/g, "");
                                                resjson += "{\"" + rowcolval + "\"}";
                                                //如果保存的是数值类型则需要校验：
                                            } else {
                                                if (chkcell(sheet, irow, icol)) {
                                                    icount++;
                                                    if (resjson != "grids:[") {
                                                        resjson = resjson + ",";
                                                    }
                                                    var rowcolval = grdjsonstr + ",VAL:" + tempcel.Value2 + ",SHEETNAME:" + sheet.Name;
                                                    rowcolval = rowcolval.replace(/:/g, "\":\"").replace(/,/g, "\",\"");
                                                    resjson += "{\"" + rowcolval + "\"}";
                                                } else {
                                                    return null;
                                                }
                                            }
                                        }
                                    }
                                    //                                    }
                                }
                            }
                        } catch (err) {
                            if (sheet && tempcel) {
                                sheet.Activate();
                                alert('填报页【' + sheet.Name + '】单元格【' + tempcel.Address + '】模版行列属性解析出错\n\n请检查模版设置！');
                                //                                debugger;
                                //                                if (tempcel.MergeCells) {
                                //                                    tempcel.MergeArea.Select();
                                //                                } else if (tempcel.Hidden!=undefined&&tempcel.Hidden == "True") {
                                //                                    tempcel.Select();
                                //                                }
                            } else {
                                alert("模版行列属性解析出错\n\n请检查模版设置！");
                            }
                            return null;
                        }
                    }
                }
            }
            resjson += "]";
            if (icount == 0) {
                resjson = "({\"count\":" + icount.toString() + ",\"mbdm\":\"" + _mbdm + "\",\"fadm\":\"" + _fadm + "\"})";
            } else {
                resjson = "({\"count\":" + icount.toString() + ",\"mbdm\":\"" + _mbdm + "\",\"fadm\":\"" + _fadm + "\"," + resjson + "})";
            }
            return eval(resjson);
        }
    }

    //隐藏行：
    this.hidefirstrow = function (_sheet) {
        if (!_sheet) {
            _sheet = this.activesheet();
        } else {
            this.poctrl.EnableExcelCalling();
        }
        _sheet.Rows(1).Hidden = "True";
    }

    //隐藏列:
    this.hidefirstcol = function (_sheet) {
        if (!_sheet) {
            _sheet = this.activesheet();
        } else {
            this.poctrl.EnableExcelCalling();
        }
        for (var i = 1; i <= _sheet.UsedRange.Columns.Count; i++) {
            _sheet.UsedRange.Columns(i).Hidden = "False";
        }
        _sheet.Columns(1).Hidden = "True";
    }

    //隐藏当前所有标签页第一行，第一列：
    this.hideallrowcol = function () {
        this.poctrl.EnableExcelCalling();
        if (this.poctrl != null && this.poctrl.Document != null) {
            var scount = this.poctrl.Document.Sheets.Count;
            for (var idx = 1; idx <= scount; idx++) {
                var sheet = this.poctrl.Document.Sheets(idx);
                this.hidefirstcol(sheet);
                this.hidefirstrow(sheet);
            }
        }
    }

    //获取当前页面公式并返回json(通过find内置函数提高效率)：
    this.getgs = function (_yy, _nn, _jd, _fadm1, _fadm2, _fabs, _bnyy, _bnnn, _ysyf, _aryrag, _loginyy) {
        if (this.poctrl != null && this.poctrl.Document != null) {
            this.poctrl.EnableExcelCalling();
            var scount = this.poctrl.Document.Sheets.Count;
            var resjson = "\"grids\":[";
            var icount = 0;
            this.unprotectallsheet();
            for (var idx = 1; idx <= scount; idx++) {
                var sheet = this.poctrl.Document.Sheets(idx);
                dialogshow('获取第' + idx.toString() + '标签页：【' + sheet.Name + '】公式......');
                var usedrang = sheet.UsedRange;
                var celstr = '';
                this.application().FindFormat.Clear();
                var cel = usedrang.Find('*n_*', usedrang.Cells(1), xlFormulas, xlWhole, xlByRows, xlNext, false, true, false);
                if (cel != undefined) {
                    var firstaddr = cel.Address;
                    do {
                        cel = usedrang.FindNext(cel);
                        if (cel != undefined) {
                            if (cel.Formula) {
                                celstr = cel.Formula.toString().trim();
                                if (celstr.indexOf('n_') >= 0) {
                                    _aryrag.push(cel);
                                    icount++;
                                    if (resjson != "\"grids\":[") {
                                        resjson += ",";
                                    }
                                    celstr = celstr.replace(/n_/g, "");
                                    if (celstr.indexOf('=') == 0) {
                                        celstr = celstr.substring(1, celstr.length);
                                    }
                                    //公式中如果存在回车或换行符则替换：
                                    celstr = celstr.replace(/"/g, "\\\"").replace(/\r/g, '').replace(/\n/g, '');
                                    resjson += "{\"idx\":" + idx + ",\"row\":" + cel.Row.toString()
                                                                        + ",\"col\":" + cel.Column.toString() + ",\"gs\":\"" + celstr + "\"}";
                                    //                                    resjson += "{\"gs\":\"" + celstr + "\"}";
                                }
                            }
                        } else {
                            break;
                        }
                    } while (cel.Address != firstaddr)
                }
                replaceYYNNJD(sheet, _yy, _nn, _jd, _fabs, _bnyy, _bnnn, _ysyf);
            }
            this.protectallsheet();
            resjson += "]";
            resjson = "({\"count\":" + icount + ",\"yy\":\"" + _bnyy + "\",\"nn\":\"" + _bnnn
                          + "\",\"fadm\":\"" + _fadm1 + "\",\"fadm2\":\"" + _fadm2 + "\",\"fabs\":\""
                         + _fabs + "\",\"loginyy\":\"" + _loginyy + "\"," + resjson + "})";
            //            resjson = "({\"count\":" + icount + "," + resjson + "})";
            return eval(resjson);
        }
    }

    //回写解析后的结果到excel上(用数组解析提高回写效率)：
    this.setgs = function (_json, _aryrag) {
        if (this.poctrl != null && this.poctrl.Document != null) {
            var icount = _json["count"];
            this.poctrl.EnableExcelCalling();
            this.unprotectallsheet();
            for (var i = 0; i < icount; i++) {
                var gs = _json["grids"][i]["gs"];
                var gscom = insertFlag(gs, '\n', 20);
                _aryrag[i].Formula = gs;
                _aryrag[i].ClearComments();
                var comm = _aryrag[i].AddComment('公式：\n' + gscom);
                if (!comm.Shape.TextFrame.AutoMargins) {
                    comm.Shape.TextFrame.AutoSize = 'True';
                }
            }
            this.protectallsheet();
        }
        return true;
    }

    //插入和删除当前模版的投入产出数据：
    this.inserttrcc = function (_json, _sheet) {
        //判断是否为同一行：
        function isrow(_srcjson, _destjson) {
            if (_srcjson && _destjson) {
                return _srcjson['ZYDM'] == _destjson['ZYDM'] && _srcjson['LX'] == _destjson['LX'] && _srcjson['FADM'] == _destjson['FADM']
            && _srcjson['CPDM'] == _destjson['CPDM'] && _srcjson['ZZBCPDM'] == _destjson['ZZBCPDM'] && _srcjson['ZZCPDM'] == _destjson['ZZCPDM'];
            }
            return false;
        }
        if (!_sheet) {
            _sheet = this.activesheet();
        } else {
            this.poctrl.EnableExcelCalling();
        }
        this.unprotectsheet(_sheet);
        if (this.poctrl != null && this.poctrl.Document != null) {
            var icount = _json['count'];
            //先删除当前网格中不在数据库中的行，获取sheet页上有效的行数：
            for (var i = this.usedrowscnt(_sheet); i > 1; i--) {
                if (_sheet.Cells(i, 1).Value != undefined && _sheet.Cells(i, 1).Value.toString().trim() != "") {
                    var jsonsheetbm = eval('({' + _sheet.Cells(i, 1).Value + '})');
                    if (jsonsheetbm) {
                        var isexist = false;
                        //获取数据库中的bm：
                        for (var j = 1; j < icount + 1; j++) {
                            var jsondatarow = _json['grids'][j];
                            var jsondatabm = eval('({' + jsondatarow['bm'] + '})');
                            if (jsondatabm) {
                                if (isrow(jsonsheetbm, jsondatabm)) {
                                    isexist = true;
                                    break;
                                }
                            }
                        }
                        //如果不存在代表数据库中删除了模版信息,则删除相应的表格行：
                        if (!isexist) {
                            _sheet.Rows(i).Delete(xlUp);
                        }
                    }
                }
            }
            //插入网格上不存在的行：
            for (var i = 0; i <= icount; i++) {
                var jsonrow = _json['grids'][i];
                if (i == 0) {
                    writetrccrow(_sheet, jsonrow, i + 1);
                    continue;
                }
                var jsondatabm = eval('({' + jsonrow['bm'] + '})');
                if (jsondatabm) {
                    if (_sheet.Cells(i + 1, 1).Value != undefined && _sheet.Cells(i + 1, 1).Value.toString().trim() != "") {
                        var jsonsheetbm = eval('({' + _sheet.Cells(i + 1, 1).Value + '})');
                        if (jsonsheetbm) {
                            if (!isrow(jsondatabm, jsonsheetbm)) {
                                _sheet.Rows(i + 1).Insert();
                                _sheet.Rows(i + 1).Interior.Color = xlNone;
                                //写投入产出行
                                writetrccrow(_sheet, jsonrow, i + 1);
                            }
                        }
                    } else {
                        //写投入产出行
                        writetrccrow(_sheet, jsonrow, i + 1);
                    }
                }
            }
            //debugger;
            writetrccstyle(_sheet, (icount + 1).toString());
        }
        this.protectsheet(_sheet);
        return true;
    }

    //回写投入产出数据到excel上：
    this.inittrcc = function (_json, _sheet) {
        if (!_sheet) {
            _sheet = this.activesheet();
        } else {
            this.poctrl.EnableExcelCalling();
        }
        if (this.poctrl != null && this.poctrl.Document != null) {
            var icount = _json["count"];
            for (var i = 0; i < icount + 1; i++) {
                var jsonrow = _json["grids"][i];
                writetrccrow(_sheet, jsonrow, i + 1);
            }
            writetrccstyle(_sheet, (icount + 1).toString());
        }
        return true;
    }

    //根据投入产出当设置情况，对合计行添加合计sum公式:
    this.settrccsum = function (_sheet) {
        if (!_sheet) {
            _sheet = this.activesheet();
        } else {
            this.poctrl.EnableExcelCalling();
        }
        if (this.poctrl != null && this.poctrl.Document != null) {
            var rag = _sheet.UsedRange;
            var c = rag.Columns.Count;
            var r = rag.Rows.Count;
            this.unprotectsheet(_sheet);
            for (var i = 2; i <= r; i++) {
                if (_sheet.Cells(i, 1).Value === undefined) break;
                var rowjson = JSON.parse('{' + _sheet.Cells(i, 1).Value + '}');
                var lx = rowjson['LX'];
                if (lx == '0') {
                    var jsonres = getsumjson(_sheet, rowjson, i);
                    if (jsonres) {
                        //追加投入求和公式：
                        if (jsonres['trl'] != '') {
                            _sheet.Cells(i, 6).Formula = '=' + jsonres['trl'];
                        }
                        //追加产出求和公式：
                        if (jsonres['ccl'] != '') {
                            _sheet.Cells(i, 7).Formula = '=' + jsonres['ccl'];
                        }
                    }
                }
            }
            this.protectsheet(_sheet);
        }
        return true;
    }

    //将投入产出数据拼装成json：
    this.gettrccjson = function (_sheet) {
        var resjson = { "icount": 0, "grids": [] };
        if (!_sheet) {
            _sheet = this.activesheet();
        } else {
            this.poctrl.EnableExcelCalling();
        }
        if (this.poctrl != null && this.poctrl.Document != null) {
            var icount = 0;
            var rownum = this.rowscnt(_sheet);
            for (var j = 2; j <= rownum; j++) {
                //                debugger;
                if (_sheet.Cells(j, 1).Value && _sheet.Cells(j, 1).Value !== undefined && _sheet.Cells(j, 1).Value.toString().trim() != "") {
                    var rowjson = JSON.parse('{' + _sheet.Cells(j, 1).Value + '}');
                    switch (rowjson["LX"]) {
                        //合计                                                                                                                                                                        
                        case '0':
                            var badd = false;
                            if (rowjson["ZZBCPDM"] != undefined || rowjson["ZZCPDM"] != undefined) {
                                if (_sheet.Cells(j, 6).Value2 && _sheet.Cells(j, 6).Value2.toString().trim() != "") {
                                    if (chkcell(_sheet, j, 6)) {
                                        setJson(rowjson, "TRL", _sheet.Cells(j, 6).Value2);
                                        badd = true;
                                    }
                                    else return null;
                                }
                                if (_sheet.Cells(j, 7).Value2 && _sheet.Cells(j, 7).Value2.toString().trim() != "") {
                                    if (chkcell(_sheet, j, 7)) {
                                        setJson(rowjson, "CCL", _sheet.Cells(j, 7).Value2);
                                        badd = true;
                                    }
                                    else return null;
                                }
                                if (_sheet.Cells(j, 8).Value2 && _sheet.Cells(j, 8).Value2.toString().trim() != "") {
                                    if (chkcell(_sheet, j, 8)) {
                                        setJson(rowjson, "QC", _sheet.Cells(j, 8).Value2);
                                        badd = true;
                                    }
                                    else return null;
                                }
                                if (_sheet.Cells(j, 9).Value2 && _sheet.Cells(j, 9).Value2.toString().trim() != "") {
                                    if (chkcell(_sheet, j, 9)) {
                                        setJson(rowjson, "QM", _sheet.Cells(j, 9).Value2);
                                        badd = true;
                                    }
                                    else return null;
                                }
                                if (_sheet.Cells(j, 10).Value2 && _sheet.Cells(j, 10).Value2.toString().trim() != "") {
                                    if (chkcell(_sheet, j, 10)) {
                                        setJson(rowjson, "YK", _sheet.Cells(j, 10).Value2);
                                        badd = true;
                                    }
                                    else return null;
                                }
                                if (badd) {
                                    resjson.grids.push(rowjson);
                                    icount++;
                                }
                            }
                            break;
                        //投入：                                                                                                                                                                          
                        case '1':
                            if (_sheet.Cells(j, 6).Value2 && _sheet.Cells(j, 6).Value2.toString().trim() != "") {
                                //                                debugger;
                                if (chkcell(_sheet, j, 6)) {
                                    setJson(rowjson, "TRL", _sheet.Cells(j, 6).Value2);
                                    resjson.grids.push(rowjson);
                                    icount++;
                                }
                                else
                                    return null;
                            }
                            break;
                        //产出：                                                                                                                                                                          
                        case '2':
                            if (_sheet.Cells(j, 7).Value2 && _sheet.Cells(j, 7).Value2.toString().trim() != "") {
                                if (chkcell(_sheet, j, 7)) {
                                    setJson(rowjson, "CCL", _sheet.Cells(j, 7).Value2);
                                    resjson.grids.push(rowjson);
                                    icount++;
                                }
                                else return null;
                            }
                            break;
                        //损失：                                                                                                                                                                         
                        case '3':
                            if (_sheet.Cells(j, 7).Value2 && _sheet.Cells(j, 7).Value2.toString().trim() != "") {
                                if (chkcell(_sheet, j, 7)) {
                                    setJson(rowjson, "CCL", _sheet.Cells(j, 7).Value2);
                                    resjson.grids.push(rowjson);
                                    icount++;
                                }
                                else return null;
                            }
                            break;
                    }
                }
            }
            setJson(resjson, "count", icount);
        }
        return resjson;
    }

    //去除合计列
    //如果当前选择月份是12月份，隐藏剩余月份预计列
    this.hiddenmonthcol = function (_nn, _falb) {
        if (_nn == "12" && _falb == "1") {
            this.poctrl.EnableExcelCalling();
            for (var idx = 1; idx <= this.poctrl.Document.Sheets.Count; idx++) {
                var sheet = this.poctrl.Document.Sheets(idx);
                var usedrang = sheet.UsedRange.Rows(1);
                this.application().FindFormat.Clear();
                var cel = usedrang.Find('*SYYFYJ*', usedrang.Cells(1), xlFormulas, xlWhole, xlByRows, xlNext, false, true, false);
                if (cel != undefined) {
                    var firstaddr = cel.Address;
                    do {
                        cel = usedrang.FindNext(cel);
                        if (cel != undefined) {
                            if (cel.Formula) {
                                var address = cel.Address;
                                var LH = address.split('$')[1];
                                sheet.Columns(col2num(LH)).Hidden = "True";
                            }
                        }
                    } while (cel.Address != firstaddr)
                }
            }
        }
    }

    //添加自定义属性：
    this.addcustpro = function (_sheet, _name, _val) {
        //         debugger;
        if (null != _sheet && _sheet != undefined && null != _name && _name != undefined) {
            //如果存在该属性则添加
            if (this.getcustpro(_sheet, _name) == undefined) {
                _sheet.CustomProperties.Add(_name, _val);
            }
            //如果不存在该属性则设置
            else {
                for (var i = 1; i <= _sheet.CustomProperties.Count; i++) {
                    if (_sheet.CustomProperties.Item(i).Name == _name) {
                        _sheet.CustomProperties.Item(i).Value = _val;
                    }
                }
            }
        }
    }

    //获取自定义属性：
    this.getcustpro = function (_sheet, _name) {
        if (null != _sheet && _sheet != undefined && null != _name && _name != undefined) {
            for (var i = 1; i <= _sheet.CustomProperties.Count; i++) {
                if (_sheet.CustomProperties.Item(i).Name == _name) {
                    return _sheet.CustomProperties.Item(i).Value;
                }
            }
        }
    }
} 
