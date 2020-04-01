export let _globel = {
    // 返回
    history_back: function (dom) {
        $('body').on('touchend', dom, function () {
            window.history.back();
        })
    },
    // 图片默认自适应高度
    imgHeightInit: function (p_width,p_height,c_width) {
        if(c_width == undefined){
            c_width = $(window).width()
        }
        return p_height * c_width / p_width;
    },
    banner: function (type) {
        var _s = '';
        var $div = $('<div  data-am-widget="slider" class="banner-out-box am-header-fixed am-slider am-slider-a1" data-am-slider=\'{&quot;directionNav&quot;:false}\'></div>');
       
        var $ul = $('<ul class="am-slides"></ul>');
        if (type) {
            var result = $.ajax({
                url: "../../service/GetInformationList2.aspx?type_code=" + type,
                type: "get",
                dataType: "json",
                async: false

            }).responseJSON;
            if (result.statusCode == "200" && result.data.imgList) {
                for (var i = 0; i < result.data.imgList.length; i++) {
                    var advert = "";
                    if (result.data.imgList[i].ext1=="1") {
                        advert = "<span class='ad' >广告</span>";
                    }
                    var $li = $("<li style='position: relative'></li>");
                    var id = result.data.imgList[i].id;
                    var $a = $('<a  href="' + (result.data.imgList[i].gotopage ? result.data.imgList[i].gotopage : '#') + '"></a>');
                    $a.attr("data-id", id);
                    $a.append('<img onerror="$(this).remove()" src="' + result.data.imgList[i].app_img_url + '">');
                    $li.append($a);$li.append(advert);
                    $ul.append($li);
                    $a.on("click", function () {
                        var id = $(this).attr("data-id");
                        $.ajax({
                            url: "../../service/AddClickData.aspx?id=" + id,
                            type: "get",
                            dataType: "json",
                            async: true, success: function (result) {

                                console.log(result);
                            }
                        });
                    });
                }
            }
            else {
                var $li1 = $("<li style='position: relative'></li>");
                $li1.append('<img onerror="$(this).remove()" src="../lib/i/banner01.jpg">');

                $ul.append($li1);
                $li1.on("click", function () {
                    $.ajax({
                        url: "../../service/AddClickData.aspx?id=111"  ,
                        type: "get",
                        dataType: "json",
                        async: true
                    });
                });
            }
        }
        else {
            var $li2 = $("<li style='position: relative'></li>");
            $li2.append('<img onerror="$(this).remove()" src="../lib/i/banner01.jpg">');

            $ul.append($li2);
            $li2.on("click", function () {
                $.ajax({
                    url: "../../service/AddClickData.aspx?id=111" ,
                    type: "get",
                    dataType: "json",
                    async: true
                });
            });
        }
        $div.append($ul);
        $('body').prepend($div);
        $(".banner-out-box").css({ "height": _globel.imgHeightInit(1240, 500) + "px", "overflow": "hidden" });           
    },
    /**
     * 页面跳转
     * @param url 不填写本页刷新
     */
    jumpPage:function(url){
        if(!url){
            window.location.reload();
        }else {
            window.location.href=url
        }
    },
    alert_pop: function (tip,url) {
        $('body').append('<div class="alert-pop cCommonAlert"></div>');
        var $alert = '';
        $alert += '<div class="pop-main"><p class="tip">'+ tip +'</p>';
        if(url){
            $alert += '<a href="'+ url +'" class="sure c-white-btn">确定</a></div>';
        } else {
            $alert += '<a class="sure c-white-btn close">确定</a></div>';
        }
        $('.alert-pop')
            .html($alert)
            .on('click','.close', function () {
                $('.alert-pop').remove()
            })
    },
    change_alert: function (tip) {
        $('body').append('<div class="change-alert-pop cCommonAlert"></div>');
        var $alert = '';
        $alert += '<div class="pop-main"><p class="tip">'+ tip +'</p>';
        $alert += '<a class="c-white-btn close">否</a>';
        $alert += '<a class="sure c-white-btn">是</a></div>';
        $('.change-alert-pop').html($alert)
    },
    tip: function (message, close_time) {
        var $html = '<div id="cart-tips-pop" class="cart-tip-pop"> <div 		class="cart-tip-shadow"></div> <p class="cart-tip">' + message + '</p> </div>';
        $('body').append($html);
        var _time = close_time ? close_time : 900;
        setTimeout(function () {
            $(".cart-tip-pop").remove();
        }, _time);
    },
    get_url: function (key) {
        var reg = new RegExp("(^|&)"+ key +"=([^&]*)(&|$)");
        var r   = window.location.search.substr(1).match(reg);
        if (r != null) {
            return  decodeURI(r[2]);
        }
        return null;
    },
    isPhone:function(phone){
        if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){
            return false;
        } else{
            return true;
        }
    },
    isIDCard: function (idnumber) {
        if (!idnumber || idnumber.length < 0) return false;
        if (idnumber.length == 15) return false;
        if (idnumber.length != 18) return false;
        idnumber = idnumber.toUpperCase();
        if (!/^\d{17}([\dx])$/i.test(idnumber)) return false;
        var address = "11x22x35x44x53x12x23x36x45x54x13x31x37x46x61x14x32x41x50x62x15x33x42x51x63x21x34x43x52x64x65x71x81x82x91";
        var twostr = idnumber.substr(0, 2);
        if (address.indexOf(twostr) < 0) return false;
        var year = idnumber.substr(6, 4);
        if (year <= 1900 || year >= (new Date()).getFullYear()) return false;
        var m = idnumber.substr(10, 2) * 1;
        if (m < 1 || m > 12) return false;
        var d = idnumber.substr(12, 2) * 1;
        if (d < 1 || d > 31) return false;
        var arrVarifyCode = "1,0,X,9,8,7,6,5,4,3,2".split(",");
        var Wi = "7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2".split(",");
        var sum = 0;
        for (var i = 0; i < 17; i++) {
            var num = idnumber.substr(i, 1) * 1;
            sum += (Wi[i] * 1) * num;
        }
        var n = sum % 11;
        if (arrVarifyCode[n] != idnumber.substr(17, 1)) return false;
        return true;
    },
    //加载H5动画
    html_load: '<div class="h5-loading"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>',
    loadDivShow:function(){
        $("body").append('<div class="loadingBox"><div class="box">'+ap.html_load+'</div></div>');
    },
    // 协议
    agreementPage:function (type,dom) {
        if (!dom) { dom = ".cCommonAgreeBox";};
        var __data = {};
        switch (type) {
            //邮递须知
            case "mail": __data = {
                title: "门票快递服务条款&免责申明",
                h1: "欢迎阅读“聚航 airshow”航空开放活动(以下简称“本活动”)门票快递服务条款，其阐述之内容和条件适用于您使用本公众号提供的各类活动门票快递服务。 ",
                _inner: {
                    0: {
                        h2: "1、服务条款的确认",
                        p_box: [
                            "您点击服务条款页面下的“同意协议”按钮，即视为您已阅读、了解并完全同意服务条款中的各项内容以及线上门票快递服务须知相关内容，包括本公众号对服务条款、快递须知所作的任何修改。除另行明确声明外，本公众号任何服务范围或功能的变化均受服务条款约束。",
                        ]
                    },
                    1: {
                        h2: "2、服务条款的修改",
                        p_box: [
                            "本公众号在必要时可修改服务条款，并在公众号进行公告，一经公告，立即生效。如您继续使用服务，则视为您已接受修订的服务条款。"
                        ]
                    },
                    2: {
                        h2: "3、用户注册",
                        p_box: [
                            "考虑到本公众号用户服务的重要性，您同意在注册时提供真实、完整及准确的个人资料，并及时更新。",
                            "如您提供的资料不准确，或本公众号有合理的理由认为该资料不真实、不完整、不准确，本公众号有权暂停或终止您的注册身份及资料，并拒绝您使用本公众号的服务。"
                        ]
                    },
                    3: {
                        h2: "4、用户资料及保密",
                        p_box: [
                            "选择快递服务时，请您选择填写并按页面提示提交相关信息。您负有对该用户名下发生的所有活动承担责任。您同意快递服务的使用由您自己承担风险。本公众号不会向您所使用服务所涉及相关方之外的其他方公开或透露您的个人资料，法律法规规定除外。 ",
                        ]
                    },
                    4: {
                        h2: "5、责任的免除和限制",
                        p_box: [
                            "属于下列情况的，不承担赔偿责任",
                            "（1）因不可抗拒因素造成邮件时限延误或物品损失的（“不可抗拒因素”指不可预见、不可避免和不可克服的客观情况，包括海关清检、航班延误、战争、地震、台风、洪水、火灾等其他类似事件）。",
                            "（2）投交时邮件外包装完好，封条完好，无破损拆动痕迹，且收件人已按规定手续签收，事后收件人发现内件短少或损毁的。",
                            "（3）投交时邮件实际重量和包装箱上注明的重量相符，且收件人已按规定手续签收，事后收件人发现内件短少或损毁的。",
                            "（4）收件人单位或住宅小区不允许投递人员入内，因代收部门内部的行为或疏忽，造成邮件时限延误或物品遗失的。",
                            "（5）收件人地址的亲友代收的。",
                            "（6）由于客户的责任造成邮件损失或延误的。",
                            "（7）客户自交寄邮件之日起至查询期满未查询又未提出赔偿要求的（自邮件交寄之日起三个月）。",
                            "（8）根据最后一条物流记录时间为准，若未收到包裹，或者有其他异常情况，例如：空包，少件，丢件等，特殊情况除外（例如清关未出），必须在1个月以内联系快递公司进行赔付处理；若超过1个月，将无法受理投诉赔付。",
                        ]
                    },
                    5: {
                        h2: "6、拒绝提供担保",
                        p_box: [
                            "对以下情形不做任何担保，包括但不仅限于：",
                            "(1)服务一定能满足您的要求。",
                            "(2)服务不会受中断。",
                            "(3)服务的安全性、及时性、完整性和准确性。",
                            "(4)服务所涉及相关方的服务。",
                            "(5)您从本公众号收到口头或书面的意见或信息。",
                            "(6)他人使用与您相同的身份信息邮寄",
                        ]
                    },
                    6: {
                        h2: "7、保障",
                        p_box: [
                            "您同意保障和维护本公众号的利益，并承担您或其他人使用您的用户资料造成本公众号或任何第三方的损失或损害的赔偿责任。",
                        ]
                    },
                    7: {
                        h2: "8、法律适用和管辖",
                        p_box: [
                            "本服务条款之效力、解释、变更、执行与争议解决均适用中华人民共和国法律。因您使用本公众号而导致的争议，您同意接受本公众号注册地人民法院的管辖。本公众号享有对服务条款的最终解释与修改权 。"
                        ]
                    }
                }
            };break;
            //领取须知
            case "receive": __data = {
                title: "免责协议",
                h1: "欢迎阅读“聚航 airshow”航空开放活动(以下简称“本活动”)门票预约服务条款，其阐述之内容和条件适用于您使用本公众号提供的各类活动订票服务。",
                _inner: {
                    0: {
                        h2: "1、服务条款的确认",
                        p_box: [
                            "您点击服务条款页面下的“同意协议”按钮，即视为您已阅读、了解并完全同意服务条款中的各项内容，包括本公众号对服务条款所作的任何修改。除另行明确声明外，本公众号任何服务范围或功能的变化均受服务条款约束。",
                        ]
                    },
                    1: {
                        h2: "2、服务条款的修改",
                        p_box: [
                            "本公众号在必要时可修改服务条款，并在公众号进行公告，一经公告，立即生效。如您继续使用服务，则视为您已接受修订的服务条款。",
                        ]
                    },
                    2: {
                        h2: "3、用户注册",
                        p_box: [
                            "考虑到本公众号用户服务的重要性，您同意在注册时提供真实、完整及准确的个人资料，并及时更新。",
                            "如您提供的资料不准确，或本公众号有合理的理由认为该资料不真实、不完整、不准确，本公众号有权暂停或终止您的注册身份及资料，并拒绝您使用本公众号的服务。"
                        ]
                    },
                    3: {
                        h2: "4、用户资料及保密",
                        p_box: [
                            "预约门票时，请您选择填写并按页面提示提交相关信息。您负有对该用户名下发生的所有活动承担责任。本公众号不会向您所使用服务所涉及相关方之外的其他方公开或透露您的个人资料，法律法规规定除外。",
                        ]
                    },
                    4: {
                        h2: "5、责任的免除和限制",
                        p_box: [
                            "(1)遇以下情况，本公众号不承担任何责任，包括但不仅限于： ①因不可抗力、系统故障、通讯故障、网络拥堵、供电系统故障、恶意攻击等造成本公众号未能及时、准确、完整地提供服务。 ②无论在任何原因下，您通过使用本公众号上的信息或由本公众号链接的其他公众号上的信息，或其他与本公众号链接的公众号上的信息所导致的任何损失或损害。 ③关注用户被暂停使用以及因此导致已预约观展门票不能在本公众号邮寄、领取等后果。",
                            "(2)本公众号负责对本公众号上的信息进行审核与更新，但并不就信息的时效性、准确性以及服务功能的完整性和可靠性承担任何义务和赔偿责任。",
                            "(3)如用户利用系统差错、故障或其他原因导致的漏洞，损害本公众号及任何第三方的权益，本公众号将终止该用户资格，并保留追究法律责任的权利。",
                            "(4)如果本公众号发现有影响用户信息安全的行为，本公众号有权对用户信息实施保护。必要时用户需经重新验证身份后方可继续使用。",
                        ]
                    },
                    5: {
                        h2: "6、拒绝提供担保",
                        p_box: [
                            "本公众号对以下情形不做任何担保，包括但不仅限于：",
                            "(1)服务一定能满足您的要求。",
                            "(2)服务不会受中断。",
                            "(3)服务的安全性、及时性、完整性和准确性。",
                            "(4)服务所涉及相关方的服务。",
                            "(5)您从本公众号收到口头或书面的意见或信息。",
                            "(6)您所提供的身份信息一定被通过。",
                            "(7)他人使用与您相同的身份信息申请。",
                        ]
                    },
                    6: {
                        h2: "7、公众号链接",
                        p_box: [
                            "本公众号包含有链接的第三方公众号。这些链接纯粹为用户提供方便。本公众号无法就所链接的第三方公众号的内容或可用性予以控制或对其负责。如果您决定访问任何与本公众号相链接的第三方公众号，则应完全自行承担相应风险和责任。",
                        ]
                    },
                    7: {
                        h2: "8、保障",
                        p_box: [
                            "您同意保障和维护本公众号的利益，并承担您或其他人使用您的用户资料造成本公众号或任何第三方的损失或损害的赔偿责任。"
                        ]
                    },
                    8: {
                        h2: "9、知识产权",
                        p_box: [
                            "本公众号所有内容和资源的版权归本公众号所有(除非本公众号已经标明版权所有人)，页面所有信息受《中华人民共和国著作权法》及相关法律法规和中国加入的所有知识产权方面的国际条约的保护。未经本公众号事先的书面许可，任何单位和个人不得就本公众号上的相关资源以任何方式、任何文字做全部或局部复制、修改、发送、储存、发布、交流或分发，或利用本公众号上的相关资源创建其他商业用途的资源。否则本公众号将追究其法律责任。",
                        ]
                    },
                    9: {
                        h2: "10、法律适用和管辖",
                        p_box: [
                            "本服务条款之效力、解释、变更、执行与争议解决均适用中华人民共和国法律。因您使用本公众号而导致的争议，您同意接受本公众号注册地人民法院的管辖。本公众号享有对服务条款的最终解释与修改权 。"
                        ]
                    }
                },
                tip: [
                    "1.申请时填写观展日期,门票类型(不同类型有数量)",
                    "2.门票按类型设置是否收费"
                ]
            }; break;
            // 免责协议
            case "mianze":
                __data = {
                    title:"免责协议",
                    h1: "欢迎阅读“聚航 airshow”航空开放活动(以下简称“本活动”)门票预约服务条款，其阐述之内容和条件适用于您使用本公众号提供的各类活动订票服务。",
                    _inner:{
                        0:{
                            h2:"1、服务条款的确认",
                            p_box:[
                                "您点击服务条款页面下的“同意协议”按钮，即视为您已阅读、了解并完全同意服务条款中的各项内容，包括本公众号对服务条款所作的任何修改。除另行明确声明外，本公众号任何服务范围或功能的变化均受服务条款约束。",
                            ]
                        },
                        1:{
                            h2:"2、服务条款的修改",
                            p_box:[
                                "本公众号在必要时可修改服务条款，并在公众号进行公告，一经公告，立即生效。如您继续使用服务，则视为您已接受修订的服务条款。",
                            ]
                        },
                        2: {
                            h2: "3、用户注册",
                            p_box: [
                                "考虑到本公众号用户服务的重要性，您同意在注册时提供真实、完整及准确的个人资料，并及时更新。",
                                "如您提供的资料不准确，或本公众号有合理的理由认为该资料不真实、不完整、不准确，本公众号有权暂停或终止您的注册身份及资料，并拒绝您使用本公众号的服务。"
                            ]
                        },
                        3: {
                            h2: "4、用户资料及保密",
                            p_box: [
                                "预约门票时，请您选择填写并按页面提示提交相关信息。您负有对该用户名下发生的所有活动承担责任。本公众号不会向您所使用服务所涉及相关方之外的其他方公开或透露您的个人资料，法律法规规定除外。",
                            ]
                        },
                        4: {
                            h2: "5、责任的免除和限制",
                            p_box: [
                                "(1)遇以下情况，本公众号不承担任何责任，包括但不仅限于： ①因不可抗力、系统故障、通讯故障、网络拥堵、供电系统故障、恶意攻击等造成本公众号未能及时、准确、完整地提供服务。 ②无论在任何原因下，您通过使用本公众号上的信息或由本公众号链接的其他公众号上的信息，或其他与本公众号链接的公众号上的信息所导致的任何损失或损害。 ③关注用户被暂停使用以及因此导致已预约观展门票不能在本公众号邮寄、领取等后果。",
                                "(2)本公众号负责对本公众号上的信息进行审核与更新，但并不就信息的时效性、准确性以及服务功能的完整性和可靠性承担任何义务和赔偿责任。",
                                "(3)如用户利用系统差错、故障或其他原因导致的漏洞，损害本公众号及任何第三方的权益，本公众号将终止该用户资格，并保留追究法律责任的权利。",
                                "(4)如果本公众号发现有影响用户信息安全的行为，本公众号有权对用户信息实施保护。必要时用户需经重新验证身份后方可继续使用。",
                            ]
                        },
                        5: {
                            h2: "6、拒绝提供担保",
                            p_box: [
                                "本公众号对以下情形不做任何担保，包括但不仅限于：",
                                "(1)服务一定能满足您的要求。",
                                "(2)服务不会受中断。",
                                "(3)服务的安全性、及时性、完整性和准确性。",
                                "(4)服务所涉及相关方的服务。",
                                "(5)您从本公众号收到口头或书面的意见或信息。",
                                "(6)您所提供的身份信息一定被通过。",
                                "(7)他人使用与您相同的身份信息申请。",
                            ]
                        },
                        6: {
                            h2: "7、公众号链接",
                            p_box: [
                                "本公众号包含有链接的第三方公众号。这些链接纯粹为用户提供方便。本公众号无法就所链接的第三方公众号的内容或可用性予以控制或对其负责。如果您决定访问任何与本公众号相链接的第三方公众号，则应完全自行承担相应风险和责任。",
                            ]
                        },
                        7: {
                            h2: "8、保障",
                            p_box: [
                                "您同意保障和维护本公众号的利益，并承担您或其他人使用您的用户资料造成本公众号或任何第三方的损失或损害的赔偿责任。"
                            ]
                        },
                        8: {
                            h2: "9、知识产权",
                            p_box: [
                                "本公众号所有内容和资源的版权归本公众号所有(除非本公众号已经标明版权所有人)，页面所有信息受《中华人民共和国著作权法》及相关法律法规和中国加入的所有知识产权方面的国际条约的保护。未经本公众号事先的书面许可，任何单位和个人不得就本公众号上的相关资源以任何方式、任何文字做全部或局部复制、修改、发送、储存、发布、交流或分发，或利用本公众号上的相关资源创建其他商业用途的资源。否则本公众号将追究其法律责任。",
                            ]
                        },
                        9: {
                            h2: "10、法律适用和管辖",
                            p_box: [
                                "本服务条款之效力、解释、变更、执行与争议解决均适用中华人民共和国法律。因您使用本公众号而导致的争议，您同意接受本公众号注册地人民法院的管辖。本公众号享有对服务条款的最终解释与修改权 。"
                            ]
                        }
                    },
                    tip:[
                        "1.申请时填写观展日期,门票类型(不同类型有数量)",
                        "2.门票按类型设置是否收费"
                    ]
                };
                break;
        }
        var _s = '';
        _s += '<div class="agreementPage"><header>';
        _s += '<div class="bgBox"><img src="../lib/i/bg-small-top.png" alt=""></div>';
        _s += '<div class="title" onclick="$(\'.agreementPage\').remove()"><i class="iconfont">&#xe625;</i>'+ __data.title +'</div>';
        _s += '</header>';
        _s += '<div class="centerText">';
        _s += '<h1>'+ __data.h1 +'</h1>';
        $.each(__data._inner,function (k,v) {
            _s += '<h2>'+ v.h2 +'</h2>';
            $.each(v.p_box,function (k1,v1) {
                _s += '<p>'+ v1 +'</p>';
            })
        })
        _s += '</div>';
        _s += '<div class="bottomTip">';
        $.each(__data.tip,function (k,v) {
            _s += '<p>'+ v +'</p>';
        });
        _s += '</div>';
        _s += '<button id="agreePage-agreeBtn">同 意 协 议</button></div>';

        $('body').append(_s);
        $('#agreePage-agreeBtn').on('click',function () {
            $(dom).find("a").addClass("iCBlue");
            $(dom).find("i").addClass("iCBlue");
            $(dom).attr("sta",1);
            $('.agreementPage').remove()
        })
    },
    chooseAgree:function(){
        $(".cCommonAgreeBox").on('click','i',function () {
            var _sta = $(this).closest('.cCommonAgreeBox').attr("sta");
            if(_sta == 0){
                $(this).addClass("iCBlue");
                $(this).siblings("a").addClass("iCBlue");
                $(this).closest('.cCommonAgreeBox').attr("sta",1);
            }else{
                $(this).removeClass("iCBlue");
                $(this).siblings("a").removeClass("iCBlue");
                $(this).closest('.cCommonAgreeBox').attr("sta",0);
            }
        });
    },
    // 三级地址
    addressPop:function (dom) {
        var me = this;
      
        $.ajax({
            url: "../../service/ss/GetComCitys.aspx?pid=0&level=0",
            dataType: "json",
            success: function (j) {

                if (!dom) dom = "body";
                if ($(".addressPop").length > 0) { $(".addressPop").show(); return }
                var addressPop = '';
                addressPop += '<div class="addressPop">';
                addressPop += '<div class="shadow"></div>';
                addressPop += '<div class="addressBottomBox">';
                addressPop += '<ul class="addressNav">';
                addressPop += '<li class="nav-li current" data-select="0"><span>省</span></li>';
                addressPop += '<li class="nav-li" data-select="0"><span>市</span></li>';
                addressPop += '<li class="nav-li" data-select="0"><span>区</span></li>';
                addressPop += '</ul>';
                addressPop += '<div class="addressBox">';
                addressPop += '<ul class="provinceBox levelCityUl">';
                addressPop += '<li class="province-li" data-code="110000000" levels="0">北京</li>';
                addressPop += '<li class="province-li" data-code="120000000" levels="0">天津</li>';
                addressPop += '<li class="province-li" data-code="310000000" levels="0">上海</li>';
                addressPop += '<li class="province-li" data-code="500000000" levels="0">重庆</li>';
                console.log(j);
                if (j.statusCode == 200) {
                    for (var i = 0; i < j.data.length; i++) {
                        addressPop += '<li class="province-li" data-code="'+j.data[i].code+'" levels="0">'+j.data[i].name+'</li>';
                    }
                }
                addressPop += '</ul>';
                addressPop += '<ul class="cityBox levelCityUl" style="display: none">';

                addressPop += '</ul>';
                addressPop += '<ul class="areaBox levelCityUl" style="display: none">';

                addressPop += '</ul>';
                addressPop += '</div>';
                addressPop += '</div>';
                addressPop += '</div>';

                $(dom).append(addressPop);
                var __fullAdress = null;
                $('.addressPop')
                    // 导航切换
                    .on('click', '.addressNav li', function () {
                        var $this = $(this), _index = $this.index();
                        if ($this.attr("data-select") == 1) {
                            $('.addressBox .levelCityUl').hide();
                            $('.addressBox .levelCityUl:eq(' + _index + ')').show();
                            $this.addClass("current").siblings().removeClass("current");

                        }
                    })
                    // 选择城市
                    .on('click', '.levelCityUl li', function () {
                        var $this = $(this),
                            ul_index = $this.closest(".levelCityUl").index(),
                            _next_index = ul_index + 1,
                            $nav_li = $('.addressNav li:eq(' + ul_index + ')'),
                            $city_ul = $(".levelCityUl:eq(" + _next_index + ")");
                        var pid = $(this).attr("data-code");
                        var plevels = $(this).attr("levels");
                        $this.addClass("on").siblings().removeClass("on");
                        $('.addressNav li:eq(' + ul_index + ') span').html($this.html()).attr("data-code", pid);
                        $nav_li.attr("data-select", 1);
                        if (ul_index == $(".addressNav li").length - 1) {
                            $('.addressPop').hide();
                            var _province = $('.addressNav li:eq(0) span').html(),
                                _city = $('.addressNav li:eq(1) span').html(),
                                _provincecode = $('.addressNav li:eq(0) span').attr("data-code"),
                                _city = $('.addressNav li:eq(1) span').html(),
                                _citycode = $('.addressNav li:eq(1) span').attr("data-code"),
                                _areacode = $('.addressNav li:eq(2) span').attr("data-code"),
                                _area = $('.addressNav li:eq(2) span').html();
                            __fullAdress = _province + ',' + _city + ',' + _area;
                            me.address.province = _province;
                            me.address.city = _city;
                            me.address.area = _area;
                            $(dom).find('.toAddressPop .addressCheck').html(__fullAdress);
                            return
                        };
                        $city_ul.empty();
                        if ((pid != "110000000" && pid != "120000000" && pid != "310000000" && pid != "500000000") || plevels=="1") {
                            var list = $.ajax({
                                url: "../../service/ss/GetComCitys.aspx?pid=" + pid + "&level="+(parseInt(plevels)+1),
                                dataType: "json",
                                async: false
                            }).responseJSON;
                            if (list.statusCode == "200") {
                                console.log(list)
                                for (var i = 0; i < list.data.length; i++) {
                                    $city_ul.append($('<li class="city-li" data-code="' + list.data[i].code + '" levels="1">' + list.data[i].name + '</li>'))
                                }
                            }
                        } else {
                            $city_ul.append($('<li class="province-li" data-code="' + $(this).attr("data-code") + '" levels="1">' + $(this).html()+ '</li>'))
                        }
                        
                        $nav_li.removeClass("current");
                        $('.addressNav li:eq(' + _next_index + ')').addClass("current");
                        $(".levelCityUl").hide();
                        $city_ul.show();
                    })
                    .on('click', '.shadow', function () {
                        $(this).closest(".addressPop").hide();
                        if (__fullAdress == null) {
                            console.log(111)
                            $(dom).find('.toAddressPop .addressCheck').css("color", "#dd514c");
                        }
                    })
            },
            error: function () {
                console.log(11);
            }
        });

        
      
        
    },
    // 解决软键盘将页面顶上去的问题
    keyboardControl:function (dom) {
        var winHeight = $(window).height();
        $(window).resize(function(){
            var _winHeight = $(window).height();
            if(_winHeight < winHeight){
                $(dom).hide();
            }else {
                $(dom).show();
            }
        });
    },
    // 暂无内容
    haveNothing:function(tip){
        tip = tip || "暂无内容";
        var $html = $('<div class="notingContent"><img src="../lib/i/sta-icon/haveNothing.png" alt="">'+ tip +'</div>');
        return $html;
    },

    address: {
        province: "",
        city: "",
        area:""
    }
}






