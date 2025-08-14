import React, { useState } from 'react';
import axios from 'axios';
import './UdyamForm.css'

// Tailwind CSS classes are assumed to be available.
// This component will create the UI for Step 1, 2, and 3 of the Udyam registration form.

const UdyamForm = () => {
  // State to hold the values of the input fields and form state
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [aadhaarName, setAadhaarName] = useState('');
  const [otp, setOtp] = useState('');
  const [panNumber, setPanNumber] = useState('');
  
  // State for form flow and messages
  const [step, setStep] = useState(1);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  // Function to handle changes in the input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMessage(''); // Clear any previous messages
    if (name === 'aadhaarNumber') {
      const sanitizedValue = value.replace(/[^0-9]/g, '').slice(0, 12);
      setAadhaarNumber(sanitizedValue);
      setErrors(prev => ({ ...prev, aadhaarNumber: sanitizedValue.length === 12 ? '' : 'Aadhaar Number must be 12 digits.' }));
    } else if (name === 'aadhaarName') {
      setAadhaarName(value);
      setErrors(prev => ({ ...prev, aadhaarName: value.trim() ? '' : 'Name as per Aadhaar is required.' }));
    } else if (name === 'otp') {
      const otpVal = value.replace(/[^0-9]/g, '').slice(0, 6);
      setOtp(otpVal);
    } else if (name === 'panNumber') {
      const sanitizedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
      setPanNumber(sanitizedValue);
    }
  };

  // Function to handle the OTP generation
  const handleGenerateOTP = async (e) => {
    e.preventDefault();
    if (aadhaarNumber.length !== 12 || !aadhaarName.trim()) {
      setMessage('Please enter a valid 12-digit Aadhaar number and your name.');
      return;
    }

    try {
      // Simulating an API call to a local server
      const res = await axios.get(`http://localhost:5000/users?aadhaar=${aadhaarNumber}&name=${encodeURIComponent(aadhaarName)}`);
      
      if (res.data.length > 0) {
        setGeneratedOtp(res.data[0].otp); // dummy OTP from data.json
        setMessage(`OTP sent to registered mobile number ending in ****${res.data[0].linkedMobile.slice(-4)}`);
        setStep(2);
      } else {
        setMessage('Aadhaar number and name do not match our records.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error connecting to server. Please ensure the server is running.');
    }
  };

  // Function to handle OTP verification
  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      setMessage('OTP verified successfully!');
      setStep(3); // Move to the next step: PAN validation
    } else {
      setMessage('Invalid OTP. Please try again.');
    }
  };

  // Function to handle PAN verification
  const handleVerifyPAN = (e) => {
    e.preventDefault();
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (panRegex.test(panNumber)) {
      setMessage('PAN verified successfully! You can now proceed with the next steps.');
      setErrors({});
    setStep(4); 
    } else {
      setErrors({ panNumber: 'Invalid PAN format. Please enter a valid PAN.' });
      setMessage('');
    }
  };

  const getProgressWidth = () => {
    if (step === 1) return '33%';
    if (step === 2) return '66%';
    if (step === 3) return '100%';
    return '0%';
  };

  return (
  <>
    <div className="containerform">
      <div className="form-wrapper">
        {/* Progress Tracker */}
        <div className="progress-section">
          <div className="progress-labels">
            <span>Step 1: Aadhaar</span>
            <span>Step 2: OTP</span>
            <span>Step 3: PAN</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: getProgressWidth() }}
            ></div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`message ${
              message.includes("successfully") ? "success" : "error"
            }`}
          >
            {message}
          </div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <>
          <div className="stepOne-section">
            <h2 className="step-title">Step 1: Aadhaar Verification With OTP</h2>
            <form onSubmit={handleGenerateOTP} className="form-step">
              <div className="nameNumber-section">
              <div className="form-group">
                <label>Aadhaar Number</label>
                <input
                  type="text"
                  name="aadhaarNumber"
                  value={aadhaarNumber}
                  onChange={handleInputChange}
                  placeholder="Enter 12-digit Aadhaar"
                  className={errors.aadhaarNumber ? "error-input" : ""}
                  maxLength="12"
                />
                {errors.aadhaarNumber && (
                  <p className="error-text">{errors.aadhaarNumber}</p>
                )}
              </div>

              <div className="form-group">
                <label>Name as per Aadhaar</label>
                <input
                  type="text"
                  name="aadhaarName"
                  value={aadhaarName}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className={errors.aadhaarName ? "error-input" : ""}
                />
                {errors.aadhaarName && (
                  <p className="error-text">{errors.aadhaarName}</p>
                )}
              </div>

</div>

<ul className='info'>
  <li>Aadhaar number shall be required for Udyam Registration.</li>
  <li>The Aadhaar number shall be of the proprietor in the case of a proprietorship firm, of the managing partner in the case of a partnership firm and of a karta in the case of a Hindu Undivided Family (HUF).</li>
  <li>In case of a Company or a Limited Liability Partnership or a Cooperative Society or a Society or a Trust, the organisation or its authorised signatory shall provide its GSTIN(As per applicablity of CGST Act 2017 and as notified by the ministry of MSME vide S.O. 1055(E) dated 05th March 2021) and PAN along with its Aadhaar number.</li>
  <br />
  <input type="checkbox" name="" id=""  checked="checked" />
  <label >
    I, the holder of the above Aadhaar, hereby give my consent to Ministry of MSME, Government of India, for using my Aadhaar number as alloted by UIDAI for Udyam Registration. NIC / Ministry of MSME, Government of India, have informed me that my aadhaar data will not be stored/shared. / मैं, आधार धारक, इस प्रकार उद्यम पंजीकरण के लिए यूआईडीएआई के साथ अपने आधार संख्या का उपयोग करने के लिए सू0ल0म0उ0 मंत्रालय, भारत सरकार को अपनी सहमति देता हूं। एनआईसी / सू0ल0म0उ0 मंत्रालय, भारत सरकार ने मुझे सूचित किया है कि मेरा आधार डेटा संग्रहीत / साझा नहीं किया जाएगा।
  </label>
</ul>


              <button type="submit" className="btn btn-blue">
                Validate & Generate OTP
              </button>
            </form>
            </div>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <h2 className="step-title">Step 2: OTP Verification</h2>
            <form onSubmit={handleVerifyOTP} className="form-step">
              <div className="form-group">
                <label>Enter OTP</label>
                <input
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={handleInputChange}
                  placeholder="Enter 6-digit OTP"
                  maxLength="6"
                />
              </div>

              <button type="submit" className="btn btn-green">
                Verify OTP
              </button>
            </form>
          </>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <>
            <h2 className="step-title">Step 3: PAN Validation</h2>
            <form onSubmit={handleVerifyPAN} className="form-step">
              <div className="form-group">
                <label>PAN Number</label>
                <input
                  type="text"
                  name="panNumber"
                  value={panNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your PAN number"
                  className={errors.panNumber ? "error-input" : ""}
                  maxLength="10"
                />
                {errors.panNumber && (
                  <p className="error-text">{errors.panNumber}</p>
                )}
              </div>

              <button type="submit" className="btn btn-blue">
                Verify PAN
              </button>
            </form>
          </>
        )}

        {/* Step 4 - Completion */}
{step === 4 && (
  <div className="completion-section">
    <h2 className="step-title">🎉 Registration Completed!</h2>
    <p>Your Aadhaar, OTP, and PAN have been successfully verified.</p>
    <p>You can now proceed with the rest of the application.</p>
    <button className="btn btn-green" onClick={() => setStep(1)}>
      Check Data Again
    </button>
  </div>
)}

      </div>
    </div>
  </>
);

};

export default UdyamForm;
