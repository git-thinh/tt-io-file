{
    data: function() {
        return {
            articles: []
        };
    },
    mounted: function () { },
    methods: {
        __init: function () {
            var self = this;
            self.getFilter(function (r) {
                console.log(r);
                if (r && r.ok && r.items) {
                    self.articles = r.items;
                    Vue.nextTick(function () { self.uiSetup(); });                    
                }
            });
        },
        uiSetup: function() {
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

            var sitem = _.map(['Arabic', 'Chinese', 'Danish', 'Dutch', 'English', 'French', 'German', 'Greek', 'Hungarian', 'Italian',
                'Japanese', 'Korean', 'Lithuanian', 'Persian', 'Polish', 'Portuguese', 'Russian', 'Spanish', 'Swedish', 'Turkish', 'Vietnamese']
                , x => '<div class="item">' + x + '</div>').join('');
            $('.ui-dropdown-MultipleSearchSelection .menu').html(sitem);
            $('.ui-dropdown-MultipleSearchSelection').dropdown({
                //ignoreDiacritics: true,
                sortSelect: true,
                //fullTextSearch: 'exact',
                allowAdditions: true
            });
        },
        getDescription: function(text) {
            text = text || '';
            let s = text;
            if (text.length > 100) s = text.substr(0, 99) + '...';
            return s;
        },
        getFilter: function(callback) {
            __fetchAsync('api/article/get_filter', 'json').then(r => callback(r));
        },
        editClick: function(article) {
            __vcp({ code: 'edit', scope: __scope, popup: true, title: 'Update: ' + article.title }, null, function (v) {
                v.$data.article = JSON.parse(JSON.stringify(article));
            });
        }
    }
}