$(function () {
    var querystring = location.href;
    //substring(截取索引开始字符)"abc".substring(1)=="bc";indexof()查询字符
    querystring = querystring.substring(querystring.indexOf("?") + 1);
    var sid = querystring = querystring.substring(4);
    console.log("sid的值是：" + sid);
    //需要去服务器查询主题(sid)对应的数据

    var pageInfo = { "PageSize": 3, "PageNumber": 1 };
    if (pageInfo.PageNumber <= 1) {
        $("#btnPre").click = false;
    }
    else {
        $("#btnPre").click(function () {
            pageInfo.PageNumber = pageInfo.PageNumber - 1;
            query();
        });
    }
    if (pageInfo.PageNumber >= pageInfo.PageCount) {
        $("#btnNext").click(function () {
            pageInfo.PageNumber = pageInfo.PageNumber + 1;
            query();
        });
    }


    function query() {
        Dialog.showWaitDialog("查询中", "论坛");
        $.post("/DataSubject/Index", { "Sid": sid }, function (data) {
            Dialog.hideWaitDialog();
            if (!data.Success) {
                Dialog.showAlertDialog(data.ServerMessage, "论坛");
                return;
            }
            pageInfo = data.PageInfo;   //同步成服务器端的值
            $("#spPage").html("总记录/总页数当前页:" + pageInfo.PageCount + "/" + pageInfo.PageNumber);
            //绑定分类信息
            $("#spSubject").html(data.Subject.sname + "(" + data.Subject.sinfo + ")");

            $("#tbInfos").html("");
            $.each(data.InfoList, function (i, v) {
                var tr, td;
                tr = $("<tr></tr>");
                td = $("<td></td>");
                td.append(v.tname);
                tr.append(td);

                td = $("<td>" + v.sname + "</td>");
                td.append(v.sname);
                tr.append(td);

                td = $("<td></td>");
                td.append(v.nickname);
                tr.append(td);

                td = $("<td></td>");
                td.append(v.title);
                tr.append(td);

                td = $("<td></td>");
                var ahref = $(document.createElement("a"));
                ahref.append(v.content);
                ahref.attr("href", "/Info/Index?iid=" + v.iid);
                td.append(ahref);
                tr.append(td);

                td = $("<td></td>");
                td.append(v.createdate);
                tr.append(td);

                $("#tbInfos").append(tr);
            });
        }, "json")
    }

    $("#btnAddInfo").click(function () {
        if (!window.UserIsLogin) {
            Dialog.showAlertDialog("请先登陆！", "论坛");
            return;
        }
        Dialog.showCustomDialog($("#dialogAddInfo"), "论坛");
    });

    $("#btnSaveInfo").click(function () {
        Dialog.showWaitDialog("发帖中...", "论坛");
        $.post("/DataSubject/AddInfo", {
            "Sid": sid,
            "Title": $("#txtTitle").val(),
            "Content": $("#txtContent").val()
        }, function (data) {
            Dialog.hideWaitDialog();
            if (data.Success) {
                Dialog.hideCustomDialog();
                query();
                return;
            }
            Dialog.showAlertDialog(data.ServerMessage, "论坛");
        }, "json");
    });

    $("#btnCancel").click(function () {
        Dialog.hideCustomDialog();
    });
    query();
});