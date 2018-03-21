$(function () {
    function resetForm() {
        $("#txtTname").val("");
        $("#txtTinfo").val("");
        $("#txtTname").focus();
    }

    $("#btnReset").click(resetForm);

    $("#btnAdd").click(function () {
        Dialog.showWaitDialog("添加中...", "论坛管理");
        $.post("/DataAdminType/Add", {
            "Tname": $("#txtTname").val(),
            "Tinfo": $("#txtTinfo").val()
        }, function (data) {
            Dialog.hideWaitDialog();
            Dialog.showAlertDialog(data.ServerMessage, "论坛管理", function () {
                //如果应答正确需要查询数据
                Query();
            });
        }, "json");

    });

    function Query() {
        Dialog.showWaitDialog("数据查询中...", "论坛管理");
        $.post("/DataAdminType/Query", {}, function (data) {
            Dialog.hideWaitDialog();
            if (!data.Success) {
                Dialog.showAlertDialog(data.ServerMessage);
                return;
            }
            $("#tbTypes").html("");
            $.each(data.TypeList, function (i, v) {
                var tr;
                var td;
                var span;
                tr = $(document.createElement("tr"));
                td = $(document.createElement("td"));
                td.append(v.tname);
                tr.append(td);


                td = $(document.createElement("td"));
                td.append(v.tinfo);
                tr.append(td);

                var isenable = (v.isenable == 'y') ? "启用中" : "停用中";


                td = $(document.createElement("td"));
                td.append(isenable);
                tr.append(td);


                td = $(document.createElement("td"));
                td.append(v.createdate);
                tr.append(td);


                td = $(document.createElement("td"));
                var span = $(document.createElement("span"));
                span.attr("class", "btn btn-primary");
                span.click(function () {
                    //处理数据    github:js phthon java
                    $("#txtMTid").val(v.tid);
                    $("#txtMTname").val(v.tname);
                    $("#txtMTinfo").val(v.tinfo);
                    //select元素的值就是设置选中项
                    $("#txtMIsEnable").val(v.isenable);
                    Dialog.showCustomDialog($("#divModify"), "论坛管理");
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
        Dialog.showWaitDialog("保存中...", "论坛管理");
        $.post("/DataAdminType/Modify", {
            "Tid": $("#txtMTid").val(),
            "Tname": $("#txtMTname").val(),
            "Tinfo": $("#txtMTinfo").val(),
            "IsEnable": $("#txtMIsEnable").val()
        }, function (data) {
            Dialog.hideWaitDialog();
            if (!data.Success) {
                Dialog.showAlertDialog(data.ServerMessage, "论坛管理");
                return;
            }
            Dialog.hideCustomDialog();
            Query();
        },"json");
    });

    Query();
});