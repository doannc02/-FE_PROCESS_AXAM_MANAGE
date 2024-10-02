import React, { useState, ChangeEvent, FormEvent } from 'react';
import { fileUpload } from '../UploadBox'; // Đảm bảo fileUpload được import đúng cách

const FileUpload: React.FC = () => {
  // Khai báo kiểu dữ liệu cho state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  // Xử lý sự kiện thay đổi file
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // Xử lý sự kiện submit form
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Ngăn hành động mặc định của form

    if (!selectedFile) {
      setUploadStatus('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Gửi yêu cầu POST tới API upload file
      const response = await fileUpload(formData);
      setUploadStatus('File uploaded successfully: ' + response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Failed to upload file.');
    }
  };

  return (
    <div>
      <h1>Upload File</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        {/* Đảm bảo rằng nút submit có type="submit" để submit form thay vì reload trang */}
        <button type="submit">Upload</button>
      </form>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default FileUpload;
