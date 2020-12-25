import React, { useEffect, useState } from 'react';
import { addtscreen } from "../../store/action/theaterscreenAction";
import { getscreen } from "../../store/action/screenAction";
import { fetchmoviedata } from "../../store/action/movieAction"
import {login} from '../../store/action/userAction';
import { connect } from 'react-redux';
import { Breadcrumb,Card,Row,Col,DatePicker,TimePicker,Select } from 'antd';
import moment from 'moment';
import {
  Form,
  Input,
  Button,
  Switch
} from 'antd';
// import { Row } from 'react-bootstrap';
const {Option} = Select;
const formItemLayout = {
  labelCol: {
    // span: 5,
  },
  wrapperCol: {
    span: 10,
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

const AddTScreen = (props) => {
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();
  const [obj, setMyObj] = useState({
    user_id: "",
    movie_id: "",
    screen_id: "",
    screen_time: "",
    start_date: "",
    end_date: "",
    end_time: "",
  })

  useEffect(()=>{
    props.getscreen()
    props.fetchmoviedata()
    console.log(props.singleuser._id);
    // console.log(props.)
  },[props.getscreen,props.fetchmoviedata,props.singleuser])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
        const formdata = new FormData();
        formdata.append("user_id",props.singleuser._id)
        formdata.append("screen_id",obj.screen_id);
        formdata.append("movie_id",obj.movie_id);
        formdata.append("screen_time",obj.screen_time);
        formdata.append("end_time",obj.end_time);
        formdata.append("start_date",obj.start_date);
        formdata.append("end_date",obj.end_date);
      
        console.log(obj.screen_time);
        await props.addtscreen(formdata);
        props.history.replace("/theater/tscreenList");
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }

  const HandleChange = (e, name) => {
    let olddata = {...obj};
    if((name === "screen_id") || (name === "movie_id"))
    {
      olddata[name] = e;
    }
    else if((name == "start_date") || (name == "end_date"))
    {
      if(e!=null)
      olddata[name] = new Date(e._d).toLocaleDateString();
    }
    else if((name == "screen_time") || (name == "end_time"))
    {
      if(e!=null)
      olddata[name] = new Date(e._d).toLocaleTimeString();
    }
    console.log(olddata);
    setMyObj(olddata);
  }

   const optionTemplate = ()=>{
     return props.screens.map((screenlist)=>{
       const{_id,screen_name} = screenlist;
       return(
         <option value={_id} key={_id}>{screen_name}</option>
       )
     })
   }

   const optionMovieTemplate = ()=>{
    return props.movies.map((movielist)=>{
      const{_id,moviename} = movielist;
      return(
        <option value={_id} key={_id}>{moviename}</option>
      )
    })
  }

  return (
    <>
      <div className={"Title"} style={{marginTop: "-29px" }}>
          </div>
          <Breadcrumb style={{ marginTop: "1px",textAlign:"right",marginBottom:"30px"  }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Theater</Breadcrumb.Item>
              <Breadcrumb.Item>Add Theater Screen</Breadcrumb.Item>
          </Breadcrumb>
            <div className="site-card-border-less-wrapper">
              <Card title="Add Theater Screen Form" bordered={false} style={{ width: "auto" }}>
                      <Form form={form} name="AddTScreen">
                      <Row gutter={0}>
                          <Col span={12}>
                          <Form.Item {...formItemLayout} label="SELECT SCREEN:-" name="screenname" rules={[{ required: true, message: 'Please Select Screen Name' }]}>
                          <Select name="screen_id" onChange={(e)=>HandleChange(e,"screen_id")} placeholder="------ Select Screen-----" allowClear>
                                      {optionTemplate()}
                                  </Select>
                          </Form.Item>
                          
                      </Col>
                      <Col span={12}>
                          <Form.Item {...formItemLayout} label="SELECT MOVIE:-" name="moviename" rules={[{ required: true, message: 'Please required movie name!' }]}>
                          <Select name="movie_id" onChange={(e)=>HandleChange(e,"movie_id")} placeholder="------ Select Movie-----" allowClear>
                                      {optionMovieTemplate()}
                                  </Select>
                          </Form.Item>
                          
                      </Col>
                    </Row>
                      <Row gutter={0}>
                      <Col span={12}>
                          <Form.Item {...formItemLayout} label="Screen Time" name="screen_time" rules={[{ required: true, message: 'Please Select Screen Time' }]}>
                              <TimePicker name="screen_time" onChange={(e) => { HandleChange(e, "screen_time") }} placeholder="Screen Time" />
                          </Form.Item>
                      </Col>
                        <Col span={12}>
                        <Form.Item {...formItemLayout} label="End Time" name="end_time" rules={[{ required: true, message: 'Please Select End Time' }]}>
                              <TimePicker name="end_time" onChange={(e) => { HandleChange(e, "end_time") }} placeholder="End Time"/>
                          </Form.Item>
                          
                      </Col>
                      </Row>
                      
                      <Row gutter={0}>
                      <Col span={12}>
                          <Form.Item {...formItemLayout} label="Starting Date:-" name="start_date" rules={[{ required: true, message: 'Please Select Start Date!' }]}>
                          <DatePicker format="DD/MM/yyyy" name="start_date" onChange={(e) => { HandleChange(e, "start_date") }} placeholder="Start Date"/>
                          </Form.Item>
                          
                      </Col>
                      <Col span={12}>
                      <Form.Item {...formItemLayout} label="Ending Date:-" name="end_date" rules={[{ required: true, message: 'Please Select End Date!' }]}>
                          <DatePicker format="DD/MM/yyyy" name="end_date" onChange={(e) => { HandleChange(e, "end_date") }} placeholder="End date"/>
                          </Form.Item>
                          </Col>
                      </Row>
                      
                        
                           <Form.Item {...formTailLayout} label=""> 
                                <Button type="primary" onClick={(e) =>handleSubmit()} loading={props.loading}>Add Theater Screen</Button>
                          </Form.Item>                           
                      </Form>
              </Card>
            </div>
    </>
  );
}
const mapStateToProps =  (state) => ({
   screens:state.screenReducer.screens,
   error:state.screenReducer.error,
   movies:state.movieReducer.movies,
   error:state.movieReducer.error,
   singleuser:state.userReducer.singleuser
})

const mapDispatchToProps = dispatch => {
  return {
    addtscreen: (postdata) => dispatch(addtscreen(postdata)),
    getscreen: ()=> dispatch(getscreen()),
    fetchmoviedata:()=>dispatch(fetchmoviedata())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddTScreen);
