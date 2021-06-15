{
    data: function() {
        return {
            view: { title: '' },
            article: {
                title: '',
                path: '',
                text: '',
                tags: [],
                images: []
            }
        };
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
        }
    }
}