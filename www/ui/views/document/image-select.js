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
                apiImages.items.forEach(img => { img.src = '/static/images/' + __site + '/' + img.key; });
                self.images = apiImages.items;
                self.uiSetup();
                self.openCrawleFromSite();
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
        editClick: function(m) {
        },
        uploadClick: function(m) {
            var self = this;
            var id = new Date().getTime();
            self.input_id = id;
            var input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('id', id);
            input.setAttribute('onchange', '__pop_current.uploadFileOnChange(this)');
            input.style.display.opacity = 0;
            document.body.appendChild(input);
            $('#' + id).trigger('click');
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
                        src: e.target.result
                    };
                    console.log(img);
                    self.images.unshift(img);
                    self.$forceUpdate();
                    setTimeout(function () { self.uiSetup(); }, 150);
                }
                reader.readAsDataURL(file);
            }

            document.body.removeChild(input);
        },
        openCrawleFromSite: function() {
            __vcp({
                code: 'form',
                base: true,
                fields: [

                ],
                scope: __scope,
                popup: true,
                title: 'Site to crawle images',
                class: 'ui modal mini position-relative'
            }, null, function (v) {
                console.log(v);
            });
        },
        openSearchOnGoogle: function() {

        }
    }

}