import React,{useEffect,useState} from 'react';
import {getAllUser,fetchProfile,updateProfile} from '../../store/action/userAction';
import {connect} from 'react-redux';
import '../state.css';
import { Table, Breadcrumb, Card,Space,Button,Modal } from 'antd';
const AllUsersList = (props) => {
  
  const [show, setShow] = useState(false);
  const [ids, setIds] = useState(false);  
  useEffect(()=>{  
      props.getAllUser();
    },[props.getAllUser,props.singleuser1])

  const [obj,setMyObj] = useState({
    user_name:"",
    password:"",
    email:"",
    gender:"Male",
    photo1:"",
    state_id:"",
    city_id:"",
    group_id:"",
    is_active:""
  });
  if(ids==true){
        setIds(false);
  }

  if (obj.user_name!=""){
  }
  const deleteHandler = async (id) => {
    if(props.singleuser1.user_name){
        let olddata={...obj};
        olddata._id=props.singleuser1._id;
        olddata.user_name = props.singleuser1.user_name;
        olddata.password = props.singleuser1.password;
        olddata.email = props.singleuser1.email;
        olddata.gender = props.singleuser1.gender;
        olddata.state_id = props.singleuser1.state_id;
        olddata.photo1 = props.singleuser1.photo1;
        olddata.city_id = props.singleuser1.city_id;
        olddata.group_id = props.singleuser1.group_id;
            if(props.singleuser1.is_active=="1"){ 
              olddata.is_active = "0";
            }else{
              olddata.is_active = "1";
            }
            setMyObj(olddata);
            console.log(olddata);
            props.updateProfile(olddata._id,olddata);
    }
    setShow(false);
  }


  const handleClose = () => setShow(false);
  const handleShow = async (id) => {
    await props.fetchProfile(id);
    setShow(true);
    setIds(id);
  }

const columns = [
  {
    title: () => <b>Index</b>,
    key: 'Index',
    fixed:"left",
    render : (text, record, index) => index+1,
  },{
    title: () => <b>User Name</b>,
    dataIndex: 'user_name',
    key: 'user_name',
    defaultSortOrder: 'descend',
    fixed:"left",
    sorter: (a, b) => a.user_name.length - b.user_name.length,
  },{
    title: () => <b>Email</b>,
    dataIndex: 'email',
    key: 'email',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.email.length - b.email.length,
  },{
    title: () => <b>Gender</b>,
    dataIndex: 'gender',
    key: 'gender',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.gender.length - b.gender.length,
  },{
      title: () => <b>City Name</b>,
      key: 'city_id',
      defaultSortOrder: 'descend',
      render: s => s.city_id.city_name,
      sorter: (a, b) => a.city_id.city_name.length - b.city_id.city_name.length,
},{
    title: () => <b>State Name</b>,
    key: 'state_id',
    defaultSortOrder: 'descend',
    render: s => s.state_id.state_name,
    sorter: (a, b) => a.state_id.state_name.length - b.state_id.state_name.length,
  },{
    title: () => <b>Status</b>,
    key: 'is_active',
    defaultSortOrder: 'descend',
    // render: ,
    render: (text, record) => (
      <Space size="middle">
        {record.is_active=="1"?<Button type='danger' onClick={() => handleShow(record._id)} style={{ backgroundColor: '#005f00', borderBlockColor: 'Black', color: 'White' }}>Active</Button>:<Button type='danger' onClick={() => handleShow(record._id)} style={{ backgroundColor: '#820000', borderBlockColor: 'Black', color: 'White' }}>Block</Button>}
        {/* <Button type="danger" onClick={() => handleShow(record._id)} style={{ backgroundColor: "Green", borderBlockColor: "Black", color: "White" }}>{record.is_active=="1"?"Active":"Block"}</Button> */}
      </Space>
    ),
  }
];

  return (
    <>
      <div className={"Title"} style={{ marginTop: "-29px"}}>
          </div>
      <Breadcrumb style={{ marginTop: "1px",textAlign:"right",marginBottom:"29px" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>All User</Breadcrumb.Item>
        <Breadcrumb.Item>View Users List</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-card-border-less-wrapper">
        <Card title="View Users List" bordered={true} style={{ width: "auto",border:"5px" }}>
          <Table columns={columns} dataSource={props.users} pagination={{ pageSize: 4 }} />
        </Card>
      </div>

      <Modal title="Are you sure!"
        visible={show}
        onOk={() => deleteHandler(ids)}
        onCancel={() => handleClose()}>
        Do you want to change this state?
      </Modal>
    </>
  );
}

const mapStateToProps =  (state) => ({
  err:state.movieReducer.error,
  users:state.userReducer.users,
  singleuser1:state.userReducer.singleuser1
})

const mapDispatchToProps = dispatch =>{
  return{
    updateProfile:(_id,put)=>dispatch(updateProfile(_id,put)),
    fetchProfile:(_id)=>dispatch(fetchProfile(_id)),
    getAllUser:()=>dispatch(getAllUser())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AllUsersList);