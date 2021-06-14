{
    mounted: function () { },
    methods: {
        __init: function () {
            var self = this, el = self.$el, elId = el.id;
            $(el).addClass('row');

            var msr = new Masonry(el, {
                percentPosition: true,
                //gutter: 3
            });

            el.style.opacity = 1;
        }
    }
}