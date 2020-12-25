import React,{useState} from 'react';
import {addstatedata} from '../../store/action/stateAction';
import {connect} from 'react-redux';
import { Breadcrumb,Card } from 'antd';
import "../state.css";
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
  const [form] = Form.useForm();
  const [obj,setMyObj]= useState({
    state_name:""
  })

  const handleSubmit = async () =>{
    try {
      const values = await form.validateFields();
     await props.addstatedata(obj);
     props.history.replace("/state");
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }

  const HandleChange = (e,name) =>{
     let olddata = {...obj};
     olddata[name] = e.target.value;
     setMyObj(olddata);
  }

  return (
    <>    
          <div className={"Title"} style={{marginTop: "-29px" }}>
          </div>
          <Breadcrumb style={{ marginTop: "1px",textAlign:"right",marginBottom:"30px"  }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>State</Breadcrumb.Item>
              <Breadcrumb.Item>Add State</Breadcrumb.Item>
          </Breadcrumb>
            <div className="site-card-border-less-wrapper">
              <Card title="Add State Form" bordered={false} style={{ width: "auto" }}>
                      <Form form={form} name="AddForm">
                          <Form.Item {...formItemLayout} name="state_name" label="Enter State Name:-" rules={[{ required: true, message: 'Please required State!' }]}>
                              <Input type="text" name="state_name" onChange={(e)=>{HandleChange(e,"state_name")}} placeholder="Enter state name ..." style={{maxWidth : "300px"}}/>
                          </Form.Item>
                          <Form.Item {...formTailLayout} label="">
                              <Button type="primary" onClick={handleSubmit}>Add State</Button>
                          </Form.Item>
                      </Form>
              </Card>
            </div>
    </>
  );
}

const mapDispatchToProps = dispatch =>{
  return{
    addstatedata: (postdata) => dispatch(addstatedata(postdata))
  }
}
export default connect(null,mapDispatchToProps)(AddForm);
