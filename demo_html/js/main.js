$(function () {
    'use strict';
    var $inputs=$('[data-rule]');
    var $form=$("#signup");
    var inputs=[];
    $inputs.each(function (index,node){
        var tmp=new Input(node);
        inputs.push(tmp);
    })
    $form.on('submit',function(e)
    {
        e.preventDefault();
        $inputs.trigger('blur');
        for(var i=0;i<inputs.length;i++)
        {
            var item = inputs[i];
            var r = item.validator.is_valid();
            if(!r)
            {
                alert("Wrong!");
                return;
            }
        }
        alert("Success!");
    })
    function signup()
    {
        //post to server.....
    }
});

/* choose input-data-rule*/

/*analysis data-rule*/

