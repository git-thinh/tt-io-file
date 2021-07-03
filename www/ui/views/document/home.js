{
    data: function() {
        return {
            items: []
        };
    },
    mounted: function () { },
    methods: {
        __init: function () {
            var self = this;
            self.doc_getFilter(function (items) {
                //console.log(items);
                self.items = items;
                Vue.nextTick(function () {
                    self.uiSetup();
                    //self.doc_editClick(items[0]);
                });
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
        doc_getDescription: function(text) {
            text = text || '';
            let s = text;
            if (text.length > 100) s = text.substr(0, 99) + '...';
            return s;
        },
        doc_getFilter: async function(callback) {
            var self = this, arr = [], result = [];

            var apiDoc = await __fetchAsync('api/document/get_filter?site=' + __site, 'json');
            //console.log(apiDoc);
            if (apiDoc && apiDoc.ok && apiDoc.items) arr.push(apiDoc.items);

            //var themes = self.theme_getCollection();
            //console.log(themes);
            //arr.push(themes);

            const fn = _.spread(_.union);
            result = fn(arr);
            result.forEach(x => {
                switch (x.type) {
                    case 'book':
                        x.icon = 'book';
                        break;
                    case 'article':
                        x.icon = 'file alternate outline';
                        break;
                    case 'theme':
                        x.icon = 'dice d6';
                        break;
                }
            });

            if (callback) callback(result);
        },
        doc_editClick: function(article) {
            __vcp({
                code: 'edit',
                scope: __scope,
                popup: true,
                title: 'Update: ' + article.title,
                class: 'ui overlay fullscreen modal'
            }, null, function (v) {
                v.$data.article = JSON.parse(JSON.stringify(article));
            });
        },
        doc_getTags: function(d) {
            if (d && d.tag != null && d.tag.length > 0) {
                var a = d.tag.split(',');
                a = _.filter(a, x => x.length > 0);
                return a;
            }
            return [];
        },
        filter_openPopup: function() {
            var self = this, el = self.$el, view_id = el.getAttribute('id');

            __vcp({
                code: 'form',
                base: true,
                fields: [
                    {
                        type: 'text',
                        caption: 'Url',
                        icon: 'linkify',
                        placeholder: 'http://... or https://...',
                        value: 'https://baovebinhtruongan.com/'
                    },
                    {
                        type: 'checkbox',
                        title: 'Checkbox field',
                        value: true
                    },
                    {
                        type: 'toggle',
                        title: 'Toggle field',
                        value: true
                    },
                    {
                        type: 'slider',
                        title: 'Slider field',
                        value: true
                    },
                    {
                        type: 'calendar',
                        title: 'calendar field',
                        value: ''
                    },
                    {
                        type: 'textarea',
                        title: 'textarea field',
                        value: ''
                    },
                    {
                        type: 'radio',
                        title: 'Radio field',
                        class: 'grouped', //inline
                        value: 2,
                        items: [
                            { text: 'radio 1', value: 1 },
                            { text: 'radio 2', value: 2 },
                            { text: 'radio 3', value: 3 },
                        ]
                    },
                    {
                        type: 'dropdown',
                        title: 'Dropdown field',
                        class: 'selection', //inline
                        value: 2,
                        items: [
                            { text: 'text 1', value: 1 },
                            { text: 'text 2', value: 2 },
                            { text: 'text 3', value: 3 },
                        ]
                    },
                    {
                        type: 'dropdown',
                        disable: true,
                        title: 'Dropdown field',
                        class: 'selection', //inline
                        value: 2,
                        items: [
                            { text: 'text 1', value: 1 },
                            { text: 'text 2', value: 2 },
                            { text: 'text 3', value: 3 },
                        ]
                    },
                    {
                        type: 'select',
                        title: 'Select field',
                        value: 2,
                        items: [
                            { text: 'text 1', value: 1 },
                            { text: 'text 2', value: 2 },
                            { text: 'text 3', value: 3 },
                        ]
                    }
                ],
                scope: __scope,
                popup: true,
                view_ref: view_id,
                title: 'Site to crawle images',
                class: 'bg-transparent position-absolute top-0 start-0 w-100 h-100 d-flex'
            }, null, function (v) {

            });
        },
    }
}