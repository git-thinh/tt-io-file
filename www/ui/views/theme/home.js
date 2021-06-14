{
    computed: {
        theme_collection: function () {
            var self = this;
            var arrs = _.map(__vdata.theme.group, (val_, key_) => {
                var a = [];
                for (var j = 1; j <= val_; j++) a.push(key_ + '-' + j);
                return a;
            });
            var fn = _.spread(_.union);
            var a = fn(arrs);
            //console.log(a);
            var themes = _.map(a, x => {
                var it = { theme: x.split('-')[0], code: x };
                it.image = '/theme/' + it.theme + '/' + it.code + '.png';
                it.title = x.split('-').join(' ');
                return it;
            });
            return themes;
        }
    },
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
        },
    }
}