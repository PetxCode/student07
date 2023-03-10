import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingState from "../LoadingState";
import pix from "./logo.png";

// const url = "https://studentbe1.herokuapp.com";
// const url = "https://student-be.onrender.com";
const url = "https://set07.onrender.com";

const AddNewCandidate = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [instructor, setInstructor] = useState(true);
  const [student, setStudent] = useState(false);

  const [builtFor, setBuiltFor] = useState("web");

  const [image, setImage] = useState("");
  const [avatar, setAvatar] = useState("");

  const onHandleImage = (e) => {
    const file = e.target.files[0];
    const save = URL.createObjectURL(file);
    setImage(save);
    setAvatar(file);
  };

  const yupSchema = yup.object({
    name: yup.string().required("Field must be filled"),
    course: yup.string().required("Field must be filled"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yupSchema),
  });

  const [userData, setUserData] = useState([]);

  const onSubmit = handleSubmit(async (data) => {
    const { name, course } = data;

    const formData = new FormData();

    formData.append("avatar", avatar);
    formData.append("name", name);
    formData.append("course", course);

    const config = {
      "content-type": "multipart/form-data",
    };

    setLoading(true);
    await axios
      .post(`${url}/api/voteIntructor/create`, formData, config)

      .then((res) => {
        console.log(res.data.data);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Candidate Added",
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {});
        setLoading(false);
      })
      .catch((error) => {
        new Swal({
          title: error.response.data.message,
          text: `Please check and fix this ERROR`,
          icon: "error",
          showConfirmButton: false,
          timer: 3500,
        }).then(() => {
          setLoading(false);
        });
      });
  });

  const onSubmitStudent = handleSubmit(async (data) => {
    const { name, course } = data;

    const formData = new FormData();

    formData.append("avatar", avatar);
    formData.append("name", name);
    formData.append("course", course);

    const config = {
      "content-type": "multipart/form-data",
    };

    setLoading(true);
    await axios
      .post(`${url}/api/voteStudent/create`, formData, config)

      .then((res) => {
        console.log(res.data.data);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Candidate Added",
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {});
        setLoading(false);
      })
      .catch((error) => {
        new Swal({
          title: error.response.data.message,
          text: `Please check and fix this ERROR`,
          icon: "error",
          showConfirmButton: false,
          timer: 3500,
        }).then(() => {
          setLoading(false);
        });
      });
  });

  const getUserData = async () => {
    await axios.get(`${url}/api/interest/${user._id}`).then((res) => {
      setUserData(res.data.data);
    });
  };

  useEffect(() => {
    getUserData();
    console.log(userData);
  }, []);

  return (
    <Container>
      {loading ? <LoadingState /> : null}
      <Card>
        <div>
          <Text>
            <ButtonChange
              bg="darkorange"
              onClick={() => {
                setInstructor(true);
                setStudent(false);
              }}
            >
              Add Instructor
            </ButtonChange>
            <ButtonChange
              bg="darkorange"
              onClick={() => {
                setInstructor(false);
                setStudent(true);
              }}
            >
              Add Student
            </ButtonChange>
          </Text>

          {instructor ? (
            <div>
              <Card2>
                <Form onSubmit={onSubmit}>
                  <Text>Adding Instructor</Text>

                  <br />

                  {
                    <div>
                      {image === "" ? (
                        <>
                          {userData.avatar ? (
                            <ImageChoose src={pix} />
                          ) : (
                            // <ImageChoose src={pix} bg />
                            <div>change</div>
                          )}
                        </>
                      ) : (
                        <ImageChoose src={image} />
                      )}
                    </div>
                  }

                  <ImageInput
                    id="pix"
                    type="file"
                    accept="image/*"
                    onChange={onHandleImage}
                  />
                  <ImageLabel htmlFor="pix">Choose an Image</ImageLabel>

                  <InputHolder>
                    <Blocker>Instructor's Name</Blocker>
                    <Input
                      placeholder="Enter Instructor's Name"
                      {...register("name")}
                    />
                  </InputHolder>
                  <Error>{errors.name?.message}</Error>

                  <InputHolder>
                    <Blocker>Instructor's Course</Blocker>
                    <Input
                      placeholder="Instructor's Course"
                      {...register("course")}
                    />
                  </InputHolder>
                  <Error>{errors.course?.message}</Error>

                  <br />

                  <Button type="submit" bg="darkorange">
                    Enter Instructor
                  </Button>
                </Form>
              </Card2>
            </div>
          ) : student ? (
            <div>
              <div>
                <Card2>
                  <Form onSubmit={onSubmitStudent}>
                    <Text>Adding Student</Text>

                    <br />

                    {
                      <div>
                        {image === "" ? (
                          <>
                            {userData.avatar ? (
                              <ImageChoose src={pix} />
                            ) : (
                              // <ImageChoose src={pix} bg />
                              <div>change</div>
                            )}
                          </>
                        ) : (
                          <ImageChoose src={image} />
                        )}
                      </div>
                    }

                    <ImageInput
                      id="pix"
                      type="file"
                      accept="image/*"
                      onChange={onHandleImage}
                    />
                    <ImageLabel htmlFor="pix">Choose an Image</ImageLabel>

                    <InputHolder>
                      <Blocker>Student's Name</Blocker>
                      <Input
                        placeholder="Enter Student's Name"
                        {...register("name")}
                      />
                    </InputHolder>
                    <Error>{errors.name?.message}</Error>

                    <InputHolder>
                      <Blocker>Student's Course</Blocker>
                      <Input
                        placeholder="Student's Course"
                        {...register("course")}
                      />
                    </InputHolder>
                    <Error>{errors.course?.message}</Error>

                    <br />

                    <Button type="submit" bg="darkorange">
                      Enter Student
                    </Button>
                  </Form>
                </Card2>
              </div>
            </div>
          ) : null}
        </div>
      </Card>
    </Container>
  );
};

export default AddNewCandidate;

const ImageLabel = styled.label`
  margin: 10px 0;
  padding: 10px 20px;
  border-radius: 30px;
  background: #004080;
  color: white;
  font-size: 12px;
  text-transform: uppercase;
  transition: all 350ms;
  margin-top: 10px;

  :hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    cursor: pointer;
    transform: scale(1.03);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }
`;

const ImageChoose = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 5px;
  overflow: hidden;
  object-fit: ${({ bg }) => (bg ? "contain" : "cover")};
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;

const ImageInput = styled.input`
  display: none;
`;

const Card2 = styled.div`
  width: 400px;
  min-height: 300px;
  border-radius: 5px;

  @media screen and (max-width: 600px) {
    width: 90%;
  }
`;

const Option = styled.option`
  font-family: Poppins;
`;

const Container = styled.div`
  width: 70%;
  height: 100%;

  @media screen and (max-width: 600px) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const CardWrapper = styled.div`
  justify-content: center;
  display: flex;
  width: 70%;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;

const InputArea = styled.textarea`
  resize: none;
  padding-top: 10px;
  width: 90%;
  outline: none;
  border: 1px solid #004080;
  height: 100px;
  margin: 5px 0;
  border-radius: 3px;
  padding-left: 10px;

  ::placeholder {
    font-family: Poppins;
  }
`;

const Select = styled.select`
  width: 90%;
  outline: none;
  border: 1px solid #004080;
  height: 40px;
  margin: 5px 0;
  border-radius: 3px;
  padding-left: 10px;

  font-family: Poppins;
  ::placeholder {
    font-family: Poppins;
  }
`;

const Input = styled.input`
  width: 90%;
  outline: none;
  border: 1px solid #004080;
  height: 40px;
  margin: 5px 0;
  border-radius: 3px;
  padding-left: 10px;

  ::placeholder {
    font-family: Poppins;
  }
`;

const Form = styled.form`
  display: flex;
  border-radius: 5px;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  background: white;
`;

const Card = styled.div`
  margin-top: 70px;
  width: 400px;
  min-height: 300px;
  border-radius: 5px;
`;

const Span = styled(Link)`
  margin: 0 5px;
  text-decoration: none;
  color: #004080;
  font-weight: 700;

  :hover {
    cursor: pointer;
  }
`;

const Text = styled.div`
  display: flex;
  font-size: 18px;
  text-transform: uppercase;
  margin-top: 50px;
  margin-bottom: 20px;
  font-weight: 700;
`;

const Image = styled.img`
  height: 150px;
`;
const Error = styled.p`
  margin: 0;
  color: red;
  display: flex;
  justify-content: flex-end;
  width: 80%;
  font-size: 12px;
  margin-top: -15px;
  margin-right: 5px;
`;

const Blocker = styled.div`
  position: absolute;
  top: -3px;
  background-color: white;
  padding: 0 5px;
  font-size: 12px;
  left: 10px;
  color: #004080;
`;

const InputHolder = styled.div`
  position: relative;
  width: 90%;
  margin: 10px 0;
`;

const ButtonChange = styled.button`
  outline: none;
  border: 0;
  text-align: center;
  margin: 10px;
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  background-color: ${({ bg }) => bg};
  font-size: 15px;
  text-transform: uppercase;
  transition: all 350ms;
  margin-bottom: 20px;

  :hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    cursor: pointer;
    transform: scale(1.03);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }
`;

const Button = styled.button`
  outline: none;
  border: 0;
  text-align: center;
  margin: 10px;
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  background-color: ${({ bg }) => bg};
  font-size: 15px;
  text-transform: uppercase;
  transition: all 350ms;
  margin-bottom: 20px;

  :hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    cursor: pointer;
    transform: scale(1.03);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }
`;
