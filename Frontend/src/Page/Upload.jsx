import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaUpload,
  FaFileMedical,
  FaCheckCircle,
  FaCloudUploadAlt,
  FaArrowLeft,
  FaExclamationTriangle,
  FaShieldAlt,
  FaLock,
} from "react-icons/fa";

const Upload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [Id, setId] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check user
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/user",
          {},
          { withCredentials: true }
        );
        if (res.data.user) {
          setId(res.data.user.id);
          setLoading(false);
        }
      } catch (error) {
        console.error(error.response?.data || error.message);
        navigate("/");
        setLoading(true);
      }
    };
    checkUser();
  }, [navigate]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check file type
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
      ];
      if (!validTypes.includes(selectedFile.type)) {
        alert("Please select a valid file type (JPEG, PNG, PDF)");
        return;
      }

      // Check file size (5MB max)
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
      ];
      if (!validTypes.includes(droppedFile.type)) {
        alert("Please select a valid file type (JPEG, PNG, PDF)");
        return;
      }

      if (droppedFile.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }

      setFile(droppedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
  };

  const uploadReports = async () => {
    if (!file) return alert("Please select a file first");

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      await axios.post("http://localhost:5000/api/reports/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      setTimeout(() => {
        alert(
          "Report uploaded successfully! Our AI is now analyzing your medical data."
        );
        setFile(null);
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading report. Please try again.");
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center px-6 py-16">
      {/* Go Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors group"
      >
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span>Go Back</span>
      </button>

      <div className="bg-[#0f0f0f] border border-gray-800 rounded-3xl shadow-2xl p-8 w-full max-w-md hover:shadow-green-500/10 transition-all duration-300">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FaFileMedical className="text-2xl text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center shadow-md">
                <FaUpload className="text-xs text-black" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-2">
            Upload Medical Report
          </h1>
          <p className="text-gray-400 text-sm">
            Secure AI-powered medical document analysis
          </p>
        </div>

        {/* AI Disclaimer */}
        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <div className="flex items-start gap-3">
            <FaExclamationTriangle className="text-yellow-500 text-lg mt-0.5 flex-shrink-0" />
            <div className="text-left">
              <p className="text-yellow-400 text-sm font-semibold mb-1">
                Important Notice
              </p>
              <p className="text-yellow-300 text-xs leading-relaxed">
                Our AI provides analysis for informational purposes only.
                <span className="font-semibold">
                  {" "}
                  Always consult healthcare professionals
                </span>{" "}
                for medical decisions. AI analysis may contain inaccuracies and
                should not replace professional medical advice.
              </p>
            </div>
          </div>
        </div>

        {/* Upload Area */}
        <div className="flex flex-col gap-6">
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
              isDragOver
                ? "border-green-500 bg-green-500/10"
                : file
                ? "border-green-500 bg-green-500/5"
                : "border-gray-700 hover:border-green-500 hover:bg-green-500/5"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-input").click()}
          >
            <input
              id="file-input"
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept=".jpg,.jpeg,.png,.pdf"
            />

            {file ? (
              <div className="space-y-3">
                <FaCheckCircle className="text-4xl text-green-500 mx-auto" />
                <div>
                  <p className="text-white font-semibold truncate">
                    {file.name}
                  </p>
                  <p className="text-green-400 text-sm">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready for AI
                    analysis
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                  className="text-red-400 text-sm hover:text-red-300 transition hover:underline"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <FaCloudUploadAlt className="text-4xl text-gray-500 mx-auto" />
                <div>
                  <p className="text-white font-semibold">
                    Select Medical Report
                  </p>
                  <p className="text-gray-400 text-sm">or drag and drop here</p>
                </div>
                <p className="text-gray-500 text-xs">JPG, PNG, PDF up to 5MB</p>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">AI Processing...</span>
                <span className="text-green-400">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-gray-500 text-xs text-center">
                Analyzing medical data with AI algorithms...
              </p>
            </div>
          )}

          {/* Upload Button */}
          <button
            onClick={uploadReports}
            disabled={!file || isUploading}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group relative overflow-hidden"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {isUploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin relative z-10"></div>
                <span className="relative z-10">AI Processing...</span>
              </>
            ) : (
              <>
                <FaUpload className="group-hover:scale-110 transition-transform relative z-10" />
                <span className="relative z-10">Analyze with AI</span>
              </>
            )}
          </button>

          {/* Security & Features */}
          <div className="space-y-4">
            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
              <FaLock className="text-green-500 text-sm" />
              <span className="text-gray-400 text-sm">
                End-to-end encrypted
              </span>
              <FaShieldAlt className="text-green-500 text-sm" />
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/50">
                <FaCheckCircle className="text-green-500 text-sm mx-auto mb-1" />
                <p className="text-gray-400 text-xs">HIPAA Compliant</p>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/50">
                <FaCheckCircle className="text-green-500 text-sm mx-auto mb-1" />
                <p className="text-gray-400 text-xs">AI Analysis</p>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/50">
                <FaCheckCircle className="text-green-500 text-sm mx-auto mb-1" />
                <p className="text-gray-400 text-xs">Instant Results</p>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/50">
                <FaCheckCircle className="text-green-500 text-sm mx-auto mb-1" />
                <p className="text-gray-400 text-xs">Secure Storage</p>
              </div>
            </div>
          </div>

          {/* Additional Disclaimer */}
          <div className="text-center">
            <p className="text-gray-500 text-xs leading-relaxed">
              By uploading, you agree to our AI analysis terms.
              <span className="text-yellow-400">
                {" "}
                Results are for informational purposes only.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
