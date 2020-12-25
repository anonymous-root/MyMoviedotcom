import React,{useState,useEffect} from 'react';
// import {Button,Card,Table,Modal,Form, Spinner }from 'react-bootstrap';
import {fetchmoviedata,updatemoviedata,singlemovieDataFetch,deletemoviedata} from '../../store/action/movieAction';
import {connect} from 'react-redux';
import '../state.css';
import { Table, Space, Button, Breadcrumb, Card, Form, Modal, Input, Row, Col,DatePicker,Switch,Select } from 'antd';
import moment from 'moment';

const {Option} = Select;
const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 12,
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

const MovieList = (props) => {
  const {form} =Form.useForm();
  const [obj,setMyObj1]= useState({
    _id:"",
    moviename:"",
    releasedate:"",
    movie_category:"",
    director_name:"",
    Actors_name:"",
    movie_description:"",
    movie_type:"",
    movie_logo:"",
    movie_status:"",
    booking_status:""
  })
  
  const [op,setOp] = useState(true);
  const [ids,setIds] = useState("");
  const [show, setShow] = useState(false);
  const [ushow, usetShow] = useState(false);
  
  const [error,setError] = useState({
    movie_nameError:'',
    IsValid:false,
})
  useEffect(()=>{    
    props.fetchmoviedata();
    if (props.singlemovie.moviename || props.singlemovie.movie_category || props.singlemovie.releasedate) {
      console.log(props.singlemovie.moviename)
      let olddata={...obj};
      olddata.moviename = props.singlemovie.moviename;
      olddata._id = props.singlemovie._id;
      olddata.movie_category=props.singlemovie.movie_category;
      olddata.releasedate=props.singlemovie.releasedate;
      olddata.director_name=props.singlemovie.director_name;
      olddata.Actors_name=props.singlemovie.Actors_name;
      olddata.movie_description=props.singlemovie.movie_description;
      olddata.movie_type=props.singlemovie.movie_type;
      olddata.movie_logo=props.singlemovie.movie_logo;
      if(props.singlemovie.movie_status=="true"){
        olddata.movie_status=true;
      }else{
        olddata.movie_status=false;        
      }
      if(props.singlemovie.booking_status=="true"){
        olddata.booking_status=true;
      }else{
        olddata.booking_status=false;
      }
      setMyObj1(olddata);
    }
  },[props.fetchmoviedata,props.singlemovie])
  
  const deleteHandler = async (id) =>{
      await props.deletemoviedata(id);
      setShow(false);
  }

const SingleSubmit = async () =>{
  let errors = { ...error, IsValid : true };
    if(!obj.moviename || obj.moviename === "")
    {
      console.log(errors.IsValid);
      if(!obj.moviename || obj.moviename === ""){
        errors.IsValid = false;
        errors.movie_nameError = "moviename Is Required "
      }

    }else{
        errors.movie_nameError = ""
    }
    setError(errors);
    if(errors.IsValid==true){
      // const values = await form.validateFields();
      console.log(obj);
          const formdata = new FormData();
          formdata.append("moviename",obj.moviename);
          formdata.append("releasedate",obj.releasedate);
          formdata.append("movie_status",obj.movie_status);
          formdata.append("movie_category",obj.movie_category);
          formdata.append("director_name",obj.director_name);
          formdata.append("Actors_name",obj.Actors_name);
          formdata.append("movie_description",obj.movie_description);
          formdata.append("movie_type",obj.movie_type);
          formdata.append("movie_logo",obj.movie_logo);
          formdata.append("booking_status",obj.booking_status);
        await props.updatemoviedata(obj._id,formdata);
        // setOp(true);
        usetShow(false);
        obj._id=props.singlemovie._id;
        obj.moviename="";
        props.history.replace(`/movie`);
    }
}


const handleClose = () => setShow(false);
const handleShow = (id) => {
  let errors = { ...error, IsValid : true };
  setError(errors);
  // setOp(true);
  setShow(true);
  setIds(id);
}

const SingleClose = () => {
  let errors = { ...error, IsValid : true }; 
  errors.movie_nameError = ""
  setError(errors);
  // setOp(true);
  obj.releasedate="";
  obj.booking_status=false;
  obj.moviename="";
  props.singlemovie.moviename = "";
  usetShow(false) 
};

// if(props.singlemovie.moviename && !obj.moviename){
//   // if(op!=false){
//     setMyObj1(props.singlemovie)
//   // }
// }
const handleUpdate = async (_id) => {
  await props.singlemovieDataFetch(_id); 
  usetShow(true);
}
 const HandleChange = (e,name) =>{
  let olddata = {...obj};
  if (name == "movie_logo") {
    console.log(name);
    const { target: { files } } = e
    olddata[name] = files.length === 1 ? files[0] : files
    olddata[name] = e.target.files[0];
  }else if(name == "releasedate"){
    if(e!=null){
      olddata[name] = new Date(e._d).toLocaleDateString();
    }
  }else if((name=="booking_status") || (name==="movie_status") || (name === "movie_type")  || (name === "movie_category")){
      olddata[name]=e;
  }else
  {
    olddata[name] = e.target.value;
  }
  // console.log(olddata);
  // setOp(false);
  setMyObj1(olddata);
  console.log(obj);
}
const columns = [
  {
    title: () => <b>Index</b>,
    key: 'Index',
    fixed:"left",
    render : (text, record, index) => index+1,
  },{
    title: () => <b>Movie Name</b>,
    dataIndex: 'moviename',
    key: 'moviename',
    defaultSortOrder: 'descend',
    fixed:"left",
    sorter: (a, b) => a.moviename.length - b.moviename.length,
  },{
    title: () => <b>Release Date</b>,
    dataIndex: 'releasedate',
    key: 'releasedate',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.releasedate.length - b.releasedate.length,
  },{
    title: () => <b>Movie Description</b>,
    dataIndex: 'movie_description',
    key: 'movie_description',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.movie_description.length - b.movie_description.length,
  },{
    title: () => <b>Director Name</b>,
    dataIndex: 'director_name',
    key: 'director_name',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.director_name.length - b.director_name.length,
  },{
    title: () => <b>Actors Name</b>,
    dataIndex: 'Actors_name',
    key: 'Actors_name',
    defaultSortOrder: 'descend',
    // sorter: (a, b) => a.Actors_name.length - b.Actors_name.length,
  },{
    title: () => <b>Movie Category</b>,
    dataIndex: 'movie_category',
    key: 'movie_category',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.movie_category.length - b.movie_category.length,
  },{
    title: () => <b>Movie Type</b>,
    dataIndex: 'movie_type',
    key: 'movie_type',
    defaultSortOrder: 'descend',
    // sorter: (a, b) => a.movie_type.length - b.movie_types.length,
  },{
    title: () => <b>Movie Status</b>,
    render : (text, record, index) => <Switch name="movie_status" checked={text.movie_status=="true"} style={{color:"red"}}/>,
    key: 'movie_status',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.movie_status.length - b.movie_status.length,
  },{
    title: () => <b>Booking Status</b>,
    render : (text, record, index) => text.booking_status=="true"?<div style={{color:"Green"}}>Available</div>:<div style={{color:"Red"}}>Not Available</div>,
    key: 'booking_status',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.movie_status - b.movie_status,
  },{
    title: () => <b>Image</b>,
    dataIndex: "movie_logo",
    key: 'movie_logo',
    defaultSortOrder: 'descend',
    render:  (text,record) => <img src={"http://localhost:3001"+record.movie_logo} height="25px" width="25px" />
    // sorter: (a, b) => a.movie_status - b.movie_status,
  },{
    title: () => <b>Update</b>,
    key: 'Update',
    fixed:"right",
    render: (text, record) => (
      <Space size="middle">
        <Button onClick={() => handleUpdate(record._id)} type="primary">UPDATE</Button>
      </Space>
    ),
  },{
    title: () => <b>Delete</b>,
    key: 'Delete',
    fixed:"right",
    render: (text, record) => (
      <Space size="middle">
        <Button type="danger" onClick={() => handleShow(record._id)} style={{backgroundColor:"Red",borderBlockColor:"Black",color:"White"}}>Delete</Button>
      </Space>
    ),
  }
];

  return (
    <>
      <div className={"Title"} style={{ marginTop: "-29px"}}>
        {/* City List */}
          </div>
      <Breadcrumb style={{ marginTop: "1px",textAlign:"right",marginBottom:"29px" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Movie</Breadcrumb.Item>
        <Breadcrumb.Item>View Movie List</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-card-border-less-wrapper">
        <Card title="View Movie List" bordered={true} style={{ width: "auto",border:"5px" }}>
          <Table columns={columns} dataSource={props.movies} pagination={{ pageSize: 4 }} scroll={{ x: 1300 }}/>
        </Card>
      </div>

      {/* Update Record */}
      <Modal title="Update State"
        visible={ushow}
        onOk={() => SingleSubmit()}
        onCancel={() => SingleClose()}>
       <Form>
                      <Row gutter={0}>
                          <Col span={12} >
                              <Input type="hidden" name="_id" value={obj._id} onChange={(e) => { HandleChange(e, "_id") }}/>
                          <Form.Item {...formItemLayout} label="Enter Movie Name:-" 
                                      hasFeedback
                                      validateStatus={(error.movie_nameError)?"error":"success"}
                                      help={error.movie_nameError}
                                      style={{width: "400px"}}>
                              <Input type="text" name="moviename" value={obj.moviename} onChange={(e) => { HandleChange(e, "moviename") }} placeholder="Enter moviename ..." style={{maxWidth : "300px", width:"100%"}}/>
                          </Form.Item>
                          
                      </Col>
                      <Col span={12}>
                          <Form.Item {...formItemLayout} label="Enter Movie Category:-" rules={[{ required: true, message: 'Please required movie category!' }]} style={{width: "400px"}}>
                                  <Select name="movie_category" value={obj.movie_category} onChange={(e)=>HandleChange(e,"movie_category")} placeholder="------ Select Movie Category-----" allowClear style={{maxWidth : "300px"}}>
                                      <Option value="A" key={"A"}>A</Option>
                                      <Option value="B" key={"B"}>B</Option>
                                      <Option value="C" key={"C"}>C</Option>
                                      <Option value="D" key={"D"}>D</Option>
                                  </Select>
                              {/* <Input type="text" name="movie_category" value={obj.movie_category} onChange={(e) => { HandleChange(e, "movie_category") }} placeholder="Enter movie_category ..." style={{maxWidth : "300px", width:"100%"}}/> */}
                          </Form.Item>
                      </Col>
                    </Row>
                      <Row gutter={0}>
                      <Col span={12}>
                          <Form.Item {...formItemLayout} label="Enter Release Date:-" rules={[{ required: true, message: 'Please required Releasedate!' }]} style={{width: "400px"}}>
                              <DatePicker name="releasedate" onChange={(e) => { HandleChange(e, "releasedate") }} value={moment(obj.releasedate,"MM/DD/ YYYY")} />
                          </Form.Item>
                      </Col>
                        <Col span={12}>
                          <Form.Item {...formItemLayout} label="Enter Director Name:-" rules={[{ required: true, message: 'Please required director name!' }]} style={{width: "400px"}}>
                              <Input type="text" name="director_name" value={obj.director_name} onChange={(e) => { HandleChange(e, "director_name") }} placeholder="Enter director_name ..." style={{maxWidth : "300px"}}/>
                          </Form.Item>
                          
                      </Col>
                      </Row>
                      <Row gutter={0}>
                      <Col span={12}>
                          <Form.Item {...formItemLayout} label="Enter Actors Name:-" rules={[{ required: true, message: 'Please required actors name!' }]} style={{width: "400px"}}>
                              <Input type="text" name="Actors_name" value={obj.Actors_name} onChange={(e) => { HandleChange(e, "Actors_name") }} placeholder="Enter Actors ..." style={{maxWidth : "300px"}}/>
                          </Form.Item>
                          
                      </Col>
                      <Col span={12}>
                          <Form.Item {...formItemLayout} label="Enter Movie Description:-" rules={[{ required: true, message: 'Please required movie description!' }]} style={{width: "400px"}}>
                              <Input type="text" name="movie_description" value={obj.movie_description} onChange={(e) => { HandleChange(e, "movie_description") }} placeholder="Enter movie_description ..." style={{maxWidth : "300px"}}/>
                          </Form.Item>
                          </Col>
                      </Row>
                      <Row gutter={0}>
                        <Col span={12}>
                          <Form.Item {...formItemLayout} label="Enter Movie Type:-" rules={[{ required: true, message: 'Please required movie type!' }]} style={{width: "400px"}}>
                          <Select name="movie_type" value={obj.movie_type} onChange={(e)=>HandleChange(e,"movie_type")} placeholder="------ Select Movie Type-----" allowClear style={{maxWidth : "300px"}}>
                                      <Option value="Action" key={"Action"}>Action</Option>
                                      <Option value="Comedy" key={"Comedy"}>Comedy</Option>
                                      <Option value="Drama" key={"Drama"}>Drama</Option>
                                      <Option value="Fantasy" key={"Fantasy"}>Fantasy</Option>
                                      <Option value="Horror" key={"Horror"}>Horror</Option>
                                      <Option value="Mystery" key={"Mystery"}>Mystery</Option>
                                      <Option value="Romance" key={"Romance"}>Romance</Option>
                                      <Option value="Thriller" key={"Thriller"}>Thriller</Option>
                                      <Option value="Western" key={"Western"}>Western</Option>
                                      <Option value="Crime Film" key={"Crime Film"}>Crime Film</Option>
                                      <Option value="Romantic Comedy" key={"Romantic Comedy"}>Romantic Comedy</Option>
                                      <Option value="Documentary" key={"Documentary"}>Documentary</Option>
                                  </Select>
                              {/* <Input type="text" name="movie_type" value={obj.movie_type} onChange={(e) => { HandleChange(e, "movie_type") }} placeholder="Enter movie_type..." style={{maxWidth : "300px"}}/> */}
                          </Form.Item>
                          
                      </Col>
                      <Col span={12}>
                          <Form.Item {...formItemLayout} label="Choice Movie Logo:-" style={{width: "400px"}}>
                              <Input type="file" name="movie_logo"  onChange={(e)=>{HandleChange(e,"movie_logo")}} placeholder="Enter movie_logo ..." style={{maxWidth : "100px"}}>
                              </Input>
                          </Form.Item>
                                <img src={"http://localhost:3001"+obj.movie_logo} height="25px" width="25px" />
                          
                      </Col>
                      </Row>
                      <Row gutter={0}>
                      <Col span={12}>
                          <Form.Item {...formItemLayout} label="Enter Movie Status:-">
                          <Switch name="movie_status" checked={Boolean(obj.movie_status)==true} onChange={(e) => { HandleChange(e, "movie_status") }}  style={{ maxWidth: "300px" }}/>
                              {/* <Input type="text" name="movie_status" value={obj.movie_status} onChange={(e) => { HandleChange(e, "movie_status") }} placeholder="Enter movie_status ..." style={{ maxWidth: "300px" }} /> */}
                          </Form.Item>
                          </Col>
                      <Col span={12}>
                          <Form.Item {...formItemLayout} label="Enter Booking Status:-">
                            <Switch name="booking_status" checked={Boolean(obj.booking_status)==true} onChange={(e) => { HandleChange(e, "booking_status") }}  style={{ maxWidth: "300px" }}>
                                
                            </Switch>
                              {/* <Input type="text" name="booking_status" value={obj.booking_status} onChange={(e) => { HandleChange(e, "booking_status") }} placeholder="Enter booking_status ..." style={{maxWidth : "300px"}}/> */}
                          </Form.Item>
                          </Col>
                      </Row>                          
                      </Form>
      </Modal>

      {/* Delete Record  */}
      <Modal title="Are you sure!"
        visible={show}
        onOk={() => deleteHandler(ids)}
        onCancel={() => handleClose()}>
        Do you want to delete this state?
      </Modal>
    </>
  );
}

const mapStateToProps =  (state) => ({
  err:state.movieReducer.error,
  Loading:state.movieReducer.loading,
  movies:state.movieReducer.movies,
  singlemovie:state.movieReducer.singlemovie,
})

const mapDispatchToProps = dispatch =>{
  return{
    fetchmoviedata:()=>dispatch(fetchmoviedata()),
    deletemoviedata:(_id)=>dispatch(deletemoviedata(_id)),
    updatemoviedata:(postdata,put) => dispatch(updatemoviedata(postdata,put)),
    singlemovieDataFetch:(id)=>dispatch(singlemovieDataFetch(id))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(MovieList);