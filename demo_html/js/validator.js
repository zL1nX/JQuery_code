$(function () {
    'use strict';
    window.Validator = function(val,rule)
    {
        this.is_valid = function(new_val)
        {
            var key;
            //console.log(new_val);
            if(new_val !== undefined)
                val=new_val;
            //console.log(val);
            if(!rule.nullable && ! val)
                return true;
            for(key in rule)
            {
                if(key === 'nullable')
                    continue;
                var res=this['validate_'+key]();
                //console.log(key);
                if(!res) {
                    return false;
                }
            }
            return true;

        };

        this.validate_max = function()
        {
            pre_maxmin();
            //console.log("maxval",val);
            return val <= rule.max;
        };
        this.validate_min = function()
        {
            pre_maxmin();
            return val >= rule.min;
        };
        this.validate_maxlength = function()
        {
            pre_string();
            return val.length <= rule.maxlength;
        };
        this.validate_minlength = function()
        {
            pre_string();
            return val.length >= rule.minlength;
        };

        this.validate_numeric = function()
        {
            return $.isNumeric(val);
        };
        this.validate_nullable = function()
        {
            var real=$.trim(val);
            if(!real && real !== 0)
                return false;
            return true;
        };
        this.validate_pattern = function()
        {
            var reg = new RegExp(rule.pattern);
            return reg.test(val);
        };



        function pre_maxmin(){
            val=parseFloat(val);
        }
        function pre_string(){
            val=val.toString();
        }
    }
});