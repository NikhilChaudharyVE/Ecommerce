import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import {Api,createCategory,getAllCategoryURL,deleteCategory,updateCategory} from "../../config/Api";
import { Modal } from "antd";
import CategoryForm from "../../components/Form/CategoryForm";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpadatedName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createCategory
        ( name )
      ;
      if (data?.success) {
        toast.success(`${data.data.name} is created`);
        getAllCategory();
      } else {
        toast.error("not created");
      }
    } catch (error) {
      console.log("error are in createcategory.js : ", error);
      toast.error("somenthing went wrong in form submit ...  ");
    }
  };
  const getAllCategory = async () => {
    try {
      const { data } = await getAllCategoryURL()
      if (data?.success) {
        setCategories(data?.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // updateCategory funct
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateCategory(selected,
        updatedName 
      );
      if (data?.success) {
        toast.success("updated");
        setSelected(null);
        setUpadatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error("error are in updated function");
      }
    } catch (error) {
      console.log("error are in CreateCategory function : ", error);
      toast.error("Someyhing went wrong");
    }
  };
  //deleted category function
  const handleDelete = async (id) => {
    try {
      const { data } = await deleteCategory(id
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error("errro are in deleted category");
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"Dashboard - CreateCategory"}>
      <div className="container-fluid n-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Managed Category</h1>
            <div className="p-3 ">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div>
              <div className="w-80">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((c) => (
                      <>
                        <tr>
                          <td key={c._id}>{c.name}</td>
                          <td>
                            <button
                              className="btn btn-primary ms-2"
                              onClick={() => {
                                setVisible(true);
                                setSelected(c._id);
                                setUpadatedName(c.name);
                              }}
                            >
                              Edit{" "}
                            </button>
                            <button
                              className="btn btn-danger ms-2"
                              onClick={() => {
                                handleDelete(c._id);
                              }}
                            >
                              delete{" "}
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            open={visible}
          >
            <CategoryForm
              value={updatedName}
              setValue={setUpadatedName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};
export default CreateCategory;
