{
    data: function() {
        return {
            view: {
                title: '',
                fields: [

                ],
            },
            loading: false,
            error: ''
        };
    },
    mounted: function () { },
    methods: {
        __init: function () {
            var self = this, el = self.$el, id = el.getAttribute('id'),
                fields = self.view.fields || [];
            setTimeout(function () {
                $('#' + id + ' .ui.dropdown').dropdown();
                $('#' + id + ' .ui.calendar').calendar({ type: 'date' });
            }, 350);
        }
    }
}