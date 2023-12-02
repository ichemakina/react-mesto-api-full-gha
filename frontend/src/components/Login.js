import { React, useState } from 'react';
import AuthForm from './AuthForm';

function Login({ handleLogin, submitButtonText }) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formValue.email || !formValue.password) {
            return;
        };
        handleLogin(formValue.email, formValue.password);
        setFormValue({ email: '', password: '' });
    }

    return (
        <AuthForm title="Вход" onSubmit={handleSubmit} submitButtonText={submitButtonText}>
            <label className="popup__label">
                <input className="popup__field popup__field_type_auth popup__field_type_email" type="email" placeholder="Email"
                    name="email" id="email-field" value={formValue.email} onChange={handleChange} />
            </label>
            <label className="popup__label">
                <input className="popup__field popup__field_type_auth popup__field_type_password" type="password"
                    placeholder="Пароль" name="password" id="password-field" value={formValue.password} onChange={handleChange} />
            </label>
        </AuthForm>
    )
}

export default Login;