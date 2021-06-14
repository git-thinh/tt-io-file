{
    data: function() {
        return {
            view_current$: ''
        };
    },
    computed: {
        scope_navs: function () {
            var self = this, a = [];
            a = _.filter(__vdata.views, x => x.scope == __scope && x.type == 'nav' && (x.login == null || x.login == __vdata.login));
            //console.log(a);
            return a;
        },
        scope_actions: function () {
            var self = this, a = [];
            a = _.filter(__vdata.views, x => x.scope == __scope && x.type == 'action' && (x.login == null || x.login == __vdata.login));
            //console.log(a);
            return a;
        },
        menus_user_panel: function () {
            var self = this, a = [];
            a = _.filter(__vdata.views, x => x.scope == 'user_panel' && (x.login == null || x.login == __vdata.login));
            //console.log(a);
            return a;
        }
    },
    mounted: function () {},
    methods: {
        __init: function () {
            var self = this, el = self.$el;
            var msr = new Masonry(el, {
                percentPosition: true,
            });
            var v = _.find(__vdata.views, x => x.scope == __scope && x.active);
            if (v) {
                self.view_current$ = v.code;
            }
        },
        __bindFunctionClick: function(v, e) {
            var self = this;
            var click = v.click || '';
            if (click.length == 0) return 'void()';
            var s = '';
            click.split('|').forEach(function (f) {
                var fn;
                if (f.length > 0) {
                    if (f.startsWith('self.') && typeof self[f] == 'function') fn = self[f];
                    else if (typeof window[f] == 'function') fn = window[f];
                }
                if (fn) {
                    var isNav = _.findIndex(self.scope_navs, x => x.code == v.code) != -1;
                    fn(v.code, v.template, e);
                    if (isNav && v.popup != true) {
                        $('.ui-view.nav .ui-item').removeClass('active');
                        self.view_current$ = v.code;
                    }
                }
            });
            //return s;
        }
    }
};