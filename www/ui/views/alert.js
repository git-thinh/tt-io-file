{
    mounted: function () { },
    methods: {
        __init: function () {
            var self = this, el = self.$el;
            el.style.opacity = 1;

            el.className = '';
        },
        __reOpen: function (self) {
            console.log('VIEW RE-OPEN ===== ', __vname);
            var el = self.$el;

        }
    }
}
