/*/app/admin/login.js*/
$(function () {
    function resetForm() {
        $("#txtUsername").val("");
        $("#txtPassword").val("");
        $("#txtUsername").focus();
    }

    //校验输入框状态
    $("#txtUsername").keyup(function () {
        if ($("#txtUsername").val() == "" || $("#txtUsername").val() == "请输入用户名") {
            $("#frmUsername").addClass(" has-error has-feedback");
        }
        else {
            $("#frmUsername").removeClass("has-error has-feedback");
            $("#frmUsername").addClass("has-success has-feedback");
        }
    });

    $("#txtPassword").keyup(function () {
        if ($("#txtPassword").val() == "" || $("#txtPassword").val() == "请输入用户名") {
            $("#frmPassword").addClass(" has-error has-feedback");
        }
        else {
            $("#frmPassword").removeClass("has-error has-feedback");
            $("#frmPassword").addClass("has-success has-feedback");
        }
    });

    $("#txtUsername").focus(function () {
        //获得焦点时，如果值为默认值，则设置为空  
        if ($(this).val() == vdefault) {
            $(this).val("");
        }
    });

    $("#txtUsername").blur(function () {
        //失去焦点时，如果值为空，则设置为默认值  
        if ($(this).val() == "") {
            $(this).val(vdefault);;
        }
    });

    $("#btnLogin").click(function () {
        Dialog.showWaitDialog("登陆中...", "小区管理");
        $.post("/DataAdmin/Login", {
            "Username": $("#txtUsername").val(),
            "Userpassword": $("#txtPassword").val()
        }, function (data) {
            Dialog.hideWaitDialog();
            Dialog.showAlertDialog(data.ServerMessage
                , "小区管理", function () {
                    if (data.Success) {
                        //需要跳转到管理界面
                        location.href = "/AdminUser/Main";
                        return;
                    }
                    if (data.ServerCode == 501) {
                        $("#txtUsername").focus();
                    }
                    else {
                        $("#txtPassword").focus();
                    }

                });


        }, "json");

    });

    $("#btnReset").click(resetForm);

    resetForm();

});