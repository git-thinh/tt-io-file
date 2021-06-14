{
    mounted: function () { },
    methods: {
        __init: function () {
            var self = this, el = self.$el, id = el.getAttribute('id');

            var elMasonry = document.querySelector('#' + id + ' .ui-masonry-grid');
            if (elMasonry) {
                setTimeout(function () {
                    var msr = new Masonry(elMasonry, {
                        itemSelector: '.ui-masonry-item',
                        gutter: 15
                    });
                    elMasonry.style.opacity = 1;
                }, 150);
            }
        }
    }
}