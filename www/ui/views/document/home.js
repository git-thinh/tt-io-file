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
            var s = '', a = _.filter(text.split('\n'), x => x.trim().length > 0);
            //if (text.length > 100) s = text.substr(0, 99) + '...';
            if (a.length > 1) s = a[1];
            return s;
        },
        doc_getFilter: async function(callback) {
            var self = this, arr = [], result = [];

            var apiImages = await __fetchAsync('api/image/get_filter?site=' + __site, 'json');
            if (apiImages && apiImages.ok && apiImages.items) {
                apiImages.items.forEach(img => {
                    img.image = '/static/images/' + __site + '/' + img.key;
                    img.select = false;
                });
                arr.push(apiImages.items);
            }

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
        tag_getAll: function() {
            var a = _.map(__vdata.tags, (x, i) => {
                return { code: 'filter_tag', name: x, text: x, counter: i, icon_svg_name: 'tag-' + x, cla_icon: '' };
            });
            console.log(a);
            return a;
        },
        domain_getAll: function() {
            var a = _.map(__vdata.domains, (x, i) => {
                return { code: 'filter_domain', name: x, text: x, counter: i, icon_svg_name: 'icon-link', cla_icon: '' };
            });
            console.log(a);
            return a;
        },
    }
}