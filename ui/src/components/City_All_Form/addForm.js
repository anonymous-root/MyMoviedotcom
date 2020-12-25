import React,{useState,useEffect} from 'react';
// import Form from 'react-bootstrap/Form';
import {Row,Col,Modal,CardGroup} from 'react-bootstrap';
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button'/;
import {addcitiesdata} from '../../store/action/cityAction';
import {fetchstatedata} from '../../store/action/stateAction';
import {connect} from 'react-redux';
import { Breadcrumb,Card,Select,Space } from 'antd';
import {
  Form,
  Input,
  Button
} from 'antd';
const {Option} = Select;

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
      city_name:"",
      state_id:""
    })
    const [error,setError]=useState({
        city_nameError:"",
        isValid:false
    });
    
const [show, setShow] = useState(false);
const [ids,setIds] = useState("");

const handleClose = () => setShow(false);
const handleShow = (id) => {setShow(true);
  setIds(id);
}

const deleteHandler = async (id) =>{
    await props.deletestatedata(id);
    setShow(false);
  }
    useEffect(()=>{
      form.validateFields(['nickname']);
        props.fetchstatedata();
      // console.log(props.states);
    },[props.fetchstatedata])
    
    const handleSubmit = async () =>{
      try {
        const values = await form.validateFields();
        // console.log('Success:', values);
        await props.addcitiesdata(obj);
        props.history.replace("/city");
        obj.city_name="";
      } catch (errorInfo) {
        console.log('Failed:', errorInfo);
      }
    }
  

    const HandleChange = (e,name) =>{
      let olddata = {...obj};
      if(name!="state_id"){
        olddata[name] = e.target.value;
        }else{
          olddata[name] = e;
        }
       setMyObj(olddata);
    }

    const optionTemplate = () => {
      return props.states.map((stateslist) => {
      const { _id, state_name } = stateslist;
      return (
          <Option value={_id} key={_id}>{state_name}</Option>
       )
      })    
    }
  return (

    <>
     <div className={"Title"} style={{marginTop: "-29px" }}>
          </div>
          <Breadcrumb style={{ marginTop: "1px",textAlign:"right",marginBottom:"30px"  }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>City</Breadcrumb.Item>
              <Breadcrumb.Item>Add City</Breadcrumb.Item>
          </Breadcrumb>
            <div className="site-card-border-less-wrapper">
              <Card title="Add City Form" bordered={false} style={{ width: "auto" }}>
                      <Form form={form} name="AddForm">
                      <Form.Item {...formItemLayout} label="Enter City Name:-" name="city_name" rules={[{ required: true, message: 'Please required City!' }]}>
                              <Input type="text" name="city_name" onChange={(e)=>{HandleChange(e,"city_name")}} placeholder="Enter city name ..." style={{maxWidth : "300px"}}/>
                          </Form.Item>
                          <Form.Item {...formItemLayout} label="Select State :-" name="state_id" rules={[{ required: true, message: 'Please required State!' }]}>
                                <Select name="state_id" onChange={(e)=>HandleChange(e,"state_id")} placeholder="------ Select State-----" allowClear>
                                      {optionTemplate()}
                                  </Select>
                          </Form.Item>
                           <Form.Item {...formTailLayout} label=""> 
                                <Button type="primary" onClick={(e) =>handleSubmit()}>Add City</Button>
                          </Form.Item> 
                      </Form>
              </Card>
            </div>
    
    </>
  );
}
const mapStateToProps =  (state) => ({
    err:state.stateReducer.error,
    states:state.stateReducer.states,
  })

const mapDispatchToProps = dispatch =>{
  return{
    fetchstatedata:()=>dispatch(fetchstatedata()),
    addcitiesdata: (postdata) => dispatch(addcitiesdata(postdata))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddForm);
