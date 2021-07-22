{
    data: function() {
        return {
            view_current$: '',
            items: [
                {
                    code: 'user_menu',
                    tooltip: 'User Panel',
                    tooltip_position: 'right',
                    active_disbale: 'true',
                    header_sub: 'User Panel',
                    items: '__vdata.user_menus',
                    cla: 'p-3 pb-2 p-md-4 border-bottom',
                    //@click:'buttonClick',
                    svg_data: '<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />',
                },
                {
                    code: 'document',
                    active: 'true',
                    tooltip: 'Manage Document',
                    tooltip_position: 'right',
                    //@click:'buttonClick',
                    cla: 'p-3 pb-2 p-md-4 border-bottom',
                    svg_data: '<path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z" /><path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />',
                },
                {
                    code: 'shop_cart',
                    tooltip: 'Manage Order',
                    tooltip_position: 'right',
                    //@click:'buttonClick',
                    cla: 'p-3 pb-2 p-md-4 border-bottom',
                    svg_data: '<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />',
                },
                {
                    code: 'customer',
                    tooltip: 'Manage Customer',
                    tooltip_position: 'right',
                    //@click:'buttonClick',
                    cla: 'p-3 pb-2 p-md-4 border-bottom',
                    svg_data: '<path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />',
                },
                {
                    code: 'message',
                    tooltip: 'Manage Message',
                    tooltip_position: 'right',
                    //@click:'buttonClick',
                    cla: 'p-3 pb-2 p-md-4 border-bottom',
                    svg_data: '<path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />',
                },
                {
                    code: 'promotion',
                    tooltip: 'Manage Promotion',
                    tooltip_position: 'right',
                    //@click:'buttonClick',
                    cla: 'p-3 pb-2 p-md-4 border-bottom',
                    icon_svg_name: 'tag-promotion',
                    svg_data: '',
                },
                {
                    code: 'task',
                    tooltip: 'Manage Task',
                    tooltip_position: 'right',
                    //@click:'buttonClick',
                    cla: 'p-3 pb-2 p-md-4 border-bottom',
                    icon_svg_name: 'tag-task',
                    svg_data: '',
                },
                {
                    code: 'study',
                    tooltip: 'Manage Study',
                    tooltip_position: 'right',
                    icon_svg_width: '30',
                    //@click:'buttonClick',
                    cla: 'p-3 pb-1 pt-2 p-md-4 border-bottom',
                    icon_svg_name: 'tag-study',
                    svg_data: '',
                },
                {
                    code: 'job',
                    tooltip: 'Manage Job',
                    tooltip_position: 'right',
                    //@click:'buttonClick',
                    cla: 'p-3 pb-2 p-md-4 border-bottom',
                    icon_svg_name: 'tag-job',
                    svg_data: '',
                },
                {
                    code: 'kit',
                    tooltip: 'Manage Kit',
                    tooltip_position: 'right',
                    //@click:'buttonClick',
                    cla: 'p-3 pb-2 p-md-4 border-bottom',
                    icon_svg_name: 'tag-kit',
                    svg_data: '',
                },
                {
                    cla: 'flex-fill'
                },
                {
                    code: 'user_settings',
                    tooltip: 'User Setting',
                    tooltip_position: 'right',
                    active_disbale: 'true',
                    header_sub: 'Change theme & language',
                    items: '__vdata.user_settings',
                    //@clicksub:'buttonClick',
                    cla: 'p-3 pb-2 p-md-4 align-self-end w-100',
                    cla_sub: 'start-0 bottom-0 ms-5 mb-5',
                    svg_data: '',
                },
                {
                    code: 'user_settings',
                    tooltip: 'User Setting',
                    tooltip_position: 'right',
                    active_disbale: 'true',
                    header_sub: 'Change theme & language',
                    items: '__vdata.user_settings',
                    //@clicksub:'buttonClick',
                    cla: 'p-3 pb-2 p-md-4 align-self-end w-100',
                    cla_sub: 'start-0 bottom-0 ms-5 mb-5',
                    svg_data: '<path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" /><path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />',
                },
            ]
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