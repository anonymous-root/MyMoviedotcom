import React, { useState, useEffect } from 'react';
import { addscreen } from '../../store/action/screenAction';
import {login} from '../../store/action/userAction';
import { connect } from 'react-redux';
import { Breadcrumb, Card, } from 'antd';
import {
    Form,
    Input,
    Button
} from 'antd';

const formItemLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 8,
    },
};
const formTailLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 8,
        offset: 4,
    },
};

const AddForm = (props) => {
    useEffect(()=>{
        console.log(props.singleuser._id);
        // props.singleuser;
    },[props.singleuser])
    const [form] = Form.useForm();
    const [obj, setMyObj] = useState({
        screen_name: "",
        rows: "",
        cols: "",
        user_id:""
    })
    const [error, setError] = useState({
        screen_nameError: "",
        isValid: false
    });


    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            console.log(props.singleuser._id);
            let olddata = { ...obj };
            olddata["user_id"]=props.singleuser._id;
            setMyObj(olddata);
            await props.addscreen(olddata);
            props.history.replace("/theater/screenList");
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    }

    const HandleChange = (e, name) => {
        let olddata = { ...obj };
        olddata[name] = e.target.value;
        setMyObj(olddata);
    }

    return (

        <>
            <div className={"Title"} style={{ marginTop: "-29px" }}>
            </div>
            <Breadcrumb style={{ marginTop: "1px", textAlign: "right", marginBottom: "30px" }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Screen</Breadcrumb.Item>
                <Breadcrumb.Item>Add Screen</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-card-border-less-wrapper">
                <Card title="Add Screen Form" bordered={false} style={{ width: "auto" }}>
                    <Form form={form} name="AddForm">
                        
                        <Form.Item {...formItemLayout} label="Enter Screen Name:-" name="screen_name" rules={[{ required: true, message: 'Enter Screen Name!' }]}>
                            <Input type="text" name="screen_name" onChange={(e) => { HandleChange(e, "screen_name") }} placeholder="Enter Screen name ..." style={{ maxWidth: "300px" }} />
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Enter Total Rows:-" name="rows" rules={[{ required: true, message: 'Please Enter Rows!' }]}>
                            <Input type="number" name="rows" onChange={(e) => { HandleChange(e, "rows") }} placeholder="rows no ..." style={{ maxWidth: "300px" }} min="1" max="100"/>
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Enter Total Column :-" name="cols" rules={[{ required: true, message: 'Please Enter Cols!' }]}>
                            <Input type="number" name="cols" onChange={(e) => { HandleChange(e, "cols") }} placeholder="cols no ..." style={{ maxWidth: "300px" }} min="1" max="100"/>
                        </Form.Item>
                        <Form.Item {...formTailLayout} label="">
                            <Button type="primary" style={{ backgroundColor: "#058a5f" }} onClick={(e) => handleSubmit()}>Add Screen</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>

        </>
    );
}
const mapStateToProps =  (state) => ({
    // err:state.userReducer.error,
    // Loading:state.userReducer.loading,
    singleuser:state.userReducer.singleuser,
  })
const mapDispatchToProps = dispatch => {
    return {
        addscreen: (postdata) => dispatch(addscreen(postdata)),
        // updateProfile:()=>dispatch(updateProfile())

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
