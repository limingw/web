$(function () {
    var querystring = location.href;
    //substring(截取索引开始字符)"abc".substring(1)=="bc";indexof()查询字符
    querystring = querystring.substring(querystring.indexOf("?") + 1);
    var iid = querystring = querystring.substring(4);
    console.log("iid的值是：" + iid);

    //var pageInfo = { "PageSize": 3, "PageNumber": 1 };
    //if (pageInfo.PageNumber <= 1) {
    //    $("#btnPre").click = false;
    //}
    //else {
    //    $("#btnPre").click(function () {
    //        pageInfo.PageNumber = pageInfo.PageNumber - 1;
    //        query();
    //    });
    //}
    //if (pageInfo.PageNumber >= pageInfo.PageCount) {
    //    $("#btnNext").click(function () {
    //        pageInfo.PageNumber = pageInfo.PageNumber + 1;
    //        query();
    //    });
    //}

    var pageSize = 3;
    var step = 3;

    //if (pageSize <= 3) {
    //    $("#btnMore").hide();
    //}
    //else {
        
        $("#btnMore").click(function () {
            pageSize += step;
            query();
        });
    //}

    //if (pageInfo.PageSize >= 6) {
    //    $("#divMore").hide();
    //    $("#divPage").show();
    //    query();
    //} else if (pageInfo.PageSize > 3 && pageInfo.PageSize < 6) {
    //    $("#divMore").show();
    //    $("#btnMore").click(function () {
    //        pageInfo.PageSize += step;
    //        query();
    //    });
    //}
    //else if (pageInfo.PageSize <= 3) {
    //    $("#divMore").hide();
    //    $("#divPage").hide();
    //    query();
    //}

    function query() {
        Dialog.showWaitDialog("查询中...", "论坛");
        $.post("/DataInfo/Index", {
            "Iid": iid,
            "PageInfo.PageSize": pageSize
            //"PageInfo.PageNumber": pageInfo.PageNumber
        }, function (data) {
            Dialog.hideWaitDialog();
            if (!data.Success) {
                Dialog.showAlertDialog(data.ServerMessage, "论坛");
                return;
            }
            //pageInfo = data.PageInfo;   //同步成服务器端的值
            //$("#spPage").html("总记录/总页数当前页:" + pageInfo.PageCount + "/" + pageInfo.PageNumber);
            console.log(data.InfoData);
            $("#divTitle").html(data.InfoData.title);
            $("#divBody").html(data.InfoData.content.replace(/[\r\n]/g, "<br />"));  //正则表达式/后面的g表示匹配的结果全部替换  /1\d[10]/.test("电话号码");简单的电话号码校正
            $("#spDateInfo").html(data.InfoData.nickname + "-" + data.InfoData.createdate);
            $("#divReturns").html("");
            $.each(data.ReturnsList, function (i, v) {
                var span = $(document.createElement("span"));
                span.attr("class", "btn btn-primary");
                span.append("删除");
                span.click(function () {

                });

                var div = $(document.createElement("div"));
                div.html("&nbsp;" + "<br />" + v.nickname + "说：" + v.content + "<br />" + v.createdate);

                var divbtn = $(document.createElement("div"));
                divbtn.attr("class", "pull-right");
                divbtn.html(span);

                $("#divReturns").append(div);
            });
        }, "json");
    }
    $("#btnAddReturn").click(function () {
        Dialog.showWaitDialog("回复中...", "论坛");
        $.post("/DataInfo/AddReturn", {
            "Iid": iid,
            "Content": $("#txtRContent").val()
        }, function (data) {
            Dialog.hideWaitDialog();
            if (data.Success) {
                query();
                return;
            }
            Dialog.showAlertDialog(data.ServerMessage, "论坛");
        }, "json");
    });
    query();
});