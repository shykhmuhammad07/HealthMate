import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFileMedical,
  FaUser,
  FaCalendar,
  FaStethoscope,
  FaPills,
  FaAllergies,
  FaThermometerHalf,
  FaCheckCircle,
  FaHome,
  FaArrowLeft,
} from "react-icons/fa";

const AiReport = () => {
  const [Id, setId] = useState("");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  // Fetch reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/reports/all`, {
          withCredentials: true,
        });

        if (res.data && res.data.length > 0) {
          setReports(res.data);
        } else {
          console.log("No reports found");
        }
      } catch (error) {
        console.error(
          "Fetch report error:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    if (Id) fetchReports();
  }, [Id]);

  // Function to parse and extract structured data from AI summary
  const parseReportData = (aiSummary) => {
    const data = {
      patientName: "Not specified",
      age: "Not specified",
      doctorName: "Not specified",
      visitDate: "Not specified",
      chiefComplaint: "Not specified",
      diagnosis: "Not specified",
      medication: "Not specified",
      allergies: "Not specified",
      vitals: "Not specified",
      labResults: "Not specified",
    };

    try {
      // Extract patient name
      const nameMatch = aiSummary.match(/for\s+([^,]+),/);
      if (nameMatch) data.patientName = nameMatch[1];

      // Extract age
      const ageMatch = aiSummary.match(/(\d+)-year-old/);
      if (ageMatch) data.age = `${ageMatch[1]} years`;

      // Extract doctor name
      const doctorMatch = aiSummary.match(/Dr\.\s+([^\n\.]+)/);
      if (doctorMatch) data.doctorName = `Dr. ${doctorMatch[1]}`;

      // Extract visit date
      const dateMatch = aiSummary.match(/visit on\s+([^\n]+)/);
      if (dateMatch) data.visitDate = dateMatch[1];

      // Extract chief complaint
      const complaintMatch = aiSummary.match(
        /Chief Complaint[^:]*:\s*([^\n\.]+)/
      );
      if (complaintMatch) data.chiefComplaint = complaintMatch[1];

      // Extract diagnosis from lab results
      if (aiSummary.includes("Positive") && aiSummary.includes("Strep")) {
        data.diagnosis = "Strep Throat";
        data.labResults = "Positive Rapid Strep Test";
      }

      // Extract medication
      const medMatch = aiSummary.match(/Medication with\s+([^\(]+)/);
      if (medMatch) data.medication = medMatch[1].trim();

      // Extract allergies
      if (aiSummary.includes("Allergies")) {
        const allergyMatch = aiSummary.match(
          /Active Allergies[^:]*:\s*([^\n\.]+)/
        );
        if (allergyMatch) data.allergies = allergyMatch[1];
      }

      // Extract vitals
      const tempMatch = aiSummary.match(/Temperature[^:]*:\s*([^\n\.]+)/);
      if (tempMatch) data.vitals = `Temperature: ${tempMatch[1]}`;
    } catch (error) {
      console.error("Error parsing report data:", error);
    }

    return data;
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
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-2">
              AI Medical Reports
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Intelligent analysis of your medical reports
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 bg-green-500 text-black px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
          >
            <FaArrowLeft className="text-sm" />
            Back to Home
          </button>
        </div>

        {reports.length === 0 ? (
          <div className="text-center py-16 bg-[#0f0f0f] border border-gray-800 rounded-2xl">
            <FaFileMedical className="text-6xl text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-300 mb-2">
              No Reports Available
            </h3>
            <p className="text-gray-500 mb-6">
              Upload your first medical report to get AI analysis
            </p>
            <button
              onClick={() => navigate("/uploadreport")}
              className="bg-green-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Upload First Report
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {reports.map((report) => {
              const reportData = parseReportData(report.aiSummary);

              return (
                <div
                  key={report._id}
                  className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-6 hover:border-green-500 transition-all duration-300"
                >
                  {/* Horizontal Layout for Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                          <FaFileMedical className="text-green-500 text-xl" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-white">
                            {reportData.patientName}
                          </h2>
                          <p className="text-green-400 text-sm font-semibold">
                            {reportData.diagnosis || "Medical Report"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                      <span className="bg-green-500 text-black px-3 py-1 rounded-full text-xs font-bold text-center">
                        AI Analyzed
                      </span>
                      <span className="text-gray-500 text-xs text-center">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Horizontal Grid for Patient Info */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                      <FaUser className="text-green-500 mx-auto mb-2" />
                      <p className="text-gray-400 text-xs">Age</p>
                      <p className="text-white text-sm font-medium">
                        {reportData.age}
                      </p>
                    </div>

                    <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                      <FaCalendar className="text-blue-500 mx-auto mb-2" />
                      <p className="text-gray-400 text-xs">Visit Date</p>
                      <p className="text-white text-sm font-medium">
                        {reportData.visitDate}
                      </p>
                    </div>

                    <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                      <FaStethoscope className="text-purple-500 mx-auto mb-2" />
                      <p className="text-gray-400 text-xs">Doctor</p>
                      <p className="text-white text-sm font-medium truncate">
                        {reportData.doctorName}
                      </p>
                    </div>

                    <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                      <FaThermometerHalf className="text-red-500 mx-auto mb-2" />
                      <p className="text-gray-400 text-xs">Complaint</p>
                      <p className="text-white text-sm font-medium truncate">
                        {reportData.chiefComplaint}
                      </p>
                    </div>
                  </div>

                  {/* Medical Details in Horizontal Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                    {/* Key Findings */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" />
                        Key Findings
                      </h3>
                      <div className="space-y-2">
                        {reportData.labResults && (
                          <div className="bg-gray-800/50 rounded-lg p-3 border-l-4 border-green-500">
                            <p className="text-green-400 font-semibold text-sm">
                              Lab Results
                            </p>
                            <p className="text-white text-xs">
                              {reportData.labResults}
                            </p>
                          </div>
                        )}
                        {reportData.vitals && (
                          <div className="bg-gray-800/50 rounded-lg p-3 border-l-4 border-blue-500">
                            <p className="text-blue-400 font-semibold text-sm">
                              Vitals
                            </p>
                            <p className="text-white text-xs">
                              {reportData.vitals}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Treatment & Allergies */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <FaPills className="text-yellow-500" />
                        Treatment Info
                      </h3>
                      <div className="space-y-2">
                        {reportData.medication && (
                          <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/20">
                            <div className="flex items-center gap-2 mb-1">
                              <FaPills className="text-yellow-500 text-sm" />
                              <p className="text-yellow-400 font-semibold text-sm">
                                Medication
                              </p>
                            </div>
                            <p className="text-white text-xs">
                              {reportData.medication}
                            </p>
                          </div>
                        )}

                        {reportData.allergies && (
                          <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                            <div className="flex items-center gap-2 mb-1">
                              <FaAllergies className="text-red-500 text-sm" />
                              <p className="text-red-400 font-semibold text-sm">
                                Allergies
                              </p>
                            </div>
                            <p className="text-white text-xs">
                              {reportData.allergies}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Report Image and Full Analysis */}
                  <div className="space-y-4">
                    {report.fileUrl && (
                      <div>
                        <p className="text-gray-400 text-sm mb-2">
                          Original Report
                        </p>
                        <img
                          src={report.fileUrl}
                          alt="Medical report"
                          className="w-full h-40 object-contain rounded-lg border border-gray-700 cursor-pointer hover:border-green-500 transition bg-gray-800"
                          onClick={() => window.open(report.fileUrl, "_blank")}
                        />
                      </div>
                    )}

                    {/* Full AI Summary */}
                    <details className="group">
                      <summary className="cursor-pointer text-green-400 font-semibold text-sm flex items-center gap-2 hover:text-green-300 transition">
                        View Full AI Analysis
                        <span className="group-open:rotate-180 transition-transform">
                          ▼
                        </span>
                      </summary>
                      <div className="mt-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {report.aiSummary}
                        </p>
                      </div>
                    </details>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
                    <span className="text-gray-500 text-xs">
                      Report Generated
                    </span>
                    <span className="text-green-500 text-xs font-semibold">
                      ID: {report._id.slice(-6)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AiReport;
