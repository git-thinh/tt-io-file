{
    data: function() {
        return {
            messages$: [],
            user$: {
                user_name: 'admin',
                password: '3456',
                has_remember: true,
            }
        }
    },
    mounted: function () { },
    computed: {
        messagesText: function () { return _.map(this.messages$, x => x.text); },
        messagesExist: function () { return this.messages$.length > 0; }
    },
    methods: {
        __init: function () {
            var self = this,
                el = self.$el,
                id = el.getAttribute('id'),
                view = self.$view;

        },
        validField: function(field) {
            var self = this,
                el = self.$el,
                id = el.getAttribute('id'),
                user = self.user$,
                messages = self.messages$,
                view = self.$view;
            //console.log('id = ', id, field, user[field]);

            var a, $field = $('#' + id + ' .field.__' + field);
            switch (field) {
                case 'user_name':
                    if (user.user_name.length == 0) {
                        messages.push({ field: field, text: 'Please input Username' });
                        $field.addClass('error');
                    } else {
                        a = _.filter(messages, x => x.field != field);
                        self.messages$ = a;
                        $field.removeClass('error');
                    }
                    break;
            }
            //self.$forceUpdate();
            //console.log('id = ', id, field, messages);
        },
        loginSubmit: function() {
            var self = this,
                el = self.$el,
                id = el.getAttribute('id'),
                user = self.user$,
                view = self.$view;
            self.validField('user_name');

            console.log('user_name = ', user.user_name);
            console.log('password = ', user.password);
            console.log('has_remember = ', user.has_remember);

            location.href = '/admin';
        },
        testBind: function() {
            var self = this,
                el = self.$el,
                id = el.getAttribute('id'),
                user = self.user$,
                view = self.$view;
            user.user_name = 'thinhtu';
            user.password = '12345';
            user.has_remember = false;
        }
    },
    watch: {
        'user$.user_name': function (val) {
            this.validField('user_name');
        }
    }
};