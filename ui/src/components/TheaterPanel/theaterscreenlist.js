import React, { useState, useEffect } from 'react';
import { gettscreen,deletetscreen } from '../../store/action/theaterscreenAction';
import { connect } from 'react-redux';
import '../state.css';
import { Table, Space, Button, Breadcrumb, Card, Form, Modal, Input } from 'antd';

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 10,
  },
};

const TheaterScreenList = (props) => {
  const [form] = Form.useForm();
  const [error,setError] = useState({
    IsValid:false,
    Screen_nameERROR:""
})
  const [obj, setMyObj1] = useState({
    _id: "",
    user_id: "",
    movie_id: "",
    screen_id:"",
    screen_time:"",
    start_date:"",
    end_date:"",
    end_time:""
  })
  const [ids, setIds] = useState("");
  const [show, setShow] = useState(false);
  const [ushow, usetShow] = useState(false);

  useEffect(() => {
    props.gettscreen();
    
    // console.log(props.singlescreen);
    // if (props.singlescreen.screen_name) {
    //   let olddata={...obj};
    //   olddata.screen_name = props.singlescreen.screen_name;
    //   olddata._id = props.singlescreen._id;
    //   olddata.rows=props.singlescreen.rows;
    //   olddata.cols=props.singlescreen.cols;
    //   setMyObj1(olddata);
    // }
  }, [props.gettscreen])

  const deleteHandler = async (id) => {
    await props.deletetscreen(id);
    setShow(false);
  }

//   const SingleSubmit = async () => {
//     let errors = { ...error, IsValid : true };
//     if(!obj.screen_name || obj.screen_name === "")
//     {
      
//       if(!obj.screen_name || obj.screen_name === ""){
//         errors.IsValid = false;
//         errors.Screen_nameERROR = "Screenname Is Required "
//       }

//     }else{
//         errors.Screen_nameERROR = ""
//     }
//       setError(errors);
//       if(errors.IsValid==true){
//           console.log(obj);
//         await props.updatescreen(obj._id, obj);
//         // setOp(true);
//         usetShow(false);
//         obj._id = props.singlescreen._id;
//         obj.screen_name = "";
//       }
    
//   }

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setIds(id);
  }

//   const SingleClose = () => {
//     obj.screen_name = "";
//     props.singlescreen.screen_name = "";
//     usetShow(false)
//   };

//   const handleUpdate = async (_id) => {
//     await props.singlescreenrecord(_id);
//     usetShow(true);
//   }

  const columns = [
    {
      title: 'Screen_Name',
    //   dataIndex: 'screen_name',
      key: 'screen_id',
      defaultSortOrder: 'descend',
      render: s=>s.screen_id.screen_name,
      sorter: (a, b) => a.screen_id.screen_name.length - b.screen_id.screen_name.length,
    },
     {
      title: 'Movie_Name',
      key: 'movie_id',
    //   dataIndex: 'moviename',
      defaultSortOrder:'descend',
      render: s => s.movie_id.moviename,
      sorter: (a, b) => a.movie_id.moviename.length - b.movie_id.moviename.length,
    }, {
        title: 'screen_time',
        key: 'screen_time',
        dataIndex: 'screen_time',
        sorter: (a, b) => a.screen_time.length - b.screen_time.length,
      },{
        title: 'end_time',
        key: 'end_time',
        dataIndex: 'end_time',
        sorter: (a, b) => a.end_time.length - b.end_time.length,
      },{
        title: 'Start Date',
        key: 'start_date',
        dataIndex: 'start_date',
        sorter: (a, b) => a.start_date.length - b.start_date.length,
      },{
        title: 'End Date',
        key: 'end_date',
        dataIndex: 'end_date',
        sorter: (a, b) => a.end_date.length - b.end_date.length,
      }
    // , {
    //   title: 'Update',
    //   key: 'Update',
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <Button onClick={() => handleUpdate(record._id)} type="primary">UPDATE</Button>
    //     </Space>
    //   ),
    // }, 
    ,{
      title: 'Delete',
      key: 'Delete',
      render: (text, record) => (
        <Space size="middle">
          <Button type="danger" onClick={() => handleShow(record._id)} style={{ backgroundColor: "Red", borderBlockColor: "Black", color: "White" }}>Delete</Button>
        </Space>
      ),
    }
  ];

//   const HandleChange = (e, name) => {
//     let olddata = { ...obj };
//       olddata[name] = e.target.value;
//     // setOp(false);
//     setMyObj1(olddata);
//   }

  return (
    <>
      <div className={"Title"} style={{ marginTop: "-29px"}}>
          </div>
      <Breadcrumb style={{ marginTop: "1px",textAlign:"right",marginBottom:"29px" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Theater Screen</Breadcrumb.Item>
        <Breadcrumb.Item>View Theater Screen List</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-card-border-less-wrapper">
        <Card title="View Screen List" bordered={true} style={{ width: "auto",border:"5px" }}>
          <Table columns={columns} dataSource={props.tscreens} pagination={{ pageSize: 4 }} />
        </Card>
      </div>
      {/* Update Record */}
      {/* <Modal title="Update State"
        visible={ushow}
        onOk={() => SingleSubmit()}
        onCancel={() => SingleClose()}>
        <Form form={form} name="ScreenList">
          <Input type="hidden" name="_id" value={obj._id} onChange={(e) => HandleChange(e, "_id")} />
          <Form.Item {...formItemLayout} label="Enter Screen Name:-" 
                hasFeedback
                validateStatus={(error.Screen_nameERROR)?"error":"success"}
                help={error.Screen_nameERROR}>
            <Input type="text" name="screen_name" value={obj.screen_name || " "} onChange={(e) => { HandleChange(e, "screen_name") }} placeholder="Enter Screen name ..." />
          </Form.Item>
          <Form.Item {...formItemLayout} label="Enter Rows:-" >
            <Input type="number" name="rows" value={obj.rows || " "} onChange={(e) => { HandleChange(e, "rows") }} placeholder="Enter Rows ..." min="1" max="100"/>
          </Form.Item>
          <Form.Item {...formItemLayout} label="Enter Cols:-" >
            <Input type="number" name="cols" value={obj.cols || " "} onChange={(e) => { HandleChange(e, "cols") }} placeholder="Enter Cols ..." min="1" max="100"/>
          </Form.Item>
        </Form>
      </Modal> */}

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

const mapStateToProps = (state) => ({
  err: state.theaterscreenReducer.error,
  tscreens:state.theaterscreenReducer.tscreens
})

const mapDispatchToProps = dispatch => {
  return {
    // getscreen: () => dispatch(getscreen()),
    // deletescreen: (_id) => dispatch(deletescreen(_id)),
    // updatescreen: (postdata, put) => dispatch(updatescreen(postdata, put)),
    // singlescreenrecord: (id) => dispatch(singlescreenrecord(id))
      gettscreen: ()=>dispatch(gettscreen()),
      deletetscreen: (_id)=>dispatch(deletetscreen(_id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TheaterScreenList);
