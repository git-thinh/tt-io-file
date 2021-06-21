{
    data: function() {
        return {
            view: { title: '' },
            images: [],
            key_word: '',
            loading: false,
            error: ''
        };
    },
    methods: {
        __init: async function () {
            var self = this;
            var apiImages = await __fetchAsync('api/image/get_filter?site=' + __site, 'json');
            console.log(apiImages);
            if (apiImages && apiImages.ok && apiImages.items) {
                self.images = apiImages.items;
                self.uiSetup();
            }
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

            //var sitem = _.map(['Arabic', 'Chinese', 'Danish', 'Dutch', 'English', 'French', 'German', 'Greek', 'Hungarian', 'Italian',
            //    'Japanese', 'Korean', 'Lithuanian', 'Persian', 'Polish', 'Portuguese', 'Russian', 'Spanish', 'Swedish', 'Turkish', 'Vietnamese']
            //    , x => '<div class="item">' + x + '</div>').join('');
            //$('.ui-dropdown-MultipleSearchSelection .menu').html(sitem);
            //$('.ui-dropdown-MultipleSearchSelection').dropdown({
            //    //ignoreDiacritics: true,
            //    sortSelect: true,
            //    //fullTextSearch: 'exact',
            //    allowAdditions: true
            //});
        },
        editClick: function(m) {
        },
        uploadClick: function(m) {
        },
    }

}