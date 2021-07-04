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
    mounted: function () { },
    methods: {
        __init: function () {
            var self = this, el = self.$el, view_id = el.getAttribute('id');

            //var tooltipTriggerList = [].slice.call(document.querySelectorAll('#' + view_id + ' [data-bs-toggle="tooltip"]'))
            //tooltipTriggerList.forEach(function (tooltipTriggerEl) {
            //    new bootstrap.Tooltip(tooltipTriggerEl)
            //})

            //var selPopup = '#' + view_id + ' .ui-nav--setting';
            //$(selPopup).popup({
            //    popup: $(selPopup + ' .ui.popup'),
            //    on: __ismobi ? 'click' : 'hover',
            //    inline: true,
            //    hoverable: true,
            //    position: 'right center',
            //    //delay: {
            //    //    show: 300,
            //    //    hide: 800
            //    //}
            //})

            //$('#' + view_id + ' .ui.dropdown').dropdown();

            //var v = _.find(__vdata.views, x => x.scope == __scope && x.active);
            //if (v) {
            //    self.view_current$ = v.code;
            //}
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
        },
        buttonClick: function(v) {
            var self = this, code = v.code, selected = v.selected, cmd = selected;
            if (selected && selected.code) cmd = selected.code;

            console.log('item click = ' + code + ' > ' + cmd);

            switch (code) {
                case 'user_menu':
                    switch (cmd) {
                        case 'logout':
                            self.menu_logoutClick(v);
                            break;
                        case 'change_pass':
                            self.menu_change_passClick(v);
                            break;
                    }
                    break;
            }

            //do something...
            v.active = true;
        },
        menu_logoutClick: function(vueTarget) {
            __vopen('alert', null, function (v) {
                //console.log('event open = ', v.view_id);
                v.title = 'Logout';
                v.text = 'Are you sure logout?';
            }, function (data) {
                //console.log('event close = ', data);
                if (data && data.command == 'ok') {
                    __logout();
                }
            });
        },
        menu_change_passClick: function(vueTarget) {
            __vopen('change_pass', null, function (v) {
                //console.log('event open = ', v.view_id);
               
            }, function (data) {
                //console.log('event close = ', data);

            });
        }
    }
};