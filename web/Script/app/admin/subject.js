$(function () {
    $("#btnAdd").click(function () {
        //添加需要重置
        $("#yezhuid").val("");
        $("#number").val("");
        $("#name").val("");
        $("#member").val("");
        Dialog.showCustomDialog($("#MyDialog"), "小区管理");
    });

    function toModify(subject) {
        $("#number").val(subject.Yezhuhousenumber);
        $("#member").val(subject.Yezhumember);
        $("#name").hide();
        $("#yezhuid").hide();
        Dialog.showCustomDialog($("#MyDialog"), "小区管理");
    }

    $("#btnCancel").click(function () {
        Dialog.hideCustomDialog();
    });

    

    $("#btnSave").click(function () {
        Dialog.showWaitDialog("保存中...", "小区管理");
        var param = {
            "Yezhuid": $("#yezhuid").val(),
            "Yezhuhousenumber": $("#number").val(),
            "Yezhuname": $("#name").val(),
            "Yezhumember": $("#member").val()
        };
        var path = "/DataYezhu/Add";
        //判断是否为修改模式
        if ($("#yezhuid").val() != "") {
            path = "/DataYezhu/Modify";
            param.Yezhuid = $("#yezhuid").val();
        }
        $.post(path, param, function (data) {
            Dialog.hideWaitDialog();
            if (!data.Success) {
                Dialog.showAlertDialog(data.ServerMessage, "小区管理");
                return;
            }
            //添加成功需要查询
            Dialog.showAlertDialog("添加成功", "小区管理", function () {
                Dialog.hideCustomDialog();
                query();
            });
        }, "json");
    });

    function resetForm() {
        $("#yezhuid").val("");
        $("#number").val("");
        $("#yezhuid").focus();
    }

    var pageInfo = { "PageSize": 3, "PageNumber": 1 };
    $("#btnPre").click(function () {
        pageInfo.PageNumber = pageInfo.PageNumber - 1;
        query();
    });
    $("#btnNext").click(function () {
        pageInfo.PageNumber = pageInfo.PageNumber + 1;
        query();
    });

    function query() {
        Dialog.showWaitDialog("查询中...", "论坛管理");
        $.post("/DataAdminSubject", {
            "PageInfo.PageSize": pageInfo.PageSize,
            "PageInfo.PageNumber": pageInfo.PageNumber
        }, function (data) {
            Dialog.hideWaitDialog();
            if (!data.Success) {
                Dialog.showAlertDialog(data.ServerMessage, "论坛管理");
                return;
            }
            pageInfo = data.PageInfo;   //同步成服务器端的值
            $("#spPage").html("总记录/总页数当前页:" + pageInfo.PageCount + "/" + pageInfo.PageNumber);
            //绑定分类信息
            $("#txtTid").html("");
            $.each(data.TypeList, function (i, v) {
                var option = $(document.createElement("option"));
                option.attr("value", v.tid);
                option.append(v.tname);
                $("#yezhuid").append(option);
            });
            //绑定主题信息
            $("#tbSubject").html("");
            $.each(data.SubjectList, function (i, v) {
                var tr, td, span;
                tr = $(document.createElement("tr"));
                td = $(document.createElement("td"));
                td.append(v.tname);
                tr.append(td);

                td = $(document.createElement("td"));
                td.append(v.sname);
                tr.append(td);

                td = $(document.createElement("td"));
                td.append(v.sinfo);
                tr.append(td);

                td = $(document.createElement("td"));
                td.append(v.createdate);
                tr.append(td);

                td = $(document.createElement("td"));
                span = $(document.createElement("span"));
                span.attr("class","btn btn-primary");
                span.append("修改");
                span.click(function () {
                    toModify(v);
                });
                td.append(span);
                tr.append(td);

                $("#tbSubject").append(tr);
            });
        }, "json");
    }
    query();
});