$(function(){
    'use strict';
    window.Input=function(selector)
    {
        var $ele;
        var $ele_err;
        var me=this;
        var rule={
            nullable:true
        };
        this.get_val = function(){
            return $ele.val();
        }
        this.load_validator = function(){
            var val=this.get_val();
            this.validator = new Validator(val,rule);
        };

        function init()
        {
            find_ele();
            get_err_ele();
            parse_rule();
            me.load_validator();
            listen();
        }
        function listen(){
            $ele.on('change',function()
            {
                var r = me.validator.is_valid(me.get_val());
                if(r)
                {
                    $ele_err.hide();
                }
                else
                    $ele_err.show();

            })
        }
        
        function get_err_ele()
        {
            return $ele_err=$(get_err_selector());
        }

        function get_err_selector()
        {
            return '#'+$ele.attr('name')+'-input-err';
        }
        
        function find_ele()
        {
            if(selector instanceof jQuery)
                $ele=selector;
            else
                $ele=$(selector);
        }
        function parse_rule()
        {
            var rule_str=$ele.data('rule');
            if(!rule_str) return;

            var rule_arr=rule_str.split("|");
            for(var i=0;i<rule_arr.length;i++)
            {
                var item_str=rule_arr[i];
                var item_arr=item_str.split(":");
                rule[item_arr[0]]=JSON.parse(item_arr[1]);
            }


        }
        init();
    }
})


