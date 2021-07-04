{
    data: function() {
        return {
            title: 'Alert',
            text: '',
            btn_ok: 'OK',
            btn_cancel: '',
            command: '',
        };
    },
    mounted: function () { },
    methods: {
        __init: function () {
            var self = this, el = self.$el;
        },
        __reOpen: function (self) {
            console.log('VIEW RE-OPEN ===== ', __vname);
            var el = self.$el;

        }
    }
}
