import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { Layout, Menu,Dropdown,Modal,Form,Input,Breadcrumb } from 'antd';
import { logout} from '../../store/action/userAction';
import {changepassword} from '../../store/action/userAction';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LockOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import Logo from '../../Movie_logo/logo1.png'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const TheaterHeader = (props) => {

  
  const [active,setActive] =useState(false);
    
      const [error,setError] =useState({
        IsValid:true,        
        confirmError:"",
        newError:"",
        passwordError:""
      });
      const [show, setShow] = useState(false);

      useEffect(() =>{
        if(props.err.length!=0)
        {
          setError({
            passwordError:props.err,
          })
          setActive(true);
          console.log(active);
        }
      },[props.err])

      const [obj,setMyObj1] =useState({
        password:"",
        new_password:"",
        confirm_password:""
      });      
      
      const handleClose = () => {
        setShow(false);
      }
      const handleShow = async () => {
        setShow(true);
      }
      
      const changePassword = async()=>{
          let errors = { ...error, IsValid : true };
            if(!obj.new_password || !obj.password || !obj.confirm_password ){
              errors.confirmError = "";
              errors.newError = "";
              errors.passwordError = "";
              if(!obj.new_password){
                errors.IsValid = false;
                errors.newError = "Please enter new password !!"
              }
              if(!obj.password){
                errors.IsValid = false;
                errors.passwordError = "Please enter old password !!"
              }
              if(!obj.confirm_password){
                errors.IsValid = false;
                errors.confirmError = "Please enter confirm password !!"
              }
            }else if(obj.new_password!=obj.confirm_password){
                    errors.newError = "";
                    errors.passwordError = "";
                  if(obj.new_password!=obj.confirm_password){
                    errors.IsValid = false;
                    errors.confirmError = "Confirm Password Is Not Matched"
                  }
            }else{
              errors.confirmError = "";
              errors.newError = "";
              errors.passwordError = "";
              errors.IsValid=true;
            }
            setError(errors);
            if(errors.IsValid==true){
              try {
                await props.changepassword(obj.password,obj.new_password);
                setShow(false);
              } catch {

              }
            }   
      }
      
      const HandleChange = (e, name) => {
        let olddata = { ...obj };
        olddata[name] = e.target.value;    
        setMyObj1(olddata);
      }

      const HandleLogOut = async () =>{
        await props.logout();
      }
      const[collapsed,setCollapsed] = useState(false);
      
    // const toggle = () => {
    //   setCollapsed(!collapsed);
    // };

    const onCollapse=() =>{
        if(collapsed==true){
            setCollapsed(false);
        }else{
            setCollapsed(true);
        }
    }

    const userMenu = (
      <Menu>
        <Menu.Item key="admin"><h4><UserOutlined /> Welcome, Admin</h4></Menu.Item>  
        <Menu.Item key="/theater/changepassword" onClick={() => handleShow()}><LockOutlined />Change Password</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="/theater/logout" onClick={() => HandleLogOut()}><LogoutOutlined />Logout</Menu.Item>
      </Menu>
    );

    return (
        <Layout style={{ minHeight: '100vh',backgroundColor:"#287688" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={()=>onCollapse()} style={{backgroundColor:"#800000"}}>
          <div className="logo" /><img src={Logo} height="80px" width="50px"></img>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" style={{backgroundColor:"#800000"}}>
            <Menu.Item key="/theater/dashboard"  icon={<PieChartOutlined />} >
                <Link to="/theater/dashboard">Dashboard</Link>
            </Menu.Item>
            <SubMenu key="Screen" icon={<UserOutlined />} title="Screen">
              <Menu.Item key="4"><Link to="/theater/addScreen">Add Scrren</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/theater/screenList">View Screen</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Theater Screen">
              <Menu.Item key="6"><Link to="/theater/addtscreen">Add Theater Screen</Link></Menu.Item>
              <Menu.Item key="8"><Link to="/theater/tscreenList">View Theater Screen</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0,backgroundColor:"#d06a6a" }} >
          <Dropdown.Button
                style={{ float: 'right',marginTop: "20px", marginRight: "13px" }}
                overlay={userMenu}
                icon={
                  <UserOutlined
                  style={{
                    marginTop: "-3px",
                    fontSize: '28px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '50%',
                  }}
                  />
                }
                ></Dropdown.Button>
          </Header>
          {props.content};
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
        <Modal title="Are you sure!"
              visible={show}
              onOk={() => changePassword()}
              onCancel={() => handleClose()}>
                  <Form>
                    <Form.Item label="Enter Old Password:-"
                        hasFeedback
                        style={{    marginLeft:"30px"}}
                        validateStatus={(error.passwordError)?"error":"success"}
                        help={error.passwordError}>                  
                          <Input type="password" style={{ backgroundColor: "#e2e2e2", color: "#463334" }} name="password"  onChange={(e) => HandleChange(e, "password")} placeholder="Enter old password ..." />
                        </Form.Item>
                    <Form.Item label="Enter New Password:-"
                        hasFeedback
                        style={{    marginLeft:"24px"}}
                        validateStatus={(error.newError)?"error":"success"}
                        help={error.newError}>                  
                        <Input type="password" style={{ backgroundColor: "#e2e2e2", color: "#463334" }} name="new_password"  onChange={(e) => HandleChange(e, "new_password")} placeholder="Enter New password ..." />
                    </Form.Item>
                    <Form.Item label="Enter Confirm Password:-       "
                        hasFeedback
                        style={{    marginLeft:"4px"}}
                        validateStatus={(error.confirmError)?"error":"success"}
                        help={error.confirmError}>                  
                        <Input type="password" style={{ backgroundColor: "#e2e2e2", color: "#463334" }} name="confirm_password"  onChange={(e) => HandleChange(e, "confirm_password")} placeholder="Enter Confirm password ..." />
                    </Form.Item>
                </Form>
              </Modal>
      </Layout>
        );
}

const mapStateToProps = (state) => ({
  err: state.userReducer.error1,
  Loading: state.userReducer.loading,
  singleuser2: state.userReducer.singleuser2,
})
const mapDispatchToProps = dispatch =>{
  return{
    logout:()=>dispatch(logout()),
    changepassword:(pass,newpass)=> dispatch(changepassword(pass,newpass))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(TheaterHeader);