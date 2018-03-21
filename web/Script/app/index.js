//app/index.js
$(function () {
    //第一个参数是要显示在对话框中的jquery元素
    //Dialog.showCustomDialog($("#divCustom"), "简易论坛");

    //$("#spClose").click(function () {
    //    Dialog.hideCustomDialog();
    //});

    //Dialog.showWaitDialog("网站建设中...", "简易论坛");

    //<div class="col-md-3 col-sm-6">
    //        <div class="panel panel-primary ani-shark-div">
    //            <div class="panel-heading">
    //                <div class="panel-title">标题</div>
    //            </div>
    //            <div class="panel-body">
    //                <div>内容</div>
    //            </div>
    //            <div class="panel-footer">
    //                <div class="text-right text-danger">时间</div>
    //            </div>
    //        </div>
    //</div>

    function querySubjects(type) {
        //淡出，第一个参数是淡出时间(毫秒).第二个参数是淡出完成后要执行的function
        $("#divTypes").fadeOut(1000, function () {
            Dialog.showWaitDialog("查询中...", "论坛");
            $.post("/DataDefault/Query", {
                "Tid": type.tid
            }, function (data) {
                Dialog.hideWaitDialog();
                if (!data.Success) {
                    Dialog.showAlertDialog(data.ServerMessage, "论坛");
                    return;
                }
                //数据绑定
                $("#divSubjectInfo").html("");
                $.each(data.SubjectList, function (i, v) {
                    var divcol = $(document.createElement("div"));
                    divcol.attr("class", "col-md-3 col-sm-6");

                    var divpanel = $(document.createElement("div"));
                    divpanel.attr("class", "panel panel-danger ani-shark-div mr-5");
                    divcol.append(divpanel);

                    var divheading = $(document.createElement("div"));
                    divheading.attr("class", "panel-heading");

                    var divtitle = $(document.createElement("div"));
                    divtitle.attr("class", "panel-title");
                    divtitle.append(v.sname);
                    divheading.append(divtitle);
                    divpanel.append(divheading);

                    var divbody = $(document.createElement("div"));
                    divbody.attr("class", "panel-body");
                    var ahref = $(document.createElement("a"));
                    ahref.append(v.sinfo);
                    ahref.attr("href", "javascript:void(0);");
                    ahref.click(function () {
                        //alert(v.sid);
                        location.href = "/Subject?tid="+v.sid;
                    });
                    divbody.append(ahref);
                    divpanel.append(divbody);

                    var divfooter = $(document.createElement("div"));
                    divfooter.attr("class", "panel-footer");
                    var divdata = $(document.createElement("div"));
                    divdata.attr("class", "text-right text-danger");
                    divdata.append(v.createdate);
                    divfooter.append(divdata);
                    divpanel.append(divfooter);


                    $("#divSubjectInfo").append(divcol);
                });

                $("#spType").html(type.tname);
                $("#divSubjects").fadeIn(1000);
            }, "json");

        });
    }

    $("#btnBack").click(function () {
        $("#divSubjects").fadeOut(1000, function () {
            $("#divTypes").fadeIn(1000);
        });
    });

    function query() {
        Dialog.showWaitDialog("查询中...", "论坛");
        $.post("/DataDefault/Index", {}, function (data) {
            Dialog.hideWaitDialog();
            if (!data.Success) {
                Dialog.showAlertDialog(data.ServerMessage, "论坛");
                return;
            }
            $("#divTypes").html("");
            $.each(data.TypeList, function (i, v) {
                var divcol = $(document.createElement("div"));
                divcol.attr("class", "col-md-3 col-sm-6");

                var divpanel = $(document.createElement("div"));
                divpanel.attr("class", "panel panel-primary ani-shark-div mr-5");
                divcol.append(divpanel);

                var divheading = $(document.createElement("div"));
                divheading.attr("class", "panel-heading");

                var divtitle = $(document.createElement("div"));
                divtitle.attr("class", "panel-title");
                divtitle.append(v.tname);
                divheading.append(divtitle);
                divpanel.append(divheading);

                var divbody = $(document.createElement("div"));
                divbody.attr("class", "panel-body");
                var ahref = $(document.createElement("a"));
                ahref.append(v.tinfo);
                ahref.attr("href", "javascript:void(0);");
                ahref.click(function () {
                    querySubjects(v);
                });
                divbody.append(ahref);
                divpanel.append(divbody);

                var divfooter = $(document.createElement("div"));
                divfooter.attr("class", "panel-footer");
                var divdata = $(document.createElement("div"));
                divdata.attr("class", "text-right text-danger");
                divdata.append(v.createdate);
                divfooter.append(divdata);
                divpanel.append(divfooter);


                $("#divTypes").append(divcol);
            });
        }, "json");
    }
    query();
});