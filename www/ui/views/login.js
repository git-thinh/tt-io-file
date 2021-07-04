{
    data: function() {
        return {
            title: 'Login System',
            btn_ok: 'Login',
            message: '',
            user$: {
                user_name: 'admin',
                password: '12345',
                has_remember: true,
            }
        };
    },
    mounted: function () { },
    methods: {
        __init: function () {
            var self = this, el = self.$el;
        },
        is_fail: function () {
            return this.message.length > 0;
        },
        loginSubmit: function() {
            var self = this, user = self.user$;
            self.message = '';
            console.log('login = ', user.user_name, user.password);
            __fetchAsync('/api/user/login', 'json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }).then((val) => {
                console.log(val);
                if (val && val.ok && val.user && val.user.token) {
                    __userLoginSuccess(val.user.token, function () {
                        self.__popupClose();
                        __init();
                    });
                } else {
                    self.message = 'Login fail. Please input correct account and try again!';
                }
            });
        },
    }
}
