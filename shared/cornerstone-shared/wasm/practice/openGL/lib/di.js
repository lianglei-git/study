mergeInto(LibraryManager.library,{


    getRenderMode: function(){
        return ~~(Math.random()*255); // MIP
    },
    isHit:function(a,b) {
        console.log("isHit", a,b);
        if(!dom_hit) return;

        if(a < 0.5) {
            dom_hit.innerHTML = "命中";
            return true;
        }

        dom_hit.innerHTML = "未命中";
        return false;
    }

});

