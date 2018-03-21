$(function () {
    function resetForm() {
        $("#txtTname").val("");
        $("#txtTinfo").val("");
        $("#txtTname").focus();
    }

    $("#btnReset").click(resetForm);

    $("#btnAdd").click(function () {
        Dialog.showWaitDialog("添加中...", "小区管理");
        $.post("/DataAdminType/Add", {
            "Yezhuid": $("#yezhuid").val(),
            "Yezhuhousenumber": $("#yezhuhousenumber").val(),
            "Yezhuname": $("#yezhuname").val(),
            "Yezhumember": $("#yezhumember").val()
        }, function (data) {
            Dialog.hideWaitDialog();
            Dialog.showAlertDialog(data.ServerMessage, "小区管理", function () {
                //如果应答正确需要查询数据
                Query();
            });
        }, "json");

    });

    function Query() {
        Dialog.showWaitDialog("数据查询中...", "小区管理");
        $.post("/DataYezhu/Query", {}, function (data) {
            Dialog.hideWaitDialog();
            if (!data.Success) {
                Dialog.showAlertDialog(data.ServerMessage);
                return;
            }
            $("#tbTypes").html("");
            $.each(data.ReturnsList, function (i, v) {
                var tr;
                var td;
                var span;
                tr = $(document.createElement("tr"));
                td = $(document.createElement("td"));
                td.append(v.yezhuid);
                tr.append(td);


                td = $(document.createElement("td"));
                td.append(v.yezhuhousenumber);
                tr.append(td);

                
                td = $(document.createElement("td"));
                td.append(v.yezhuname);
                tr.append(td);


                td = $(document.createElement("td"));
                td.append(v.yezhudate);
                tr.append(td);

                td = $(document.createElement("td"));
                td.append(v.yezhumember);
                tr.append(td);


                td = $(document.createElement("td"));
                var span = $(document.createElement("span"));
                span.attr("class", "btn btn-primary");
                span.click(function () {
                    //处理数据    github:js phthon java
                    $("#yezhuhousenumber").val(v.yezhuhousenumber);
                    $("#yezhumember").val(v.yezhumember);
                    Dialog.showCustomDialog($("#divModify"), "小区管理");
                });
                span.append("修改");
                td.append(span);
                tr.append(td);

                $("#tbTypes").append(tr);
            });
        }, "json");
    }

    $("#btnCancel").click(function () {
        Dialog.hideCustomDialog($("#divModify"));
    });

    $("#btnSave").click(function () {
        Dialog.showWaitDialog("保存中...", "小区管理");
        $.post("/DataAdminType/Modify", {
            "Yezhuhousenumber": $("#yezhuhousenumber").val(),
            "Yezhumember": $("#yezhumember").val()
        }, function (data) {
            Dialog.hideWaitDialog();
            if (!data.Success) {
                Dialog.showAlertDialog(data.ServerMessage, "小区管理");
                return;
            }
            Dialog.hideCustomDialog();
            Query();
        }, "json");
    });

    Query();
});