import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
const User =()=>{
    return(
        <Layout title={"Dashboard - All user"}>
              <div className="container-fluid n-3 p-3">

            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9">
                        <center>
                            All USer re
                        </center>
                    </div>
            </div>
              </div>
        </Layout>)
}
export default User