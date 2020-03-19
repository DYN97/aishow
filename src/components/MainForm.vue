<template>
    <div>
 <form class="am-form am-form-horizontal listBox" data-am-validator="" novalidate="novalidate" action="return false;" id="pass">
                        <div class="am-form-group am-form-icon list-li">
                            <label for="doc-ipt-3" class="am-u-sm-4 am-form-label list-label"><i class="iconfont list-icon iCYellow"></i>姓名</label>
                            <div class="am-u-sm-8 list-right">
                                <input type="text" data-bind="Name" class="am-form-field" autocomplete="off" placeholder="姓名与证件号码一致" required="">
                                <i class="must-icon iconfont"></i>
                            </div>
                        </div>

                        <div class="am-form-group am-form-icon list-li">
                            <label for="doc-ipt-3" class="am-u-sm-4 am-form-label  list-label"><i class="iconfont list-icon iCOrigin"></i>身份证号</label>
                            <div class="am-u-sm-8 list-right">
                                <input type="text" data-bind="Idcard" class="am-form-field" autocomplete="off" placeholder="身份证号与姓名一致" maxlength="18" minlength="18" required="">
                                <i class="must-icon iconfont"></i>
                            </div>
                        </div>

                        <div class="am-form-group am-form-icon list-li">
                            <label for="doc-ipt-3" class="am-u-sm-4 am-form-label  list-label"><i class="iconfont list-icon iCGreen"></i>联系电话</label>
                            <div class="am-u-sm-8 list-right">
                                <input type="text" data-bind="Mobile" class="am-form-field" maxlength="11" onkeyup="this.value=this.value.replace(/\D/g,'')" placeholder="有效的联系电话" required="">
                                <i class="must-icon iconfont"></i>
                            </div>
                        </div>

                        <div class="am-form-group am-form-icon list-li">
                            <label for="doc-ipt-3" class="am-u-sm-4 am-form-label  list-label"><i class="iconfont list-icon iCBlue"></i>门票日期</label>
                            <div class="am-u-sm-8 list-right">
                                <input type="date" placeholder="选择日期" value="" class="am-form-field datepicker" required="">
                                <i class="date-icon iconfont"></i>
                            </div>
                        </div>
                    </form>

    </div>
</template>
<script>
  export default {
    name: 'MainForm',

    data: () => ({
      
    }),
  }
</script>
<style scoped>
 .am-tabs-bd .am-tab-panel.am-active {
            margin-top: 5px;
        }

        .am-titlebar-default {
            border-bottom: none;
        }

        #givePlus, #buyPlus {
            float: right;
            font-size: 17px;
            color: #ffffff;
            background-color: #ff9000;
            border-radius: 6px;
            margin-top: 8px;
            padding: 2px 5px;
            width: 110px;
        }

        .am-titlebar-default .am-titlebar-title {
            padding-left: 5px;
        }

        .listBox {
            position: relative;
            border-top: #e5e5e5 solid 1px;
            border-bottom: #e5e5e5 solid 1px;
        }

        .copyListBox {
            margin-top: 25px;
        }

        .listBox .list-li {
            height: 45px;
            line-height: 45px;
            overflow: hidden;
            margin-bottom: 0 !important;
        }

            .listBox .list-li .list-right {
                position: relative;
                padding: 0 !important;
                margin: 0 !important;
            }

                .listBox .list-li .list-right input {
                    height: 45px;
                    line-height: 30px;
                    padding-left: 0 !important;
                    margin-left: 10px !important;
                    text-indent: 10px;
                    outline: none;
                    border-bottom: #e5e5e5 solid 1px;
                    color: #333;
                }

                .listBox .list-li .list-right select {
                    height: 45px;
                    padding-left: 0 !important;
                    margin-left: 10px !important;
                    text-indent: 10px;
                    outline: none;
                    color: #333;
                    border: 0;
                    appearance: none;
                    -moz-appearance: none;
                    -webkit-appearance: none;
                    background: transparent;
                }

                    .listBox .list-li .list-right select::-ms-expand {
                        display: none;
                    }

            .listBox .list-li:last-child .list-right input {
                border-bottom: 0 !important;
            }

            .listBox .list-li .list-right input:focus {
                box-shadow: none;
            }

            .listBox .list-li .list-label {
                padding: 0 !important;
                font-size: 16px;
                color: #666;
                text-indent: 20px;
            }

            .listBox .list-li .list-icon {
                font-size: 20px;
                padding-right: 5px;
                vertical-align: top;
            }

            .listBox .list-li .must-icon {
                position: absolute;
                right: 18px;
                top: 0;
                color: #bc1616;
                font-size: 18px;
            }

            .listBox .list-li .date-icon {
                position: absolute;
                right: 18px;
                top: 0;
                color: #ddd;
                font-size: 18px;
            }

        .listBox .del-icon {
            position: absolute;
            right: 15px;
            top: -20px;
            font-size: 24px;
            color: #dd4639;
            z-index: 1;
        }

        .codeBox {
            position: relative;
            height: 45px;
            background: #fff;
            border-radius: 45px;
            border: #e5e5e5 solid 1px;
            overflow: hidden;
            margin: 12px 15px;
        }

            .codeBox .code-icon {
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                line-height: 43px;
                font-size: 28px;
                width: 60px;
                text-indent: 5px;
                display: inline-block;
                text-align: center;
                color: #5eafee;
                border-right: #e5e5e5 solid 1px;
            }

            .codeBox input {
                position: absolute;
                left: 60px;
                padding: 0;
                top: 0;
                bottom: 0;
                text-indent: 10px;
                border: 0;
                outline: none;
            }

            .codeBox div {
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                height: 100%;
                z-index: 1;
            }

        .submitBtn {
            display: block;
            background: #5eafee;
            color: #fff;
            height: 45px;
            border-radius: 50px;
            width: 100%;
            border: 0;
            outline: none;
        }
</style>