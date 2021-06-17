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
            },
            url: 'https://vnexpress.net/',
            loading: false,
            error: ''
        };
    },
    watch: {
        'url': function (val) {
            var url;
            try { url = new URL(val); } catch (e) { }
            //console.log(url);
            if (url == null || val.length == 0)
                this.error = 'Please input url is http://... or https://...';
            else
                this.error = '';
        }
    },
    methods: {
        __init: function () {
            var self = this;
        },
        getSourceUrl: function () {
            var self = this, error = self.error;
            if (error.length > 0) {
                alert(error);
                return;
            }
            self.loading = true;

            fetch('/curl?url=' + self.url).then(r => r.text()).then(s => {
                //console.log(s);  
                const parser = new DOMParser();
                const doc = parser.parseFromString(s, "text/html");
                console.log(doc.documentElement.textContent)

            });
        }
    }
}