{
    data: function() {
        return {
            nav_visible: !__ismobi,
            items: []
        };
    },
    mounted: function () { },
    methods: {
        __init: function () {
            var self = this;
            Vue.nextTick(function () {
                self.uiSetup();
                //self.doc_editClick(items[13]);
            });
        },
        uiSetup: function() {
            var self = this, el = self.$el, view_id = el.getAttribute('id');

            var masonryContainer = '#' + view_id + ' .ui-masonry-grid';
            $(masonryContainer).masonry();
            $(masonryContainer).masonry('destroy');
            $(masonryContainer).removeData('masonry');
            $(masonryContainer).masonry({ gutter: 10 });

            $(masonryContainer).css({ opacity: 1 });
        },


    }
}