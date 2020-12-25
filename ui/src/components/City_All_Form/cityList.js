import React, { useState, useEffect } from 'react';
import { fetchcitiesdata, deletecitiesdata, updatecitiesdata, singlecitiesDataFetch } from '../../store/action/cityAction';
import { fetchstatedata } from '../../store/action/stateAction';
import { connect } from 'react-redux';
import '../state.css';
import { Table, Space, Button, Breadcrumb, Card, Form, Modal, Input, Select } from 'antd';

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 10,
  },
};

const CityList = (props) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [error,setError] = useState({
    state_nameError:'',
    IsValid:false,
    city_nameError:""
})
  const [obj, setMyObj1] = useState({
    _id: "",
    city_name: "",
    state_id: ""
  })
  const [op,setOp] = useState(true);
  const [ids, setIds] = useState("");
  const [show, setShow] = useState(false);
  const [ushow, usetShow] = useState(false);

  useEffect(() => {
    props.fetchcitiesdata();
    props.fetchstatedata();
    if (props.singlecities.city_name) {
      console.log(props.singlecities.city_name)
      let olddata={...obj};
      olddata.city_name = props.singlecities.city_name;
      olddata._id = props.singlecities._id;
      olddata.state_id=props.singlecities.state_id;
      setMyObj1(olddata);
    }
  }, [props.fetchcitiesdata, props.fetchstatedata,props.singlecities])

  const deleteHandler = async (id) => {
    await props.deletecitiesdata(id);
    setShow(false);
  }

  const SingleSubmit = async () => {
    let errors = { ...error, IsValid : true };
    if(!obj.state_id || obj.state_id === "" || !obj.city_name || obj.city_name === "")
    {
      if(!obj.state_id || obj.state_id === ""){
        errors.IsValid = false;
        errors.state_nameError = "StateName Is Required "
      }
      if(!obj.city_name || obj.city_name === ""){
        errors.IsValid = false;
        errors.city_nameError = "cityname Is Required "
      }

    }else{
        errors.state_nameError = ""
        errors.city_nameError = ""
    }
      setError(errors);
      if(errors.IsValid==true){
        await props.updatecitiesdata(obj._id, obj);
        setOp(true);
        usetShow(false);
        obj._id = props.singlecities._id;
        obj.city_name = "";
      }
    
  }

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setOp(true);
    setShow(true);
    setIds(id);
  }

  const SingleClose = () => {
    setOp(true);
    obj.city_name = "";
    props.singlecities.city_name = "";
    usetShow(false)
  };

  // if (props.singlecities.city_name && !obj.city_name) {
  //   if(op!=false){
  //     console.log(op);
  //     setMyObj1(props.singlecities)
  //   }
  // }
  const handleUpdate = async (_id) => {
    await props.singlecitiesDataFetch(_id);
    usetShow(true);
  }

  const columns = [
    {
      title: 'city_Name',
      dataIndex: 'city_name',
      key: 'city_name',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.city_name.length - b.city_name.length,
    }, {
      title: 'state_name',
      key: 'state_id',
      defaultSortOrder: 'descend',
      render: s => s.state_id.state_name,
      sorter: (a, b) => a.state_id.state_name.length - b.state_id.state_name.length,
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
    if (name != "state_id") {
      olddata[name] = e.target.value;
    } else {
      olddata[name] = e;
    }
    setOp(false);
    setMyObj1(olddata);
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
      <div className={"Title"} style={{ marginTop: "-29px"}}>
        {/* City List */}
          </div>
      <Breadcrumb style={{ marginTop: "1px",textAlign:"right",marginBottom:"29px" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>City</Breadcrumb.Item>
        <Breadcrumb.Item>View City List</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-card-border-less-wrapper">
        <Card title="View City List" bordered={true} style={{ width: "auto",border:"5px" }}>
          <Table columns={columns} dataSource={props.cities} pagination={{ pageSize: 4 }} />
        </Card>
      </div>
      {/* Update Record */}
      <Modal title="Update State"
        visible={ushow}
        onOk={() => SingleSubmit()}
        onCancel={() => SingleClose()}>
        <Form form={form} name="CityList">
          <Input type="hidden" name="_id" value={obj._id} onChange={(e) => HandleChange(e, "_id")} />
          <Form.Item {...formItemLayout} label="Enter City Name:-" 
                hasFeedback
                validateStatus={(error.city_nameError)?"error":"success"}
                help={error.city_nameError}>
            <Input type="text" name="city_name" value={obj.city_name || " "} onChange={(e) => { HandleChange(e, "city_name") }} placeholder="Enter city name ..." />
          </Form.Item>
          <Form.Item {...formItemLayout} label="Select State :-" 
                hasFeedback
                validateStatus={(error.state_nameError)?"error":"success"}
                help={error.state_nameError}>
            <Select name="state_id" value={obj.state_id} onChange={(e) => HandleChange(e, "state_id")} placeholder="------ Select State-----">
              {optionTemplate()}
            </Select>
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
  err: state.cityReducer.error,
  cities: state.cityReducer.cities,
  states: state.stateReducer.states,
  singlecities: state.cityReducer.singlecities
})

const mapDispatchToProps = dispatch => {
  return {
    fetchstatedata: () => dispatch(fetchstatedata()),
    fetchcitiesdata: () => dispatch(fetchcitiesdata()),
    deletecitiesdata: (_id) => dispatch(deletecitiesdata(_id)),
    updatecitiesdata: (postdata, put) => dispatch(updatecitiesdata(postdata, put)),
    singlecitiesDataFetch: (id) => dispatch(singlecitiesDataFetch(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CityList);
