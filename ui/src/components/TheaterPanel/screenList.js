import React, { useState, useEffect } from 'react';
import { singlescreenrecord,updatescreen,deletescreen,getscreen } from '../../store/action/screenAction';
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

const ScreenList = (props) => {
  const [form] = Form.useForm();
  const [error,setError] = useState({
    IsValid:false,
    Screen_nameERROR:""
})
  const [obj, setMyObj1] = useState({
    _id: "",
    screen_name: "",
    rows: "",
    cols:""
  })
  const [ids, setIds] = useState("");
  const [show, setShow] = useState(false);
  const [ushow, usetShow] = useState(false);

  useEffect(() => {
    props.getscreen();
    
    console.log(props.singlescreen);
    if (props.singlescreen.screen_name) {
      let olddata={...obj};
      olddata.screen_name = props.singlescreen.screen_name;
      olddata._id = props.singlescreen._id;
      olddata.rows=props.singlescreen.rows;
      olddata.cols=props.singlescreen.cols;
      setMyObj1(olddata);
    }
  }, [props.getscreen,props.singlescreen])

  const deleteHandler = async (id) => {
    await props.deletescreen(id);
    setShow(false);
  }

  const SingleSubmit = async () => {
    let errors = { ...error, IsValid : true };
    if(!obj.screen_name || obj.screen_name === "")
    {
      
      if(!obj.screen_name || obj.screen_name === ""){
        errors.IsValid = false;
        errors.Screen_nameERROR = "Screenname Is Required "
      }

    }else{
        errors.Screen_nameERROR = ""
    }
      setError(errors);
      if(errors.IsValid==true){
          console.log(obj);
        await props.updatescreen(obj._id, obj);
        // setOp(true);
        usetShow(false);
        obj._id = props.singlescreen._id;
        obj.screen_name = "";
      }
    
  }

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setIds(id);
  }

  const SingleClose = () => {
    obj.screen_name = "";
    props.singlescreen.screen_name = "";
    usetShow(false)
  };

  const handleUpdate = async (_id) => {
    await props.singlescreenrecord(_id);
    usetShow(true);
  }

  const columns = [
    {
      title: 'screen_name',
      dataIndex: 'screen_name',
      key: 'screen_name',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.screen_name.length - b.screen_name.length,
    }, {
      title: 'rows',
      key: 'rows',
      dataIndex: 'rows',
      sorter: (a, b) => a.rows.length - b.rows.length,
    }, {
        title: 'columns',
        key: 'cols',
        dataIndex: 'cols',
        sorter: (a, b) => a.cols.length - b.cols.length,
      }, {
      title: 'Update',
      key: 'Update',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleUpdate(record._id)} type="primary">UPDATE</Button>
        </Space>
      ),
    }, {
      title: 'Delete',
      key: 'Delete',
      render: (text, record) => (
        <Space size="middle">
          <Button type="danger" onClick={() => handleShow(record._id)} style={{ backgroundColor: "Red", borderBlockColor: "Black", color: "White" }}>Delete</Button>
        </Space>
      ),
    }
  ];

  const HandleChange = (e, name) => {
    let olddata = { ...obj };
      olddata[name] = e.target.value;
    // setOp(false);
    setMyObj1(olddata);
  }

  return (
    <>
      <div className={"Title"} style={{ marginTop: "-29px"}}>
          </div>
      <Breadcrumb style={{ marginTop: "1px",textAlign:"right",marginBottom:"29px" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Screen</Breadcrumb.Item>
        <Breadcrumb.Item>View Screen List</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-card-border-less-wrapper">
        <Card title="View Screen List" bordered={true} style={{ width: "auto",border:"5px" }}>
          <Table columns={columns} dataSource={props.screens} pagination={{ pageSize: 4 }} />
        </Card>
      </div>
      {/* Update Record */}
      <Modal title="Update State"
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

const mapStateToProps = (state) => ({
  err: state.screenReducer.error,
  screens: state.screenReducer.screens,
  singlescreen: state.screenReducer.singlescreen
})

const mapDispatchToProps = dispatch => {
  return {
    getscreen: () => dispatch(getscreen()),
    deletescreen: (_id) => dispatch(deletescreen(_id)),
    updatescreen: (postdata, put) => dispatch(updatescreen(postdata, put)),
    singlescreenrecord: (id) => dispatch(singlescreenrecord(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ScreenList);
