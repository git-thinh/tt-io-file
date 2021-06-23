{
    data: function() {
        return {
            view: { title: '' },
            images: [],
            input_id: '',
            key_word: '',
            loading: false,
            error: ''
        };
    },
    methods: {
        __init: async function () {
            var self = this;
            var apiImages = await __fetchAsync('api/image/get_filter?site=' + __site, 'json');
            if (apiImages && apiImages.ok && apiImages.items) {
                apiImages.items.forEach(img => {
                    img.src = '/static/images/' + __site + '/' + img.key;
                    img.select = false;
                });
                self.images = apiImages.items;
                self.uiSetup();

                //self.openCrawleFromSite();
            }
            //console.log(apiImages.items);
        },
        uiSetup: function() {
            var self = this, el = self.$el, id = el.getAttribute('id');

            setTimeout(function () {
                var masonryContainer = '#' + id + ' .ui-masonry-grid';
                $(masonryContainer).masonry();
                $(masonryContainer).masonry('destroy');
                $(masonryContainer).removeData('masonry');
                $(masonryContainer).masonry({ gutter: 10 });

                $(masonryContainer).css({ opacity: 1 });
            }, 250);


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
        selectImage: function(image) {
            var self = this, el = self.$el, id = el.getAttribute('id');
            if (self.view.multi_select)
                image.select = !image.select;
            else {
                if (image.select) image.select = false;
                else {
                    self.images.forEach(x => { x.select = false; });
                    image.select = true;
                }
            }
        },
        editClick: function(m) {
        },
        uploadClick: function() {
            var self = this, el = self.$el, id = el.getAttribute('id');
            var input_id = new Date().getTime();
            self.input_id = input_id;
            var input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('id', input_id);
            input.setAttribute('onchange', id + '.uploadFileOnChange(this)');
            input.style.display.opacity = 0;
            document.body.appendChild(input);
            $('#' + input_id).trigger('click');
        },
        uploadFileOnChange: function(input) {
            var self = this, el = self.$el, id = el.getAttribute('id');
            var files = input.files;
            console.log(files);
            if (files.length == 0) return;
            var file = files[0], type = file.type;
            if (type == "image/gif" || type == "image/png" || type == "image/jpeg" || type == "image/jpg") {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var img = {
                        key: file.name,
                        publish: false,
                        site: __site,
                        tag: '',
                        title: file.name.split('.')[0],
                        type: 'image',
                        dimmer: true,
                        select: false,
                        src: e.target.result
                    };
                    //console.log(img);
                    self.images.unshift(img);
                    self.$forceUpdate();
                    setTimeout(function () { self.uiSetup(); }, 150);

                    self.uploadFileToServer(file);
                }
                reader.readAsDataURL(file);
            }

            document.body.removeChild(input);
        },
        uploadFileToServer: function(file) {
            var self = this;
            const f = new FormData();
            f.append('file', file);
            fetch('/images?site=' + __site, { method: 'POST', body: f }).then(r => r.json()).then(j => {
                console.log(j);
                self.__init();
            });
        },
        removeConfirm: function(image) {
            var self = this, el = self.$el, id = el.getAttribute('id');
            self.__alert('Delete image', 'Are you sure remove image: ' + image.key,
                function (v) {
                    //console.log('open = ', v);
                }, function (v) {
                    console.log('close = ', v.ok, image.key);
                    if (v.ok) {
                        fetch('/images?site=' + __site + '&file=' + image.key, { method: 'DELETE' }).then(r => r.json()).then(j => {
                            console.log(j);
                            self.__init();
                        });
                    }
                });
        },
        openCrawleFromSite: function() {
            var self = this, el = self.$el, id = el.getAttribute('id');

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
                view_ref: id,
                title: 'Site to crawle images',
                class: 'bg-transparent position-absolute top-0 start-0 w-100 h-100 d-flex'
            }, null, function (v) {

            });
        },
        openSearchOnGoogle: function() {

        }
    }

}