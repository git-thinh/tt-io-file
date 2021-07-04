{
    data: function() {
        return {
            title: 'Change password',
            btn_ok: 'Update',
            message: '',
            user$: {
                password: '12345',
                new_password: '123',
                new_password_again: '123'
            }
        };
    },
    mounted: function () { },
    methods: {
        is_fail: function () {
            return this.message.length > 0;
        },
        submit: function() {
            var self = this, user = self.user$;
            self.message = '';

            if (user.password.length == 0 || user.new_password != user.new_password_again || user.new_password.length < 3) {
                self.message = 'Please input correct password and new password';
                return;
            }

            console.log('login = ', user.password, user.new_password);
            __fetchAsync('/api/user/change_pass?token=' + localStorage['token'], 'json', {
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
                        __alert('Change password success!!!');
                    });
                } else {
                    self.message = 'Change password fail. Please input correct password and try again!';
                }
            });
        },
    }
}
