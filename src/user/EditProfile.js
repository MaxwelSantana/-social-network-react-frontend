import React, { useState } from 'react';

const useForm = (initialValues) => {
    const { formFields, setFormFields } = useState({ name: '' });
    console.log({ formFields });
    const handleChange = (name) => (event) => {
        setFormFields((prev) => ({ ...prev, [name]: event.target.value }));
    };
    const register = (fieldName) => {
        const onChange = handleChange;
        // const value = formFields[fieldName] || '';
        const name = fieldName;
        return { onChange, name };
    };

    const handleSubmit = (e) => (onSubmit) => {
        e.preventDefault();
        onSubmit && onSubmit(formFields);
    };
    return { register, handleSubmit };
};

function EditProfile() {
    const { register, handleSubmit } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Edit Profile</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="name" className="text-muted">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="form-control"
                        {...register('name')}
                    />
                </div>
                <button className="btn btn-raised btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default EditProfile;
