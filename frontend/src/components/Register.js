import React, { useState } from 'react';
import AuthForm from './AuthForm';

function Register({ handleRegister, submitButtonText }) {
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
        const { email, password } = formValue;
        handleRegister(email, password);
    }

    return (
        <AuthForm title="Регистрация" onSubmit={handleSubmit} submitButtonText={submitButtonText} isRegisterForm={true}>
            <label className="popup__label">
                <input className="popup__field popup__field_type_auth popup__field_type_email" type="email" placeholder="Email"
                    name="email" id="email-field" value={formValue.email} onChange={handleChange} />
            </label>
            <label className="popup__label">
                <input className="popup__field popup__field_type_auth popup__field_type_password" type="password"
                    placeholder="Пароль" name="password" id="password-field" value={formValue.password} onChange={handleChange} />
            </label>
        </AuthForm>
    );
}

export default Register;