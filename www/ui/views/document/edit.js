{
    data: function() {
        return {
            view: { title: '' },
            article: {
                title: '',
                path: '',
                data: '',
                tags: [],
                images: []
            },
            loading: false,
            error: ''
        };
    },
    watch: {
        article: function (val) {
            console.log('CHANGE ARTICLE: ', val);
        }
    },
    methods: {
        __init: function () {
            var self = this;
            var sitem = _.map(['Arabic', 'Chinese', 'Danish', 'Dutch', 'English', 'French', 'German', 'Greek', 'Hungarian', 'Italian',
                'Japanese', 'Korean', 'Lithuanian', 'Persian', 'Polish', 'Portuguese', 'Russian', 'Spanish', 'Swedish', 'Turkish', 'Vietnamese']
                , x => '<div class="item">' + x + '</div>').join('');
            $('.ui-dropdown-MultipleSearchSelection--edit .menu').html(sitem);
            $('.ui-dropdown-MultipleSearchSelection--edit').dropdown({
                //ignoreDiacritics: true,
                sortSelect: true,
                //fullTextSearch: 'exact',
                allowAdditions: true
            });
            setTimeout(function () {
                $('.ui-dropdown-MultipleSearchSelection--edit').dropdown({ action: 'hide' });
                $('.ui-dropdown-MultipleSearchSelection--edit').css({ opacity: 1 });
            }, 1000);

            var elEdit = document.getElementById('edit-html');
            if (elEdit) {
                var rec = elEdit.getBoundingClientRect();
                var h = window.innerHeight - rec.top - 32;
                h = h.toString().split('.')[0];
                //console.log(window.innerHeight, rec.top, h);
                elEdit.parentElement.style.height = h + 'px';
                elEdit.style.padding = '10px';
            }

            $('#edit-html').keydown(function (e) {
                // trap the return key being pressed                
                if (e.keyCode === 13) {
                    //document.execCommand('insertHTML', false, '<br/>');
                    var id = new Date().getTime();
                    document.execCommand('insertHTML', false, '<p id="' + id + '" onclick="__pop_current.selectLineEmpty(' + id + ')" />');
                    self.selectLineEmpty(id);
                    // prevent the default behaviour of return key pressed
                    return false;
                }
            });

            $('.ui--browse-image').popup();
        },
        updateArticle: function() {

        },
        formatArticle: function(s) {
            s = s || '';
            var html = '';
            var a = s.split('\n');
            a = _.filter(a, x => x.trim().length > 0);
            var id = new Date().getTime();
            for (var i = 0; i < a.length; i++)
                html += a[i] + '<p id="' + (id + i) + '" onclick="__pop_current.selectLineEmpty(' + (id + i) + ')"></p>';
            return html;
        },
        selectLineEmpty: function(pid) {
            console.log(pid);
        },
        openPopupBrowserImage: function() {
            var self = this;
            __vcp({
                code: 'image-select',
                scope: __scope,
                popup: true,
                //title: 'Select Image: ' + self.article.title
            }, null, function (v) {

            });
        }
    }
}