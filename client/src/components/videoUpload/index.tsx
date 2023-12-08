import React from 'react';
import { Typography, Button, Form, message, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Dropzone, { DropEvent, FileRejection } from 'react-dropzone';
import axios, { AxiosRequestConfig } from 'axios';


const { Title } = Typography;
const { TextArea } = Input;

const DivisionOptions = [
  { value: 0, label: 'Private' },
  { value: 1, label: 'Public' },
]

const CategoryOptions = [
  { value: 0, label: 'Film & Animation' },
  { value: 1, label: 'Autos & Vehicles' },
  { value: 2, label: 'Music' },
  { value: 3, label: 'Pets & Animals' },
]



const VideoUploadPage = () => {

  const [ videoTitle, setVideoTitle ] = React.useState("");
  const [ videoDesc, setVideoDesc ] = React.useState("");
  const [ division, setDivision ] = React.useState(DivisionOptions[0].value);
  const [ category, setCategory ] = React.useState(CategoryOptions[0].value);


  const onChangeTile = (e:React.ChangeEvent<HTMLInputElement>) => {
    setVideoTitle(e.target.value);
  }

  const onChangeDesc = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setVideoDesc(e.target.value);
  }

  const onChangePrivate = (e:React.ChangeEvent<HTMLSelectElement>) => {
    console.log('선택', e.target.value, e.target)
    setDivision(Number(e.target.value));
  }

  const onChangeCategory = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(Number(e.target.value))
  }

  const onDropFile = <T extends File>(files:T[], fileRejections:FileRejection[], e:DropEvent) => {

    const formData = new FormData();
    formData.append('file', files[0]);

    const config:AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    
    axios.post('/api/video/uploadfiles', formData, config)
    .then(({ data }) => {
      if (data.success) {
        console.log('파일 업로드 성공', data)
        
      } else {
        alert('비디오 업로드를 실패했습니다!')
      }
    })

  }


  return (
    <div style={{
      'maxWidth': '700px',
      'margin': '2rem auto',
    }}>
        <div style={{
          'textAlign': 'center',
          'marginBottom': '2rem'
        }}>
          <Title level={2}>
            Upload Video
          </Title>
        </div>
        <Form>
          <div style={{
            'display': 'flex',
            'justifyContent': 'space-between',
          }}>
            <Dropzone
              onDrop={ onDropFile }
              multiple={ false }
              maxSize={ 10000000 }
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  style={{
                    'width': '300px',
                    'height': '240px',
                    'border': '1px solid lightgray',
                    'display': 'flex',
                    'alignItems': 'center',
                    'justifyContent': 'center',
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <PlusOutlined style={{
                    'fontSize': '3rem'
                  }} />
                </div>
              )}
            </Dropzone>
            <div>
              <img src="" alt="" />
            </div>
          </div>
          <br />
          <br />
          <label>Title</label>
          <Input
            onChange={ onChangeTile }
            value={ videoTitle }
          />
          <br />
          <br />
          <label htmlFor="">Description</label>
          <TextArea
            onChange={ onChangeDesc }
            value={ videoDesc }
          />
          <br />
          <br />
          <select name="" id="" onChange={ onChangePrivate } value={ division }>
            {
              DivisionOptions.map((item,idx) => (
                <option key={ idx } value={ item.value }>{ item.label }</option>
              ))
            }
          </select>
          <br />
          <br />
          <select name="" id="" onChange={ onChangeCategory } value={ category }>
            {
              CategoryOptions.map((item, idx) => (
                <option key={ idx } value={ item.value }>{ item.label }</option>
              ))
            }
          </select>

          <Button type='primary' size='large' onClick={undefined}>
            Submit
          </Button>
        </Form>
    </div>
  )
}

export default VideoUploadPage;